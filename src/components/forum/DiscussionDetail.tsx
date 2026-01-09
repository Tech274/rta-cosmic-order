import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDiscussionDetail, Discussion, DiscussionReply } from "@/hooks/useDiscussions";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

interface DiscussionDetailProps {
  discussionId: string;
  onBack: () => void;
}

const hallLabels = {
  tattva: "Tattva",
  dharma: "Dharma",
  samvada: "Saṃvāda"
};

const ReplyCard = ({ 
  reply, 
  onUpvote, 
  canUpvote 
}: { 
  reply: DiscussionReply; 
  onUpvote: (id: string) => void;
  canUpvote: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="border border-border p-4"
  >
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <button
          onClick={() => canUpvote && onUpvote(reply.id)}
          disabled={!canUpvote}
          className={`p-1 border transition-colors ${
            reply.has_upvoted 
              ? "border-gold bg-gold/10 text-gold" 
              : "border-border text-muted-foreground hover:border-gold/50"
          } ${!canUpvote ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <ArrowUp className="w-3 h-3" />
        </button>
        <span className="font-display text-xs text-foreground mt-1">{reply.upvotes}</span>
      </div>

      <div className="flex-1">
        <p className="font-body text-foreground whitespace-pre-wrap mb-3">{reply.content}</p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground font-body">
          <span>
            <span className="text-gold">{reply.author_name}</span> ({reply.author_level})
          </span>
          <span>{formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const DiscussionDetail = ({ discussionId, onBack }: DiscussionDetailProps) => {
  const { discussion, replies, loading, addReply, toggleUpvoteDiscussion, toggleUpvoteReply } = useDiscussionDetail(discussionId);
  const { user } = useAuth();
  const { toast } = useToast();
  const [replyContent, setReplyContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitReply = async () => {
    if (!replyContent.trim()) return;
    
    setSubmitting(true);
    const { error } = await addReply(replyContent.trim());
    setSubmitting(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to post reply",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Reply posted",
        description: "You earned 8 karma for contributing!"
      });
      setReplyContent("");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <span className="font-body text-muted-foreground">Loading...</span>
      </div>
    );
  }

  if (!discussion) {
    return (
      <div className="text-center py-12">
        <p className="font-body text-muted-foreground">Discussion not found</p>
        <Button variant="outline" onClick={onBack} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Forum
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Forum
      </button>

      {/* Main discussion */}
      <div className="border border-border p-6">
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <button
              onClick={() => user && toggleUpvoteDiscussion()}
              disabled={!user}
              className={`p-2 border transition-colors ${
                discussion.has_upvoted 
                  ? "border-gold bg-gold/10 text-gold" 
                  : "border-border text-muted-foreground hover:border-gold/50"
              } ${!user ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <ArrowUp className="w-5 h-5" />
            </button>
            <span className="font-display text-lg text-foreground mt-1">{discussion.upvotes}</span>
          </div>

          <div className="flex-1">
            <span className="font-body text-xs px-2 py-0.5 bg-gold/10 text-gold border border-gold/30">
              {hallLabels[discussion.hall]}
            </span>

            <h1 className="font-display text-2xl text-foreground mt-3 mb-4">
              {discussion.title}
            </h1>

            <p className="font-body text-foreground whitespace-pre-wrap mb-4">
              {discussion.content}
            </p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground font-body">
              <span>
                by <span className="text-gold">{discussion.author_name}</span> ({discussion.author_level})
              </span>
              <span>{formatDistanceToNow(new Date(discussion.created_at), { addSuffix: true })}</span>
              <span>{discussion.views} views</span>
            </div>
          </div>
        </div>
      </div>

      {/* Replies */}
      <div>
        <h3 className="font-display text-sm tracking-[0.1em] text-muted-foreground uppercase mb-4">
          {replies.length} {replies.length === 1 ? "Response" : "Responses"}
        </h3>

        <div className="space-y-4">
          {replies.map((reply) => (
            <ReplyCard 
              key={reply.id} 
              reply={reply} 
              onUpvote={toggleUpvoteReply}
              canUpvote={!!user}
            />
          ))}

          {replies.length === 0 && (
            <p className="font-body text-muted-foreground text-center py-8">
              No responses yet. Be the first to contribute.
            </p>
          )}
        </div>
      </div>

      {/* Reply form */}
      {user ? (
        <div className="border border-border p-4">
          <Textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Share your perspective, cite texts, or ask clarifying questions..."
            className="font-body min-h-[100px] mb-3"
            maxLength={3000}
          />
          <div className="flex justify-end">
            <Button onClick={handleSubmitReply} disabled={submitting || !replyContent.trim()}>
              <Send className="w-4 h-4 mr-2" />
              {submitting ? "Posting..." : "Post Response"}
            </Button>
          </div>
        </div>
      ) : (
        <p className="font-body text-muted-foreground text-center py-4 border border-border">
          Sign in to contribute to this discussion
        </p>
      )}
    </div>
  );
};

export default DiscussionDetail;
