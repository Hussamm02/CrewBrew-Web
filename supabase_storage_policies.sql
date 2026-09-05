-- Drop existing policies on crewbrew-assets to ensure idempotency
DROP POLICY IF EXISTS "Public users can read images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can read crewbrew-assets bucket" ON storage.buckets;
DROP POLICY IF EXISTS "Authenticated users can read objects in crewbrew-assets" ON storage.objects;

-- 1. storage.buckets
-- Allow authenticated users to SELECT only the crewbrew-assets bucket
CREATE POLICY "Authenticated users can read crewbrew-assets bucket"
ON storage.buckets FOR SELECT
TO authenticated
USING ( id = 'crewbrew-assets' );

-- 2. storage.objects
-- Public SELECT (allows anyone visiting the website to view uploaded images)
CREATE POLICY "Public users can view crewbrew-assets images"
ON storage.objects FOR SELECT
TO public
USING ( bucket_id = 'crewbrew-assets' );

-- Authenticated SELECT
CREATE POLICY "Authenticated users can read objects in crewbrew-assets"
ON storage.objects FOR SELECT
TO authenticated
USING ( bucket_id = 'crewbrew-assets' );

-- Authenticated INSERT
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'crewbrew-assets' );

-- Authenticated UPDATE
CREATE POLICY "Authenticated users can update images"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'crewbrew-assets' )
WITH CHECK ( bucket_id = 'crewbrew-assets' );

-- Authenticated DELETE
CREATE POLICY "Authenticated users can delete images"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'crewbrew-assets' );
