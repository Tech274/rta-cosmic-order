-- Create sankalpas table for spiritual intentions/resolutions
CREATE TABLE public.sankalpas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  target_date DATE,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  progress INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sankalpas ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own sankalpas" 
ON public.sankalpas FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own sankalpas" 
ON public.sankalpas FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sankalpas" 
ON public.sankalpas FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sankalpas" 
ON public.sankalpas FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_sankalpas_updated_at
BEFORE UPDATE ON public.sankalpas
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create panchang_events table for festivals, ekadashi, and auspicious dates
CREATE TABLE public.panchang_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_date DATE NOT NULL,
  event_name TEXT NOT NULL,
  event_type TEXT NOT NULL, -- 'ekadashi', 'festival', 'auspicious', 'tithi'
  description TEXT,
  tithi TEXT,
  nakshatra TEXT,
  is_fasting_day BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS with public read access
ALTER TABLE public.panchang_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Panchang events are viewable by everyone" 
ON public.panchang_events FOR SELECT 
USING (true);

-- Create user_event_reminders for notifications
CREATE TABLE public.user_event_reminders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  event_id UUID REFERENCES public.panchang_events(id) ON DELETE CASCADE,
  reminder_time TIMESTAMP WITH TIME ZONE NOT NULL,
  is_notified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_event_reminders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own reminders" 
ON public.user_event_reminders FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own reminders" 
ON public.user_event_reminders FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reminders" 
ON public.user_event_reminders FOR DELETE 
USING (auth.uid() = user_id);