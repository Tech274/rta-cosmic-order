import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HallType } from "@/hooks/useDiscussions";
import { useToast } from "@/hooks/use-toast";

interface CreateDiscussionFormProps {
  onSubmit: (title: string, content: string, hall: HallType) => Promise<{ error: Error | null }>;
  onCancel: () => void;
}

const halls: { value: HallType; label: string; description: string }[] = [
  { value: "tattva", label: "Tattva", description: "Metaphysics and reality" },
  { value: "dharma", label: "Dharma", description: "Ethics and duty" },
  { value: "samvada", label: "Saṃvāda", description: "Debate and dialogue" }
];

const CreateDiscussionForm = ({ onSubmit, onCancel }: CreateDiscussionFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hall, setHall] = useState<HallType>("tattva");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    const { error } = await onSubmit(title.trim(), content.trim(), hall);
    setLoading(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create discussion",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Discussion created",
        description: "You earned 15 karma for posting!"
      });
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border border-border p-6">
      <h3 className="font-display text-lg text-foreground mb-4">Post a Philosophical Question</h3>

      {/* Hall Selection */}
      <div>
        <label className="font-body text-sm text-muted-foreground mb-2 block">
          Select Hall
        </label>
        <div className="grid grid-cols-3 gap-2">
          {halls.map((h) => (
            <button
              key={h.value}
              type="button"
              onClick={() => setHall(h.value)}
              className={`p-3 border text-left transition-colors ${
                hall === h.value
                  ? "border-gold bg-gold/10"
                  : "border-border hover:border-gold/50"
              }`}
            >
              <span className="font-display text-sm text-foreground block">{h.label}</span>
              <span className="font-body text-xs text-muted-foreground">{h.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="font-body text-sm text-muted-foreground mb-2 block">
          Title
        </label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What is your philosophical question?"
          className="font-body"
          maxLength={200}
        />
      </div>

      {/* Content */}
      <div>
        <label className="font-body text-sm text-muted-foreground mb-2 block">
          Context & Details
        </label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Provide context from texts, your reasoning, or specific aspects you want explored..."
          className="font-body min-h-[120px]"
          maxLength={5000}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post Question"}
        </Button>
      </div>
    </form>
  );
};

export default CreateDiscussionForm;
