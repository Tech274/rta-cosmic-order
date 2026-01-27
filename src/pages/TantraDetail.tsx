import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TantraArticleCard from "@/components/tantra/TantraArticleCard";
import TantraArticleView from "@/components/tantra/TantraArticleView";
import { tantraCategories, getTantraArticleById } from "@/data/tantraScriptures";
import { ArrowLeft } from "lucide-react";

const TantraDetail = () => {
  const { categoryId, articleId } = useParams();

  // If we have an articleId, show the article view
  if (categoryId && articleId) {
    const article = getTantraArticleById(categoryId, articleId);
    const category = tantraCategories.find(c => c.id === categoryId);

    if (!article || !category) {
      return <Navigate to="/scriptures" replace />;
    }

    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-24">
          <TantraArticleView article={article} categoryName={category.name} />
        </div>
        <Footer />
      </main>
    );
  }

  // If we only have categoryId, show the category listing
  if (categoryId) {
    const category = tantraCategories.find(c => c.id === categoryId);

    if (!category) {
      return <Navigate to="/scriptures" replace />;
    }

    return (
      <main className="min-h-screen bg-background">
        <Header />

        <section className="pt-32 pb-16 px-6 relative">
          <div className="absolute inset-0 bg-yantra-pattern opacity-[0.02]" />
          <div className="max-w-6xl mx-auto relative z-10">
            <Link
              to="/scriptures"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Scriptures</span>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <p className="font-sanskrit text-2xl text-gold/70 mb-4">
                {category.sanskritName}
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-light tracking-[0.1em] text-foreground mb-6">
                {category.name}
              </h1>
              <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
                {category.description}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {category.articles.map((article, index) => (
                <TantraArticleCard
                  key={article.id}
                  article={article}
                  categoryId={categoryId}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  return <Navigate to="/scriptures" replace />;
};

export default TantraDetail;
