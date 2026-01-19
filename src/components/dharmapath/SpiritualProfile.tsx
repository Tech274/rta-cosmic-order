import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { User, Sparkles, Target, Edit3, Check, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface SpiritualProfileProps {
  ishtaDevata: string | null;
  spiritualGoals: string[];
  bio: string | null;
  onUpdate: (data: { ishta_devata?: string; spiritual_goals?: string[]; bio?: string }) => Promise<{ error: Error | null }>;
}

const commonDeities = [
  "Shiva", "Vishnu", "Devi", "Ganesha", "Krishna", "Rama", "Hanuman", 
  "Saraswati", "Lakshmi", "Durga", "Kali", "Surya", "Kartikeya", "Dattatreya"
];

const commonGoals = [
  "Daily meditation", "Scripture study", "Temple visits", "Mantra japa",
  "Selfless service", "Pilgrimage", "Yoga practice", "Vedic chanting",
  "Fasting observance", "Satsang attendance"
];

export const SpiritualProfile = ({
  ishtaDevata,
  spiritualGoals,
  bio,
  onUpdate,
}: SpiritualProfileProps) => {
  const { profile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    ishta_devata: ishtaDevata || "",
    spiritual_goals: spiritualGoals || [],
    bio: bio || "",
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await onUpdate(editData);
    if (!error) {
      setIsEditing(false);
    }
    setSaving(false);
  };

  const toggleGoal = (goal: string) => {
    setEditData(prev => ({
      ...prev,
      spiritual_goals: prev.spiritual_goals.includes(goal)
        ? prev.spiritual_goals.filter(g => g !== goal)
        : [...prev.spiritual_goals, goal],
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-card/50 border-primary/20 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl text-primary flex items-center gap-2">
            <User className="h-5 w-5" />
            Spiritual Profile
          </CardTitle>
          {!isEditing ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="text-muted-foreground hover:text-primary"
            >
              <Edit3 className="h-4 w-4 mr-1" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(false)}
                disabled={saving}
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleSave}
                disabled={saving}
              >
                <Check className="h-4 w-4 mr-1" />
                Save
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Display Name & Level */}
          <div className="flex items-center gap-4 pb-4 border-b border-border/50">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
              <span className="text-2xl font-serif text-primary">
                {profile?.display_name?.[0]?.toUpperCase() || "S"}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground">
                {profile?.display_name || "Seeker"}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-primary border-primary/30 capitalize">
                  {profile?.membership_level || "seeker"}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {profile?.karma || 0} karma
                </span>
              </div>
            </div>
          </div>

          {/* Ishta Devata */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Ishta Devata (Chosen Deity)
            </label>
            {isEditing ? (
              <div className="space-y-2">
                <Input
                  value={editData.ishta_devata}
                  onChange={e => setEditData(prev => ({ ...prev, ishta_devata: e.target.value }))}
                  placeholder="Enter your chosen deity"
                  className="bg-background/50"
                />
                <div className="flex flex-wrap gap-2">
                  {commonDeities.map(deity => (
                    <Badge
                      key={deity}
                      variant={editData.ishta_devata === deity ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary/20"
                      onClick={() => setEditData(prev => ({ ...prev, ishta_devata: deity }))}
                    >
                      {deity}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-foreground">
                {ishtaDevata || <span className="text-muted-foreground italic">Not set</span>}
              </p>
            )}
          </div>

          {/* Spiritual Goals */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Spiritual Goals
            </label>
            {isEditing ? (
              <div className="flex flex-wrap gap-2">
                {commonGoals.map(goal => (
                  <Badge
                    key={goal}
                    variant={editData.spiritual_goals.includes(goal) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/20"
                    onClick={() => toggleGoal(goal)}
                  >
                    {goal}
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {spiritualGoals.length > 0 ? (
                  spiritualGoals.map(goal => (
                    <Badge key={goal} variant="secondary" className="bg-primary/10 text-primary">
                      {goal}
                    </Badge>
                  ))
                ) : (
                  <span className="text-muted-foreground italic">No goals set</span>
                )}
              </div>
            )}
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              About Your Spiritual Journey
            </label>
            {isEditing ? (
              <Textarea
                value={editData.bio}
                onChange={e => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Share your spiritual journey, practices, and aspirations..."
                className="bg-background/50 min-h-[100px]"
              />
            ) : (
              <p className="text-foreground text-sm leading-relaxed">
                {bio || <span className="text-muted-foreground italic">Tell us about your spiritual journey...</span>}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
