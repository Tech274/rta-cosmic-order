import { motion } from "framer-motion";
import { BookOpen, Sparkles, Music, Eye, Heart, Quote, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import type { TantraArticle } from "@/data/tantraScriptures";
import ImageGallery from "@/components/gallery/ImageGallery";

interface TantraArticleViewProps {
  article: TantraArticle;
  categoryName: string;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 }
  })
};

const TantraArticleView = ({ article, categoryName }: TantraArticleViewProps) => {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Back navigation */}
      <Link
        to="/scriptures"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to Scriptures</span>
      </Link>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold/70 mb-2">
          {categoryName}
        </p>
        <h1 className="font-sanskrit text-4xl md:text-5xl text-gold mb-3">
          {article.sanskritName}
        </h1>
        <p className="font-display text-2xl md:text-3xl text-foreground mb-4">
          {article.name}
        </p>
        <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
          {article.description}
        </p>
      </motion.header>

      {/* Gallery */}
      {article.gallery.length > 0 && (
        <motion.section
          custom={0}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <ImageGallery images={article.gallery} title={article.name} />
        </motion.section>
      )}

      <div className="space-y-10">
        {/* Symbolism */}
        <motion.section
          custom={1}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center gap-3 mb-4">
            <Eye className="h-5 w-5 text-gold" />
            <h2 className="font-display text-xl text-foreground">Symbolism</h2>
          </div>
          <p className="font-body text-base leading-relaxed text-foreground/90 pl-8">
            {article.symbolism}
          </p>
        </motion.section>

        {/* Iconography */}
        <motion.section
          custom={2}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center gap-3 mb-4">
            <Heart className="h-5 w-5 text-gold" />
            <h2 className="font-display text-xl text-foreground">Iconography</h2>
          </div>
          <p className="font-body text-base leading-relaxed text-muted-foreground pl-8">
            {article.iconography}
          </p>
        </motion.section>

        {/* Mantras */}
        <motion.section
          custom={3}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center gap-3 mb-4">
            <Music className="h-5 w-5 text-gold" />
            <h2 className="font-display text-xl text-foreground">Mantras</h2>
          </div>
          <div className="pl-8 space-y-3">
            {article.mantras.map((mantra, idx) => (
              <div
                key={idx}
                className="p-4 bg-muted/50 border border-border font-sanskrit text-lg text-gold/90"
              >
                {mantra}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Chakra Association */}
        {article.associatedChakra && (
          <motion.section
            custom={4}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="h-5 w-5 text-gold" />
              <h2 className="font-display text-xl text-foreground">Associated Chakra</h2>
            </div>
            <p className="font-body text-base text-muted-foreground pl-8">
              {article.associatedChakra}
            </p>
          </motion.section>
        )}

        {/* Worship Practices */}
        <motion.section
          custom={5}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-5 w-5 text-gold" />
            <h2 className="font-display text-xl text-foreground">Worship Practices</h2>
          </div>
          <ul className="space-y-2 pl-8">
            {article.worshipPractices.map((practice, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-gold mt-1.5">•</span>
                <span className="font-body text-muted-foreground">{practice}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Philosophical Significance */}
        <motion.section
          custom={6}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="font-display text-xl text-foreground mb-4 pl-8 border-l-2 border-gold">
            Philosophical Significance
          </h2>
          <p className="font-body text-base leading-relaxed text-foreground/90 pl-8">
            {article.philosophicalSignificance}
          </p>
        </motion.section>

        {/* Citations */}
        <motion.section
          custom={7}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="pt-8 border-t border-border"
        >
          <div className="flex items-center gap-3 mb-4">
            <Quote className="h-5 w-5 text-gold" />
            <h2 className="font-display text-lg text-foreground">References</h2>
          </div>
          <ul className="space-y-2 pl-8">
            {article.citationList.map((citation, idx) => (
              <li key={idx} className="text-sm text-muted-foreground italic">
                {citation}
              </li>
            ))}
          </ul>
        </motion.section>
      </div>
    </article>
  );
};

export default TantraArticleView;
