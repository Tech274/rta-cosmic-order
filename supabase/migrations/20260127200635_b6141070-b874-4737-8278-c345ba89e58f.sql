-- Create app_role enum for admin system
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table for secure role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create blog_posts table
CREATE TABLE public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID NOT NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image TEXT,
    category TEXT NOT NULL DEFAULT 'general',
    tags TEXT[] DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on blog_posts
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Blog posts policies
CREATE POLICY "Published posts are viewable by everyone"
ON public.blog_posts
FOR SELECT
USING (status = 'published');

CREATE POLICY "Authors can view their own posts"
ON public.blog_posts
FOR SELECT
USING (auth.uid() = author_id);

CREATE POLICY "Admins can manage all posts"
ON public.blog_posts
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authors can create posts"
ON public.blog_posts
FOR INSERT
WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own posts"
ON public.blog_posts
FOR UPDATE
USING (auth.uid() = author_id);

-- Create content_galleries table for image galleries
CREATE TABLE public.content_galleries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_type TEXT NOT NULL, -- 'blog', 'scripture', 'philosophy'
    content_id TEXT NOT NULL, -- references the content item
    title TEXT NOT NULL,
    description TEXT,
    images JSONB NOT NULL DEFAULT '[]', -- array of {url, caption, alt}
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on content_galleries
ALTER TABLE public.content_galleries ENABLE ROW LEVEL SECURITY;

-- Gallery policies
CREATE POLICY "Galleries are viewable by everyone"
ON public.content_galleries
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage galleries"
ON public.content_galleries
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create audiobooks table
CREATE TABLE public.audiobooks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    sanskrit_title TEXT,
    author TEXT NOT NULL,
    narrator TEXT,
    description TEXT,
    cover_image TEXT,
    audio_url TEXT,
    duration_seconds INTEGER DEFAULT 0,
    category TEXT NOT NULL DEFAULT 'general',
    tags TEXT[] DEFAULT '{}',
    chapters JSONB DEFAULT '[]', -- array of {number, title, startTime, duration}
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on audiobooks
ALTER TABLE public.audiobooks ENABLE ROW LEVEL SECURITY;

-- Audiobook policies
CREATE POLICY "Published audiobooks are viewable by everyone"
ON public.audiobooks
FOR SELECT
USING (status = 'published');

CREATE POLICY "Admins can manage audiobooks"
ON public.audiobooks
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create updated_at trigger for new tables
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_content_galleries_updated_at
BEFORE UPDATE ON public.content_galleries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_audiobooks_updated_at
BEFORE UPDATE ON public.audiobooks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();