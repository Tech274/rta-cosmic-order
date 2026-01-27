import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BookOpen, Link as LinkIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { PhilosophicalQuestion } from "@/data/questionsData";

interface InteractiveQuestionProps {
  question: PhilosophicalQuestion;
  index: number;
}

const InteractiveQuestion = ({ question, index }: InteractiveQuestionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <div className="group p-6 border border-border hover:border-gold/50 transition-all duration-500 cursor-pointer bg-background">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="font-sanskrit text-2xl text-gold/70 mb-2">
                  {question.sanskrit}
                </p>
                <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-gold transition-colors">
                  {question.question}
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  {question.description}
                </p>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="shrink-0 mt-2"
              >
                <ChevronDown className="w-5 h-5 text-gold" />
              </motion.div>
            </div>
          </div>
        </CollapsibleTrigger>

        <AnimatePresence>
          {isOpen && (
            <CollapsibleContent forceMount>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="border border-t-0 border-gold/30 bg-card"
              >
                <div className="p-6 space-y-6">
                  {/* Answer Content */}
                  <div className="prose prose-sm max-w-none">
                    {question.answer.split('\n\n').map((paragraph, idx) => {
                      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                        return (
                          <h4 key={idx} className="font-display text-lg text-gold mt-6 mb-3">
                            {paragraph.replace(/\*\*/g, '')}
                          </h4>
                        );
                      }
                      if (paragraph.startsWith('1.') || paragraph.startsWith('-')) {
                        return (
                          <div key={idx} className="pl-4 space-y-2 text-muted-foreground">
                            {paragraph.split('\n').map((line, lineIdx) => (
                              <p key={lineIdx} className="font-body text-sm">
                                {line.replace(/^\d+\.\s*|\-\s*/, '• ')}
                              </p>
                            ))}
                          </div>
                        );
                      }
                      return (
                        <p key={idx} className="font-body text-sm text-foreground/90 leading-relaxed">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>

                  {/* Related Concepts */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <LinkIcon className="w-4 h-4 text-gold" />
                      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Related Concepts
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {question.relatedConcepts.map((concept, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs bg-gold/10 text-gold border border-gold/20 rounded-full"
                        >
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sources */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-4 h-4 text-gold" />
                      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Sources
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {question.sources.map((source, i) => (
                        <li key={i} className="text-xs text-muted-foreground italic">
                          {source}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </CollapsibleContent>
          )}
        </AnimatePresence>
      </Collapsible>
    </motion.div>
  );
};

export default InteractiveQuestion;
