import { NavLink } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { useCart } from '@/store/cart-context';
import { navItems } from './navItems';

/** Same raised-pill treatment as the header, so the two read as one system. */
const pillShadow =
  'shadow-[0_1px_2px_rgba(42,36,33,0.05),0_-10px_28px_-12px_rgba(42,36,33,0.28),inset_0_1px_0_rgba(255,255,255,0.85),inset_0_-1px_0_rgba(42,36,33,0.07)]';

export function BottomNav() {
  const { itemCount } = useCart();

  return (
    <nav
      aria-label="Primary"
      /* A short centred rule marks the top of the bar, and everything below it
         is a frosted tray the pill floats in — so content scrolling underneath
         softens instead of running into the tab bar. */
      className={[
        'fixed inset-x-0 bottom-0 z-50 md:hidden',
        'bg-surface/60 backdrop-blur-xl',
        'px-4 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))]',
      ].join(' ')}
    >
      <span
        aria-hidden="true"
        className="mx-auto mb-2 block h-px w-24 rounded-full bg-outline-variant/70"
      />
      <ul
        className={`mx-auto flex h-[4.5rem] max-w-md items-stretch justify-around rounded-full border border-white/60 bg-surface/85 px-1.5 backdrop-blur-xl ${pillShadow}`}
      >
        {navItems.map((item) => (
          <li key={item.to} className="flex flex-1">
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                [
                  'relative flex min-h-[44px] w-full flex-col items-center justify-center gap-0.5 rounded-full py-1 transition-colors duration-200',
                  isActive
                    ? 'bg-surface-container font-semibold text-primary shadow-[inset_0_1px_3px_rgba(42,36,33,0.10)]'
                    : 'text-on-surface-variant',
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative">
                    <Icon name={item.icon} size={21} filled={isActive} />
                    {item.to === '/cart' && itemCount > 0 && (
                      <span className="absolute -right-2 -top-1 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-primary px-0.5 text-[9px] font-semibold leading-none text-on-primary">
                        {itemCount > 9 ? '9+' : itemCount}
                      </span>
                    )}
                  </span>
                  <span className="text-[10px] tracking-normal">{item.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
