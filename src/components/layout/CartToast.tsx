import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { formatPrice, pluralise } from '@/lib/format';
import { useCart } from '@/store/cart-context';

const VISIBLE_MS = 4000;

/**
 * Confirmation after "add to cart", lifted from the Stitch home screen.
 * Sits above the bottom nav on mobile and bottom-right on desktop.
 */
export function CartToast() {
  const { lastAdded, dismissLastAdded, itemCount, subtotal } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!lastAdded) {
      setVisible(false);
      return;
    }
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), VISIBLE_MS);
    return () => window.clearTimeout(timer);
  }, [lastAdded]);

  if (!lastAdded) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        'pointer-events-none fixed inset-x-4 bottom-[calc(6.75rem+env(safe-area-inset-bottom,0px))] z-40 transition-all duration-300 ease-out',
        'md:inset-x-auto md:bottom-6 md:right-6 md:w-96',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-8 opacity-0',
      ].join(' ')}
    >
      <div className="pointer-events-auto flex items-center justify-between gap-3 rounded-2xl bg-inverse-surface p-3.5 shadow-lg">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
            <Icon name="shopping_bag" size={18} />
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-body-sm font-semibold text-inverse-on-surface">
              {lastAdded.product.name} added
            </span>
            <span className="text-label-sm text-inverse-on-surface/80">
              {pluralise(itemCount, 'bouquet')} · {formatPrice(subtotal)}
            </span>
          </span>
        </div>
        <Link
          to="/cart"
          onClick={dismissLastAdded}
          className="inline-flex min-h-[44px] shrink-0 cursor-pointer items-center rounded-lg bg-white/10 px-3 text-label-sm uppercase font-semibold text-surface-container-high transition-colors duration-200 hover:bg-white/20"
        >
          View cart
        </Link>
      </div>
    </div>
  );
}
