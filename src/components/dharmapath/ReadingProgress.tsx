import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CheckCircle2, Circle } from "lucide-react";
import { Link } from "react-router-dom";
import { scriptures } from "@/data/scriptures";

interface ReadingProgressProps {
  progress: Array<{
    scripture_id: string;
    chapter_number: number;
    completed: boolean;
    last_read_at: string;
  }>;
}

export const ReadingProgress = ({ progress }: ReadingProgressProps) => {
  // Group progress by scripture
  const progressByScripture = progress.reduce((acc, p) => {
    if (!acc[p.scripture_id]) {
      acc[p.scripture_id] = [];
    }
    acc[p.scripture_id].push(p);
    return acc;
  }, {} as Record<string, typeof progress>);

  // Calculate progress for each scripture in our library
  const scriptureProgress = scriptures.map(scripture => {
    const completedChapters = progressByScripture[scripture.id]?.filter(p => p.completed).length || 0;
    const totalChapters = scripture.chapters?.length || 0;
    const percentage = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;
    const lastRead = progressByScripture[scripture.id]?.sort(
      (a, b) => new Date(b.last_read_at).getTime() - new Date(a.last_read_at).getTime()
    )[0]?.last_read_at;

    return {
      ...scripture,
      completedChapters,
      totalChapters,
      percentage,
      lastRead,
    };
  });

  const activeScriptures = scriptureProgress.filter(s => s.completedChapters > 0);
  const notStarted = scriptureProgress.filter(s => s.completedChapters === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="bg-card/50 border-primary/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Scripture Reading
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {activeScriptures.length > 0 ? (
            <div className="space-y-4">
              {activeScriptures.map(scripture => (
                <Link
                  key={scripture.id}
                  to={`/scriptures/${scripture.id}`}
                  className="block group"
                >
                  <div className="p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {scripture.name}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {scripture.completedChapters}/{scripture.totalChapters} chapters
                      </Badge>
                    </div>
                    <Progress value={scripture.percentage} className="h-2 mb-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{scripture.percentage}% complete</span>
                      {scripture.lastRead && (
                        <span>
                          Last read: {new Date(scripture.lastRead).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground mb-4">
                You haven't started reading any scriptures yet.
              </p>
              <Link
                to="/scriptures"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                Browse the Scripture Library →
              </Link>
            </div>
          )}

          {notStarted.length > 0 && activeScriptures.length > 0 && (
            <div className="pt-4 border-t border-border/50">
              <h4 className="text-sm font-medium text-muted-foreground mb-3">
                Not Started
              </h4>
              <div className="flex flex-wrap gap-2">
                {notStarted.map(scripture => (
                  <Link key={scripture.id} to={`/scriptures/${scripture.id}`}>
                    <Badge
                      variant="outline"
                      className="hover:bg-primary/10 hover:border-primary/30 transition-colors cursor-pointer"
                    >
                      <Circle className="h-3 w-3 mr-1" />
                      {scripture.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
