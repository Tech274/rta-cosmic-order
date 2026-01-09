-- Create enum for membership levels
CREATE TYPE public.membership_level AS ENUM (
  'seeker',
  'questioner', 
  'reader',
  'debater',
  'interpreter',
  'scholar',
  'guardian'
);

-- Create profiles table for Sabhā members
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  membership_level membership_level NOT NULL DEFAULT 'seeker',
  karma INTEGER NOT NULL DEFAULT 0,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles are viewable by everyone
CREATE POLICY "Profiles are viewable by everyone"
ON public.profiles
FOR SELECT
USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = user_id);

-- Users can insert their own profile
CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create karma history table to track karma changes
CREATE TABLE public.karma_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on karma_history
ALTER TABLE public.karma_history ENABLE ROW LEVEL SECURITY;

-- Users can view their own karma history
CREATE POLICY "Users can view their own karma history"
ON public.karma_history
FOR SELECT
USING (auth.uid() = user_id);

-- Create function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'display_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for auto-creating profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates on profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to update karma and check for level progression
CREATE OR REPLACE FUNCTION public.add_karma(
  p_user_id UUID,
  p_amount INTEGER,
  p_reason TEXT
)
RETURNS void AS $$
DECLARE
  new_karma INTEGER;
  new_level membership_level;
BEGIN
  -- Insert karma history record
  INSERT INTO public.karma_history (user_id, amount, reason)
  VALUES (p_user_id, p_amount, p_reason);
  
  -- Update karma on profile
  UPDATE public.profiles
  SET karma = karma + p_amount
  WHERE user_id = p_user_id
  RETURNING karma INTO new_karma;
  
  -- Determine new level based on karma thresholds
  new_level := CASE
    WHEN new_karma >= 10000 THEN 'guardian'::membership_level
    WHEN new_karma >= 5000 THEN 'scholar'::membership_level
    WHEN new_karma >= 2000 THEN 'interpreter'::membership_level
    WHEN new_karma >= 800 THEN 'debater'::membership_level
    WHEN new_karma >= 300 THEN 'reader'::membership_level
    WHEN new_karma >= 100 THEN 'questioner'::membership_level
    ELSE 'seeker'::membership_level
  END;
  
  -- Update level if changed
  UPDATE public.profiles
  SET membership_level = new_level
  WHERE user_id = p_user_id AND membership_level != new_level;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;