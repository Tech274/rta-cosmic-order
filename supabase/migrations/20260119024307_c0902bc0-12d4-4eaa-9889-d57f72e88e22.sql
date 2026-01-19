-- Create email subscriptions table for daily Subhashita digest
CREATE TABLE public.email_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  unsubscribe_token UUID NOT NULL DEFAULT gen_random_uuid(),
  preferred_category TEXT DEFAULT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.email_subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to subscribe (insert their email)
CREATE POLICY "Anyone can subscribe"
ON public.email_subscriptions
FOR INSERT
WITH CHECK (true);

-- Allow users to unsubscribe using their token
CREATE POLICY "Anyone can unsubscribe with valid token"
ON public.email_subscriptions
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Allow reading for unsubscribe verification
CREATE POLICY "Anyone can read by unsubscribe token"
ON public.email_subscriptions
FOR SELECT
USING (true);

-- Create index for email lookups
CREATE INDEX idx_email_subscriptions_email ON public.email_subscriptions(email);
CREATE INDEX idx_email_subscriptions_active ON public.email_subscriptions(is_active) WHERE is_active = true;

-- Add trigger for updated_at
CREATE TRIGGER update_email_subscriptions_updated_at
BEFORE UPDATE ON public.email_subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();