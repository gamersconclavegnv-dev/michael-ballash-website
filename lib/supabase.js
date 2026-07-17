import { createClient } from "@supabase/supabase-js";

// Public client — safe for use in client components / anon reads.
// Points at THIS project's Supabase instance only.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Server-only client — uses the service role key, bypasses RLS.
// Only ever import this inside app/api/** route handlers, never in
// client components.
export function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  );
}
