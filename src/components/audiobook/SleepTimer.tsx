import { useState, useEffect } from "react";
import { Timer, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAudioPlayer } from "@/contexts/AudioPlayerContext";

const sleepOptions = [
  { label: "5 min", minutes: 5 },
  { label: "10 min", minutes: 10 },
  { label: "15 min", minutes: 15 },
  { label: "30 min", minutes: 30 },
  { label: "45 min", minutes: 45 },
  { label: "1 hour", minutes: 60 },
  { label: "End of chapter", minutes: -1 },
];

interface SleepTimerProps {
  onSleepTrigger: () => void;
}

const SleepTimer = ({ onSleepTrigger }: SleepTimerProps) => {
  const { isPlaying, currentChapter } = useAudioPlayer();
  const [sleepTime, setSleepTime] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const [endOfChapter, setEndOfChapter] = useState(false);
  const [startChapter, setStartChapter] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (sleepTime === null || !isPlaying) return;

    const interval = setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          onSleepTrigger();
          setSleepTime(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [sleepTime, isPlaying, onSleepTrigger]);

  // End of chapter detection
  useEffect(() => {
    if (!endOfChapter || !isPlaying) return;

    if (startChapter !== null && currentChapter > startChapter) {
      onSleepTrigger();
      setEndOfChapter(false);
      setStartChapter(null);
      setSleepTime(null);
    }
  }, [currentChapter, endOfChapter, startChapter, isPlaying, onSleepTrigger]);

  const handleSetTimer = (minutes: number) => {
    if (minutes === -1) {
      // End of chapter
      setEndOfChapter(true);
      setStartChapter(currentChapter);
      setSleepTime(-1);
    } else {
      setEndOfChapter(false);
      setStartChapter(null);
      setSleepTime(minutes);
      setRemainingSeconds(minutes * 60);
    }
    setIsOpen(false);
  };

  const handleCancelTimer = () => {
    setSleepTime(null);
    setRemainingSeconds(0);
    setEndOfChapter(false);
    setStartChapter(null);
  };

  const formatRemaining = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className={`relative ${sleepTime !== null ? 'text-primary' : ''}`}
        >
          <Timer className="w-4 h-4" />
          {sleepTime !== null && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" align="end">
        <div className="space-y-1">
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-sm font-medium text-foreground">Sleep Timer</span>
            {sleepTime !== null && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0"
                onClick={handleCancelTimer}
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>

          {sleepTime !== null ? (
            <div className="px-2 py-3 text-center">
              <p className="text-2xl font-mono text-primary">
                {endOfChapter ? "End of chapter" : formatRemaining(remainingSeconds)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Audio will pause automatically
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {sleepOptions.map((option) => (
                <button
                  key={option.minutes}
                  onClick={() => handleSetTimer(option.minutes)}
                  className="w-full px-3 py-2 text-sm text-left rounded hover:bg-muted transition-colors"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SleepTimer;
