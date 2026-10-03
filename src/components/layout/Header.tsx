import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { LogoMark } from '@/components/ui/Logo';
import { siteConfig } from '@/config/site';
import { useCart } from '@/store/cart-context';
import { AnnouncementBar } from './AnnouncementBar';
import { navItems } from './navItems';
import { SearchDialog } from './SearchDialog';

/**
 * Raised pill: an outer drop shadow lifts it off the page, an inset highlight
 * along the top edge and an inset shade along the bottom give it thickness.
 */
const pillShadow =
  'shadow-[0_1px_2px_rgba(155,31,85,0.06),0_10px_28px_-10px_rgba(155,31,85,0.30),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(155,31,85,0.08)]';

function CartBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span className="absolute right-1 top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold leading-none text-on-primary ring-2 ring-surface">
      {count > 9 ? '9+' : count}
    </span>
  );
}

export interface HeaderProps {
  pageLabel?: string;
  showBack?: boolean;
  backTitle?: string;
}

export function Header({ showBack = false, backTitle }: HeaderProps) {
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);

  const linkItems = navItems.filter((item) => item.to !== '/cart');

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Offers strip runs full width, hard against the top edge; the safe
            area is folded into its padding so it clears a notch. */}
        <div className="pt-[env(safe-area-inset-top,0px)]">
          <AnnouncementBar />
        </div>

        <div className="px-5 pt-3 sm:px-8 sm:pt-4">
          <div
            className={`mx-auto grid h-20 w-full max-w-5xl grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-full border border-white/60 bg-surface/80 px-3 backdrop-blur-xl sm:h-[5.5rem] sm:px-4 ${pillShadow}`}
          >
            {/* Left: desktop navigation, or a back control on mobile product pages */}
            <div className="flex min-w-0 items-center justify-start">
              {showBack ? (
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  aria-label="Go back"
                  className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full text-on-surface transition-colors duration-200 hover:bg-surface-container hover:text-primary md:hidden"
                >
                  <Icon name="arrow_back_ios_new" size={18} />
                </button>
              ) : null}

              <nav aria-label="Main" className="hidden md:block">
                <ul className="flex items-center gap-0.5">
                  {linkItems.map((item) => (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        end={item.end}
                        className={({ isActive }) =>
                          [
                            'flex min-h-[44px] items-center rounded-full px-4 text-label-md uppercase transition-colors duration-200',
                            isActive
                              ? 'bg-primary-fixed text-primary shadow-[inset_0_1px_3px_rgba(155,31,85,0.12)]'
                              : 'text-on-surface-variant hover:bg-surface-container/70 hover:text-primary',
                          ].join(' ')
                        }
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Centre: mark and name, on every breakpoint */}
            <div className="flex min-w-0 items-center justify-center">
              <Link
                to="/"
                aria-label={`${siteConfig.name}, home`}
                className="flex min-h-[44px] items-center gap-2.5 rounded-full px-2 transition-opacity duration-200 hover:opacity-80"
              >
                <LogoMark size={68} className="sm:!h-[76px]" />
                {backTitle && (
                  <span className="truncate font-display text-headline-sm leading-none text-on-surface">
                    {backTitle}
                  </span>
                )}
              </Link>
            </div>

            {/* Right: utilities. Hidden on phones — the cart lives in the tab bar. */}
            <div className="hidden items-center justify-end gap-0.5 md:flex">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search the boutique"
                className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full text-on-surface-variant transition-colors duration-200 hover:bg-surface-container hover:text-primary"
              >
                <Icon name="search" size={22} />
              </button>
              <Link
                to="/cart"
                aria-label={itemCount > 0 ? `Cart, ${itemCount} items` : 'Cart, empty'}
                className="relative flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full text-on-surface-variant transition-colors duration-200 hover:bg-surface-container hover:text-primary"
              >
                <Icon name="shopping_bag" size={22} />
                <CartBadge count={itemCount} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
