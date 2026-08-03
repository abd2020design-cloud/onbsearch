import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// تصدير العقل الرابط بين واجهة محرك البحث onbsearch وقاعدة البيانات المرقاة Pro
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
