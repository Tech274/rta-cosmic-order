-- Admin Activity Logs for audit trail
CREATE TABLE public.admin_activity_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID NOT NULL,
  action_type TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT,
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view activity logs
CREATE POLICY "Admins can view activity logs"
ON public.admin_activity_logs
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Only admins can insert activity logs
CREATE POLICY "Admins can insert activity logs"
ON public.admin_activity_logs
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Content Flags for moderator review
CREATE TABLE public.content_flags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reporter_id UUID NOT NULL,
  content_type TEXT NOT NULL,
  content_id UUID NOT NULL,
  reason TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  reviewed_by UUID,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  resolution_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.content_flags ENABLE ROW LEVEL SECURITY;

-- Authenticated users can flag content
CREATE POLICY "Authenticated users can flag content"
ON public.content_flags
FOR INSERT
WITH CHECK (auth.uid() = reporter_id);

-- Users can view their own flags
CREATE POLICY "Users can view their own flags"
ON public.content_flags
FOR SELECT
USING (auth.uid() = reporter_id);

-- Moderators can view all flags
CREATE POLICY "Moderators can view all flags"
ON public.content_flags
FOR SELECT
USING (has_role(auth.uid(), 'moderator') OR has_role(auth.uid(), 'admin'));

-- Moderators can update flags
CREATE POLICY "Moderators can update flags"
ON public.content_flags
FOR UPDATE
USING (has_role(auth.uid(), 'moderator') OR has_role(auth.uid(), 'admin'));

-- Audiobook annotations for notes and highlights
CREATE TABLE public.audiobook_annotations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  audiobook_id UUID NOT NULL REFERENCES public.audiobooks(id) ON DELETE CASCADE,
  chapter_number INTEGER NOT NULL DEFAULT 1,
  position_seconds INTEGER NOT NULL DEFAULT 0,
  annotation_type TEXT NOT NULL DEFAULT 'note',
  content TEXT NOT NULL,
  highlight_color TEXT DEFAULT 'yellow',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.audiobook_annotations ENABLE ROW LEVEL SECURITY;

-- Users can manage their own annotations
CREATE POLICY "Users can view their own annotations"
ON public.audiobook_annotations
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own annotations"
ON public.audiobook_annotations
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own annotations"
ON public.audiobook_annotations
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own annotations"
ON public.audiobook_annotations
FOR DELETE
USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_content_flags_updated_at
  BEFORE UPDATE ON public.content_flags
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_audiobook_annotations_updated_at
  BEFORE UPDATE ON public.audiobook_annotations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();