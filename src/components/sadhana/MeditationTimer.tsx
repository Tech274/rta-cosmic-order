import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Save, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateSession } from "@/hooks/useSadhana";
import { useAuth } from "@/hooks/useAuth";

interface MeditationTimerProps {
  onComplete?: () => void;
}

const presetDurations = [
  { label: "5 min", seconds: 5 * 60 },
  { label: "10 min", seconds: 10 * 60 },
  { label: "15 min", seconds: 15 * 60 },
  { label: "20 min", seconds: 20 * 60 },
  { label: "30 min", seconds: 30 * 60 },
  { label: "45 min", seconds: 45 * 60 },
  { label: "60 min", seconds: 60 * 60 },
];

const MeditationTimer = ({ onComplete }: MeditationTimerProps) => {
  const [duration, setDuration] = useState(15 * 60); // 15 minutes default
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [bellAtStart, setBellAtStart] = useState(true);
  const [bellAtEnd, setBellAtEnd] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { user } = useAuth();
  const createSession = useCreateSession();

  const playBell = useCallback(() => {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 528; // Solfeggio frequency for healing
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 2);
  }, []);

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsComplete(true);
            if (bellAtEnd) playBell();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeRemaining, bellAtEnd, playBell]);

  const start = () => {
    if (bellAtStart) playBell();
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setIsComplete(false);
    setTimeRemaining(duration);
  };

  const selectDuration = (seconds: number) => {
    setDuration(seconds);
    setTimeRemaining(seconds);
    setIsRunning(false);
    setIsComplete(false);
  };

  const saveSession = async () => {
    const actualDuration = duration - timeRemaining;

    await createSession.mutateAsync({
      session_type: "meditation",
      duration_seconds: actualDuration,
    });

    reset();
    onComplete?.();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = ((duration - timeRemaining) / duration) * 100;

  return (
    <div className="bg-card border border-border p-6 md:p-8">
      {/* Duration Presets */}
      <div className="mb-8">
        <p className="text-sm text-muted-foreground mb-3 text-center">Select Duration</p>
        <div className="flex flex-wrap justify-center gap-2">
          {presetDurations.map((preset) => (
            <button
              key={preset.seconds}
              onClick={() => selectDuration(preset.seconds)}
              disabled={isRunning}
              className={`px-4 py-2 text-sm border transition-all disabled:opacity-50 ${
                duration === preset.seconds
                  ? "bg-gold/20 border-gold/50 text-gold"
                  : "border-border hover:border-gold/30"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timer Display */}
      <div className="relative mb-8">
        <div className="relative w-72 h-72 mx-auto">
          {/* Progress ring */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="144"
              cy="144"
              r="136"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-border"
            />
            <motion.circle
              cx="144"
              cy="144"
              r="136"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              className="text-gold"
              style={{
                strokeDasharray: `${2 * Math.PI * 136}`,
                strokeDashoffset: `${2 * Math.PI * 136 * (1 - progress / 100)}`,
              }}
            />
          </svg>

          {/* Time display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              key={timeRemaining}
              initial={{ scale: 1.02 }}
              animate={{ scale: 1 }}
              className="font-display text-6xl text-foreground"
            >
              {formatTime(timeRemaining)}
            </motion.span>
            <span className="font-body text-sm text-muted-foreground mt-2">
              {isRunning ? "Meditating..." : isComplete ? "Complete" : "Ready"}
            </span>
          </div>
        </div>
      </div>

      {/* Bell Settings */}
      <div className="flex justify-center gap-6 mb-6">
        <button
          onClick={() => setBellAtStart(!bellAtStart)}
          className={`flex items-center gap-2 text-sm transition-colors ${
            bellAtStart ? "text-gold" : "text-muted-foreground"
          }`}
        >
          <Bell className="w-4 h-4" />
          Start bell
        </button>
        <button
          onClick={() => setBellAtEnd(!bellAtEnd)}
          className={`flex items-center gap-2 text-sm transition-colors ${
            bellAtEnd ? "text-gold" : "text-muted-foreground"
          }`}
        >
          <Bell className="w-4 h-4" />
          End bell
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        {!isRunning && !isComplete && (
          <Button
            onClick={start}
            size="lg"
            className="gap-2 bg-gold hover:bg-gold/90 text-background"
          >
            <Play className="w-5 h-5" />
            Begin
          </Button>
        )}

        {isRunning && (
          <Button
            onClick={pause}
            size="lg"
            variant="outline"
            className="gap-2"
          >
            <Pause className="w-5 h-5" />
            Pause
          </Button>
        )}

        {(isComplete || (timeRemaining < duration && !isRunning)) && (
          <>
            <Button
              variant="outline"
              onClick={reset}
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>

            {user && (
              <Button
                onClick={saveSession}
                disabled={createSession.isPending}
                className="gap-2 bg-gold hover:bg-gold/90 text-background"
              >
                <Save className="w-4 h-4" />
                Save Session
              </Button>
            )}
          </>
        )}
      </div>

      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center"
        >
          <p className="font-sanskrit text-xl text-gold">॥ ॐ शान्तिः शान्तिः शान्तिः ॥</p>
          <p className="font-body text-sm text-muted-foreground mt-1">
            Om Shanti. Your meditation is complete.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default MeditationTimer;
