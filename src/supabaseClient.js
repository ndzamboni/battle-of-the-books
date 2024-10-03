import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with your environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
