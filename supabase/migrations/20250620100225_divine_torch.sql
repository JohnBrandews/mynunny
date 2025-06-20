/*
  # Add missing columns to profiles table

  1. Changes to profiles table
    - Add `phone_number` column for contact information
    - Add `services` column as text array for nunny services
    - Add `age_range` column for nunny age preferences
    - Add `service_description` column for client service descriptions
    - Add `daily_rate` column for client daily rates
    - Add `rating` and `review_count` columns for user ratings
    - Add `is_verified` column for user verification status
    - Add `email` column for user email addresses

  2. Security
    - No changes to existing RLS policies needed
*/

-- Add missing columns to profiles table
DO $$
BEGIN
  -- Add email column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'email'
  ) THEN
    ALTER TABLE profiles ADD COLUMN email text;
  END IF;

  -- Add phone_number column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'phone_number'
  ) THEN
    ALTER TABLE profiles ADD COLUMN phone_number text;
  END IF;

  -- Add services column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'services'
  ) THEN
    ALTER TABLE profiles ADD COLUMN services text[];
  END IF;

  -- Add age_range column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'age_range'
  ) THEN
    ALTER TABLE profiles ADD COLUMN age_range text;
  END IF;

  -- Add service_description column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'service_description'
  ) THEN
    ALTER TABLE profiles ADD COLUMN service_description text;
  END IF;

  -- Add daily_rate column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'daily_rate'
  ) THEN
    ALTER TABLE profiles ADD COLUMN daily_rate integer;
  END IF;

  -- Add rating column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'rating'
  ) THEN
    ALTER TABLE profiles ADD COLUMN rating numeric(3,2) DEFAULT 0;
  END IF;

  -- Add review_count column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'review_count'
  ) THEN
    ALTER TABLE profiles ADD COLUMN review_count integer DEFAULT 0;
  END IF;

  -- Add is_verified column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'is_verified'
  ) THEN
    ALTER TABLE profiles ADD COLUMN is_verified boolean DEFAULT false;
  END IF;

  -- Add profile_picture_url column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'profile_picture_url'
  ) THEN
    ALTER TABLE profiles ADD COLUMN profile_picture_url text;
  END IF;

  -- Add id_image_url column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'id_image_url'
  ) THEN
    ALTER TABLE profiles ADD COLUMN id_image_url text;
  END IF;
END $$;