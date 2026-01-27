import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Tag, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { ReadingModeProvider, ReadingModeToggle, ReadingModeWrapper, useReadingMode } from "@/components/blog/ReadingMode";
import BlogMetaTags from "@/components/blog/BlogMetaTags";
import ShareButtons from "@/components/blog/ShareButtons";
import OfflineReadingManager, { getOfflinePost } from "@/components/blog/OfflineReadingManager";
import { sampleBlogPosts, blogCategories, getBlogPostBySlug, BlogPost } from "@/data/blogPosts";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const SITE_URL = typeof window !== "undefined" ? window.location.origin : "https://rta-cosmic-order.lovable.app";

const BlogPostContent = () => {
  const { slug } = useParams();
  const { settings } = useReadingMode();
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    if (!slug) return;
    
    // Try to get from online first
    let foundPost = getBlogPostBySlug(slug);
    
    // If not found or offline, try offline storage
    if (!foundPost && !navigator.onLine) {
      foundPost = getOfflinePost(slug);
      if (foundPost) setIsOffline(true);
    }
    
    setPost(foundPost);
  }, [slug]);

  if (!post) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Post not found</p>
        <Link to="/blog" className="text-primary hover:underline mt-4 inline-block">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  return (
    <>
      <BlogMetaTags post={post} siteUrl={SITE_URL} />
      <ReadingModeWrapper>
        <article className={cn(
          "max-w-4xl mx-auto",
          !settings.enabled && "px-6 py-12"
        )}>
          {/* Back Button & Actions */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
            <Link to="/blog">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <OfflineReadingManager post={post} />
              <ShareButtons 
                title={post.title} 
                excerpt={post.excerpt} 
                url={postUrl} 
              />
              <ReadingModeToggle />
            </div>
          </div>

          {/* Offline indicator */}
          {isOffline && (
            <div className="mb-4 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-sm text-amber-600 dark:text-amber-400">
              Reading from offline storage
            </div>
          )}

          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={cn(
                "text-sm font-medium uppercase tracking-wider",
                settings.enabled ? "text-amber-600" : "text-primary"
              )}>
                {post.category}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {post.readTime} min read
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>

            <h1 className={cn(
              "font-display text-3xl md:text-4xl lg:text-5xl mb-4",
              settings.enabled ? "" : "text-foreground"
            )}>
              {post.title}
            </h1>

            <p className={cn(
              "text-lg",
              settings.enabled ? "opacity-80" : "text-muted-foreground"
            )}>
              {post.excerpt}
            </p>
          </header>

          {/* Content */}
          <div className={cn(
            "prose prose-lg max-w-none",
            settings.enabled ? "" : "dark:prose-invert"
          )}>
            <p>{post.content}</p>
            
            {/* Extended sample content for reading mode demo */}
            <h2>The Nature of Dharmic Living</h2>
            <p>
              In the vast tapestry of Sanātana Dharma, each thread represents a unique path toward the ultimate truth. 
              The sages of ancient Bhārata understood that the cosmic order, known as Ṛta, permeates all aspects of existence—
              from the grand movements of celestial bodies to the subtle stirrings of the human heart.
            </p>
            <p>
              When we align our actions with this divine order, we experience what the Upaniṣads call "śānti"—
              a profound peace that transcends the fluctuations of worldly circumstances. This is not mere 
              passivity but a dynamic harmony, like the stillness at the center of a spinning wheel.
            </p>
            
            <blockquote>
              धर्मो रक्षति रक्षितः — Dharma protects those who protect Dharma.
            </blockquote>
            
            <h2>Practical Applications</h2>
            <p>
              The beauty of Dharmic wisdom lies in its practical applicability. Whether in the marketplace 
              or the meditation hall, the principles remain the same: act with awareness, maintain equanimity, 
              and remember the interconnectedness of all beings.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-border">
            {post.tags.map((tag, i) => (
              <span
                key={i}
                className={cn(
                  "inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full",
                  settings.enabled 
                    ? "bg-black/10 text-current" 
                    : "bg-muted text-muted-foreground"
                )}
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* Share at bottom */}
          <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Share this article</p>
            <ShareButtons 
              title={post.title} 
              excerpt={post.excerpt} 
              url={postUrl} 
            />
          </div>
        </article>
      </ReadingModeWrapper>
    </>
  );
};

const BlogList = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPosts = activeCategory
    ? sampleBlogPosts.filter(post => post.category === activeCategory)
    : sampleBlogPosts;

  return (
    <>
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
    </>
  );
};

const Blog = () => {
  const { slug } = useParams();

  return (
    <ReadingModeProvider>
      <main className="min-h-screen bg-background">
        <Header />
        
        {slug ? <BlogPostContent /> : <BlogList />}

        <Footer />
      </main>
    </ReadingModeProvider>
  );
};

export default Blog;
