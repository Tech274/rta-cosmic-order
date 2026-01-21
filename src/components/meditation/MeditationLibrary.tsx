import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Clock, Sparkles, ChevronRight } from "lucide-react";
import { 
  meditationTechniques, 
  categoryLabels, 
  categoryIcons,
  type MeditationTechnique 
} from "@/data/meditationTechniques";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface MeditationLibraryProps {
  onSelectTechnique: (technique: MeditationTechnique) => void;
}

const difficultyColors = {
  beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
  intermediate: 'bg-gold/20 text-gold border-gold/30',
  advanced: 'bg-red-500/20 text-red-400 border-red-500/30'
};

const MeditationLibrary = ({ onSelectTechnique }: MeditationLibraryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<MeditationTechnique['category'] | 'all'>('all');
  const [expandedTechnique, setExpandedTechnique] = useState<string | null>(null);

  const categories: (MeditationTechnique['category'] | 'all')[] = ['all', 'breath', 'mantra', 'visualization', 'awareness', 'devotional'];

  const filteredTechniques = selectedCategory === 'all' 
    ? meditationTechniques 
    : meditationTechniques.filter(t => t.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-sm border transition-all ${
              selectedCategory === category
                ? 'bg-gold/20 border-gold/50 text-gold'
                : 'border-border hover:border-gold/30 text-muted-foreground'
            }`}
          >
            {category === 'all' ? '🌟 All' : `${categoryIcons[category]} ${categoryLabels[category]}`}
          </button>
        ))}
      </div>

      {/* Techniques Grid */}
      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {filteredTechniques.map((technique) => (
            <motion.div
              key={technique.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-card border border-border overflow-hidden"
            >
              {/* Header */}
              <button
                onClick={() => setExpandedTechnique(
                  expandedTechnique === technique.id ? null : technique.id
                )}
                className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-gold/10 text-2xl">
                    {categoryIcons[technique.category]}
                  </div>
                  <div className="text-left">
                    <h3 className="font-display text-lg text-foreground">{technique.name}</h3>
                    <p className="font-sanskrit text-sm text-gold/70">{technique.sanskritName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={difficultyColors[technique.difficulty]}>
                    {technique.difficulty}
                  </Badge>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <Clock className="w-4 h-4" />
                    {technique.duration / 60}min
                  </div>
                  <ChevronRight 
                    className={`w-5 h-5 text-muted-foreground transition-transform ${
                      expandedTechnique === technique.id ? 'rotate-90' : ''
                    }`} 
                  />
                </div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedTechnique === technique.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-border"
                  >
                    <div className="p-4 space-y-4">
                      {/* Description */}
                      <p className="font-body text-muted-foreground">{technique.description}</p>

                      {/* Instructions */}
                      <div>
                        <h4 className="font-display text-sm text-foreground mb-2 flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-gold" />
                          Instructions
                        </h4>
                        <ol className="list-decimal list-inside space-y-1">
                          {technique.instructions.map((instruction, i) => (
                            <li key={i} className="font-body text-sm text-muted-foreground">
                              {instruction}
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Benefits */}
                      <div>
                        <h4 className="font-display text-sm text-foreground mb-2 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-gold" />
                          Benefits
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {technique.benefits.map((benefit, i) => (
                            <Badge 
                              key={i} 
                              variant="outline" 
                              className="text-xs bg-muted/30"
                            >
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Tradition */}
                      <p className="text-xs text-muted-foreground">
                        Tradition: <span className="text-gold">{technique.tradition}</span>
                      </p>

                      {/* Start Button */}
                      <Button
                        onClick={() => onSelectTechnique(technique)}
                        className="w-full bg-gold hover:bg-gold/90 text-background"
                      >
                        Begin {technique.name}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MeditationLibrary;
