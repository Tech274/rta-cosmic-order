import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Bell, BellOff, Moon, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import NotificationSettings from './NotificationSettings';
import { 
  usePanchangEvents, 
  useUserReminders, 
  useCreateReminder,
  useDeleteReminder,
  PanchangEvent,
  EVENT_TYPE_CONFIG 
} from '@/hooks/usePanchang';
import { useNotifications } from '@/hooks/useNotifications';
import { format, addMonths, subMonths, isSameDay, parseISO, subDays } from 'date-fns';

const PanchangCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const { data: events, isLoading } = usePanchangEvents(currentMonth);
  const { data: reminders } = useUserReminders();
  const createReminder = useCreateReminder();
  const deleteReminder = useDeleteReminder();
  const { isEnabled: notificationsEnabled, sendNotification } = useNotifications();

  // Check for upcoming events and send notifications
  useEffect(() => {
    if (!notificationsEnabled || !events) return;

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const upcomingEvents = events.filter(event => {
      const eventDate = parseISO(event.event_date);
      return isSameDay(eventDate, tomorrow);
    });

    // Send notification for tomorrow's events (once per session)
    upcomingEvents.forEach(event => {
      const notifiedKey = `notified_${event.id}`;
      if (!sessionStorage.getItem(notifiedKey)) {
        sendNotification(`🕉️ Tomorrow: ${event.event_name}`, {
          body: event.description || `${event.event_type} - Don't forget to prepare!`,
          tag: event.id,
        });
        sessionStorage.setItem(notifiedKey, 'true');
      }
    });
  }, [events, notificationsEnabled, sendNotification]);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const getEventsForDate = (date: Date): PanchangEvent[] => {
    if (!events) return [];
    return events.filter(event => 
      isSameDay(parseISO(event.event_date), date)
    );
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  const hasReminder = (eventId: string) => {
    return reminders?.some(r => r.event_id === eventId);
  };

  const getReminderForEvent = (eventId: string) => {
    return reminders?.find(r => r.event_id === eventId);
  };

  const toggleReminder = (event: PanchangEvent) => {
    const existing = getReminderForEvent(event.id);
    if (existing) {
      deleteReminder.mutate(existing.id);
    } else {
      // Set reminder for day before at 6 AM
      const eventDate = parseISO(event.event_date);
      const reminderTime = subDays(eventDate, 1);
      reminderTime.setHours(6, 0, 0, 0);
      createReminder.mutate({ eventId: event.id, reminderTime });
    }
  };

  // Get dates with events for calendar highlighting
  const eventDates = events?.map(e => parseISO(e.event_date)) || [];

  const modifiers = {
    hasEvent: eventDates,
    ekadashi: events?.filter(e => e.event_type === 'ekadashi').map(e => parseISO(e.event_date)) || [],
    festival: events?.filter(e => e.event_type === 'festival').map(e => parseISO(e.event_date)) || [],
  };

  const modifiersStyles = {
    hasEvent: {
      fontWeight: 'bold',
    },
    ekadashi: {
      backgroundColor: 'hsl(var(--primary) / 0.3)',
      borderRadius: '50%',
    },
    festival: {
      backgroundColor: 'hsl(45 100% 50% / 0.3)',
      borderRadius: '50%',
    },
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Moon className="h-5 w-5 text-primary" />
          Panchang Calendar
        </CardTitle>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium min-w-[120px] text-center">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
          <Button variant="ghost" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Calendar */}
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            className="rounded-md border border-border/50"
          />
        </div>

        {/* Notification Settings */}
        <NotificationSettings />

        {/* Legend */}
        <div className="flex justify-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-primary/30" />
            <span className="text-muted-foreground">Ekadashi</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-amber-500/30" />
            <span className="text-muted-foreground">Festival</span>
          </div>
        </div>

        {/* Selected Date Events */}
        <div className="pt-4 border-t border-border/50">
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : 'Select a date'}
          </h4>
          
          {isLoading ? (
            <div className="text-center py-4 text-muted-foreground text-sm">Loading...</div>
          ) : selectedDateEvents.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground text-sm">
              No special events on this date
            </div>
          ) : (
            <div className="space-y-2">
              {selectedDateEvents.map((event) => {
                const config = EVENT_TYPE_CONFIG[event.event_type as keyof typeof EVENT_TYPE_CONFIG];
                const hasReminderSet = hasReminder(event.id);
                
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-lg border ${config.color}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span>{config.icon}</span>
                          <h5 className="font-medium">{event.event_name}</h5>
                        </div>
                        {event.description && (
                          <p className="text-sm opacity-80 mt-1">{event.description}</p>
                        )}
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {config.label}
                          </Badge>
                          {event.tithi && (
                            <Badge variant="outline" className="text-xs">
                              {event.tithi}
                            </Badge>
                          )}
                          {event.is_fasting_day && (
                            <Badge variant="outline" className="text-xs bg-purple-500/20">
                              🕯️ Fasting Day
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toggleReminder(event)}
                        title={hasReminderSet ? 'Remove reminder' : 'Set reminder'}
                      >
                        {hasReminderSet ? (
                          <Bell className="h-4 w-4 text-primary fill-primary" />
                        ) : (
                          <BellOff className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PanchangCalendar;
