import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Save, ArrowLeft, Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateSession } from "@/hooks/useSadhana";
import { useAuth } from "@/hooks/useAuth";
import { timerPresets, type MeditationTechnique } from "@/data/meditationTechniques";
import AmbientSoundPlayer from "./AmbientSoundPlayer";
import RtaLogo from "@/components/RtaLogo";

interface GuidedMeditationSessionProps {
  technique: MeditationTechnique;
  onBack: () => void;
  onComplete?: () => void;
}

const GuidedMeditationSession = ({ technique, onBack, onComplete }: GuidedMeditationSessionProps) => {
  const [duration, setDuration] = useState(technique.duration);
  const [timeRemaining, setTimeRemaining] = useState(technique.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [bellAtStart, setBellAtStart] = useState(true);
  const [bellAtEnd, setBellAtEnd] = useState(true);
  const [showInstructions, setShowInstructions] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { user } = useAuth();
  const createSession = useCreateSession();

  const playBell = useCallback(() => {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Singing bowl frequency
    oscillator.frequency.value = 528;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 3);
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
    setShowInstructions(false);
  };

  const pause = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setIsComplete(false);
    setTimeRemaining(duration);
    setShowInstructions(true);
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
      notes: `${technique.name} (${technique.sanskritName})`
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Library</span>
        </button>
        <div className="text-right">
          <h2 className="font-display text-lg text-foreground">{technique.name}</h2>
          <p className="font-sanskrit text-sm text-gold/70">{technique.sanskritName}</p>
        </div>
      </div>

      {/* Timer Presets */}
      <div className="bg-card border border-border p-4">
        <p className="text-sm text-muted-foreground mb-3 text-center">Duration</p>
        <div className="flex flex-wrap justify-center gap-2">
          {timerPresets.map((preset) => (
            <button
              key={preset.seconds}
              onClick={() => selectDuration(preset.seconds)}
              disabled={isRunning}
              className={`px-3 py-1.5 text-sm border transition-all disabled:opacity-50 ${
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

      {/* Main Timer */}
      <div className="bg-card border border-border p-6 md:p-8">
        <div className="relative mb-6">
          <div className="relative w-64 h-64 mx-auto">
            {/* Use RtaLogo as the meditation focus */}
            <div className="absolute inset-0 flex items-center justify-center">
              <RtaLogo size={180} className="text-gold/40" animate={isRunning} />
            </div>
            
            {/* Progress ring overlay */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-border"
              />
              <motion.circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                className="text-gold"
                style={{
                  strokeDasharray: `${2 * Math.PI * 120}`,
                  strokeDashoffset: `${2 * Math.PI * 120 * (1 - progress / 100)}`,
                }}
              />
            </svg>

            {/* Time display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                key={timeRemaining}
                initial={{ scale: 1.02 }}
                animate={{ scale: 1 }}
                className="font-display text-4xl text-foreground"
              >
                {formatTime(timeRemaining)}
              </motion.span>
              <span className="font-body text-sm text-muted-foreground mt-1">
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
            Start
          </button>
          <button
            onClick={() => setBellAtEnd(!bellAtEnd)}
            className={`flex items-center gap-2 text-sm transition-colors ${
              bellAtEnd ? "text-gold" : "text-muted-foreground"
            }`}
          >
            <Bell className="w-4 h-4" />
            End
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
              <Button variant="outline" onClick={reset} className="gap-2">
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
                  Save
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
              Your meditation is complete.
            </p>
          </motion.div>
        )}
      </div>

      {/* Ambient Sound */}
      <AmbientSoundPlayer isPlaying={isRunning} />

      {/* Instructions (collapsible) */}
      <div className="bg-card border border-border overflow-hidden">
        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
        >
          <span className="font-display text-sm text-foreground">Instructions</span>
          <ChevronDown 
            className={`w-4 h-4 text-muted-foreground transition-transform ${
              showInstructions ? 'rotate-180' : ''
            }`} 
          />
        </button>
        
        <AnimatePresence>
          {showInstructions && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-border"
            >
              <div className="p-4">
                <ol className="list-decimal list-inside space-y-2">
                  {technique.instructions.map((instruction, i) => (
                    <li key={i} className="font-body text-sm text-muted-foreground">
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GuidedMeditationSession;
