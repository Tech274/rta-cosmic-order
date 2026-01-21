import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export interface Achievement {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  requirement_type: string;
  requirement_value: number;
  karma_reward: number;
  rarity: string;
  created_at: string;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  earned_at: string;
  achievement?: Achievement;
}

export const RARITY_COLORS: Record<string, string> = {
  common: "bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600",
  uncommon: "bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700",
  rare: "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700",
  epic: "bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700",
  legendary: "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-amber-400 dark:from-amber-900/40 dark:to-yellow-900/40 dark:text-amber-300 dark:border-amber-600",
};

export const CATEGORY_LABELS: Record<string, string> = {
  streaks: "Practice Streaks",
  karma: "Karma Milestones",
  reading: "Scripture Study",
  sadhana: "Spiritual Practice",
  sankalpa: "Intentions",
  community: "Community",
  general: "General",
};

export const useAllAchievements = () => {
  return useQuery({
    queryKey: ["achievements", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("achievements")
        .select("*")
        .order("category")
        .order("requirement_value");

      if (error) throw error;
      return data as Achievement[];
    },
  });
};

export const useUserAchievements = (userId?: string) => {
  const { user } = useAuth();
  const targetUserId = userId || user?.id;

  return useQuery({
    queryKey: ["achievements", "user", targetUserId],
    queryFn: async () => {
      if (!targetUserId) return [];

      const { data, error } = await supabase
        .from("user_achievements")
        .select(`
          *,
          achievement:achievements(*)
        `)
        .eq("user_id", targetUserId)
        .order("earned_at", { ascending: false });

      if (error) throw error;
      return data as (UserAchievement & { achievement: Achievement })[];
    },
    enabled: !!targetUserId,
  });
};

export const useCheckAchievements = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .rpc("check_and_award_achievements", { p_user_id: user.id });

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      if (data && data.length > 0) {
        // Refetch achievements
        queryClient.invalidateQueries({ queryKey: ["achievements"] });
        queryClient.invalidateQueries({ queryKey: ["profile"] });

        // Show toast for new achievements
        data.forEach(async (ua: { achievement_id: string }) => {
          const { data: achievement } = await supabase
            .from("achievements")
            .select("name, rarity")
            .eq("id", ua.achievement_id)
            .single();

          if (achievement) {
            toast({
              title: "🏆 Achievement Unlocked!",
              description: `You earned: ${achievement.name}`,
            });
          }
        });
      }
    },
  });
};

export const useAchievementProgress = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["achievements", "progress", user?.id],
    queryFn: async () => {
      if (!user) return null;

      // Get all stats in parallel
      const [
        profileRes,
        chaptersRes,
        meditationsRes,
        japaRes,
        sankalpasRes,
        discussionsRes,
        repliesRes,
        streakRes,
      ] = await Promise.all([
        supabase.from("profiles").select("karma").eq("user_id", user.id).single(),
        supabase.from("scripture_reading_progress").select("id").eq("user_id", user.id).eq("completed", true),
        supabase.from("sadhana_sessions").select("id").eq("user_id", user.id).eq("session_type", "meditation"),
        supabase.from("sadhana_sessions").select("count").eq("user_id", user.id).eq("session_type", "japa"),
        supabase.from("sankalpas").select("id").eq("user_id", user.id).eq("is_completed", true),
        supabase.from("discussions").select("id").eq("user_id", user.id),
        supabase.from("discussion_replies").select("id").eq("user_id", user.id),
        supabase.from("daily_practice_logs").select("practice_date").eq("user_id", user.id).order("practice_date", { ascending: false }),
      ]);

      // Calculate streak
      let streak = 0;
      if (streakRes.data) {
        const dates = [...new Set(streakRes.data.map(d => d.practice_date))].sort((a, b) => 
          new Date(b).getTime() - new Date(a).getTime()
        );
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        for (let i = 0; i < dates.length; i++) {
          const date = new Date(dates[i]);
          date.setHours(0, 0, 0, 0);
          
          const expectedDate = new Date(today);
          expectedDate.setDate(today.getDate() - i);
          
          if (date.getTime() === expectedDate.getTime()) {
            streak++;
          } else if (i === 0 && date.getTime() === expectedDate.getTime() - 86400000) {
            streak++;
          } else {
            break;
          }
        }
      }

      // Calculate total japa
      const totalJapa = japaRes.data?.reduce((sum, s) => sum + (s.count || 0), 0) || 0;

      return {
        karma_total: profileRes.data?.karma || 0,
        streak_days: streak,
        chapters_completed: chaptersRes.data?.length || 0,
        meditation_sessions: meditationsRes.data?.length || 0,
        japa_total: totalJapa,
        sankalpas_completed: sankalpasRes.data?.length || 0,
        discussions_created: discussionsRes.data?.length || 0,
        replies_posted: repliesRes.data?.length || 0,
      };
    },
    enabled: !!user,
  });
};
