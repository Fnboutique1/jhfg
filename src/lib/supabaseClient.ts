import { createClient } from '@supabase/supabase-js';

// Project URL + anon/public key. The anon key is safe to expose in frontend
// code — access is controlled by Row Level Security (RLS) policies on your
// Supabase tables, not by hiding this key.
const SUPABASE_URL = 'https://uiumwmdxkkqhnoktgoes.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpdW13bWR4a2txaG5va3Rnb2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ0MDgzNjYsImV4cCI6MjA5OTk4NDM2Nn0.fP1-6syJAktrgu2y6wSvFeXcDigaWiiChRw50Dk-GAI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
