import { motion } from "framer-motion";
import { Quote, BookMarked } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PhilosophyArticle, RecommendedRead } from "@/data/philosophyArticles";

interface CitationsPanelProps {
  citations: string[];
  recommendedReads: RecommendedRead[];
}

const typeIcons: Record<RecommendedRead["type"], string> = {
  book: "📖",
  audiobook: "🎧",
  course: "🎓",
  scripture: "📜"
};

const CitationsPanel = ({ citations, recommendedReads }: CitationsPanelProps) => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="space-y-6"
    >
      {/* Citations */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-display">
            <Quote className="h-4 w-4 text-gold" />
            Primary Sources
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {citations.map((citation, idx) => (
            <div
              key={idx}
              className="text-sm text-muted-foreground border-l-2 border-muted pl-3 py-1"
            >
              {citation}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recommended Reads */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-display">
            <BookMarked className="h-4 w-4 text-gold" />
            Recommended Reading
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recommendedReads.map((read) => (
            <div
              key={read.id}
              className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
            >
              <span className="text-lg">{typeIcons[read.type]}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {read.title}
                </p>
                {read.author && (
                  <p className="text-xs text-muted-foreground">
                    {read.author}
                  </p>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Educational Trust Marker */}
      <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
        <p className="text-xs text-muted-foreground text-center">
          This is educational content curated for scholarly reference.
          <br />
          <span className="text-gold/70">No commercial affiliation.</span>
        </p>
      </div>
    </motion.aside>
  );
};

export default CitationsPanel;
