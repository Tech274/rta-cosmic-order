import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, X, ChevronUp, SkipBack, SkipForward, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useAudioPlayer } from "@/contexts/AudioPlayerContext";

const MiniPlayer = () => {
  const {
    audiobook,
    isPlaying,
    currentTime,
    duration,
    currentChapter,
    showFullPlayer,
    togglePlay,
    seek,
    skip,
    closePlayer,
    openFullPlayer,
  } = useAudioPlayer();

  // Don't show if no audiobook or if full player is open
  if (!audiobook || showFullPlayer) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentChapterName = () => {
    const chapter = audiobook.chapters?.find(ch => ch.number === currentChapter);
    return chapter?.title || 'Playing';
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-lg"
      >
        {/* Progress bar at top */}
        <div className="h-1 bg-muted">
          <div 
            className="h-full bg-primary transition-all duration-150"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center gap-3 p-3 max-w-7xl mx-auto">
          {/* Album Art */}
          <button 
            onClick={openFullPlayer}
            className="w-12 h-12 bg-muted rounded flex-shrink-0 overflow-hidden hover:opacity-80 transition-opacity"
          >
            {audiobook.cover_image ? (
              <img 
                src={audiobook.cover_image} 
                alt={audiobook.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Headphones className="w-5 h-5 text-muted-foreground" />
              </div>
            )}
          </button>

          {/* Info */}
          <button 
            onClick={openFullPlayer}
            className="flex-1 min-w-0 text-left hover:opacity-80 transition-opacity"
          >
            <p className="text-sm font-medium text-foreground truncate">{audiobook.title}</p>
            <p className="text-xs text-muted-foreground truncate">{getCurrentChapterName()}</p>
          </button>

          {/* Time */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden sm:flex w-8 h-8"
              onClick={() => skip(-15)}
            >
              <SkipBack className="w-4 h-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="w-10 h-10"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden sm:flex w-8 h-8"
              onClick={() => skip(15)}
            >
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>

          {/* Expand Button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="w-8 h-8"
            onClick={openFullPlayer}
          >
            <ChevronUp className="w-4 h-4" />
          </Button>

          {/* Close Button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="w-8 h-8 text-muted-foreground hover:text-foreground"
            onClick={closePlayer}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MiniPlayer;
