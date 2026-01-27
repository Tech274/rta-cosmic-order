import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface AudiobookProgress {
  current_chapter: number;
  current_position_seconds: number;
  is_completed: boolean;
  last_played_at: string;
}

export const useAudiobookProgress = (audiobookId: string | null) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<AudiobookProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !audiobookId) {
      setProgress(null);
      setLoading(false);
      return;
    }

    const fetchProgress = async () => {
      try {
        const { data, error } = await supabase
          .from('audiobook_progress')
          .select('current_chapter, current_position_seconds, is_completed, last_played_at')
          .eq('user_id', user.id)
          .eq('audiobook_id', audiobookId)
          .single();

        if (error && error.code !== 'PGRST116') {
          throw error;
        }

        setProgress(data || null);
      } catch (error) {
        console.error('Error fetching audiobook progress:', error);
        setProgress(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [user, audiobookId]);

  const saveProgress = async (
    chapter: number, 
    positionSeconds: number, 
    completed: boolean = false
  ) => {
    if (!user || !audiobookId) return;

    try {
      const { error } = await supabase
        .from('audiobook_progress')
        .upsert({
          user_id: user.id,
          audiobook_id: audiobookId,
          current_chapter: chapter,
          current_position_seconds: Math.floor(positionSeconds),
          is_completed: completed,
          last_played_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,audiobook_id'
        });

      if (error) throw error;

      setProgress({
        current_chapter: chapter,
        current_position_seconds: positionSeconds,
        is_completed: completed,
        last_played_at: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error saving audiobook progress:', error);
    }
  };

  const markCompleted = async () => {
    if (!user || !audiobookId) return;

    try {
      const { error } = await supabase
        .from('audiobook_progress')
        .update({ is_completed: true })
        .eq('user_id', user.id)
        .eq('audiobook_id', audiobookId);

      if (error) throw error;

      setProgress(prev => prev ? { ...prev, is_completed: true } : null);
    } catch (error) {
      console.error('Error marking audiobook as completed:', error);
    }
  };

  return {
    progress,
    loading,
    saveProgress,
    markCompleted
  };
};

export default useAudiobookProgress;
