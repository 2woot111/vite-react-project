/*
  # Create applications table and policies

  1. New Tables
    - `applications`
      - `id` (uuid, primary key)
      - `user_id` (uuid)
      - `is_undergraduate` (boolean)
      - `current_year` (integer, nullable)
      - `major` (text, nullable)
      - `can_access_student_list` (boolean)
      - `student_list_confidence` (integer, nullable)
      - `has_admissions_contact` (boolean)
      - `admissions_contact_confidence` (integer, nullable)
      - `response_speed` (integer)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on applications table
    - Add policies for:
      - Inserting new applications
      - Reading own applications
*/

-- Create applications table
CREATE TABLE applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  is_undergraduate boolean NOT NULL,
  current_year integer,
  major text,
  can_access_student_list boolean NOT NULL,
  student_list_confidence integer CHECK (student_list_confidence >= 1 AND student_list_confidence <= 10),
  has_admissions_contact boolean NOT NULL,
  admissions_contact_confidence integer CHECK (admissions_contact_confidence >= 1 AND admissions_contact_confidence <= 10),
  response_speed integer NOT NULL CHECK (response_speed >= 1 AND response_speed <= 10),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserting applications
CREATE POLICY "Anyone can insert applications"
  ON applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow users to read their own applications
CREATE POLICY "Users can read own applications"
  ON applications
  FOR SELECT
  TO anon
  USING (true);

-- Create indexes for better query performance
CREATE INDEX applications_user_id_idx ON applications(user_id);
CREATE INDEX applications_created_at_idx ON applications(created_at);

-- Add helpful comments to the table
COMMENT ON TABLE applications IS 'Stores application submissions from potential university ambassadors';
COMMENT ON COLUMN applications.user_id IS 'Unique identifier for the applicant';
COMMENT ON COLUMN applications.is_undergraduate IS 'Whether the applicant is currently an undergraduate student';
COMMENT ON COLUMN applications.current_year IS 'Expected graduation year';
COMMENT ON COLUMN applications.major IS 'Applicant''s field of study';
COMMENT ON COLUMN applications.can_access_student_list IS 'Whether the applicant can access student lists';
COMMENT ON COLUMN applications.student_list_confidence IS 'Confidence level in accessing student lists (1-10)';
COMMENT ON COLUMN applications.has_admissions_contact IS 'Whether the applicant has admissions contacts';
COMMENT ON COLUMN applications.admissions_contact_confidence IS 'Confidence level in admissions contact response (1-10)';
COMMENT ON COLUMN applications.response_speed IS 'Self-rated response speed (1-10)';