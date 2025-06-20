/*
  # Fix profiles table INSERT policy for registration

  1. Policy Changes
    - Drop the existing restrictive INSERT policy that prevents new profile creation
    - Create a new INSERT policy that allows authenticated users to create their own profile
    - The policy ensures users can only create profiles with their own user_id

  2. Security
    - Maintains security by ensuring users can only create profiles for themselves
    - Uses auth.uid() to verify the user_id matches the authenticated user
*/

-- Drop the existing INSERT policy that's too restrictive
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;

-- Create a new INSERT policy that allows profile creation during registration
CREATE POLICY "Users can create their own profile during registration"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);