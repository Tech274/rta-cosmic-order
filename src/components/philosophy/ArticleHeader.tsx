import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import SanskritPronunciation from "./SanskritPronunciation";
import { categoryLabels, type PhilosophyArticle } from "@/data/philosophyArticles";

interface ArticleHeaderProps {
  article: PhilosophyArticle;
}

const ArticleHeader = ({ article }: ArticleHeaderProps) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      {/* Trust Markers & Category */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Badge variant="outline" className="border-gold/50 text-gold bg-gold/5">
          {categoryLabels[article.category]}
        </Badge>
        {article.tradition?.map((t) => (
          <Badge key={t} variant="secondary" className="bg-muted/50">
            {t}
          </Badge>
        ))}
        <span className="text-xs text-muted-foreground">
          Scholarly Reference
        </span>
      </div>

      {/* Title */}
      <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
        {article.title}
      </h1>

      {/* Sanskrit with Audio Pronunciation */}
      {article.sanskritTitle && (
        <div className="flex items-center gap-3 mb-6">
          <span className="font-display text-2xl text-gold">
            {article.sanskritTitle}
          </span>
          {article.transliteration && (
            <span className="text-lg text-muted-foreground italic">
              ({article.transliteration})
            </span>
          )}
          <SanskritPronunciation
            text={article.sanskritTitle}
            transliteration={article.transliteration}
            size="md"
          />
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded-full bg-muted/30 text-muted-foreground"
          >
            #{tag}
          </span>
        ))}
      </div>
    </motion.header>
  );
};

export default ArticleHeader;
