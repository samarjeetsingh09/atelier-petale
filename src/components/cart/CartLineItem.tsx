import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { formatPrice } from '@/lib/format';
import { useCart } from '@/store/cart-context';
import type { ResolvedCartLine } from '@/types';

const REMOVE_MS = 250;

export function CartLineItem({ line }: { line: ResolvedCartLine }) {
  const { setQty, removeItem } = useCart();
  const [removing, setRemoving] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleRemove = () => {
    setRemoving(true);
    timer.current = window.setTimeout(
      () => removeItem(line.product.id, line.variant.id),
      REMOVE_MS,
    );
  };

  const [image] = line.product.images;

  return (
    <li
      className={`rounded-xl bg-surface-container p-3.5 shadow-sm transition-all duration-200 ${
        removing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
      }`}
    >
      <div className="flex gap-3.5">
        <Link
          to={`/product/${line.product.slug}`}
          className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-surface-container-high sm:h-28 sm:w-28"
        >
          <img
            src={image?.src}
            alt={image?.alt ?? line.product.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <span className="absolute bottom-1 left-1 rounded-full bg-surface/90 px-1.5 py-0.5 text-[9px] text-secondary">
            {line.product.inStock ? 'In stock' : 'Made to order'}
          </span>
        </Link>

        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-1">
              <h3 className="truncate font-display text-headline-sm text-on-surface">
                <Link
                  to={`/product/${line.product.slug}`}
                  className="transition-colors duration-200 hover:text-primary"
                >
                  {line.product.name}
                </Link>
              </h3>
              <button
                type="button"
                aria-label={`Remove ${line.product.name} from cart`}
                onClick={handleRemove}
                className="-mr-1.5 -mt-1.5 flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full text-outline transition-colors duration-200 hover:bg-surface-container-high hover:text-primary"
              >
                <Icon name="delete" size={19} />
              </button>
            </div>
            <p className="line-clamp-1 text-body-sm text-on-surface-variant">{line.variant.name}</p>
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 pt-2">
            <span className="text-label-lg font-semibold text-primary">
              {formatPrice(line.lineTotal)}
            </span>
            <QuantityStepper
              value={line.qty}
              size="sm"
              label={line.product.name}
              onChange={(next) => setQty(line.product.id, line.variant.id, next)}
            />
          </div>
        </div>
      </div>
    </li>
  );
}
