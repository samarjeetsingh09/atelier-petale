import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { Rating } from '@/components/ui/Rating';
import { formatPrice } from '@/lib/format';
import { useCart } from '@/store/cart-context';
import type { Product } from '@/types';

/**
 * Catalogue card, matching the Stitch grid item: square photo with a corner
 * badge, rating, name, tagline, then price opposite a round add control.
 *
 * The whole card is a link via a stretched overlay, so the add button can stay a
 * real sibling button rather than nesting interactive elements.
 */
export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [primaryImage] = product.images;
  const defaultVariant = product.variants[0];

  return (
    <article className="group relative flex h-full w-full flex-col rounded-2xl bg-surface-container-lowest p-2.5 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-surface-container-high">
        <img
          src={primaryImage?.src}
          alt={primaryImage?.alt ?? product.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {product.badge && (
          <Badge tone={product.badge.tone} className="absolute left-2 top-2">
            {product.badge.label}
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between pb-1 pt-2.5">
        <div>
          <Rating value={product.rating} count={product.reviewCount} />
          <h3 className="mt-0.5 line-clamp-1 text-body-md font-medium leading-snug text-on-surface">
            <Link
              to={`/product/${product.slug}`}
              className="after:absolute after:inset-0 after:rounded-2xl after:content-['']"
            >
              {product.name}
            </Link>
          </h3>
          <p className="line-clamp-1 text-label-sm text-on-surface-variant">{product.tagline}</p>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="font-display text-headline-sm font-semibold text-on-surface">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            aria-label={`Add ${product.name} to cart`}
            onClick={() => defaultVariant && addItem(product, defaultVariant)}
            className="relative z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-primary text-on-primary shadow-sm transition-all duration-200 hover:bg-on-primary-fixed-variant active:scale-90"
          >
            <Icon name="add" size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}
