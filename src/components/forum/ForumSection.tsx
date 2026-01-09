import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDiscussions, HallType } from "@/hooks/useDiscussions";
import { useAuth } from "@/hooks/useAuth";
import DiscussionCard from "./DiscussionCard";
import CreateDiscussionForm from "./CreateDiscussionForm";
import DiscussionDetail from "./DiscussionDetail";
import AuthModal from "@/components/auth/AuthModal";
import SearchButton from "@/components/search/SearchButton";
import SearchModal from "@/components/search/SearchModal";

const halls: { value: HallType | "all"; label: string }[] = [
  { value: "all", label: "All Halls" },
  { value: "tattva", label: "Tattva" },
  { value: "dharma", label: "Dharma" },
  { value: "samvada", label: "Saṃvāda" }
];

const ForumSection = () => {
  const [selectedHall, setSelectedHall] = useState<HallType | "all">("all");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState<string | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const { user } = useAuth();

  const { discussions, loading, createDiscussion, toggleUpvote } = useDiscussions(
    selectedHall === "all" ? undefined : selectedHall
  );

  const handleNewPost = () => {
    if (user) {
      setShowCreateForm(true);
    } else {
      setAuthModalOpen(true);
    }
  };

  if (selectedDiscussion) {
    return (
      <section id="forum" className="py-24 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <DiscussionDetail
            discussionId={selectedDiscussion}
            onBack={() => setSelectedDiscussion(null)}
          />
        </div>
        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      </section>
    );
  }

  return (
    <section id="forum" className="py-24 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-sm tracking-[0.3em] text-gold uppercase mb-4">
            The Forum
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Engage in philosophical discourse. Post questions, share insights, and earn karma
            through meaningful contributions.
          </p>
        </motion.div>

        {/* Karma rewards info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {[
            { action: "Post a question", karma: "+15" },
            { action: "Contribute a response", karma: "+8" },
            { action: "Receive an upvote", karma: "+5" }
          ].map((item) => (
            <div key={item.action} className="border border-border p-3 text-center">
              <span className="font-display text-gold text-lg block">{item.karma}</span>
              <span className="font-body text-xs text-muted-foreground">{item.action}</span>
            </div>
          ))}
        </motion.div>

        {/* Hall filter & New post button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex gap-2">
            {halls.map((hall) => (
              <button
                key={hall.value}
                onClick={() => setSelectedHall(hall.value)}
                className={`px-3 py-1.5 font-body text-sm border transition-colors ${
                  selectedHall === hall.value
                    ? "border-gold bg-gold/10 text-foreground"
                    : "border-border text-muted-foreground hover:border-gold/50"
                }`}
              >
                {hall.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <SearchButton onClick={() => setSearchModalOpen(true)} />
            <Button onClick={handleNewPost}>
              <Plus className="w-4 h-4 mr-2" />
              New Question
            </Button>
          </div>
        </div>

        {/* Create form */}
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <CreateDiscussionForm
              onSubmit={createDiscussion}
              onCancel={() => setShowCreateForm(false)}
            />
          </motion.div>
        )}

        {/* Discussions list */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <span className="font-body text-muted-foreground">Loading discussions...</span>
          </div>
        ) : discussions.length === 0 ? (
          <div className="text-center py-12 border border-border">
            <p className="font-body text-muted-foreground mb-4">
              No discussions yet in this hall.
            </p>
            <Button variant="outline" onClick={handleNewPost}>
              Be the first to ask a question
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {discussions.map((discussion) => (
              <DiscussionCard
                key={discussion.id}
                discussion={discussion}
                onUpvote={toggleUpvote}
                onClick={setSelectedDiscussion}
              />
            ))}
          </div>
        )}
      </div>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <SearchModal 
        isOpen={searchModalOpen} 
        onClose={() => setSearchModalOpen(false)} 
        onSelectDiscussion={setSelectedDiscussion}
      />
    </section>
  );
};

export default ForumSection;
