import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://uxiichzxundyllfsftuw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4aWljaHp4dW5keWxsZnNmdHV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE4NTEyMTIsImV4cCI6MjAyNzQyNzIxMn0.BE-JI0GCuRbNAFE9EnRPK67V3iyKQxidOkXZaSxYgrQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
