import { motion } from "framer-motion";
import { ArrowRight, Link2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import type { CrossReference } from "@/data/philosophyArticles";

interface CrossReferencesProps {
  references: CrossReference[];
}

const CrossReferences = ({ references }: CrossReferencesProps) => {
  if (references.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="mt-12"
    >
      <div className="flex items-center gap-3 mb-6">
        <Link2 className="h-5 w-5 text-gold" />
        <h2 className="font-display text-xl text-foreground">Related Concepts</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {references.map((ref, idx) => (
          <motion.div
            key={ref.concept}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + idx * 0.1 }}
          >
            {ref.articleId ? (
              <Link to={`/philosophy/${ref.articleId}`}>
                <Card className="group hover:border-gold/30 transition-all duration-300 bg-card/50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-display text-lg text-foreground group-hover:text-gold transition-colors">
                          {ref.concept}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {ref.description}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-gold group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <Card className="bg-card/50 border-dashed">
                <CardContent className="p-4">
                  <h3 className="font-display text-lg text-foreground/70">
                    {ref.concept}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {ref.description}
                  </p>
                  <span className="text-xs text-muted-foreground/50 mt-2 block">
                    Article coming soon
                  </span>
                </CardContent>
              </Card>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default CrossReferences;
