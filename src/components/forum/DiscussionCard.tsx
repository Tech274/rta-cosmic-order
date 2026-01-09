import { motion } from "framer-motion";
import { ArrowUp, MessageCircle, Eye } from "lucide-react";
import { Discussion } from "@/hooks/useDiscussions";
import { useAuth } from "@/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";

interface DiscussionCardProps {
  discussion: Discussion;
  onUpvote: (id: string) => void;
  onClick: (id: string) => void;
}

const hallLabels = {
  tattva: "Tattva",
  dharma: "Dharma",
  samvada: "Saṃvāda"
};

const DiscussionCard = ({ discussion, onUpvote, onClick }: DiscussionCardProps) => {
  const { user } = useAuth();

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (user) {
      onUpvote(discussion.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-border p-4 cursor-pointer hover:border-gold/50 transition-colors"
      onClick={() => onClick(discussion.id)}
    >
      <div className="flex gap-4">
        {/* Upvote button */}
        <div className="flex flex-col items-center">
          <button
            onClick={handleUpvote}
            disabled={!user}
            className={`p-1.5 border transition-colors ${
              discussion.has_upvoted 
                ? "border-gold bg-gold/10 text-gold" 
                : "border-border text-muted-foreground hover:border-gold/50"
            } ${!user ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          <span className="font-display text-sm text-foreground mt-1">{discussion.upvotes}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-body text-xs px-2 py-0.5 bg-gold/10 text-gold border border-gold/30">
              {hallLabels[discussion.hall]}
            </span>
          </div>

          <h3 className="font-display text-lg text-foreground mb-2 line-clamp-2">
            {discussion.title}
          </h3>

          <p className="font-body text-sm text-muted-foreground mb-3 line-clamp-2">
            {discussion.content}
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground font-body">
            <span>
              by <span className="text-gold">{discussion.author_name}</span> ({discussion.author_level})
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              {discussion.reply_count}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {discussion.views}
            </span>
            <span>{formatDistanceToNow(new Date(discussion.created_at), { addSuffix: true })}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DiscussionCard;
