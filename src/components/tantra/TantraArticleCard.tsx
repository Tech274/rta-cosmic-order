import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Image as ImageIcon } from "lucide-react";
import type { TantraArticle } from "@/data/tantraScriptures";

interface TantraArticleCardProps {
  article: TantraArticle;
  categoryId: string;
  index: number;
}

const TantraArticleCard = ({ article, categoryId, index }: TantraArticleCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link
        to={`/scriptures/tantra/${categoryId}/${article.id}`}
        className="group block bg-card border border-border hover:border-gold/50 transition-all duration-300 h-full"
      >
        {/* Header with sacred geometry */}
        <div className="aspect-square bg-gradient-to-br from-background to-muted relative overflow-hidden">
          <div className="absolute inset-0 bg-yantra-pattern opacity-20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <p className="font-sanskrit text-3xl text-gold/80 mb-2">{article.sanskritName}</p>
            <p className="font-display text-lg text-foreground text-center">
              {article.name}
            </p>
          </div>
          {article.gallery.length > 0 && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 bg-background/80 rounded text-xs text-muted-foreground">
              <ImageIcon className="w-3 h-3" />
              {article.gallery.length}
            </div>
          )}
          <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="font-body text-sm text-muted-foreground line-clamp-3 mb-3">
            {article.description}
          </p>

          {article.associatedChakra && (
            <div className="flex items-center gap-2 text-xs text-gold">
              <Sparkles className="w-3 h-3" />
              {article.associatedChakra}
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
};

export default TantraArticleCard;
