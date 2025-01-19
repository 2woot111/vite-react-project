/*
  # Add name field to applications table (if not exists)

  1. Changes
    - Safely add `name` column to applications table if it doesn't exist
    - Add comment for documentation only if column is added
*/

DO $$ 
BEGIN 
  -- Check if the column exists before trying to add it
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'applications' 
    AND column_name = 'name'
  ) THEN
    -- Add name column to applications table
    ALTER TABLE applications 
    ADD COLUMN name text NOT NULL;

    -- Add comment for the new column
    COMMENT ON COLUMN applications.name IS 'Applicant''s full name';
  END IF;
END $$;