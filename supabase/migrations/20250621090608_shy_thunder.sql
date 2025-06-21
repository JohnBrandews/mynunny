/*
  # Fix Profile Insert Policy

  1. Security Changes
    - Update INSERT policy for profiles table to allow profile creation during registration
    - The policy now allows INSERT when the user_id matches the authenticated user's ID
    - This fixes the registration flow where users need to create their profile after signing up

  2. Changes Made
    - Drop the existing restrictive INSERT policy
    - Create a new policy that allows users to insert their own profile data
    - Ensure the policy works for both authenticated users and during the registration process
*/

-- Drop the existing INSERT policy that's too restrictive
DROP POLICY IF EXISTS "Users can create their own profile" ON profiles;

-- Create a new INSERT policy that allows profile creation during registration
CREATE POLICY "Users can create their own profile"
  ON profiles
  FOR INSERT
  TO public
  WITH CHECK (
    -- Allow insert if the user_id matches the authenticated user's ID
    -- This works both during registration and for authenticated users
    (auth.uid() IS NOT NULL AND auth.uid() = user_id)
  );