import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/supabase'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://oxnqyntgmdfjlmpibmuv.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94bnF5bnRnbWRmamxtcGlibXV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczMTUzODYsImV4cCI6MjA1Mjg5MTM4Nn0.vqF2fiTgaZPuLsXNyPFkboIBZg5m-RvCzCQhilCx644'

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)