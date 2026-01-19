import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Bookmark, Filter } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubhashitaCard from "@/components/dailydharma/SubhashitaCard";
import EmailSubscribeForm from "@/components/dailydharma/EmailSubscribeForm";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useBookmarkedSubhashitas } from "@/hooks/useBookmarks";
import {
  subhashitas,
  categoryLabels,
  categoryColors,
  type SubhashitaCategory,
} from "@/data/dailyDharma";

const DailyDharma = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<SubhashitaCategory | "all">("all");
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  const { user } = useAuth();
  const { data: bookmarks = [] } = useBookmarkedSubhashitas();

  const categories = Object.keys(categoryLabels) as SubhashitaCategory[];

  const filteredSubhashitas = useMemo(() => {
    return subhashitas.filter((s) => {
      // Category filter
      if (selectedCategory !== "all" && s.category !== selectedCategory) {
        return false;
      }

      // Bookmarks filter
      if (showBookmarksOnly && !bookmarks.includes(s.id)) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          s.sanskrit.includes(searchQuery) ||
          s.transliteration.toLowerCase().includes(query) ||
          s.translation.toLowerCase().includes(query) ||
          s.meaning.toLowerCase().includes(query) ||
          (s.source && s.source.toLowerCase().includes(query))
        );
      }

      return true;
    });
  }, [selectedCategory, showBookmarksOnly, searchQuery, bookmarks]);

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative">
        <div className="absolute inset-0 bg-yantra-pattern opacity-[0.02]" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="font-sanskrit text-xl text-gold/70 mb-4">सुभाषित</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.1em] text-foreground mb-6">
              Daily Dharma
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              A treasury of Sanskrit wisdom — ancient epigrams translated into 
              poetry with interpretive meaning for modern seekers.
            </p>
          </motion.div>

          {/* Email Subscribe Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-md mx-auto"
          >
            <EmailSubscribeForm />
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card border border-border p-6 mb-8"
          >
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by Sanskrit, translation, meaning..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Badge
                variant="outline"
                className={`cursor-pointer transition-all ${
                  selectedCategory === "all"
                    ? "bg-gold/20 text-gold border-gold/50"
                    : "hover:bg-muted"
                }`}
                onClick={() => setSelectedCategory("all")}
              >
                All Categories
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
                  onClick={() => setSelectedCategory(category)}
                >
                  {categoryLabels[category]}
                </Badge>
              ))}
            </div>

            {/* Bookmarks Toggle */}
            {user && (
              <div className="flex items-center gap-4">
                <Button
                  variant={showBookmarksOnly ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
                  className={`gap-2 ${
                    showBookmarksOnly ? "bg-gold hover:bg-gold/90 text-background" : ""
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${showBookmarksOnly ? "fill-current" : ""}`} />
                  My Bookmarks ({bookmarks.length})
                </Button>
              </div>
            )}
          </motion.div>

          {/* Results count */}
          <p className="font-body text-sm text-muted-foreground mb-8">
            Showing {filteredSubhashitas.length} of {subhashitas.length} subhashitas
          </p>

          {/* Subhashita Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSubhashitas.map((subhashita, index) => (
              <SubhashitaCard
                key={subhashita.id}
                subhashita={subhashita}
                index={index}
              />
            ))}
          </div>

          {/* Empty state */}
          {filteredSubhashitas.length === 0 && (
            <div className="text-center py-20">
              <p className="font-sanskrit text-2xl text-gold/40 mb-4">
                न किञ्चित् प्राप्तम्
              </p>
              <p className="font-display text-xl text-muted-foreground">
                {showBookmarksOnly
                  ? "No bookmarked subhashitas yet"
                  : "No subhashitas found for your search"}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default DailyDharma;
