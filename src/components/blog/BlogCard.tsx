import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, Tag } from "lucide-react";
import type { BlogPost } from "@/data/blogPosts";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard = ({ post, index }: BlogCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group block bg-card border border-border hover:border-gold/50 transition-all duration-300"
      >
        {/* Featured Image */}
        <div className="aspect-[16/9] bg-muted relative overflow-hidden">
          <div className="absolute inset-0 bg-yantra-pattern opacity-10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-sanskrit text-2xl text-gold/40">ॐ</span>
          </div>
          <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider text-gold">
              {post.category}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {post.readTime} min read
            </span>
          </div>

          <h3 className="font-display text-xl text-foreground mb-3 group-hover:text-gold transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="font-body text-sm text-muted-foreground line-clamp-3 mb-4">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-muted text-muted-foreground"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span className="text-xs text-gold group-hover:underline">
              Read more →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCard;
