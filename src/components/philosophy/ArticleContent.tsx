import { motion } from "framer-motion";
import { BookOpen, Scale, Compass, Sparkles } from "lucide-react";
import type { PhilosophyArticle } from "@/data/philosophyArticles";

interface ArticleContentProps {
  article: PhilosophyArticle;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 }
  })
};

const ArticleContent = ({ article }: ArticleContentProps) => {
  return (
    <div className="space-y-12">
      {/* Canonical Definition */}
      <motion.section
        custom={0}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="h-5 w-5 text-gold" />
          <h2 className="font-display text-xl text-foreground">Definition</h2>
        </div>
        <p className="font-body text-lg leading-relaxed text-foreground/90 pl-8">
          {article.canonicalDefinition}
        </p>
      </motion.section>

      {/* Historical Origins */}
      <motion.section
        custom={1}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center gap-3 mb-4">
          <Compass className="h-5 w-5 text-gold" />
          <h2 className="font-display text-xl text-foreground">Historical Origins</h2>
        </div>
        <p className="font-body text-base leading-relaxed text-muted-foreground pl-8">
          {article.historicalOrigins}
        </p>
      </motion.section>

      {/* Key Principles */}
      <motion.section
        custom={2}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="h-5 w-5 text-gold" />
          <h2 className="font-display text-xl text-foreground">Key Principles</h2>
        </div>
        <ul className="space-y-3 pl-8">
          {article.keyPrinciples.map((principle, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-gold mt-1.5">•</span>
              <span className="font-body text-muted-foreground">{principle}</span>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* Relationship to Dharma */}
      {article.relationshipToDharma && (
        <motion.section
          custom={3}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center gap-3 mb-4">
            <Scale className="h-5 w-5 text-gold" />
            <h2 className="font-display text-xl text-foreground">Relationship to Dharma</h2>
          </div>
          <p className="font-body text-base leading-relaxed text-muted-foreground pl-8">
            {article.relationshipToDharma}
          </p>
        </motion.section>
      )}

      {/* Implications for Ethics */}
      {article.implicationsForEthics && (
        <motion.section
          custom={4}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="font-display text-xl text-foreground mb-4 pl-8 border-l-2 border-gold">
            Implications for Ethics
          </h2>
          <p className="font-body text-base leading-relaxed text-muted-foreground pl-8">
            {article.implicationsForEthics}
          </p>
        </motion.section>
      )}

      {/* Cosmological Significance */}
      {article.cosmologicalSignificance && (
        <motion.section
          custom={5}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="font-display text-xl text-foreground mb-4 pl-8 border-l-2 border-gold">
            Cosmological Significance
          </h2>
          <p className="font-body text-base leading-relaxed text-muted-foreground pl-8">
            {article.cosmologicalSignificance}
          </p>
        </motion.section>
      )}
    </div>
  );
};

export default ArticleContent;
