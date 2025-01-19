/*
  # Add name field to applications table

  1. Changes
    - Add `name` column to applications table
    - Add NOT NULL constraint
    - Add comment for documentation
*/

-- Add name column to applications table
ALTER TABLE applications 
ADD COLUMN name text NOT NULL;

-- Add comment for the new column
COMMENT ON COLUMN applications.name IS 'Applicant''s full name';