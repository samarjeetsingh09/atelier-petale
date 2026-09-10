import { NavLink, Navigate, Outlet, useLocation } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { LogoMark } from '@/components/ui/Logo';
import { useAuth } from '@/auth/auth-context';
import { useCatalog } from '@/store/catalog-context';

const tabs = [
  { to: '/admin', label: 'Products', icon: 'inventory_2', end: true },
  { to: '/admin/collections', label: 'Collections', icon: 'local_florist' },
  { to: '/admin/reviews', label: 'Reviews', icon: 'star' },
];

/**
 * Admin shell and route guard.
 *
 * This guard only decides what to render. It is not the security boundary —
 * anyone can edit the JavaScript in their own browser. Every write is checked
 * again by Row Level Security in Postgres, which refuses callers who are not in
 * the `admins` table. See supabase/schema.sql.
 */
export function AdminLayout() {
  const { session, isAdmin, loading, signOut } = useAuth();
  const { source, error } = useCatalog();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <p className="text-body-sm text-on-surface-variant">Checking your access…</p>
      </div>
    );
  }

  if (!session || !isAdmin) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <header className="sticky top-0 z-40 border-b border-outline-variant/50 bg-surface/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-editorial items-center justify-between gap-3 px-4 sm:px-6">
          <a href="/" className="flex items-center gap-2.5 text-primary">
            <LogoMark size={28} />
            <span className="flex flex-col leading-none">
              <span className="font-display text-headline-sm text-on-surface">Studio</span>
              <span className="mt-0.5 text-label-sm uppercase tracking-widest text-on-surface-variant">
                {session.user.email}
              </span>
            </span>
          </a>

          <div className="flex items-center gap-1">
            <a
              href="/"
              className="hidden min-h-[44px] items-center gap-1.5 rounded-full px-3 text-label-md uppercase text-on-surface-variant transition-colors duration-200 hover:bg-surface-container hover:text-primary sm:flex"
            >
              <Icon name="storefront" size={18} />
              View shop
            </a>
            <button
              type="button"
              onClick={() => void signOut()}
              className="flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-full px-3 text-label-md uppercase text-on-surface-variant transition-colors duration-200 hover:bg-surface-container hover:text-primary"
            >
              <Icon name="close" size={18} />
              Sign out
            </button>
          </div>
        </div>

        <nav aria-label="Studio sections" className="border-t border-outline-variant/40">
          <ul className="mx-auto flex w-full max-w-editorial gap-1 px-2 sm:px-4">
            {tabs.map((tab) => (
              <li key={tab.to}>
                <NavLink
                  to={tab.to}
                  end={tab.end}
                  className={({ isActive }) =>
                    [
                      'flex min-h-[48px] items-center gap-1.5 border-b-2 px-3 text-label-md uppercase transition-colors duration-200',
                      isActive
                        ? 'border-primary text-primary'
                        : 'border-transparent text-on-surface-variant hover:text-primary',
                    ].join(' ')
                  }
                >
                  <Icon name={tab.icon} size={18} />
                  {tab.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {source === 'starter' && (
        <p className="border-b border-outline-variant/50 bg-primary-fixed px-4 py-2.5 text-center text-body-sm text-on-primary-fixed">
          {error
            ? `Showing the bundled starter catalogue — the database could not be reached (${error}).`
            : 'The database is empty, so the bundled starter catalogue is showing. Import it below to start editing.'}
        </p>
      )}

      <main className="mx-auto w-full max-w-editorial flex-1 px-4 py-space-lg sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}
