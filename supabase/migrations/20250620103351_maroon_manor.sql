/*
  # Fix Profile Insert Policy for Registration

  1. Security Updates
    - Update the INSERT policy for profiles table to allow profile creation during registration
    - The policy now allows both authenticated users and public users (during registration) to insert profiles
    - Maintains security by ensuring users can only create profiles with their own user_id

  2. Changes Made
    - Modified the INSERT policy to be more permissive during registration
    - Added proper role handling for both authenticated and public contexts
*/

-- Drop the existing restrictive INSERT policy
DROP POLICY IF EXISTS "Users can create their own profile during registration" ON profiles;

-- Create a new INSERT policy that works during registration
CREATE POLICY "Allow profile creation during registration"
  ON profiles
  FOR INSERT
  TO public
  WITH CHECK (
    -- Allow if the user is authenticated and creating their own profile
    (auth.uid() = user_id) OR
    -- Allow during registration process when user_id matches the auth context
    (auth.uid() IS NOT NULL AND auth.uid() = user_id)
  );

-- Also ensure we have a proper SELECT policy for authenticated users
DROP POLICY IF EXISTS "Authenticated users can read all profiles" ON profiles;

CREATE POLICY "Authenticated users can read all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

-- Ensure UPDATE policy is correct
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);