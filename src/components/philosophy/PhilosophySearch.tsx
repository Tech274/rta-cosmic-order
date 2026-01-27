import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, FileText, Tag, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { philosophyArticles, type PhilosophyArticle } from "@/data/philosophyArticles";

interface PhilosophySearchProps {
  onClose?: () => void;
}

const PhilosophySearch = ({ onClose }: PhilosophySearchProps) => {
  const [query, setQuery] = useState("");

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase().trim();

    return philosophyArticles
      .map((article) => {
        let score = 0;
        const matches: string[] = [];

        // Title match (highest weight)
        if (article.title.toLowerCase().includes(searchTerm)) {
          score += 10;
          matches.push("title");
        }

        // Sanskrit title match
        if (article.sanskritTitle?.toLowerCase().includes(searchTerm)) {
          score += 8;
          matches.push("sanskrit");
        }

        // Transliteration match
        if (article.transliteration?.toLowerCase().includes(searchTerm)) {
          score += 8;
          matches.push("transliteration");
        }

        // Tag match
        const matchingTags = article.tags.filter((tag) =>
          tag.toLowerCase().includes(searchTerm)
        );
        if (matchingTags.length > 0) {
          score += 5 * matchingTags.length;
          matches.push("tags");
        }

        // Category match
        if (article.category.toLowerCase().includes(searchTerm)) {
          score += 4;
          matches.push("category");
        }

        // Definition match
        if (article.canonicalDefinition.toLowerCase().includes(searchTerm)) {
          score += 3;
          matches.push("definition");
        }

        // Full-text match in other fields
        const fullText = [
          article.historicalOrigins,
          article.relationshipToDharma,
          article.implicationsForEthics,
          article.cosmologicalSignificance,
          ...article.keyPrinciples,
          ...article.citationList,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        if (fullText.includes(searchTerm)) {
          score += 2;
          if (!matches.includes("definition")) matches.push("content");
        }

        return { article, score, matches, matchingTags };
      })
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [query]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    philosophyArticles.forEach((article) => {
      article.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, []);

  const categoryLabels: Record<string, string> = {
    metaphysics: "Metaphysics",
    ethics: "Ethics",
    cosmology: "Cosmology",
    ritual: "Ritual",
    liberation: "Liberation",
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by term, tag, or concept..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10 font-body"
          autoFocus
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={() => setQuery("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {!query && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground font-body">Popular tags:</p>
          <div className="flex flex-wrap gap-2">
            {allTags.slice(0, 12).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="cursor-pointer hover:bg-gold/10 hover:border-gold transition-colors"
                onClick={() => setQuery(tag)}
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {query && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-2"
          >
            {searchResults.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground font-body">
                  {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} found
                </p>
                {searchResults.map(({ article, matches, matchingTags }) => (
                  <Link
                    key={article.id}
                    to={`/philosophy/${article.id}`}
                    onClick={onClose}
                  >
                    <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            <FileText className="h-4 w-4 text-gold" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-display text-sm text-foreground truncate">
                                {article.title}
                              </h4>
                              <Badge variant="secondary" className="text-xs shrink-0">
                                {categoryLabels[article.category]}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 font-body">
                              {article.canonicalDefinition}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              {matches.includes("tags") && matchingTags.length > 0 && (
                                <div className="flex gap-1">
                                  {matchingTags.slice(0, 3).map((tag) => (
                                    <Badge
                                      key={tag}
                                      variant="outline"
                                      className="text-xs border-gold/30 text-gold"
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                              {matches.includes("content") && (
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <BookOpen className="h-3 w-3" />
                                  Found in content
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground font-body">
                  No articles found for "{query}"
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhilosophySearch;
