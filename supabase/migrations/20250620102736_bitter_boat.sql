/*
  # Fix profiles table RLS policies

  1. Security Changes
    - Drop all existing conflicting policies on profiles table
    - Create clean, consistent policies for profiles table
    - Allow users to insert their own profile during registration
    - Allow users to read all profiles (for browsing nunnies/clients)
    - Allow users to update only their own profile

  2. Policy Details
    - INSERT: Users can create profile where user_id matches their auth.uid()
    - SELECT: Authenticated users can read all profiles
    - UPDATE: Users can update only their own profile where user_id matches their auth.uid()
*/

-- Drop all existing policies on profiles table
DROP POLICY IF EXISTS "Users can create their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;

-- Create clean, consistent policies
CREATE POLICY "Users can insert their own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can read all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Ensure RLS is enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;