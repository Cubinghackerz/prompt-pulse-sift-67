// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://amppsxhqfurdhzvqqafl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtcHBzeGhxZnVyZGh6dnFxYWZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2Mzc0NzgsImV4cCI6MjA2MTIxMzQ3OH0.m2lOIrtBI5ldqnGhhYt0umOjFBsQWgTii0RpGIe2TxM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);