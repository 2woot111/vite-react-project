export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      applications: {
        Row: {
          id: string
          user_id: string
         name: string
          is_undergraduate: boolean
          current_year: number | null
          major: string | null
          can_access_student_list: boolean
          student_list_confidence: number | null
          has_admissions_contact: boolean
          admissions_contact_confidence: number | null
          response_speed: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
         name: string
          is_undergraduate: boolean
          current_year?: number | null
          major?: string | null
          can_access_student_list: boolean
          student_list_confidence?: number | null
          has_admissions_contact: boolean
          admissions_contact_confidence?: number | null
          response_speed: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
         name?: string
          is_undergraduate?: boolean
          current_year?: number | null
          major?: string | null
          can_access_student_list?: boolean
          student_list_confidence?: number | null
          has_admissions_contact?: boolean
          admissions_contact_confidence?: number | null
          response_speed?: number
          created_at?: string
        }
      }
    }
  }
}