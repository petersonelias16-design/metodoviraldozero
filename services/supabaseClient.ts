import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sjlulxfhddtfjdbmjtdt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqbHVseGZoZGR0ZmpkYm1qdGR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MzAxMTQsImV4cCI6MjA3OTUwNjExNH0.OtMHH-PNrvoHBDH-EH4wSCM0uEcENdgFVdoal5KGHqo';

export const supabase = createClient(supabaseUrl, supabaseKey);
