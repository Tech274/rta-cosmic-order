import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { philosophyArticles, categoryLabels } from "@/data/philosophyArticles";

const PhilosophyPreviewSection = () => {
  // Show first 4 articles as preview
  const previewArticles = philosophyArticles.slice(0, 4);

  return (
    <section className="py-24 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-sm tracking-[0.3em] text-gold uppercase mb-4">
            Philosophical Articles
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Deep explorations of foundational concepts — sourced from Vedic literature 
            and academic scholarship.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {previewArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/philosophy/${article.id}`}>
                <Card className="group h-full hover:border-gold/30 transition-all duration-500 bg-card/50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-gold/10 text-gold">
                        {categoryLabels[article.category]}
                      </span>
                      <BookOpen className="h-4 w-4 text-muted-foreground group-hover:text-gold transition-colors" />
                    </div>

                    <div className="mb-4">
                      {article.sanskritTitle && (
                        <span className="font-display text-2xl text-gold/80 mr-3">
                          {article.sanskritTitle}
                        </span>
                      )}
                      <h3 className="font-display text-xl text-foreground group-hover:text-gold transition-colors mt-2">
                        {article.title}
                      </h3>
                    </div>

                    <p className="font-body text-sm text-muted-foreground line-clamp-3 mb-4">
                      {article.canonicalDefinition}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-gold transition-colors">
                      <span>Read article</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Link to="/philosophy">
            <Button variant="outline" className="border-gold/30 hover:border-gold hover:bg-gold/5">
              Explore All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PhilosophyPreviewSection;
