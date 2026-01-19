import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Twitter,
  Facebook,
  Linkedin,
  Link2,
  Download,
  Check,
  MessageCircle,
  Loader2,
  Instagram,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  type Subhashita,
  categoryLabels,
  categoryColors,
} from "@/data/dailyDharma";

interface ShareQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  subhashita: Subhashita;
}

const ShareQuoteModal = ({ isOpen, onClose, subhashita }: ShareQuoteModalProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const shareText = `"${subhashita.translation}"\n\n${subhashita.sanskrit}\n\n— ${subhashita.source || "Ancient Sanskrit Wisdom"}`;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);

  const socialLinks = [
    {
      name: "Twitter / X",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      color: "hover:bg-sky-500/20 hover:text-sky-400 hover:border-sky-500/30",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?quote=${encodedText}&u=${encodedUrl}`,
      color: "hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/30",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=Daily%20Dharma&summary=${encodedText}`,
      color: "hover:bg-blue-600/20 hover:text-blue-400 hover:border-blue-600/30",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      color: "hover:bg-green-500/20 hover:text-green-400 hover:border-green-500/30",
    },
  ];

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareText + "\n\n" + shareUrl);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Quote copied! Ready to share.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=400");
  };

  const handleGenerateImage = async () => {
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-quote-image", {
        body: {
          sanskrit: subhashita.sanskrit,
          translation: subhashita.translation,
          source: subhashita.source,
          category: categoryLabels[subhashita.category],
        },
      });

      if (error) throw error;

      if (data?.success && data?.imageUrl) {
        setGeneratedImage(data.imageUrl);
        toast({
          title: "Image generated!",
          description: "Your quote image is ready to download.",
        });
      } else {
        throw new Error(data?.error || "Failed to generate image");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      toast({
        title: "Generation failed",
        description: "Could not generate image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleDownloadImage = () => {
    if (!generatedImage) return;

    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `rta-dharma-${subhashita.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Downloaded!",
      description: "Share your wisdom on Instagram!",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-background border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif text-primary">
            Share This Wisdom
          </DialogTitle>
        </DialogHeader>

        {/* Generated Image Preview or Quote Card Preview */}
        {generatedImage ? (
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={generatedImage}
              alt="Generated quote"
              className="w-full h-auto rounded-lg"
            />
            <Button
              onClick={handleDownloadImage}
              className="absolute bottom-4 right-4 gap-2"
              size="sm"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-amber-950/80 via-stone-900 to-stone-950 p-6 border border-primary/20">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            
            {/* Decorative corner ornaments */}
            <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-primary/30 rounded-tl" />
            <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-primary/30 rounded-tr" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-primary/30 rounded-bl" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-primary/30 rounded-br" />

            <div className="relative z-10 text-center space-y-4">
              {/* Category */}
              <Badge
                variant="outline"
                className={`${categoryColors[subhashita.category]} text-xs`}
              >
                {categoryLabels[subhashita.category]}
              </Badge>

              {/* Sanskrit */}
              <p className="font-sanskrit text-xl text-primary leading-relaxed">
                {subhashita.sanskrit}
              </p>

              {/* Divider */}
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary/40" />
                <span className="text-primary/40 text-lg">✦</span>
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary/40" />
              </div>

              {/* Translation */}
              <p className="font-serif text-lg text-foreground italic">
                "{subhashita.translation}"
              </p>

              {/* Source */}
              <p className="text-sm text-primary/60">
                — {subhashita.source || "Ancient Sanskrit Wisdom"}
              </p>

              {/* Branding */}
              <div className="pt-2">
                <p className="text-xs text-muted-foreground/50 tracking-widest uppercase">
                  ṚTA · Daily Dharma
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Instagram Image Generation */}
        <div className="space-y-3">
          <Button
            onClick={generatedImage ? handleDownloadImage : handleGenerateImage}
            disabled={generating}
            className="w-full gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {generating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating beautiful image...
              </>
            ) : generatedImage ? (
              <>
                <Download className="w-4 h-4" />
                Download for Instagram
              </>
            ) : (
              <>
                <Instagram className="w-4 h-4" />
                Generate Image for Instagram
              </>
            )}
          </Button>
          {!generatedImage && (
            <p className="text-xs text-muted-foreground text-center">
              AI will create a beautiful 1080×1080 image perfect for Instagram
            </p>
          )}
        </div>

        {/* Share Options */}
        <div className="space-y-4 pt-2 border-t border-border">
          <p className="text-sm text-muted-foreground text-center pt-2">
            Or share directly on social media
          </p>

          <div className="grid grid-cols-4 gap-3">
            {socialLinks.map((social) => (
              <motion.button
                key={social.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOpenLink(social.url)}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-card/50 transition-all ${social.color}`}
              >
                <social.icon className="w-5 h-5" />
                <span className="text-xs">{social.name.split(" ")[0]}</span>
              </motion.button>
            ))}
          </div>

          {/* Copy Link Button */}
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={handleCopyLink}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="check"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <Check className="w-4 h-4 text-green-500" />
                  Copied!
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <Link2 className="w-4 h-4" />
                  Copy Quote & Link
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareQuoteModal;
