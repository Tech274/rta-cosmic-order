import { motion } from "framer-motion";
import { BookOpen, Layers, Tag } from "lucide-react";
import { Scripture } from "@/data/scriptures";
import { Link } from "react-router-dom";

interface ScriptureCardProps {
  scripture: Scripture;
  index: number;
}

const ScriptureCard = ({ scripture, index }: ScriptureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link
        to={`/scriptures/${scripture.id}`}
        className="group block bg-card border border-border hover:border-gold/50 transition-all duration-300"
      >
        {/* Header with sacred geometry */}
        <div className="aspect-[16/9] bg-muted relative overflow-hidden">
          <div className="absolute inset-0 bg-yantra-pattern opacity-10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="font-sanskrit text-3xl text-gold/70 mb-3">{scripture.sanskritName}</p>
              <p className="font-display text-sm text-muted-foreground tracking-[0.2em] uppercase">
                {scripture.tradition}
              </p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-display text-2xl text-foreground mb-3 group-hover:text-gold transition-colors">
            {scripture.name}
          </h3>
          
          <p className="font-body text-sm text-muted-foreground line-clamp-3 mb-5">
            {scripture.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-gold/60" />
              <span>{scripture.chapters.length} chapters</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-gold/60" />
              <span>
                {scripture.chapters.reduce((sum, ch) => sum + ch.verseCount, 0)} verses
              </span>
            </div>
          </div>

          {/* Philosophy Tags */}
          <div className="flex flex-wrap gap-2">
            {scripture.philosophyTags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gold/10 text-gold border border-gold/20"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ScriptureCard;
