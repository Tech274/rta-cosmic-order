import { useState } from "react";
import { motion } from "framer-motion";
import { Bookmark, Share2, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useToggleBookmark, useBookmarkedSubhashitas } from "@/hooks/useBookmarks";
import { useToast } from "@/hooks/use-toast";
import ShareQuoteModal from "./ShareQuoteModal";
import AudioPronunciation from "./AudioPronunciation";
import AIExplanation from "./AIExplanation";
import {
  type Subhashita,
  categoryLabels,
  categoryColors,
} from "@/data/dailyDharma";

interface SubhashitaCardProps {
  subhashita: Subhashita;
  index?: number;
}

const SubhashitaCard = ({ subhashita, index = 0 }: SubhashitaCardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const toggleBookmark = useToggleBookmark();
  const { data: bookmarks = [] } = useBookmarkedSubhashitas();
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const isBookmarked = bookmarks.includes(subhashita.id);

  const handleBookmark = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to bookmark subhashitas",
      });
      return;
    }
    toggleBookmark.mutate(subhashita.id);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        viewport={{ once: true }}
        className="group bg-card border border-border hover:border-gold/30 transition-all p-6 relative"
      >
        {/* Quote icon */}
        <div className="absolute top-4 right-4 text-gold/10 group-hover:text-gold/20 transition-colors">
          <Quote className="w-8 h-8" />
        </div>

        {/* Category badge */}
        <Badge
          variant="outline"
          className={`mb-4 ${categoryColors[subhashita.category]}`}
        >
          {categoryLabels[subhashita.category]}
        </Badge>

        {/* Sanskrit text with audio */}
        <div className="flex items-start gap-2 mb-3">
          <p className="font-sanskrit text-xl text-gold leading-relaxed flex-1">
            {subhashita.sanskrit}
          </p>
          <AudioPronunciation 
            text={subhashita.sanskrit} 
            transliteration={subhashita.transliteration}
            className="shrink-0 mt-1"
          />
        </div>

        {/* Transliteration */}
        <p className="font-body text-sm text-muted-foreground italic mb-4">
          {subhashita.transliteration}
        </p>

        {/* Translation */}
        <p className="font-display text-lg text-foreground mb-4">
          "{subhashita.translation}"
        </p>

        {/* Meaning */}
        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
          {subhashita.meaning}
        </p>

        {/* Source & Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          {subhashita.source && (
            <p className="font-body text-xs text-gold/60">— {subhashita.source}</p>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShareModalOpen(true)}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBookmark}
              disabled={toggleBookmark.isPending}
              className={`h-8 w-8 ${
                isBookmarked
                  ? "text-gold hover:text-gold/80"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>

        {/* AI Explanation */}
        <AIExplanation subhashita={subhashita} />
      </motion.div>

      <ShareQuoteModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        subhashita={subhashita}
      />
    </>
  );
};

export default SubhashitaCard;
