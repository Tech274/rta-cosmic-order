import { motion } from "framer-motion";
import { BookOpen, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { scriptures } from "@/data/scriptures";
import { Button } from "@/components/ui/button";

const ScripturesSection = () => {
  // Feature the Bhagavad Gita prominently
  const gita = scriptures.find(s => s.id === "bhagavad-gita");
  
  if (!gita) return null;

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-yantra-pattern opacity-[0.02]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-sanskrit text-xl text-gold/70 mb-4">
            शास्त्र
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-light tracking-[0.1em] text-foreground mb-4">
            Scripture Library
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Explore the timeless wisdom of India's sacred texts — structured, searchable, 
            and interconnected for deep study.
          </p>
        </motion.div>

        {/* Featured Scripture - Bhagavad Gita */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Link 
            to={`/scriptures/${gita.id}`}
            className="group block bg-gradient-to-br from-card via-card to-gold/5 border border-border hover:border-gold/50 transition-all duration-500 overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              {/* Left side - Info */}
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-5 h-5 text-gold" />
                  <span className="font-body text-sm text-gold tracking-wide uppercase">Featured Scripture</span>
                </div>
                
                <p className="font-sanskrit text-3xl text-gold/80 mb-2">{gita.sanskritName}</p>
                <h3 className="font-display text-3xl md:text-4xl text-foreground mb-4 group-hover:text-gold transition-colors">
                  {gita.name}
                </h3>
                
                <p className="font-body text-muted-foreground mb-6 line-clamp-3">
                  {gita.description}
                </p>

                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                  <span>{gita.chapters.length} Chapters</span>
                  <span>•</span>
                  <span>700 Verses</span>
                  <span>•</span>
                  <span>Sanskrit & English</span>
                </div>

                <Button 
                  variant="outline" 
                  className="w-fit group-hover:bg-gold/10 group-hover:border-gold/50 transition-all"
                >
                  Begin Reading
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Right side - Chapter Preview */}
              <div className="hidden md:block relative">
                <div className="absolute inset-0 bg-gradient-to-r from-card to-transparent z-10" />
                <div className="grid grid-cols-3 gap-3 opacity-60 group-hover:opacity-80 transition-opacity">
                  {gita.chapters.slice(0, 9).map((chapter) => (
                    <div 
                      key={chapter.number}
                      className="aspect-square bg-muted/30 border border-border/50 flex flex-col items-center justify-center p-3"
                    >
                      <span className="font-display text-2xl text-gold/50">{chapter.number}</span>
                      <span className="font-body text-xs text-muted-foreground text-center line-clamp-2 mt-1">
                        {chapter.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link 
            to="/scriptures"
            className="inline-flex items-center gap-2 font-display text-sm tracking-[0.2em] uppercase text-muted-foreground hover:text-gold transition-colors"
          >
            Explore All Scriptures
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ScripturesSection;
