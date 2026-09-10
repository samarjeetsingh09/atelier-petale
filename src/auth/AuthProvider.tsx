import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Session, SupabaseClient } from '@supabase/supabase-js';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';
import { AuthContext, type AuthContextValue } from './auth-context';

/**
 * Asks the database whether this user is on the admin allowlist.
 *
 * RLS on `admins` exposes only the caller's own row, so this can neither
 * enumerate other admins nor be talked into returning true for someone else.
 * A false here hides the panel; Postgres independently refuses the writes.
 */
async function checkIsAdmin(client: SupabaseClient): Promise<boolean> {
  const { data, error } = await client.rpc('is_admin');
  if (error) {
    console.error('[auth] admin check failed:', error.message);
    return false;
  }
  return data === true;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    let active = true;
    let unsubscribe: (() => void) | undefined;

    void (async () => {
      let client: SupabaseClient;
      try {
        client = await getSupabase();
      } catch {
        if (active) setLoading(false);
        return;
      }

      const resolve = async (next: Session | null) => {
        const admin = next ? await checkIsAdmin(client) : false;
        if (!active) return;
        setSession(next);
        setIsAdmin(admin);
        setLoading(false);
      };

      const { data } = await client.auth.getSession();
      await resolve(data.session);

      const { data: listener } = client.auth.onAuthStateChange((_event, next) => {
        setLoading(true);
        void resolve(next);
      });
      unsubscribe = () => listener.subscription.unsubscribe();
    })();

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const client = await getSupabase();
    const { error } = await client.auth.signInWithPassword({ email, password });
    // Supabase returns the same message for a wrong password and an unknown
    // address, which is what we want — the form must not reveal which.
    if (error) throw error;
  }, []);

  const signOut = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    const client = await getSupabase();
    await client.auth.signOut();
    setSession(null);
    setIsAdmin(false);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ session, isAdmin, loading, signIn, signOut }),
    [session, isAdmin, loading, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
