import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Sankalpa {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  category: string;
  target_date: string | null;
  is_completed: boolean;
  completed_at: string | null;
  progress: number;
  created_at: string;
  updated_at: string;
}

export type SankalpaInsert = Omit<Sankalpa, 'id' | 'created_at' | 'updated_at' | 'completed_at'>;

const SANKALPA_CATEGORIES = [
  { value: 'japa', label: 'Japa & Mantra' },
  { value: 'meditation', label: 'Meditation' },
  { value: 'scripture', label: 'Scripture Study' },
  { value: 'seva', label: 'Seva (Service)' },
  { value: 'diet', label: 'Sattvic Diet' },
  { value: 'lifestyle', label: 'Lifestyle' },
  { value: 'pilgrimage', label: 'Pilgrimage' },
  { value: 'general', label: 'General' },
];

export const useSankalpas = () => {
  return useQuery({
    queryKey: ['sankalpas'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('sankalpas')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Sankalpa[];
    },
  });
};

export const useCreateSankalpa = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (sankalpa: Omit<SankalpaInsert, 'user_id'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('sankalpas')
        .insert({
          ...sankalpa,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sankalpas'] });
      toast({
        title: 'Sankalpa Created',
        description: 'Your spiritual intention has been set. May you achieve it!',
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

export const useUpdateSankalpa = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Sankalpa> & { id: string }) => {
      const { data, error } = await supabase
        .from('sankalpas')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['sankalpas'] });
      if (data.is_completed) {
        toast({
          title: '🎉 Sankalpa Completed!',
          description: 'Congratulations on fulfilling your spiritual intention!',
        });
      }
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

export const useDeleteSankalpa = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('sankalpas')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sankalpas'] });
      toast({
        title: 'Sankalpa Removed',
        description: 'Your sankalpa has been removed.',
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

export { SANKALPA_CATEGORIES };
