import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://krzofnafayygoxoinkfv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtyem9mbmFmYXl5Z294b2lua2Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2Mjk3NTYsImV4cCI6MjA1MjIwNTc1Nn0.7gnVJJrcrfMzWOYAdzUTJhqscx1bbd7odOmFxzxz404';

export const supabase = createClient(supabaseUrl, supabaseKey);