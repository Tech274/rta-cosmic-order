-- Create achievements table for all possible badges
CREATE TABLE public.achievements (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL DEFAULT 'trophy',
  category text NOT NULL DEFAULT 'general',
  requirement_type text NOT NULL,
  requirement_value integer NOT NULL DEFAULT 1,
  karma_reward integer NOT NULL DEFAULT 0,
  rarity text NOT NULL DEFAULT 'common',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create user_achievements junction table
CREATE TABLE public.user_achievements (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  achievement_id uuid NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Enable RLS
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- Achievements are viewable by everyone
CREATE POLICY "Achievements are viewable by everyone"
ON public.achievements FOR SELECT USING (true);

-- User achievements are viewable by everyone (for public profiles)
CREATE POLICY "User achievements are viewable by everyone"
ON public.user_achievements FOR SELECT USING (true);

-- Users can only insert their own achievements (handled via function)
CREATE POLICY "System can insert user achievements"
ON public.user_achievements FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Seed initial achievements
INSERT INTO public.achievements (slug, name, description, icon, category, requirement_type, requirement_value, karma_reward, rarity) VALUES
-- Streak achievements
('streak_3', 'Dedicated Seeker', 'Maintain a 3-day practice streak', 'flame', 'streaks', 'streak_days', 3, 25, 'common'),
('streak_7', 'Weekly Warrior', 'Maintain a 7-day practice streak', 'flame', 'streaks', 'streak_days', 7, 50, 'uncommon'),
('streak_21', 'Habit Former', 'Maintain a 21-day practice streak', 'flame', 'streaks', 'streak_days', 21, 150, 'rare'),
('streak_30', 'Monthly Master', 'Maintain a 30-day practice streak', 'flame', 'streaks', 'streak_days', 30, 250, 'rare'),
('streak_108', 'Sacred 108', 'Maintain a 108-day practice streak', 'flame', 'streaks', 'streak_days', 108, 1000, 'legendary'),

-- Karma achievements
('karma_100', 'Rising Star', 'Earn 100 karma points', 'sparkles', 'karma', 'karma_total', 100, 0, 'common'),
('karma_500', 'Valued Contributor', 'Earn 500 karma points', 'sparkles', 'karma', 'karma_total', 500, 0, 'uncommon'),
('karma_1000', 'Wisdom Keeper', 'Earn 1,000 karma points', 'sparkles', 'karma', 'karma_total', 1000, 0, 'rare'),
('karma_5000', 'Enlightened One', 'Earn 5,000 karma points', 'sparkles', 'karma', 'karma_total', 5000, 0, 'epic'),
('karma_10000', 'Guardian of Dharma', 'Earn 10,000 karma points', 'crown', 'karma', 'karma_total', 10000, 0, 'legendary'),

-- Scripture reading achievements
('chapters_1', 'First Steps', 'Complete your first scripture chapter', 'book-open', 'reading', 'chapters_completed', 1, 15, 'common'),
('chapters_10', 'Avid Reader', 'Complete 10 scripture chapters', 'book-open', 'reading', 'chapters_completed', 10, 75, 'uncommon'),
('chapters_50', 'Scripture Scholar', 'Complete 50 scripture chapters', 'book-open', 'reading', 'chapters_completed', 50, 200, 'rare'),
('chapters_100', 'Vedic Master', 'Complete 100 scripture chapters', 'book-open', 'reading', 'chapters_completed', 100, 500, 'epic'),

-- Sadhana achievements
('meditation_1', 'First Meditation', 'Complete your first meditation session', 'brain', 'sadhana', 'meditation_sessions', 1, 10, 'common'),
('meditation_50', 'Meditation Practitioner', 'Complete 50 meditation sessions', 'brain', 'sadhana', 'meditation_sessions', 50, 150, 'rare'),
('japa_1000', 'Mantra Initiate', 'Complete 1,000 japa counts', 'circle-dot', 'sadhana', 'japa_total', 1000, 25, 'common'),
('japa_10000', 'Mantra Adept', 'Complete 10,000 japa counts', 'circle-dot', 'sadhana', 'japa_total', 10000, 100, 'uncommon'),
('japa_108000', 'Mantra Master', 'Complete 108,000 japa counts (one purashcharana)', 'circle-dot', 'sadhana', 'japa_total', 108000, 500, 'legendary'),

-- Sankalpa achievements
('sankalpa_1', 'Intent Set', 'Complete your first sankalpa', 'target', 'sankalpa', 'sankalpas_completed', 1, 20, 'common'),
('sankalpa_5', 'Resolution Keeper', 'Complete 5 sankalpas', 'target', 'sankalpa', 'sankalpas_completed', 5, 75, 'uncommon'),
('sankalpa_10', 'Master of Will', 'Complete 10 sankalpas', 'target', 'sankalpa', 'sankalpas_completed', 10, 200, 'rare'),

-- Community achievements
('discussions_1', 'First Question', 'Start your first discussion', 'message-circle', 'community', 'discussions_created', 1, 15, 'common'),
('discussions_10', 'Active Philosopher', 'Start 10 discussions', 'message-circle', 'community', 'discussions_created', 10, 100, 'uncommon'),
('replies_10', 'Helpful Guide', 'Post 10 discussion replies', 'message-square', 'community', 'replies_posted', 10, 50, 'common'),
('replies_50', 'Community Pillar', 'Post 50 discussion replies', 'message-square', 'community', 'replies_posted', 50, 200, 'rare');

-- Create function to check and award achievements
CREATE OR REPLACE FUNCTION public.check_and_award_achievements(p_user_id uuid)
RETURNS SETOF public.user_achievements
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_karma integer;
  v_streak integer;
  v_chapters integer;
  v_meditations integer;
  v_japa integer;
  v_sankalpas integer;
  v_discussions integer;
  v_replies integer;
  v_achievement record;
  v_new_achievement public.user_achievements;
BEGIN
  -- Get user's current stats
  SELECT karma INTO v_karma FROM profiles WHERE user_id = p_user_id;
  
  -- Calculate streak from daily_practice_logs
  SELECT COUNT(DISTINCT practice_date) INTO v_streak
  FROM (
    SELECT practice_date
    FROM daily_practice_logs
    WHERE user_id = p_user_id
    AND practice_date >= CURRENT_DATE - INTERVAL '365 days'
    ORDER BY practice_date DESC
  ) recent_logs;
  
  -- Get chapters completed
  SELECT COUNT(*) INTO v_chapters
  FROM scripture_reading_progress
  WHERE user_id = p_user_id AND completed = true;
  
  -- Get meditation sessions
  SELECT COUNT(*) INTO v_meditations
  FROM sadhana_sessions
  WHERE user_id = p_user_id AND session_type = 'meditation';
  
  -- Get total japa count
  SELECT COALESCE(SUM(count), 0) INTO v_japa
  FROM sadhana_sessions
  WHERE user_id = p_user_id AND session_type = 'japa';
  
  -- Get completed sankalpas
  SELECT COUNT(*) INTO v_sankalpas
  FROM sankalpas
  WHERE user_id = p_user_id AND is_completed = true;
  
  -- Get discussions created
  SELECT COUNT(*) INTO v_discussions
  FROM discussions
  WHERE user_id = p_user_id;
  
  -- Get replies posted
  SELECT COUNT(*) INTO v_replies
  FROM discussion_replies
  WHERE user_id = p_user_id;
  
  -- Check each achievement
  FOR v_achievement IN SELECT * FROM achievements LOOP
    -- Skip if already earned
    IF EXISTS (SELECT 1 FROM user_achievements WHERE user_id = p_user_id AND achievement_id = v_achievement.id) THEN
      CONTINUE;
    END IF;
    
    -- Check if requirement is met
    IF (v_achievement.requirement_type = 'karma_total' AND v_karma >= v_achievement.requirement_value) OR
       (v_achievement.requirement_type = 'streak_days' AND v_streak >= v_achievement.requirement_value) OR
       (v_achievement.requirement_type = 'chapters_completed' AND v_chapters >= v_achievement.requirement_value) OR
       (v_achievement.requirement_type = 'meditation_sessions' AND v_meditations >= v_achievement.requirement_value) OR
       (v_achievement.requirement_type = 'japa_total' AND v_japa >= v_achievement.requirement_value) OR
       (v_achievement.requirement_type = 'sankalpas_completed' AND v_sankalpas >= v_achievement.requirement_value) OR
       (v_achievement.requirement_type = 'discussions_created' AND v_discussions >= v_achievement.requirement_value) OR
       (v_achievement.requirement_type = 'replies_posted' AND v_replies >= v_achievement.requirement_value)
    THEN
      -- Award achievement
      INSERT INTO user_achievements (user_id, achievement_id)
      VALUES (p_user_id, v_achievement.id)
      RETURNING * INTO v_new_achievement;
      
      -- Award karma if applicable
      IF v_achievement.karma_reward > 0 THEN
        PERFORM add_karma(p_user_id, v_achievement.karma_reward, 'Earned achievement: ' || v_achievement.name);
      END IF;
      
      RETURN NEXT v_new_achievement;
    END IF;
  END LOOP;
  
  RETURN;
END;
$$;