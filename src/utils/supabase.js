import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://doktkgirvqvjtybkhnnp.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRva3RrZ2lydnF2anR5Ymtobm5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2NjM2MTMsImV4cCI6MjA1MDIzOTYxM30.GWB7HpIKQdZMnSWDSA1fdtUXpL-7v4L7HDFYJFyRlFs";

export const supabase = createClient(supabaseUrl, supabaseKey);