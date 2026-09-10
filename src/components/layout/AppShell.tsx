import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { CartToast } from './CartToast';
import { Footer } from './Footer';
import { Header } from './Header';
import { navItems } from './navItems';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

/**
 * The frame every route renders inside: fixed header, scrolling main, mobile tab
 * bar, footer.
 *
 * Spacing rules that everything else depends on:
 *  - `pt-16 md:pt-20` clears the fixed header.
 *  - The outer wrapper carries `pb-16 md:pb-0` so the footer is never hidden
 *    behind the mobile tab bar.
 *  - Product detail adds its own sticky bar, so it gets extra bottom room.
 */
export function AppShell() {
  const { pathname } = useLocation();

  const isProductDetail = pathname.startsWith('/product/');
  const activeItem = navItems.find((item) =>
    item.end ? pathname === item.to : pathname.startsWith(item.to),
  );

  return (
    // Bottom padding clears the frosted tab tray (0.5 + rule + 0.5 + 4.5 + 0.5rem)
    // plus the device safe area, as one value so the parts cannot overwrite
    // each other.
    <div className="flex min-h-screen flex-col bg-surface pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
      >
        Skip to content
      </a>

      <Header pageLabel={activeItem?.headerLabel} showBack={isProductDetail} />

      <main
        id="main"
        className={[
          // Clears the offers strip (2rem) plus the floating header pill.
          'flex flex-1 flex-col pt-[7.75rem] sm:pt-[8.5rem]',
          // Product detail carries a sticky buy bar below lg — leave room for it.
          isProductDetail ? 'pb-[5rem] lg:pb-8' : 'pb-space-lg',
        ].join(' ')}
      >
        <Outlet />
      </main>

      <Footer />
      <BottomNav />
      <CartToast />
    </div>
  );
}
