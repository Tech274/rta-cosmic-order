import { ArrowLeft, TrendingUp, TrendingDown, Sparkles, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useKarmaHistory } from "@/hooks/useKarmaHistory";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format, formatDistanceToNow } from "date-fns";

const KarmaHistory = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const { data: history, isLoading } = useKarmaHistory();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Sparkles className="h-8 w-8 text-gold animate-pulse" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-4">
        <Sparkles className="h-12 w-12 text-gold/50" />
        <h1 className="font-display text-2xl text-foreground">Sign in Required</h1>
        <p className="text-muted-foreground font-body text-center">
          Please sign in to view your karma history
        </p>
        <Link to="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Return Home
          </Button>
        </Link>
      </div>
    );
  }

  const totalKarma = profile?.karma || 0;
  const positiveKarma = history?.filter((e) => e.amount > 0).reduce((sum, e) => sum + e.amount, 0) || 0;
  const negativeKarma = history?.filter((e) => e.amount < 0).reduce((sum, e) => sum + e.amount, 0) || 0;

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="font-display text-2xl md:text-3xl text-foreground">Karma History</h1>
            <p className="text-muted-foreground font-body text-sm">
              Track your contributions and rewards
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="h-5 w-5 text-gold" />
              <span className="text-sm text-muted-foreground font-body">Total Karma</span>
            </div>
            <p className="font-display text-3xl text-gold">{totalKarma.toLocaleString()}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="text-sm text-muted-foreground font-body">Earned</span>
            </div>
            <p className="font-display text-3xl text-green-500">+{positiveKarma.toLocaleString()}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingDown className="h-5 w-5 text-red-500" />
              <span className="text-sm text-muted-foreground font-body">Lost</span>
            </div>
            <p className="font-display text-3xl text-red-500">{negativeKarma.toLocaleString()}</p>
          </div>
        </div>

        {/* History List */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-display text-lg text-foreground">Recent Activity</h2>
          </div>

          {isLoading ? (
            <div className="p-6 space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
              ))}
            </div>
          ) : history && history.length > 0 ? (
            <div className="divide-y divide-border">
              {history.map((entry) => (
                <div
                  key={entry.id}
                  className="px-6 py-4 flex items-center gap-4 hover:bg-accent/50 transition-colors"
                >
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      entry.amount > 0
                        ? "bg-green-500/10 text-green-500"
                        : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {entry.amount > 0 ? (
                      <TrendingUp className="h-5 w-5" />
                    ) : (
                      <TrendingDown className="h-5 w-5" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-body text-foreground">{entry.reason}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3" />
                      <span title={format(new Date(entry.created_at), "PPpp")}>
                        {formatDistanceToNow(new Date(entry.created_at), { addSuffix: true })}
                      </span>
                    </div>
                  </div>

                  <Badge
                    variant="outline"
                    className={`shrink-0 font-display ${
                      entry.amount > 0
                        ? "border-green-500/30 text-green-500"
                        : "border-red-500/30 text-red-500"
                    }`}
                  >
                    {entry.amount > 0 ? "+" : ""}
                    {entry.amount}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <Sparkles className="h-12 w-12 text-gold/30 mx-auto mb-4" />
              <p className="text-muted-foreground font-body">
                No karma activity yet. Start contributing to earn karma!
              </p>
              <Link to="/#sabha" className="mt-4 inline-block">
                <Button variant="outline" className="gap-2">
                  Join the Sabhā
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default KarmaHistory;
