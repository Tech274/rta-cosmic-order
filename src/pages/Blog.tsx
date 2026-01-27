import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { sampleBlogPosts, blogCategories } from "@/data/blogPosts";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPosts = activeCategory
    ? sampleBlogPosts.filter(post => post.category === activeCategory)
    : sampleBlogPosts;

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
            <p className="font-sanskrit text-xl text-gold/70 mb-4">
              पत्रिका
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.1em] text-foreground mb-6">
              The Journal
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Insights, reflections, and explorations into Dharmic wisdom, spiritual practice,
              and the timeless teachings of Sanātana Dharma.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-all duration-300 border",
                !activeCategory
                  ? "bg-gold/20 text-gold border-gold/30"
                  : "bg-transparent text-muted-foreground border-border hover:border-gold/50"
              )}
            >
              All Articles
            </button>
            {blogCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-all duration-300 border",
                  activeCategory === category.id
                    ? "bg-gold/20 text-gold border-gold/30"
                    : "bg-transparent text-muted-foreground border-border hover:border-gold/50"
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-body text-sm text-muted-foreground mb-8">
              {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"} 
              {activeCategory && ` in ${blogCategories.find(c => c.id === activeCategory)?.label}`}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <p className="font-sanskrit text-2xl text-gold/50 mb-2">शून्य</p>
                <p className="text-muted-foreground">No articles found in this category.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Blog;
