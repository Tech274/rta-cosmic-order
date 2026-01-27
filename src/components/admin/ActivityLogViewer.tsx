import { motion } from "framer-motion";
import { format } from "date-fns";
import { useActivityLogs } from "@/hooks/useActivityLog";
import { Loader2, Activity, User, FileText, Trash2, Shield, Edit, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const getActionIcon = (actionType: string) => {
  switch (actionType) {
    case "role_change":
      return <Shield className="w-4 h-4" />;
    case "content_delete":
      return <Trash2 className="w-4 h-4" />;
    case "content_edit":
      return <Edit className="w-4 h-4" />;
    case "content_create":
      return <Plus className="w-4 h-4" />;
    case "user_action":
      return <User className="w-4 h-4" />;
    default:
      return <Activity className="w-4 h-4" />;
  }
};

const getActionColor = (actionType: string) => {
  switch (actionType) {
    case "role_change":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    case "content_delete":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "content_edit":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "content_create":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const ActivityLogViewer = () => {
  const { data: logs, isLoading, error } = useActivityLogs(100);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Error loading activity logs
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Activity Log
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          {!logs || logs.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No activity recorded yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {logs.map((log, index) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 border border-border"
                >
                  <div className={`p-2 rounded-lg ${getActionColor(log.action_type)}`}>
                    {getActionIcon(log.action_type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground">
                        {log.admin_name}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {log.action_type.replace("_", " ")}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {log.target_type}
                      {log.target_id && (
                        <span className="text-primary ml-1">#{log.target_id.slice(0, 8)}</span>
                      )}
                    </p>
                    
                    {log.details && Object.keys(log.details).length > 0 && (
                      <div className="mt-2 p-2 rounded bg-background/50 text-xs text-muted-foreground font-mono">
                        {JSON.stringify(log.details, null, 2)}
                      </div>
                    )}
                  </div>
                  
                  <div className="text-xs text-muted-foreground whitespace-nowrap">
                    {format(new Date(log.created_at), "MMM d, HH:mm")}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ActivityLogViewer;
