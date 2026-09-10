import { createContext, useContext } from 'react';
import type { Session } from '@supabase/supabase-js';

export interface AuthContextValue {
  session: Session | null;
  /**
   * Confirmed against the `admins` table, not merely "is signed in". A signed-in
   * account that is not on the allowlist gets false — and would be refused by
   * Postgres anyway if it tried to write.
   */
  isAdmin: boolean;
  /** True while the initial session and admin check are still resolving. */
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>');
  return context;
}
