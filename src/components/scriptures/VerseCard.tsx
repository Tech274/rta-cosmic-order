import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Verse } from "@/data/scriptures";
import { useState } from "react";

interface VerseCardProps {
  verse: Verse;
  chapterNumber: number;
  index: number;
}

const VerseCard = ({ verse, chapterNumber, index }: VerseCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="bg-card border border-border"
    >
      {/* Verse Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 text-left hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="font-display text-sm text-gold tracking-[0.1em]">
            Verse {chapterNumber}.{verse.number}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </div>

        {/* Sanskrit */}
        <p className="font-sanskrit text-lg text-foreground leading-relaxed mb-3">
          {verse.sanskrit}
        </p>

        {/* Transliteration */}
        <p className="font-body text-sm text-gold/70 italic mb-3">
          {verse.transliteration}
        </p>

        {/* Meaning */}
        <p className="font-body text-sm text-muted-foreground">
          {verse.meaning}
        </p>
      </button>

      {/* Commentary (Expanded) */}
      {isExpanded && verse.commentary && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="px-5 pb-5 border-t border-border"
        >
          <div className="pt-4">
            <p className="font-display text-xs text-gold/80 uppercase tracking-[0.15em] mb-2">
              Commentary
            </p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              {verse.commentary}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default VerseCard;
