import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://nawopyofenqfjtxfmljz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hd29weW9mZW5xZmp0eGZtbGp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYwNTY4MTIsImV4cCI6MjAzMTYzMjgxMn0.haB7Afv7dBh8piQx-SmTucQWzABSCVf--FCU08jSG1k')