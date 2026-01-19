import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useUpcomingEvents, EVENT_TYPE_CONFIG } from '@/hooks/usePanchang';
import { format, parseISO, differenceInDays } from 'date-fns';
import { Link } from 'react-router-dom';

const UpcomingEvents = () => {
  const { data: events, isLoading } = useUpcomingEvents(5);

  const getDaysUntil = (dateStr: string) => {
    const days = differenceInDays(parseISO(dateStr), new Date());
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `In ${days} days`;
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Upcoming Events
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/sadhana" className="text-primary">
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-4 text-muted-foreground text-sm">Loading...</div>
        ) : !events || events.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground text-sm">
            No upcoming events
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event, index) => {
              const config = EVENT_TYPE_CONFIG[event.event_type as keyof typeof EVENT_TYPE_CONFIG];
              const daysUntil = getDaysUntil(event.event_date);
              const isToday = daysUntil === 'Today';
              
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 rounded-lg border transition-colors ${
                    isToday 
                      ? 'bg-primary/10 border-primary/30' 
                      : 'bg-background/30 border-border/50 hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{config.icon}</span>
                      <div>
                        <h4 className="font-medium text-sm">{event.event_name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {format(parseISO(event.event_date), 'EEEE, MMM d')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${isToday ? 'bg-primary/20 text-primary border-primary/30' : ''}`}
                      >
                        {daysUntil}
                      </Badge>
                      {event.is_fasting_day && (
                        <p className="text-xs text-purple-400 mt-1">🕯️ Fast</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
