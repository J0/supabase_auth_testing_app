import { createClient } from '@supabase/supabase-js'

const options = {
  db: {
    schema: 'public',
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: { 'x-my-custom-header': 'my-app-name' },
  },
}

export const supabase = createClient('https://rstggefpkhuepnqqtmwq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzdGdnZWZwa2h1ZXBucXF0bXdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcxMzMyNjcsImV4cCI6MTk5MjcwOTI2N30.Y2XwKuH1vSygbEQthjEBdQ3J4sxfIQGF9xUwwMkOweM', options)
