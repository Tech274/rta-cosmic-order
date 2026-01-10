import { motion } from "framer-motion";
import { BookOpen, Hash } from "lucide-react";
import { Chapter } from "@/data/scriptures";
import { Link } from "react-router-dom";

interface ChapterCardProps {
  chapter: Chapter;
  scriptureId: string;
  index: number;
}

const ChapterCard = ({ chapter, scriptureId, index }: ChapterCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
    >
      <Link
        to={`/scriptures/${scriptureId}/chapter/${chapter.number}`}
        className="group block bg-card border border-border hover:border-gold/50 p-5 transition-all duration-300"
      >
        <div className="flex items-start gap-4">
          {/* Chapter Number */}
          <div className="flex-shrink-0 w-12 h-12 bg-gold/10 border border-gold/20 flex items-center justify-center">
            <span className="font-display text-xl text-gold">{chapter.number}</span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-display text-lg text-foreground group-hover:text-gold transition-colors truncate">
                {chapter.name}
              </h3>
            </div>
            <p className="font-sanskrit text-sm text-gold/60 mb-2">
              {chapter.sanskritName}
            </p>
            <p className="font-body text-sm text-muted-foreground line-clamp-2 mb-3">
              {chapter.summary}
            </p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-gold/60" />
                <span>{chapter.verseCount} verses</span>
              </div>
              <div className="flex items-center gap-1">
                <Hash className="w-3.5 h-3.5 text-gold/60" />
                <span>{chapter.themes.length} themes</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ChapterCard;
