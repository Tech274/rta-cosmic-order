import { createContext, useContext, useState, useRef, useCallback, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Chapter {
  number: number;
  title: string;
  startTime: number;
  duration: number;
}

interface Audiobook {
  id: string;
  title: string;
  sanskrit_title: string | null;
  author: string;
  narrator: string | null;
  description: string | null;
  cover_image: string | null;
  audio_url: string | null;
  duration_seconds: number | null;
  chapters: Chapter[] | null;
  category: string;
}

interface AudioPlayerState {
  audiobook: Audiobook | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
  currentChapter: number;
  showFullPlayer: boolean;
}

interface AudioPlayerContextType extends AudioPlayerState {
  audioRef: React.RefObject<HTMLAudioElement>;
  play: (audiobook: Audiobook, initialProgress?: { current_chapter: number; current_position_seconds: number }) => void;
  pause: () => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  skip: (seconds: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setPlaybackRate: (rate: number) => void;
  goToChapter: (chapter: Chapter) => void;
  closePlayer: () => void;
  openFullPlayer: () => void;
  closeFullPlayer: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | null>(null);

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error("useAudioPlayer must be used within an AudioPlayerProvider");
  }
  return context;
};

export const AudioPlayerProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const [state, setState] = useState<AudioPlayerState>({
    audiobook: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    playbackRate: 1,
    currentChapter: 1,
    showFullPlayer: false,
  });

  // Save progress periodically
  useEffect(() => {
    if (!user || !state.audiobook || !state.isPlaying) return;

    const saveProgress = async () => {
      try {
        await supabase
          .from('audiobook_progress')
          .upsert({
            user_id: user.id,
            audiobook_id: state.audiobook!.id,
            current_chapter: state.currentChapter,
            current_position_seconds: Math.floor(state.currentTime),
            last_played_at: new Date().toISOString(),
            is_completed: state.currentTime >= state.duration - 10
          }, {
            onConflict: 'user_id,audiobook_id'
          });
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    };

    const interval = setInterval(saveProgress, 30000);
    return () => clearInterval(interval);
  }, [user, state.audiobook, state.isPlaying, state.currentChapter, state.currentTime, state.duration]);

  const play = useCallback((audiobook: Audiobook, initialProgress?: { current_chapter: number; current_position_seconds: number }) => {
    setState(prev => ({
      ...prev,
      audiobook,
      currentTime: initialProgress?.current_position_seconds || 0,
      currentChapter: initialProgress?.current_chapter || 1,
      showFullPlayer: true,
    }));
    
    // Wait for audio to load then play
    setTimeout(() => {
      if (audioRef.current) {
        if (initialProgress) {
          audioRef.current.currentTime = initialProgress.current_position_seconds;
        }
        audioRef.current.play().catch(console.error);
        setState(prev => ({ ...prev, isPlaying: true }));
      }
    }, 100);
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  const togglePlay = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      audioRef.current?.play().catch(console.error);
      setState(prev => ({ ...prev, isPlaying: true }));
    }
  }, [state.isPlaying, pause]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setState(prev => ({ ...prev, currentTime: time }));
    }
  }, []);

  const skip = useCallback((seconds: number) => {
    if (audioRef.current) {
      const newTime = Math.max(0, Math.min(state.duration, state.currentTime + seconds));
      audioRef.current.currentTime = newTime;
      setState(prev => ({ ...prev, currentTime: newTime }));
    }
  }, [state.currentTime, state.duration]);

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    setState(prev => ({ ...prev, volume, isMuted: volume === 0 }));
  }, []);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !state.isMuted;
    }
    setState(prev => ({ ...prev, isMuted: !prev.isMuted }));
  }, [state.isMuted]);

  const setPlaybackRate = useCallback((rate: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
    setState(prev => ({ ...prev, playbackRate: rate }));
  }, []);

  const goToChapter = useCallback((chapter: Chapter) => {
    if (audioRef.current) {
      audioRef.current.currentTime = chapter.startTime;
      setState(prev => ({ ...prev, currentChapter: chapter.number, currentTime: chapter.startTime }));
      if (!state.isPlaying) {
        audioRef.current.play().catch(console.error);
        setState(prev => ({ ...prev, isPlaying: true }));
      }
    }
  }, [state.isPlaying]);

  const closePlayer = useCallback(() => {
    pause();
    setState({
      audiobook: null,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      volume: 1,
      isMuted: false,
      playbackRate: 1,
      currentChapter: 1,
      showFullPlayer: false,
    });
  }, [pause]);

  const openFullPlayer = useCallback(() => {
    setState(prev => ({ ...prev, showFullPlayer: true }));
  }, []);

  const closeFullPlayer = useCallback(() => {
    setState(prev => ({ ...prev, showFullPlayer: false }));
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      setState(prev => {
        const chapters = prev.audiobook?.chapters || [];
        const chapter = chapters.find((ch, index) => {
          const nextChapter = chapters[index + 1];
          return currentTime >= ch.startTime && 
            (!nextChapter || currentTime < nextChapter.startTime);
        });
        
        return {
          ...prev,
          currentTime,
          currentChapter: chapter?.number || prev.currentChapter,
        };
      });
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setState(prev => ({ ...prev, duration: audioRef.current!.duration }));
    }
  }, []);

  const handleEnded = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  return (
    <AudioPlayerContext.Provider
      value={{
        ...state,
        audioRef,
        play,
        pause,
        togglePlay,
        seek,
        skip,
        setVolume,
        toggleMute,
        setPlaybackRate,
        goToChapter,
        closePlayer,
        openFullPlayer,
        closeFullPlayer,
      }}
    >
      {children}
      
      {/* Global Audio Element */}
      {state.audiobook?.audio_url && (
        <audio
          ref={audioRef}
          src={state.audiobook.audio_url}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />
      )}
    </AudioPlayerContext.Provider>
  );
};
