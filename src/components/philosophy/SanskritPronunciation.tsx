import { useState } from "react";
import { Volume2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SanskritPronunciationProps {
  text: string;
  transliteration?: string;
  size?: "sm" | "md" | "lg";
}

const SanskritPronunciation = ({
  text,
  transliteration,
  size = "md",
}: SanskritPronunciationProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const playPronunciation = async () => {
    if (isLoading || isPlaying) return;

    setIsLoading(true);

    try {
      // Use transliteration if available for better pronunciation
      const textToSpeak = transliteration || text;

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/text-to-speech`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ 
            text: textToSpeak,
            voiceId: "SAz9YHcvj6GT2YYXdXww" // River voice - calm and clear
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate audio");
      }

      const data = await response.json();

      if (data.audioContent) {
        setIsPlaying(true);
        const audioUrl = `data:audio/mpeg;base64,${data.audioContent}`;
        const audio = new Audio(audioUrl);
        
        audio.onended = () => setIsPlaying(false);
        audio.onerror = () => {
          setIsPlaying(false);
          toast.error("Failed to play audio");
        };

        await audio.play();
      }
    } catch (error) {
      console.error("TTS error:", error);
      toast.error("Could not generate pronunciation");
    } finally {
      setIsLoading(false);
    }
  };

  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`${sizeClasses[size]} text-gold hover:text-gold/80 hover:bg-gold/10`}
      onClick={playPronunciation}
      disabled={isLoading || isPlaying}
      title={`Listen to pronunciation of ${transliteration || text}`}
    >
      {isLoading ? (
        <Loader2 className={`${iconSizes[size]} animate-spin`} />
      ) : (
        <Volume2 className={`${iconSizes[size]} ${isPlaying ? "animate-pulse" : ""}`} />
      )}
    </Button>
  );
};

export default SanskritPronunciation;
