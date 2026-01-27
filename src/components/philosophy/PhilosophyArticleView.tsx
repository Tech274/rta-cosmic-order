import ArticleHeader from "./ArticleHeader";
import ArticleContent from "./ArticleContent";
import CrossReferences from "./CrossReferences";
import CitationsPanel from "./CitationsPanel";
import type { PhilosophyArticle } from "@/data/philosophyArticles";

interface PhilosophyArticleViewProps {
  article: PhilosophyArticle;
}

const PhilosophyArticleView = ({ article }: PhilosophyArticleViewProps) => {
  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid lg:grid-cols-[1fr,320px] gap-12">
        {/* Main Content */}
        <div>
          <ArticleHeader article={article} />
          <ArticleContent article={article} />
          <CrossReferences references={article.crossReferences} />
        </div>

        {/* Sidebar */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <CitationsPanel
            citations={article.citationList}
            recommendedReads={article.recommendedReads}
          />
        </div>
      </div>
    </article>
  );
};

export default PhilosophyArticleView;
