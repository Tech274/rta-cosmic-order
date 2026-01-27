import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { philosophyArticles, categoryLabels, type PhilosophyArticle } from "@/data/philosophyArticles";

const PhilosophyNav = () => {
  const { articleId } = useParams();

  // Group articles by category
  const articlesByCategory = philosophyArticles.reduce((acc, article) => {
    if (!acc[article.category]) {
      acc[article.category] = [];
    }
    acc[article.category].push(article);
    return acc;
  }, {} as Record<PhilosophyArticle["category"], PhilosophyArticle[]>);

  const categories = Object.keys(articlesByCategory) as PhilosophyArticle["category"][];

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-8 overflow-x-auto py-4 scrollbar-hide">
          {categories.map((category) => (
            <div key={category} className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                {categoryLabels[category]}:
              </span>
              <div className="flex gap-2">
                {articlesByCategory[category].map((article) => (
                  <Link
                    key={article.id}
                    to={`/philosophy/${article.id}`}
                    className={cn(
                      "text-sm px-3 py-1.5 rounded-full transition-all duration-200",
                      articleId === article.id
                        ? "bg-gold/20 text-gold border border-gold/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {article.transliteration || article.title.split(" — ")[0]}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default PhilosophyNav;
