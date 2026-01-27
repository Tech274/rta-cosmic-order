import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useContentFlags, useReviewFlag, ContentFlag } from "@/hooks/useContentFlags";
import { useLogActivity } from "@/hooks/useActivityLog";
import {
  Loader2,
  Flag,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MessageSquare,
  Eye,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400">Pending</Badge>;
    case "resolved":
      return <Badge variant="outline" className="bg-green-500/20 text-green-400">Resolved</Badge>;
    case "dismissed":
      return <Badge variant="outline" className="bg-muted text-muted-foreground">Dismissed</Badge>;
    case "action_taken":
      return <Badge variant="outline" className="bg-red-500/20 text-red-400">Action Taken</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getReasonIcon = (reason: string) => {
  switch (reason) {
    case "spam":
      return <AlertTriangle className="w-4 h-4" />;
    case "harassment":
      return <XCircle className="w-4 h-4" />;
    case "inappropriate":
      return <Flag className="w-4 h-4" />;
    default:
      return <MessageSquare className="w-4 h-4" />;
  }
};

const FlagCard = ({ flag, onReview }: { flag: ContentFlag; onReview: (flag: ContentFlag) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-4 rounded-lg bg-muted/30 border border-border"
  >
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-destructive/20 text-destructive">
          {getReasonIcon(flag.reason)}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium capitalize">{flag.reason}</span>
            {getStatusBadge(flag.status)}
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            {flag.content_type} • Reported by {flag.reporter_name}
          </p>
          {flag.description && (
            <p className="text-sm text-foreground bg-background/50 p-2 rounded">
              "{flag.description}"
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-2">
            {format(new Date(flag.created_at), "MMM d, yyyy 'at' HH:mm")}
          </p>
        </div>
      </div>
      
      {flag.status === "pending" && (
        <Button size="sm" variant="outline" onClick={() => onReview(flag)}>
          <Eye className="w-4 h-4 mr-1" />
          Review
        </Button>
      )}
    </div>
    
    {flag.reviewed_by && (
      <div className="mt-3 pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Reviewed by {flag.reviewer_name} on{" "}
          {flag.reviewed_at && format(new Date(flag.reviewed_at), "MMM d, yyyy")}
        </p>
        {flag.resolution_notes && (
          <p className="text-sm mt-1 text-foreground">
            Notes: {flag.resolution_notes}
          </p>
        )}
      </div>
    )}
  </motion.div>
);

const ModeratorDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("pending");
  const [reviewingFlag, setReviewingFlag] = useState<ContentFlag | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState("");
  
  const { data: pendingFlags, isLoading: loadingPending } = useContentFlags("pending");
  const { data: resolvedFlags, isLoading: loadingResolved } = useContentFlags("resolved");
  const { data: allFlags, isLoading: loadingAll } = useContentFlags();
  
  const reviewFlag = useReviewFlag();
  const logActivity = useLogActivity();

  const handleReview = async (status: "resolved" | "dismissed" | "action_taken") => {
    if (!reviewingFlag) return;
    
    await reviewFlag.mutateAsync({
      flagId: reviewingFlag.id,
      status,
      resolution_notes: resolutionNotes,
    });
    
    await logActivity.mutateAsync({
      action_type: "content_review",
      target_type: `${reviewingFlag.content_type} flag`,
      target_id: reviewingFlag.content_id,
      details: { status, reason: reviewingFlag.reason },
    });
    
    setReviewingFlag(null);
    setResolutionNotes("");
  };

  const isLoading = loadingPending || loadingResolved || loadingAll;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flag className="w-5 h-5 text-primary" />
          Content Moderation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="pending" className="gap-2">
              Pending
              {pendingFlags && pendingFlags.length > 0 && (
                <Badge variant="destructive" className="ml-1">
                  {pendingFlags.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
            <TabsTrigger value="all">All Flags</TabsTrigger>
          </TabsList>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <TabsContent value="pending">
                <ScrollArea className="h-[500px] pr-4">
                  {!pendingFlags || pendingFlags.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500 opacity-50" />
                      <p>No pending flags to review</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pendingFlags.map((flag) => (
                        <FlagCard
                          key={flag.id}
                          flag={flag}
                          onReview={setReviewingFlag}
                        />
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="resolved">
                <ScrollArea className="h-[500px] pr-4">
                  {!resolvedFlags || resolvedFlags.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Flag className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No resolved flags yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {resolvedFlags.map((flag) => (
                        <FlagCard
                          key={flag.id}
                          flag={flag}
                          onReview={setReviewingFlag}
                        />
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="all">
                <ScrollArea className="h-[500px] pr-4">
                  {!allFlags || allFlags.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Flag className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No flags in the system</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {allFlags.map((flag) => (
                        <FlagCard
                          key={flag.id}
                          flag={flag}
                          onReview={setReviewingFlag}
                        />
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
            </>
          )}
        </Tabs>

        {/* Review Dialog */}
        <Dialog open={!!reviewingFlag} onOpenChange={() => setReviewingFlag(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Review Flag</DialogTitle>
            </DialogHeader>
            
            {reviewingFlag && (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/30">
                  <p className="font-medium capitalize mb-1">{reviewingFlag.reason}</p>
                  <p className="text-sm text-muted-foreground">
                    {reviewingFlag.content_type} • ID: {reviewingFlag.content_id.slice(0, 8)}
                  </p>
                  {reviewingFlag.description && (
                    <p className="text-sm mt-2">"{reviewingFlag.description}"</p>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Resolution Notes (optional)
                  </label>
                  <Textarea
                    value={resolutionNotes}
                    onChange={(e) => setResolutionNotes(e.target.value)}
                    placeholder="Add notes about your decision..."
                    rows={3}
                  />
                </div>
              </div>
            )}

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => handleReview("dismissed")}
                disabled={reviewFlag.isPending}
              >
                <XCircle className="w-4 h-4 mr-1" />
                Dismiss
              </Button>
              <Button
                variant="default"
                onClick={() => handleReview("resolved")}
                disabled={reviewFlag.isPending}
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Resolve
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleReview("action_taken")}
                disabled={reviewFlag.isPending}
              >
                <AlertTriangle className="w-4 h-4 mr-1" />
                Take Action
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ModeratorDashboard;
