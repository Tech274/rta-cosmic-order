import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export type SessionType = "japa" | "meditation" | "puja" | "reading";

export interface SadhanaSession {
  id: string;
  user_id: string;
  session_type: SessionType;
  duration_seconds: number;
  count: number | null;
  mantra: string | null;
  notes: string | null;
  completed_at: string;
  created_at: string;
}

export interface DailyPracticeLog {
  id: string;
  user_id: string;
  practice_date: string;
  practices_completed: string[];
  total_duration_seconds: number;
  created_at: string;
  updated_at: string;
}

export const useSadhanaSessions = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["sadhana-sessions", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("sadhana_sessions")
        .select("*")
        .eq("user_id", user.id)
        .order("completed_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      return data as SadhanaSession[];
    },
    enabled: !!user,
  });
};

export const useTodaysPractice = () => {
  const { user } = useAuth();
  const today = new Date().toISOString().split("T")[0];

  return useQuery({
    queryKey: ["daily-practice", user?.id, today],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("daily_practice_logs")
        .select("*")
        .eq("user_id", user.id)
        .eq("practice_date", today)
        .maybeSingle();

      if (error) throw error;
      return data as DailyPracticeLog | null;
    },
    enabled: !!user,
  });
};

export const usePracticeStreak = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["practice-streak", user?.id],
    queryFn: async () => {
      if (!user) return 0;
      
      const { data, error } = await supabase
        .from("daily_practice_logs")
        .select("practice_date")
        .eq("user_id", user.id)
        .order("practice_date", { ascending: false })
        .limit(365);

      if (error) throw error;
      if (!data || data.length === 0) return 0;

      // Calculate streak
      let streak = 0;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (let i = 0; i < data.length; i++) {
        const practiceDate = new Date(data[i].practice_date);
        practiceDate.setHours(0, 0, 0, 0);
        
        const expectedDate = new Date(today);
        expectedDate.setDate(today.getDate() - i);
        
        if (practiceDate.getTime() === expectedDate.getTime()) {
          streak++;
        } else if (i === 0 && practiceDate.getTime() === expectedDate.getTime() - 86400000) {
          // Allow for yesterday if today hasn't been logged yet
          continue;
        } else {
          break;
        }
      }

      return streak;
    },
    enabled: !!user,
  });
};

export const useCreateSession = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (session: {
      session_type: SessionType;
      duration_seconds: number;
      count?: number;
      mantra?: string;
      notes?: string;
    }) => {
      if (!user) throw new Error("Must be logged in");

      const { data, error } = await supabase
        .from("sadhana_sessions")
        .insert({
          user_id: user.id,
          session_type: session.session_type,
          duration_seconds: session.duration_seconds,
          count: session.count || null,
          mantra: session.mantra || null,
          notes: session.notes || null,
        })
        .select()
        .single();

      if (error) throw error;

      // Update daily practice log
      const today = new Date().toISOString().split("T")[0];
      const { data: existingLog } = await supabase
        .from("daily_practice_logs")
        .select("*")
        .eq("user_id", user.id)
        .eq("practice_date", today)
        .maybeSingle();

      if (existingLog) {
        const updatedPractices = existingLog.practices_completed.includes(session.session_type)
          ? existingLog.practices_completed
          : [...existingLog.practices_completed, session.session_type];

        await supabase
          .from("daily_practice_logs")
          .update({
            practices_completed: updatedPractices,
            total_duration_seconds: existingLog.total_duration_seconds + session.duration_seconds,
          })
          .eq("id", existingLog.id);
      } else {
        await supabase.from("daily_practice_logs").insert({
          user_id: user.id,
          practice_date: today,
          practices_completed: [session.session_type],
          total_duration_seconds: session.duration_seconds,
        });
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sadhana-sessions"] });
      queryClient.invalidateQueries({ queryKey: ["daily-practice"] });
      queryClient.invalidateQueries({ queryKey: ["practice-streak"] });
      toast({
        title: "Practice logged",
        description: "Your sadhana has been recorded. Keep up the devotion!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
