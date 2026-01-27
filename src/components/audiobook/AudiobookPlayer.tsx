import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  ChevronDown,
  ChevronUp,
  Rewind,
  FastForward,
  Headphones,
  List
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
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

interface AudiobookPlayerProps {
  audiobook: Audiobook;
  onClose: () => void;
  initialProgress?: {
    current_chapter: number;
    current_position_seconds: number;
  };
}

const AudiobookPlayer = ({ audiobook, onClose, initialProgress }: AudiobookPlayerProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(initialProgress?.current_position_seconds || 0);
  const [duration, setDuration] = useState(audiobook.duration_seconds || 0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showChapters, setShowChapters] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(initialProgress?.current_chapter || 1);

  const chapters = audiobook.chapters || [];

  // Save progress periodically
  useEffect(() => {
    if (!user) return;

    const saveProgress = async () => {
      try {
        const { error } = await supabase
          .from('audiobook_progress')
          .upsert({
            user_id: user.id,
            audiobook_id: audiobook.id,
            current_chapter: currentChapter,
            current_position_seconds: Math.floor(currentTime),
            last_played_at: new Date().toISOString(),
            is_completed: currentTime >= duration - 10
          }, {
            onConflict: 'user_id,audiobook_id'
          });

        if (error) throw error;
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    };

    const interval = setInterval(saveProgress, 30000); // Save every 30 seconds
    return () => clearInterval(interval);
  }, [user, audiobook.id, currentChapter, currentTime, duration]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          skip(-15);
          break;
        case 'ArrowRight':
          skip(15);
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skip = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, Math.min(duration, currentTime + seconds));
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      
      // Update current chapter based on time
      const chapter = chapters.find((ch, index) => {
        const nextChapter = chapters[index + 1];
        return currentTime >= ch.startTime && 
          (!nextChapter || currentTime < nextChapter.startTime);
      });
      if (chapter && chapter.number !== currentChapter) {
        setCurrentChapter(chapter.number);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      if (initialProgress) {
        audioRef.current.currentTime = initialProgress.current_position_seconds;
      }
    }
  };

  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const changePlaybackRate = () => {
    const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
  };

  const goToChapter = (chapter: Chapter) => {
    if (audioRef.current) {
      audioRef.current.currentTime = chapter.startTime;
      setCurrentChapter(chapter.number);
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
    setShowChapters(false);
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentChapterName = () => {
    const chapter = chapters.find(ch => ch.number === currentChapter);
    return chapter?.title || 'Playing';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md"
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
          <h2 className="font-display text-lg text-foreground">Now Playing</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowChapters(!showChapters)}
          >
            <List className="w-5 h-5" />
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Album Art & Info */}
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-64 h-64 md:w-80 md:h-80 bg-muted rounded-lg shadow-2xl overflow-hidden mb-8"
            >
              {audiobook.cover_image ? (
                <img 
                  src={audiobook.cover_image} 
                  alt={audiobook.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Headphones className="w-24 h-24 text-muted-foreground" />
                </div>
              )}
            </motion.div>

            <h1 className="font-display text-2xl md:text-3xl text-foreground text-center">
              {audiobook.title}
            </h1>
            {audiobook.sanskrit_title && (
              <p className="font-sanskrit text-lg text-primary/70 mt-1">{audiobook.sanskrit_title}</p>
            )}
            <p className="text-muted-foreground mt-2">{audiobook.author}</p>
            {audiobook.narrator && (
              <p className="text-sm text-muted-foreground">Narrated by {audiobook.narrator}</p>
            )}
            <p className="text-sm text-primary mt-2">{getCurrentChapterName()}</p>
          </div>

          {/* Chapter List (Sidebar on larger screens) */}
          <AnimatePresence>
            {showChapters && chapters.length > 0 && (
              <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                className="w-full lg:w-80 border-l border-border bg-card overflow-y-auto"
              >
                <div className="p-4 border-b border-border">
                  <h3 className="font-display text-lg">Chapters</h3>
                </div>
                <div className="divide-y divide-border">
                  {chapters.map((chapter) => (
                    <button
                      key={chapter.number}
                      onClick={() => goToChapter(chapter)}
                      className={`w-full p-4 text-left hover:bg-muted/50 transition-colors ${
                        chapter.number === currentChapter ? 'bg-primary/10' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${
                          chapter.number === currentChapter ? 'text-primary' : 'text-foreground'
                        }`}>
                          {chapter.number}. {chapter.title}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {formatTime(chapter.duration)}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Player Controls */}
        <div className="border-t border-border p-6 bg-card">
          {/* Progress Bar */}
          <div className="mb-4">
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              onValueChange={handleSeek}
              className="cursor-pointer"
            />
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            {/* Playback Speed */}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={changePlaybackRate}
              className="text-xs min-w-[60px]"
            >
              {playbackRate}x
            </Button>

            {/* Skip Back */}
            <Button variant="ghost" size="icon" onClick={() => skip(-15)}>
              <Rewind className="w-5 h-5" />
            </Button>

            {/* Previous Chapter */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => {
                const prevChapter = chapters.find(ch => ch.number === currentChapter - 1);
                if (prevChapter) goToChapter(prevChapter);
              }}
              disabled={currentChapter <= 1}
            >
              <SkipBack className="w-5 h-5" />
            </Button>

            {/* Play/Pause */}
            <Button 
              size="lg"
              className="w-16 h-16 rounded-full"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </Button>

            {/* Next Chapter */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => {
                const nextChapter = chapters.find(ch => ch.number === currentChapter + 1);
                if (nextChapter) goToChapter(nextChapter);
              }}
              disabled={currentChapter >= chapters.length}
            >
              <SkipForward className="w-5 h-5" />
            </Button>

            {/* Skip Forward */}
            <Button variant="ghost" size="icon" onClick={() => skip(15)}>
              <FastForward className="w-5 h-5" />
            </Button>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleMute}>
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume]}
                max={1}
                step={0.1}
                onValueChange={handleVolumeChange}
                className="w-24"
              />
            </div>
          </div>
        </div>

        {/* Hidden Audio Element */}
        {audiobook.audio_url && (
          <audio
            ref={audioRef}
            src={audiobook.audio_url}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
          />
        )}

        {/* Demo message if no audio */}
        {!audiobook.audio_url && (
          <div className="absolute bottom-32 left-0 right-0 text-center">
            <p className="text-sm text-muted-foreground bg-muted py-2 px-4 rounded inline-block">
              Demo mode: No audio file configured
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AudiobookPlayer;
