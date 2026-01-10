-- Sadhana sessions table for tracking meditation and japa
CREATE TABLE public.sadhana_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  session_type TEXT NOT NULL CHECK (session_type IN ('japa', 'meditation', 'puja', 'reading')),
  duration_seconds INTEGER NOT NULL DEFAULT 0,
  count INTEGER DEFAULT 0, -- for japa counting
  mantra TEXT, -- for japa sessions
  notes TEXT,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Daily practice logs for tracking streaks
CREATE TABLE public.daily_practice_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  practice_date DATE NOT NULL DEFAULT CURRENT_DATE,
  practices_completed TEXT[] NOT NULL DEFAULT '{}',
  total_duration_seconds INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, practice_date)
);

-- Bookmarked subhashitas
CREATE TABLE public.bookmarked_subhashitas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  subhashita_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, subhashita_id)
);

-- Enable RLS on all tables
ALTER TABLE public.sadhana_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_practice_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarked_subhashitas ENABLE ROW LEVEL SECURITY;

-- RLS policies for sadhana_sessions
CREATE POLICY "Users can view their own sadhana sessions"
  ON public.sadhana_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own sadhana sessions"
  ON public.sadhana_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sadhana sessions"
  ON public.sadhana_sessions FOR DELETE
  USING (auth.uid() = user_id);

-- RLS policies for daily_practice_logs
CREATE POLICY "Users can view their own practice logs"
  ON public.daily_practice_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own practice logs"
  ON public.daily_practice_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own practice logs"
  ON public.daily_practice_logs FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS policies for bookmarked_subhashitas
CREATE POLICY "Users can view their own bookmarks"
  ON public.bookmarked_subhashitas FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookmarks"
  ON public.bookmarked_subhashitas FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks"
  ON public.bookmarked_subhashitas FOR DELETE
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_sadhana_sessions_user_id ON public.sadhana_sessions(user_id);
CREATE INDEX idx_sadhana_sessions_completed_at ON public.sadhana_sessions(completed_at);
CREATE INDEX idx_daily_practice_logs_user_date ON public.daily_practice_logs(user_id, practice_date);
CREATE INDEX idx_bookmarked_subhashitas_user_id ON public.bookmarked_subhashitas(user_id);