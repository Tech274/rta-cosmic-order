import { useState, useRef } from "react";
import { Volume2, Loader2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AudioPronunciationProps {
  text: string;
  transliteration?: string;
  className?: string;
}

const AudioPronunciation = ({ text, transliteration, className = "" }: AudioPronunciationProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const handlePlay = async () => {
    // If already playing, pause
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    // If we have cached audio, play it
    if (audioUrl) {
      playAudio(audioUrl);
      return;
    }

    // Generate new audio
    setIsLoading(true);
    try {
      // Use transliteration for better pronunciation if available
      const textToSpeak = transliteration || text;
      
      const { data, error } = await supabase.functions.invoke("text-to-speech", {
        body: { text: textToSpeak },
      });

      if (error) throw error;

      if (data?.success && data?.audioContent) {
        const url = `data:audio/mpeg;base64,${data.audioContent}`;
        setAudioUrl(url);
        playAudio(url);
      } else {
        throw new Error(data?.error || "Failed to generate audio");
      }
    } catch (error) {
      console.error("TTS error:", error);
      toast({
        title: "Audio unavailable",
        description: "Could not generate pronunciation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const playAudio = (url: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(url);
    audioRef.current = audio;

    audio.onplay = () => setIsPlaying(true);
    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => {
      setIsPlaying(false);
      toast({
        title: "Playback error",
        description: "Could not play audio.",
        variant: "destructive",
      });
    };

    audio.play().catch((err) => {
      console.error("Playback error:", err);
      setIsPlaying(false);
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handlePlay}
      disabled={isLoading}
      className={`h-8 w-8 text-muted-foreground hover:text-primary transition-colors ${className}`}
      title={isPlaying ? "Pause pronunciation" : "Listen to pronunciation"}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : isPlaying ? (
        <VolumeX className="w-4 h-4" />
      ) : (
        <Volume2 className="w-4 h-4" />
      )}
    </Button>
  );
};

export default AudioPronunciation;
