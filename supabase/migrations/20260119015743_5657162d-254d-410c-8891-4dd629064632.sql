-- Add spiritual profile fields to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS ishta_devata TEXT,
ADD COLUMN IF NOT EXISTS spiritual_goals TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS bio TEXT;

-- Create scripture reading progress table
CREATE TABLE public.scripture_reading_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  scripture_id TEXT NOT NULL,
  chapter_number INTEGER NOT NULL,
  verse_number INTEGER,
  completed BOOLEAN DEFAULT false,
  last_read_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, scripture_id, chapter_number)
);

-- Enable RLS
ALTER TABLE public.scripture_reading_progress ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view their own reading progress"
ON public.scripture_reading_progress
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own reading progress"
ON public.scripture_reading_progress
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reading progress"
ON public.scripture_reading_progress
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reading progress"
ON public.scripture_reading_progress
FOR DELETE
USING (auth.uid() = user_id);

-- Index for faster queries
CREATE INDEX idx_scripture_reading_user ON public.scripture_reading_progress(user_id);
CREATE INDEX idx_scripture_reading_scripture ON public.scripture_reading_progress(scripture_id);