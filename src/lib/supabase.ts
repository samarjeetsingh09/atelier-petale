import type { SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL?.trim();
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

/**
 * True once both env vars are set. Until then the storefront runs on the bundled
 * starter catalogue and the studio panel says so plainly, rather than failing
 * with a network error nobody can interpret.
 */
export const isSupabaseConfigured = Boolean(url && anonKey);

let clientPromise: Promise<SupabaseClient> | null = null;

/**
 * Loads the Supabase SDK on first use.
 *
 * Deliberately a dynamic import: bundling it at the top level put ~230kB of
 * client library into the download every shopper pays for, on a site most
 * people reach from Instagram on mobile data. Only sessions that actually talk
 * to the database fetch it.
 *
 * The anon key is public by design — it is in the bundle and anyone can read
 * it. It grants nothing on its own: every read and write is decided by Row
 * Level Security in Postgres (supabase/schema.sql). The service_role key must
 * never appear in this app.
 */
export function getSupabase(): Promise<SupabaseClient> {
  if (!isSupabaseConfigured) {
    return Promise.reject(
      new Error(
        'Supabase is not configured. Copy .env.example to .env, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then restart the dev server.',
      ),
    );
  }

  clientPromise ??= import('@supabase/supabase-js').then(({ createClient }) =>
    createClient(url!, anonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    }),
  );

  return clientPromise;
}
