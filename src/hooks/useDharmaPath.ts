import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

interface ReadingProgress {
  scripture_id: string;
  chapter_number: number;
  completed: boolean;
  last_read_at: string;
}

interface DharmaPathData {
  ishta_devata: string | null;
  spiritual_goals: string[];
  bio: string | null;
  readingProgress: ReadingProgress[];
  totalPracticeMinutes: number;
  totalMantras: number;
  currentStreak: number;
  longestStreak: number;
}

export const useDharmaPath = () => {
  const { user, profile } = useAuth();
  const [dharmaPath, setDharmaPath] = useState<DharmaPathData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDharmaPath = useCallback(async () => {
    if (!user) {
      setDharmaPath(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      // Fetch profile with spiritual fields
      const { data: profileData } = await supabase
        .from("profiles")
        .select("ishta_devata, spiritual_goals, bio")
        .eq("user_id", user.id)
        .single();

      // Fetch reading progress
      const { data: readingData } = await supabase
        .from("scripture_reading_progress")
        .select("scripture_id, chapter_number, completed, last_read_at")
        .eq("user_id", user.id);

      // Fetch sadhana stats
      const { data: sadhanaData } = await supabase
        .from("sadhana_sessions")
        .select("duration_seconds, count, completed_at, session_type")
        .eq("user_id", user.id)
        .order("completed_at", { ascending: false });

      // Fetch daily practice logs for streak calculation
      const { data: practiceLogsData } = await supabase
        .from("daily_practice_logs")
        .select("practice_date")
        .eq("user_id", user.id)
        .order("practice_date", { ascending: false });

      // Calculate totals
      const totalPracticeMinutes = sadhanaData?.reduce(
        (acc, s) => acc + Math.round(s.duration_seconds / 60),
        0
      ) || 0;

      const totalMantras = sadhanaData
        ?.filter(s => s.session_type === "japa")
        .reduce((acc, s) => acc + (s.count || 0), 0) || 0;

      // Calculate streaks
      const { currentStreak, longestStreak } = calculateStreaks(
        practiceLogsData?.map(p => p.practice_date) || []
      );

      setDharmaPath({
        ishta_devata: profileData?.ishta_devata || null,
        spiritual_goals: profileData?.spiritual_goals || [],
        bio: profileData?.bio || null,
        readingProgress: readingData || [],
        totalPracticeMinutes,
        totalMantras,
        currentStreak,
        longestStreak,
      });
    } catch (error) {
      console.error("Error fetching dharma path:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchDharmaPath();
  }, [fetchDharmaPath]);

  const updateSpiritualProfile = async (data: {
    ishta_devata?: string;
    spiritual_goals?: string[];
    bio?: string;
  }) => {
    if (!user) return { error: new Error("Not authenticated") };

    const { error } = await supabase
      .from("profiles")
      .update(data)
      .eq("user_id", user.id);

    if (!error) {
      await fetchDharmaPath();
    }

    return { error };
  };

  const markChapterRead = async (scriptureId: string, chapterNumber: number) => {
    if (!user) return { error: new Error("Not authenticated") };

    const { error } = await supabase
      .from("scripture_reading_progress")
      .upsert({
        user_id: user.id,
        scripture_id: scriptureId,
        chapter_number: chapterNumber,
        completed: true,
        last_read_at: new Date().toISOString(),
      }, {
        onConflict: "user_id,scripture_id,chapter_number"
      });

    if (!error) {
      await fetchDharmaPath();
    }

    return { error };
  };

  return {
    dharmaPath,
    loading,
    updateSpiritualProfile,
    markChapterRead,
    refetch: fetchDharmaPath,
  };
};

function calculateStreaks(dates: string[]): { currentStreak: number; longestStreak: number } {
  if (dates.length === 0) return { currentStreak: 0, longestStreak: 0 };

  const sortedDates = [...dates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 1;

  // Check if practiced today or yesterday for current streak
  const lastPractice = new Date(sortedDates[0]);
  lastPractice.setHours(0, 0, 0, 0);
  const daysSinceLastPractice = Math.floor(
    (today.getTime() - lastPractice.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysSinceLastPractice <= 1) {
    currentStreak = 1;
    for (let i = 1; i < sortedDates.length; i++) {
      const current = new Date(sortedDates[i]);
      const prev = new Date(sortedDates[i - 1]);
      current.setHours(0, 0, 0, 0);
      prev.setHours(0, 0, 0, 0);

      const diff = Math.floor((prev.getTime() - current.getTime()) / (1000 * 60 * 60 * 24));
      if (diff === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  // Calculate longest streak
  for (let i = 1; i < sortedDates.length; i++) {
    const current = new Date(sortedDates[i]);
    const prev = new Date(sortedDates[i - 1]);
    current.setHours(0, 0, 0, 0);
    prev.setHours(0, 0, 0, 0);

    const diff = Math.floor((prev.getTime() - current.getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 1) {
      tempStreak++;
    } else {
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 1;
    }
  }
  longestStreak = Math.max(longestStreak, tempStreak, currentStreak);

  return { currentStreak, longestStreak };
}
