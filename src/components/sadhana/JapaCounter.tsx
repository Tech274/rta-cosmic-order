import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Save, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateSession } from "@/hooks/useSadhana";
import { useAuth } from "@/hooks/useAuth";

const defaultMantras = [
  { name: "Om Namah Shivaya", sanskrit: "ॐ नमः शिवाय" },
  { name: "Hare Krishna Mahamantra", sanskrit: "हरे कृष्ण हरे कृष्ण" },
  { name: "Om Namo Narayanaya", sanskrit: "ॐ नमो नारायणाय" },
  { name: "Om Gan Ganapataye Namah", sanskrit: "ॐ गं गणपतये नमः" },
  { name: "Gayatri Mantra", sanskrit: "ॐ भूर्भुवः स्वः" },
];

interface JapaCounterProps {
  onComplete?: () => void;
}

const JapaCounter = ({ onComplete }: JapaCounterProps) => {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(108);
  const [selectedMantra, setSelectedMantra] = useState(defaultMantras[0]);
  const [customMantra, setCustomMantra] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [startTime] = useState(Date.now());

  const { user } = useAuth();
  const createSession = useCreateSession();

  const playBeep = useCallback(() => {
    if (!soundEnabled) return;
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = count % 10 === 9 ? 880 : 440;
    oscillator.type = "sine";
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  }, [soundEnabled, count]);

  const increment = () => {
    if (count < target) {
      setCount((prev) => prev + 1);
      playBeep();
    }
  };

  const reset = () => {
    setCount(0);
  };

  const saveSession = async () => {
    const durationSeconds = Math.floor((Date.now() - startTime) / 1000);
    const mantraName = customMantra || selectedMantra.name;

    await createSession.mutateAsync({
      session_type: "japa",
      duration_seconds: durationSeconds,
      count: count,
      mantra: mantraName,
    });

    reset();
    onComplete?.();
  };

  const progress = (count / target) * 100;
  const isComplete = count >= target;

  return (
    <div className="bg-card border border-border p-6 md:p-8">
      {/* Mantra Selection */}
      <div className="mb-8">
        <Label className="text-sm text-muted-foreground mb-3 block">Select Mantra</Label>
        <div className="flex flex-wrap gap-2 mb-4">
          {defaultMantras.map((mantra) => (
            <button
              key={mantra.name}
              onClick={() => {
                setSelectedMantra(mantra);
                setCustomMantra("");
              }}
              className={`px-3 py-2 text-sm border transition-all ${
                selectedMantra.name === mantra.name && !customMantra
                  ? "bg-gold/20 border-gold/50 text-gold"
                  : "border-border hover:border-gold/30"
              }`}
            >
              {mantra.sanskrit}
            </button>
          ))}
        </div>
        <Input
          placeholder="Or enter custom mantra..."
          value={customMantra}
          onChange={(e) => setCustomMantra(e.target.value)}
          className="bg-background"
        />
      </div>

      {/* Current Mantra Display */}
      <div className="text-center mb-8">
        <p className="font-sanskrit text-2xl text-gold mb-2">
          {customMantra || selectedMantra.sanskrit}
        </p>
        <p className="font-body text-sm text-muted-foreground">
          {customMantra || selectedMantra.name}
        </p>
      </div>

      {/* Counter Display */}
      <div className="relative mb-8">
        {/* Progress ring */}
        <div className="relative w-64 h-64 mx-auto">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-border"
            />
            <motion.circle
              cx="128"
              cy="128"
              r="120"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              className="text-gold"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              transition={{ duration: 0.3 }}
              style={{
                strokeDasharray: `${2 * Math.PI * 120}`,
                strokeDashoffset: `${2 * Math.PI * 120 * (1 - progress / 100)}`,
              }}
            />
          </svg>

          {/* Counter button */}
          <button
            onClick={increment}
            disabled={isComplete}
            className="absolute inset-8 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 flex flex-col items-center justify-center hover:from-gold/30 hover:to-gold/10 transition-all active:scale-95 disabled:opacity-50"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={count}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="font-display text-6xl text-gold"
              >
                {count}
              </motion.span>
            </AnimatePresence>
            <span className="font-body text-sm text-muted-foreground">
              of {target}
            </span>
          </button>
        </div>
      </div>

      {/* Target Setting */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <Label className="text-sm text-muted-foreground">Target:</Label>
        <div className="flex gap-2">
          {[27, 54, 108, 216].map((t) => (
            <button
              key={t}
              onClick={() => setTarget(t)}
              className={`px-3 py-1 text-sm border transition-all ${
                target === t
                  ? "bg-gold/20 border-gold/50 text-gold"
                  : "border-border hover:border-gold/30"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="text-muted-foreground hover:text-foreground"
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </Button>

        <Button
          variant="outline"
          onClick={reset}
          className="gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>

        {user && count > 0 && (
          <Button
            onClick={saveSession}
            disabled={createSession.isPending}
            className="gap-2 bg-gold hover:bg-gold/90 text-background"
          >
            <Save className="w-4 h-4" />
            {isComplete ? "Complete & Save" : "Save Progress"}
          </Button>
        )}
      </div>

      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center"
        >
          <p className="font-sanskrit text-xl text-gold">॥ जप सम्पूर्णः ॥</p>
          <p className="font-body text-sm text-muted-foreground mt-1">
            Japa Complete! May your devotion be blessed.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default JapaCounter;
