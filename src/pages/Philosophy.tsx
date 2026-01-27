import { useParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhilosophyNav from "@/components/philosophy/PhilosophyNav";
import PhilosophyArticleView from "@/components/philosophy/PhilosophyArticleView";
import PhilosophyToolbar from "@/components/philosophy/PhilosophyToolbar";
import { getArticleById, philosophyArticles } from "@/data/philosophyArticles";

const Philosophy = () => {
  const { articleId } = useParams();

  // Default to first article if no ID provided
  const effectiveId = articleId || philosophyArticles[0]?.id;
  const article = effectiveId ? getArticleById(effectiveId) : undefined;

  // Redirect to first article if invalid ID
  if (!article && philosophyArticles.length > 0) {
    return <Navigate to={`/philosophy/${philosophyArticles[0].id}`} replace />;
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-24">
          <p className="text-muted-foreground">No articles available.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="flex items-center justify-between">
          <PhilosophyNav />
          <PhilosophyToolbar currentArticleId={article.id} />
        </div>
      </div>
      <PhilosophyArticleView article={article} />
      <Footer />
    </div>
  );
};

export default Philosophy;
