import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { type Subhashita, categoryLabels } from "@/data/dailyDharma";

interface AIExplanationProps {
  subhashita: Subhashita;
}

const AIExplanation = ({ subhashita }: AIExplanationProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGetExplanation = async () => {
    if (explanation) {
      setIsExpanded(!isExpanded);
      return;
    }

    setIsLoading(true);
    setIsExpanded(true);

    try {
      const { data, error } = await supabase.functions.invoke("explain-subhashita", {
        body: {
          sanskrit: subhashita.sanskrit,
          transliteration: subhashita.transliteration,
          translation: subhashita.translation,
          meaning: subhashita.meaning,
          source: subhashita.source,
          category: categoryLabels[subhashita.category],
        },
      });

      if (error) throw error;

      if (data?.success && data?.explanation) {
        setExplanation(data.explanation);
      } else {
        throw new Error(data?.error || "Failed to generate explanation");
      }
    } catch (error) {
      console.error("Explanation error:", error);
      toast({
        title: "Could not generate explanation",
        description: "Please try again later.",
        variant: "destructive",
      });
      setIsExpanded(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Parse markdown-like formatting
  const formatExplanation = (text: string) => {
    return text.split('\n').map((line, index) => {
      // Bold headers
      if (line.startsWith('**') && line.includes('**:')) {
        const headerMatch = line.match(/\*\*(.+?)\*\*:?(.*)/);
        if (headerMatch) {
          return (
            <div key={index} className="mt-4 first:mt-0">
              <h4 className="font-display text-sm font-medium text-primary mb-1">
                {headerMatch[1]}
              </h4>
              {headerMatch[2] && (
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {headerMatch[2].trim()}
                </p>
              )}
            </div>
          );
        }
      }
      
      // Regular paragraph
      if (line.trim()) {
        return (
          <p key={index} className="text-muted-foreground text-sm leading-relaxed mt-2">
            {line.replace(/\*\*(.*?)\*\*/g, '$1')}
          </p>
        );
      }
      
      return null;
    });
  };

  return (
    <div className="border-t border-border pt-4 mt-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleGetExplanation}
        disabled={isLoading}
        className="w-full justify-between text-muted-foreground hover:text-foreground gap-2 h-auto py-2"
      >
        <span className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="font-body text-sm">
            {explanation ? "AI Philosophical Insight" : "Get AI Explanation"}
          </span>
        </span>
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : isExpanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </Button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-2">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Contemplating the wisdom...
                    </p>
                  </div>
                </div>
              ) : explanation ? (
                <div className="bg-gradient-to-br from-primary/5 via-transparent to-transparent p-4 rounded-lg border border-primary/10">
                  <div className="prose prose-sm prose-invert max-w-none">
                    {formatExplanation(explanation)}
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIExplanation;
