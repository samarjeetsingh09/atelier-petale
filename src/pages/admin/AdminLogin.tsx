import { useEffect, useState, type FormEvent } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { LogoMark } from '@/components/ui/Logo';
import { useAuth } from '@/auth/auth-context';
import { isSupabaseConfigured } from '@/lib/supabase';

export function AdminLogin() {
  const { session, isAdmin, loading, signIn } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    document.title = 'Studio sign in';
  }, []);

  if (!loading && session && isAdmin) {
    const from = (location.state as { from?: string } | null)?.from ?? '/admin';
    return <Navigate to={from} replace />;
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await signIn(email, password);
    } catch {
      // Deliberately one message for every failure. Saying "no such account"
      // would tell a stranger which addresses exist.
      setError('That email and password do not match an account.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-4 py-space-2xl">
      <div className="w-full max-w-sm">
        <div className="mb-space-lg flex flex-col items-center gap-2 text-center">
          <span className="text-primary">
            <LogoMark size={40} />
          </span>
          <h1 className="font-display text-headline-md text-on-surface">Studio sign in</h1>
          <p className="text-body-sm text-on-surface-variant">
            For the Atelier Pétale studio. This page is not for customers.
          </p>
        </div>

        {!isSupabaseConfigured ? (
          <div className="rounded-xl bg-surface-container p-4 text-body-sm text-on-surface-variant">
            <p className="mb-2 flex items-center gap-1.5 font-semibold text-on-surface">
              <Icon name="psychology_alt" size={18} className="text-primary" />
              Database not connected yet
            </p>
            <p>
              Copy <code className="font-mono">.env.example</code> to{' '}
              <code className="font-mono">.env</code>, add the Supabase URL and anon key, then
              restart the dev server.
            </p>
          </div>
        ) : (
          <form
            onSubmit={submit}
            className="flex flex-col gap-4 rounded-2xl bg-surface-container-lowest p-space-lg shadow-md"
          >
            <div>
              <label htmlFor="admin-email" className="mb-1 block text-label-md text-on-surface">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="min-h-[48px] w-full rounded-lg bg-surface px-3.5 py-2.5 text-body-md text-on-surface outline-none transition-colors duration-200 focus:bg-surface-container-low focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="mb-1 block text-label-md text-on-surface">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="min-h-[48px] w-full rounded-lg bg-surface px-3.5 py-2.5 text-body-md text-on-surface outline-none transition-colors duration-200 focus:bg-surface-container-low focus:ring-2 focus:ring-primary"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="flex items-start gap-1.5 rounded-lg bg-error-container p-3 text-body-sm text-on-error-container"
              >
                <Icon name="close" size={16} />
                {error}
              </p>
            )}

            {session && !isAdmin && !loading && (
              <p
                role="alert"
                className="rounded-lg bg-surface-container p-3 text-body-sm text-on-surface-variant"
              >
                Signed in, but this account is not on the studio allowlist. Ask an existing admin to
                add it.
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary text-label-lg text-on-primary shadow-md transition-colors duration-200 hover:bg-on-primary-fixed-variant active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        )}

        <a
          href="/"
          className="mt-space-lg flex min-h-[44px] items-center justify-center gap-1.5 text-label-md uppercase text-on-surface-variant transition-colors duration-200 hover:text-primary"
        >
          <Icon name="arrow_back_ios_new" size={14} />
          Back to the shop
        </a>
      </div>
    </div>
  );
}
