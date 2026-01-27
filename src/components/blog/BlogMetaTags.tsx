import { Helmet } from "react-helmet-async";
import { BlogPost } from "@/data/blogPosts";

interface BlogMetaTagsProps {
  post: BlogPost;
  siteUrl: string;
}

const BlogMetaTags = ({ post, siteUrl }: BlogMetaTagsProps) => {
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const imageUrl = post.featuredImage?.startsWith("http") 
    ? post.featuredImage 
    : `${siteUrl}${post.featuredImage || "/placeholder.svg"}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{post.title} | ṚTA Journal</title>
      <meta name="title" content={post.title} />
      <meta name="description" content={post.excerpt} />
      <meta name="author" content={post.author.name} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:url" content={postUrl} />
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={post.excerpt} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="ṚTA — The Order Behind Dharma" />
      <meta property="article:published_time" content={post.publishedAt} />
      <meta property="article:author" content={post.author.name} />
      <meta property="article:section" content={post.category} />
      {post.tags.map((tag, i) => (
        <meta key={i} property="article:tag" content={tag} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={postUrl} />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={post.excerpt} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Canonical URL */}
      <link rel="canonical" href={postUrl} />
    </Helmet>
  );
};

export default BlogMetaTags;
