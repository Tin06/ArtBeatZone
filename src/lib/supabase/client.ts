'use client'

import { createClient } from '@supabase/supabase-js'
import { supabaseAnonKey, supabaseUrl } from './config'

export function createBrowserSupabaseClient() {
  return createClient(supabaseUrl, supabaseAnonKey)
}
