-- Create audiobook_bookmarks table for saving positions
CREATE TABLE public.audiobook_bookmarks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  audiobook_id UUID NOT NULL REFERENCES public.audiobooks(id) ON DELETE CASCADE,
  position_seconds INTEGER NOT NULL DEFAULT 0,
  chapter_number INTEGER NOT NULL DEFAULT 1,
  title TEXT,
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create unique index for efficient lookups
CREATE INDEX idx_audiobook_bookmarks_user_audiobook ON public.audiobook_bookmarks(user_id, audiobook_id);

-- Enable RLS
ALTER TABLE public.audiobook_bookmarks ENABLE ROW LEVEL SECURITY;

-- Users can view their own bookmarks
CREATE POLICY "Users can view their own bookmarks"
ON public.audiobook_bookmarks
FOR SELECT
USING (auth.uid() = user_id);

-- Users can create their own bookmarks
CREATE POLICY "Users can create their own bookmarks"
ON public.audiobook_bookmarks
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can delete their own bookmarks
CREATE POLICY "Users can delete their own bookmarks"
ON public.audiobook_bookmarks
FOR DELETE
USING (auth.uid() = user_id);

-- Users can update their own bookmarks
CREATE POLICY "Users can update their own bookmarks"
ON public.audiobook_bookmarks
FOR UPDATE
USING (auth.uid() = user_id);