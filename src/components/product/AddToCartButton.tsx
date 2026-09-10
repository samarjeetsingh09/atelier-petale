import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { formatPrice } from '@/lib/format';
import { useCart } from '@/store/cart-context';
import type { Product, ProductVariant } from '@/types';

const CONFIRM_MS = 1800;

/**
 * The buy control. On success it morphs to a confirmation for a moment and then
 * returns — the label always names what the next tap will do.
 */
export function AddToCartButton({
  product,
  variant,
  qty,
  className = '',
}: {
  product: Product;
  variant: ProductVariant;
  qty: number;
  className?: string;
}) {
  const { addItem } = useCart();
  const [confirmed, setConfirmed] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleClick = () => {
    addItem(product, variant, qty);
    setConfirmed(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setConfirmed(false), CONFIRM_MS);
  };

  const total = product.price * qty;

  return (
    <button
      type="button"
      onClick={handleClick}
      className={[
        'flex min-h-[48px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl',
        'text-label-lg shadow-md transition-colors duration-200 active:scale-[0.98]',
        confirmed
          ? 'bg-secondary text-on-secondary'
          : 'bg-primary text-on-primary hover:bg-on-primary-fixed-variant',
        className,
      ].join(' ')}
    >
      <Icon name={confirmed ? 'check' : 'shopping_bag'} size={20} />
      <span>{confirmed ? 'Added to cart' : `Add to cart · ${formatPrice(total)}`}</span>
    </button>
  );
}
