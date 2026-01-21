import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { ambientSounds, type AmbientSound } from "@/data/meditationTechniques";

interface AmbientSoundPlayerProps {
  isPlaying: boolean;
}

const AmbientSoundPlayer = ({ isPlaying }: AmbientSoundPlayerProps) => {
  const [selectedSound, setSelectedSound] = useState<AmbientSound>(ambientSounds[0]);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const stopAllSounds = useCallback(() => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }
    if (noiseSourceRef.current) {
      noiseSourceRef.current.stop();
      noiseSourceRef.current.disconnect();
      noiseSourceRef.current = null;
    }
  }, []);

  const createNoiseBuffer = useCallback((audioContext: AudioContext, type: 'rain' | 'ocean' | 'forest') => {
    const bufferSize = audioContext.sampleRate * 2;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const output = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      // Different noise characteristics for different sounds
      if (type === 'rain') {
        output[i] = (Math.random() * 2 - 1) * (Math.random() > 0.7 ? 1 : 0.3);
      } else if (type === 'ocean') {
        const wave = Math.sin(i / (audioContext.sampleRate / 0.1)) * 0.5;
        output[i] = (Math.random() * 2 - 1) * 0.5 + wave * 0.5;
      } else {
        output[i] = (Math.random() * 2 - 1) * 0.3;
      }
    }
    return buffer;
  }, []);

  const playSound = useCallback(() => {
    if (selectedSound.id === 'silence') return;
    
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    
    const audioContext = audioContextRef.current;
    
    // Create gain node for volume control
    gainNodeRef.current = audioContext.createGain();
    gainNodeRef.current.gain.value = isMuted ? 0 : volume;
    gainNodeRef.current.connect(audioContext.destination);

    if (selectedSound.type === 'frequency' && selectedSound.frequency) {
      // Create oscillator for frequency-based sounds
      oscillatorRef.current = audioContext.createOscillator();
      oscillatorRef.current.frequency.value = selectedSound.frequency;
      oscillatorRef.current.type = 'sine';
      oscillatorRef.current.connect(gainNodeRef.current);
      oscillatorRef.current.start();
    } else if (selectedSound.type === 'nature') {
      // Create noise-based ambient sounds
      const noiseType = selectedSound.id as 'rain' | 'ocean' | 'forest';
      const buffer = createNoiseBuffer(audioContext, noiseType);
      
      noiseSourceRef.current = audioContext.createBufferSource();
      noiseSourceRef.current.buffer = buffer;
      noiseSourceRef.current.loop = true;
      
      // Add filter for more natural sound
      const filter = audioContext.createBiquadFilter();
      filter.type = selectedSound.id === 'rain' ? 'highpass' : 'lowpass';
      filter.frequency.value = selectedSound.id === 'rain' ? 1000 : 800;
      
      noiseSourceRef.current.connect(filter);
      filter.connect(gainNodeRef.current);
      noiseSourceRef.current.start();
    } else if (selectedSound.type === 'instrument') {
      // Create bell-like sounds
      oscillatorRef.current = audioContext.createOscillator();
      oscillatorRef.current.frequency.value = selectedSound.id === 'tibetan-bowls' ? 256 : 440;
      oscillatorRef.current.type = 'sine';
      
      const modulatorGain = audioContext.createGain();
      modulatorGain.gain.value = 0.1;
      
      oscillatorRef.current.connect(gainNodeRef.current);
      oscillatorRef.current.start();
    }
  }, [selectedSound, volume, isMuted, createNoiseBuffer]);

  useEffect(() => {
    if (isPlaying && selectedSound.id !== 'silence') {
      playSound();
    } else {
      stopAllSounds();
    }

    return () => {
      stopAllSounds();
    };
  }, [isPlaying, selectedSound, playSound, stopAllSounds]);

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  return (
    <div className="bg-card border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-sm text-foreground">Ambient Sound</h3>
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`p-2 transition-colors ${isMuted ? 'text-muted-foreground' : 'text-gold'}`}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Sound Selection */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {ambientSounds.map((sound) => (
          <motion.button
            key={sound.id}
            onClick={() => setSelectedSound(sound)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-3 text-center border transition-all ${
              selectedSound.id === sound.id
                ? 'bg-gold/20 border-gold/50'
                : 'border-border hover:border-gold/30'
            }`}
          >
            <span className="text-xl block mb-1">{sound.icon}</span>
            <span className="text-xs text-muted-foreground">{sound.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-3">
        <Volume2 className="w-4 h-4 text-muted-foreground" />
        <Slider
          value={[volume * 100]}
          onValueChange={(values) => setVolume(values[0] / 100)}
          max={100}
          step={1}
          className="flex-1"
        />
        <span className="text-xs text-muted-foreground w-8">{Math.round(volume * 100)}%</span>
      </div>
    </div>
  );
};

export default AmbientSoundPlayer;
