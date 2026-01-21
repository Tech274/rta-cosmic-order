import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, RefreshCw, Quote, Share2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import ShareQuoteModal from "@/components/dailydharma/ShareQuoteModal";
import { 
  getDailySubhashita, 
  getRandomSubhashita, 
  categoryLabels, 
  categoryColors,
  subhashitas,
  type Subhashita,
  type SubhashitaCategory
} from "@/data/dailyDharma";

const DailyDharmaSection = () => {
  const [currentSubhashita, setCurrentSubhashita] = useState<Subhashita>(getDailySubhashita());
  const [selectedCategory, setSelectedCategory] = useState<SubhashitaCategory | "all">("all");
  const [isAnimating, setIsAnimating] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const handleRefresh = () => {
    setIsAnimating(true);
    setTimeout(() => {
      if (selectedCategory === "all") {
        setCurrentSubhashita(getRandomSubhashita());
      } else {
        const filtered = subhashitas.filter(s => s.category === selectedCategory);
        setCurrentSubhashita(filtered[Math.floor(Math.random() * filtered.length)]);
      }
      setIsAnimating(false);
    }, 300);
  };

  const handleCategoryChange = (category: SubhashitaCategory | "all") => {
    setSelectedCategory(category);
    setIsAnimating(true);
    setTimeout(() => {
      if (category === "all") {
        setCurrentSubhashita(getRandomSubhashita());
      } else {
        const filtered = subhashitas.filter(s => s.category === category);
        if (filtered.length > 0) {
          setCurrentSubhashita(filtered[Math.floor(Math.random() * filtered.length)]);
        }
      }
      setIsAnimating(false);
    }, 300);
  };

  const categories = Object.keys(categoryLabels) as SubhashitaCategory[];

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-background via-gold/[0.02] to-background">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gold/5 rounded-full blur-3xl" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-gold" />
            <p className="font-sanskrit text-xl text-gold/70">
              सुभाषित
            </p>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-light tracking-[0.1em] text-foreground mb-4">
            Daily Dharma
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Ancient Sanskrit wisdom for modern life — timeless epigrams to illuminate your path.
          </p>
        </motion.div>

        {/* Category Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          <Badge
            variant="outline"
            className={`cursor-pointer transition-all ${
              selectedCategory === "all" 
                ? "bg-gold/20 text-gold border-gold/50" 
                : "hover:bg-gold/10"
            }`}
            onClick={() => handleCategoryChange("all")}
          >
            All
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className={`cursor-pointer transition-all ${
                selectedCategory === category 
                  ? categoryColors[category]
                  : "hover:bg-muted"
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {categoryLabels[category]}
            </Badge>
          ))}
        </motion.div>

        {/* Quote Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -top-6 -left-6 text-gold/10">
            <Quote className="w-16 h-16" />
          </div>
          
          <motion.div
            key={currentSubhashita.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isAnimating ? 0 : 1, y: isAnimating ? 20 : 0 }}
            transition={{ duration: 0.3 }}
            className="bg-card border border-border p-8 md:p-12 relative rounded-lg shadow-lg"
          >
            {/* Category Badge */}
            <div className="mb-6">
              <Badge 
                variant="outline" 
                className={categoryColors[currentSubhashita.category]}
              >
                {categoryLabels[currentSubhashita.category]}
              </Badge>
            </div>

            {/* Sanskrit */}
            <p className="font-sanskrit text-2xl md:text-3xl text-gold mb-4 leading-relaxed">
              {currentSubhashita.sanskrit}
            </p>

            {/* Transliteration */}
            <p className="font-body text-sm text-muted-foreground italic mb-6">
              {currentSubhashita.transliteration}
            </p>

            {/* Translation */}
            <p className="font-display text-xl md:text-2xl text-foreground mb-6">
              "{currentSubhashita.translation}"
            </p>

            {/* Meaning */}
            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              {currentSubhashita.meaning}
            </p>

            {/* Source */}
            {currentSubhashita.source && (
              <p className="font-body text-sm text-gold/60">
                — {currentSubhashita.source}
              </p>
            )}

            {/* Action Buttons */}
            <div className="absolute top-6 right-6 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShareModalOpen(true)}
                className="text-muted-foreground hover:text-gold hover:bg-gold/10"
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRefresh}
                className="text-muted-foreground hover:text-gold hover:bg-gold/10"
              >
                <RefreshCw className={`w-4 h-4 ${isAnimating ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Explore More Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Link to="/daily-dharma">
            <Button variant="outline" className="gap-2 border-gold/30 text-gold hover:bg-gold/10">
              Explore All Wisdom
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Share Modal */}
      <ShareQuoteModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        subhashita={currentSubhashita}
      />
    </section>
  );
};

export default DailyDharmaSection;
