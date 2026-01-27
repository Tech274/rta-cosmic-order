import { Share2, Twitter, Facebook, MessageCircle, Link, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  excerpt: string;
  url: string;
}

const ShareButtons = ({ title, excerpt, url }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const encodedTitle = encodeURIComponent(title);
  const encodedExcerpt = encodeURIComponent(excerpt);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], "_blank", "noopener,noreferrer,width=600,height=400");
    setIsOpen(false);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: excerpt,
          url,
        });
        setIsOpen(false);
      } catch (err) {
        // User cancelled or error
      }
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" align="end">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground px-2 py-1 font-medium">
            Share this article
          </p>
          
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-3"
            onClick={() => handleShare("twitter")}
          >
            <Twitter className="w-4 h-4 text-[#1DA1F2]" />
            Twitter / X
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-3"
            onClick={() => handleShare("facebook")}
          >
            <Facebook className="w-4 h-4 text-[#4267B2]" />
            Facebook
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-3"
            onClick={() => handleShare("whatsapp")}
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            WhatsApp
          </Button>
          
          <div className="border-t border-border my-1" />
          
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-3"
            onClick={handleCopyLink}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                Copied!
              </>
            ) : (
              <>
                <Link className="w-4 h-4" />
                Copy Link
              </>
            )}
          </Button>

          {typeof navigator.share === "function" && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-3"
              onClick={handleNativeShare}
            >
              <Share2 className="w-4 h-4" />
              More Options
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ShareButtons;
