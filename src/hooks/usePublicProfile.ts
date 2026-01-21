import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PublicProfile {
  id: string;
  user_id: string;
  display_name: string | null;
  bio: string | null;
  ishta_devata: string | null;
  karma: number;
  membership_level: string;
  joined_at: string;
  spiritual_goals: string[] | null;
}

export interface ProfileStats {
  chaptersRead: number;
  totalMeditations: number;
  totalJapa: number;
  sankalpasCompleted: number;
  discussionsStarted: number;
  repliesPosted: number;
  currentStreak: number;
}

export interface RecentActivity {
  type: "discussion" | "reply" | "achievement" | "sankalpa";
  title: string;
  date: string;
  id: string;
}

export const usePublicProfile = (userId: string) => {
  return useQuery({
    queryKey: ["profile", "public", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) throw error;
      return data as PublicProfile;
    },
    enabled: !!userId,
  });
};

export const useProfileStats = (userId: string) => {
  return useQuery({
    queryKey: ["profile", "stats", userId],
    queryFn: async () => {
      const [
        chaptersRes,
        meditationsRes,
        japaRes,
        sankalpasRes,
        discussionsRes,
        repliesRes,
        streakRes,
      ] = await Promise.all([
        supabase.from("scripture_reading_progress").select("id").eq("user_id", userId).eq("completed", true),
        supabase.from("sadhana_sessions").select("id").eq("user_id", userId).eq("session_type", "meditation"),
        supabase.from("sadhana_sessions").select("count").eq("user_id", userId).eq("session_type", "japa"),
        supabase.from("sankalpas").select("id").eq("user_id", userId).eq("is_completed", true),
        supabase.from("discussions").select("id").eq("user_id", userId),
        supabase.from("discussion_replies").select("id").eq("user_id", userId),
        supabase.from("daily_practice_logs").select("practice_date").eq("user_id", userId).order("practice_date", { ascending: false }),
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

      const totalJapa = japaRes.data?.reduce((sum, s) => sum + (s.count || 0), 0) || 0;

      return {
        chaptersRead: chaptersRes.data?.length || 0,
        totalMeditations: meditationsRes.data?.length || 0,
        totalJapa,
        sankalpasCompleted: sankalpasRes.data?.length || 0,
        discussionsStarted: discussionsRes.data?.length || 0,
        repliesPosted: repliesRes.data?.length || 0,
        currentStreak: streak,
      } as ProfileStats;
    },
    enabled: !!userId,
  });
};

export const useRecentActivity = (userId: string) => {
  return useQuery({
    queryKey: ["profile", "activity", userId],
    queryFn: async () => {
      const activities: RecentActivity[] = [];

      // Get recent discussions
      const { data: discussions } = await supabase
        .from("discussions")
        .select("id, title, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(5);

      discussions?.forEach(d => {
        activities.push({
          type: "discussion",
          title: d.title,
          date: d.created_at,
          id: d.id,
        });
      });

      // Get recent achievements
      const { data: achievements } = await supabase
        .from("user_achievements")
        .select(`
          id,
          earned_at,
          achievement:achievements(name)
        `)
        .eq("user_id", userId)
        .order("earned_at", { ascending: false })
        .limit(5);

      achievements?.forEach(a => {
        const achievement = a.achievement as { name: string } | null;
        activities.push({
          type: "achievement",
          title: `Earned: ${achievement?.name || "Unknown Achievement"}`,
          date: a.earned_at,
          id: a.id,
        });
      });

      // Sort by date and take top 10
      return activities
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10);
    },
    enabled: !!userId,
  });
};
