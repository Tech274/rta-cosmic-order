import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Rewind,
  FastForward,
  Headphones,
  List
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useAudioPlayer } from "@/contexts/AudioPlayerContext";
import SleepTimer from "./SleepTimer";
import BookmarksPanel from "./BookmarksPanel";

const FullPlayer = () => {
  const {
    audiobook,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    playbackRate,
    currentChapter,
    showFullPlayer,
    togglePlay,
    seek,
    skip,
    setVolume,
    toggleMute,
    setPlaybackRate,
    goToChapter,
    closeFullPlayer,
    pause,
  } = useAudioPlayer();

  const [showChapters, setShowChapters] = useState(false);

  const chapters = audiobook?.chapters || [];

  // Keyboard controls
  useEffect(() => {
    if (!showFullPlayer) return;

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
          closeFullPlayer();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showFullPlayer, togglePlay, skip, closeFullPlayer]);

  const handleSeek = (value: number[]) => {
    seek(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const changePlaybackRate = () => {
    const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    setPlaybackRate(nextRate);
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

  if (!audiobook || !showFullPlayer) return null;

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
          <div className="flex items-center gap-2">
            <SleepTimer onSleepTrigger={pause} />
            {audiobook && (
              <BookmarksPanel 
                audiobookId={audiobook.id}
                currentTime={currentTime}
                currentChapter={currentChapter}
                onSeek={seek}
              />
            )}
          </div>
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
              max={duration || 100}
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

export default FullPlayer;
