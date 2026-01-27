import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Feather } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import { sampleBlogPosts } from "@/data/blogPosts";

const BlogSection = () => {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Feather className="w-5 h-5 text-gold" />
            <h2 className="font-display text-sm tracking-[0.3em] text-gold uppercase">
              The Journal
            </h2>
          </div>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights, reflections, and explorations into Dharmic wisdom and spiritual practice.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {sampleBlogPosts.slice(0, 3).map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors font-display text-sm tracking-wider"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
