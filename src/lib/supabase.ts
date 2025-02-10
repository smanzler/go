import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yjztmtjyppnnagadclip.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqenRtdGp5cHBubmFnYWRjbGlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyMTE3MzIsImV4cCI6MjA1NDc4NzczMn0.f9jdExSKVBeFXioUwRNMnJBSopycSaYtaddcRBqlpBo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
