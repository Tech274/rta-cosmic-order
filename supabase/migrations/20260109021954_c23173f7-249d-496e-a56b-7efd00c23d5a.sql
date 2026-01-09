-- Create hall enum for the three halls
CREATE TYPE public.hall_type AS ENUM ('tattva', 'dharma', 'samvada');

-- Create discussions table
CREATE TABLE public.discussions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  hall hall_type NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  upvotes INTEGER NOT NULL DEFAULT 0,
  views INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create discussion replies table
CREATE TABLE public.discussion_replies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  discussion_id UUID NOT NULL REFERENCES public.discussions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  upvotes INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create upvotes tracking table (prevents duplicate voting)
CREATE TABLE public.upvotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  discussion_id UUID REFERENCES public.discussions(id) ON DELETE CASCADE,
  reply_id UUID REFERENCES public.discussion_replies(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT upvote_target CHECK (
    (discussion_id IS NOT NULL AND reply_id IS NULL) OR 
    (discussion_id IS NULL AND reply_id IS NOT NULL)
  ),
  UNIQUE(user_id, discussion_id),
  UNIQUE(user_id, reply_id)
);

-- Enable RLS on all tables
ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussion_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.upvotes ENABLE ROW LEVEL SECURITY;

-- Discussions policies
CREATE POLICY "Discussions are viewable by everyone" 
ON public.discussions FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create discussions" 
ON public.discussions FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own discussions" 
ON public.discussions FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own discussions" 
ON public.discussions FOR DELETE 
USING (auth.uid() = user_id);

-- Replies policies
CREATE POLICY "Replies are viewable by everyone" 
ON public.discussion_replies FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create replies" 
ON public.discussion_replies FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own replies" 
ON public.discussion_replies FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own replies" 
ON public.discussion_replies FOR DELETE 
USING (auth.uid() = user_id);

-- Upvotes policies
CREATE POLICY "Upvotes are viewable by everyone" 
ON public.upvotes FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create upvotes" 
ON public.upvotes FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own upvotes" 
ON public.upvotes FOR DELETE 
USING (auth.uid() = user_id);

-- Triggers for updated_at
CREATE TRIGGER update_discussions_updated_at
BEFORE UPDATE ON public.discussions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_replies_updated_at
BEFORE UPDATE ON public.discussion_replies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to handle upvote with karma rewards
CREATE OR REPLACE FUNCTION public.toggle_upvote(
  p_user_id UUID,
  p_discussion_id UUID DEFAULT NULL,
  p_reply_id UUID DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  existing_upvote UUID;
  target_user_id UUID;
BEGIN
  -- Find existing upvote
  SELECT id INTO existing_upvote FROM public.upvotes
  WHERE user_id = p_user_id
    AND (discussion_id = p_discussion_id OR reply_id = p_reply_id);

  IF existing_upvote IS NOT NULL THEN
    -- Remove upvote
    DELETE FROM public.upvotes WHERE id = existing_upvote;
    
    -- Decrease count
    IF p_discussion_id IS NOT NULL THEN
      UPDATE public.discussions SET upvotes = upvotes - 1 WHERE id = p_discussion_id
      RETURNING user_id INTO target_user_id;
    ELSE
      UPDATE public.discussion_replies SET upvotes = upvotes - 1 WHERE id = p_reply_id
      RETURNING user_id INTO target_user_id;
    END IF;
    
    -- Remove karma from content author
    PERFORM public.add_karma(target_user_id, -5, 'Upvote removed');
    RETURN FALSE;
  ELSE
    -- Add upvote
    INSERT INTO public.upvotes (user_id, discussion_id, reply_id)
    VALUES (p_user_id, p_discussion_id, p_reply_id);
    
    -- Increase count
    IF p_discussion_id IS NOT NULL THEN
      UPDATE public.discussions SET upvotes = upvotes + 1 WHERE id = p_discussion_id
      RETURNING user_id INTO target_user_id;
    ELSE
      UPDATE public.discussion_replies SET upvotes = upvotes + 1 WHERE id = p_reply_id
      RETURNING user_id INTO target_user_id;
    END IF;
    
    -- Award karma to content author
    PERFORM public.add_karma(target_user_id, 5, 'Received upvote');
    RETURN TRUE;
  END IF;
END;
$$;

-- Function to award karma on signup (called by trigger)
CREATE OR REPLACE FUNCTION public.award_signup_karma()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Award 10 karma for signing up
  PERFORM public.add_karma(NEW.user_id, 10, 'Welcome bonus for joining the Sabhā');
  RETURN NEW;
END;
$$;

-- Trigger to award karma when profile is created
CREATE TRIGGER award_signup_karma_trigger
AFTER INSERT ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.award_signup_karma();

-- Function to award karma for posting
CREATE OR REPLACE FUNCTION public.award_post_karma()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Award 15 karma for creating a discussion
  PERFORM public.add_karma(NEW.user_id, 15, 'Posted a philosophical question');
  RETURN NEW;
END;
$$;

-- Trigger to award karma when discussion is created
CREATE TRIGGER award_discussion_karma
AFTER INSERT ON public.discussions
FOR EACH ROW
EXECUTE FUNCTION public.award_post_karma();

-- Function to award karma for replying
CREATE OR REPLACE FUNCTION public.award_reply_karma()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Award 8 karma for replying
  PERFORM public.add_karma(NEW.user_id, 8, 'Contributed to a discussion');
  RETURN NEW;
END;
$$;

-- Trigger to award karma when reply is created
CREATE TRIGGER award_reply_karma
AFTER INSERT ON public.discussion_replies
FOR EACH ROW
EXECUTE FUNCTION public.award_reply_karma();

-- Function to increment view count
CREATE OR REPLACE FUNCTION public.increment_discussion_views(p_discussion_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.discussions SET views = views + 1 WHERE id = p_discussion_id;
END;
$$;