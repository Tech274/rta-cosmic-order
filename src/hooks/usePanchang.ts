import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format, startOfMonth, endOfMonth, addMonths } from 'date-fns';

export interface PanchangEvent {
  id: string;
  event_date: string;
  event_name: string;
  event_type: 'ekadashi' | 'festival' | 'auspicious' | 'tithi';
  description: string | null;
  tithi: string | null;
  nakshatra: string | null;
  is_fasting_day: boolean;
  created_at: string;
}

export interface UserEventReminder {
  id: string;
  user_id: string;
  event_id: string;
  reminder_time: string;
  is_notified: boolean;
  created_at: string;
}

export const usePanchangEvents = (month?: Date) => {
  const targetMonth = month || new Date();
  
  return useQuery({
    queryKey: ['panchang-events', format(targetMonth, 'yyyy-MM')],
    queryFn: async () => {
      const start = format(startOfMonth(targetMonth), 'yyyy-MM-dd');
      const end = format(endOfMonth(addMonths(targetMonth, 1)), 'yyyy-MM-dd');

      const { data, error } = await supabase
        .from('panchang_events')
        .select('*')
        .gte('event_date', start)
        .lte('event_date', end)
        .order('event_date', { ascending: true });

      if (error) throw error;
      return data as PanchangEvent[];
    },
  });
};

export const useUpcomingEvents = (limit = 5) => {
  return useQuery({
    queryKey: ['upcoming-panchang-events', limit],
    queryFn: async () => {
      const today = format(new Date(), 'yyyy-MM-dd');

      const { data, error } = await supabase
        .from('panchang_events')
        .select('*')
        .gte('event_date', today)
        .order('event_date', { ascending: true })
        .limit(limit);

      if (error) throw error;
      return data as PanchangEvent[];
    },
  });
};

export const useUserReminders = () => {
  return useQuery({
    queryKey: ['user-event-reminders'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('user_event_reminders')
        .select('*')
        .order('reminder_time', { ascending: true });

      if (error) throw error;
      return data as UserEventReminder[];
    },
  });
};

export const useCreateReminder = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ eventId, reminderTime }: { eventId: string; reminderTime: Date }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('user_event_reminders')
        .insert({
          user_id: user.id,
          event_id: eventId,
          reminder_time: reminderTime.toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-event-reminders'] });
      toast({
        title: 'Reminder Set',
        description: 'You will be notified before this event.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteReminder = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('user_event_reminders')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-event-reminders'] });
      toast({
        title: 'Reminder Removed',
        description: 'The reminder has been cancelled.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

// Event type colors and icons
export const EVENT_TYPE_CONFIG = {
  ekadashi: {
    label: 'Ekadashi',
    color: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    icon: '🌙',
  },
  festival: {
    label: 'Festival',
    color: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    icon: '🪔',
  },
  auspicious: {
    label: 'Auspicious',
    color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    icon: '✨',
  },
  tithi: {
    label: 'Tithi',
    color: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    icon: '📅',
  },
};
