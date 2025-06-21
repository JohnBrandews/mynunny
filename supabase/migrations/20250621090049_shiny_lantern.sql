/*
  # Fix profiles table INSERT policy for registration

  1. Security Policy Updates
    - Drop the existing INSERT policy that uses 'public' role
    - Create a new INSERT policy that works for both 'public' and 'authenticated' roles
    - This allows users to create profiles during registration regardless of their auth state

  2. Changes Made
    - Updated INSERT policy to allow profile creation when user_id matches auth.uid()
    - Policy now works for both newly registered users and authenticated users
*/

-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "Allow profile creation during registration" ON profiles;

-- Create a new INSERT policy that works for both public and authenticated users
CREATE POLICY "Users can create their own profile"
  ON profiles
  FOR INSERT
  TO public, authenticated
  WITH CHECK (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id)
  );