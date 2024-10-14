import { createClient } from "@supabase/supabase-js";
import { supabaseUrl, supabaseAnonKey } from "@/config/env";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);