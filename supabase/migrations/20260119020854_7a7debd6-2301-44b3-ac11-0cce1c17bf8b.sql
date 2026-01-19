-- Create storage bucket for generated quote images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'quote-images',
  'quote-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/png', 'image/jpeg', 'image/webp']
);

-- Allow public read access to quote images
CREATE POLICY "Quote images are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'quote-images');

-- Allow authenticated users to upload quote images
CREATE POLICY "Authenticated users can upload quote images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'quote-images' AND auth.role() = 'authenticated');

-- Allow anyone to upload (for edge function with service role)
CREATE POLICY "Service role can manage quote images"
ON storage.objects
FOR ALL
USING (bucket_id = 'quote-images')
WITH CHECK (bucket_id = 'quote-images');