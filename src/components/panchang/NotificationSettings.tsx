import { motion } from 'framer-motion';
import { Bell, BellOff, BellRing, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNotifications } from '@/hooks/useNotifications';

const NotificationSettings = () => {
  const { isSupported, isEnabled, permission, requestPermission } = useNotifications();

  if (!isSupported) {
    return (
      <Card className="bg-muted/30 border-border/50">
        <CardContent className="p-4 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Push notifications are not supported in this browser.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isEnabled) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-emerald-500/10 border-emerald-500/30">
          <CardContent className="p-4 flex items-center gap-3">
            <BellRing className="h-5 w-5 text-emerald-400" />
            <div className="flex-1">
              <p className="text-sm font-medium text-emerald-300">
                Notifications Enabled
              </p>
              <p className="text-xs text-emerald-400/70">
                You'll receive reminders for upcoming events
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (permission === 'denied') {
    return (
      <Card className="bg-destructive/10 border-destructive/30">
        <CardContent className="p-4 flex items-center gap-3">
          <BellOff className="h-5 w-5 text-destructive" />
          <div className="flex-1">
            <p className="text-sm font-medium text-destructive">
              Notifications Blocked
            </p>
            <p className="text-xs text-destructive/70">
              Enable in browser settings to receive reminders
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="bg-primary/10 border-primary/30">
        <CardContent className="p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Enable Notifications</p>
              <p className="text-xs text-muted-foreground">
                Get reminders for Ekadashi, festivals & more
              </p>
            </div>
          </div>
          <Button size="sm" onClick={requestPermission}>
            Enable
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NotificationSettings;
