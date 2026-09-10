import { Link } from 'react-router-dom';
import { formatPrice } from '@/lib/format';
import type { Product } from '@/types';

/**
 * "More like this" strip. Snap-scrolls on mobile as in Stitch; becomes a grid
 * from lg so nothing sits off-screen on a wide display.
 */
export function SimilarProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="flex flex-col gap-3" aria-labelledby="similar-heading">
      <div className="flex items-center justify-between gap-3">
        <h2 id="similar-heading" className="text-headline-sm text-on-surface">
          Similar creations
        </h2>
        <Link
          to="/shop"
          className="inline-flex min-h-[44px] items-center text-label-sm text-primary transition-colors duration-200 hover:text-on-primary-fixed-variant"
        >
          Explore collection
        </Link>
      </div>

      <ul className="no-scrollbar -mx-gutter-mobile flex snap-x gap-3 overflow-x-auto px-gutter-mobile pb-2 pt-1 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
        {products.map((product) => {
          const [image] = product.images;
          return (
            <li key={product.id} className="w-48 shrink-0 snap-start lg:w-auto">
              <article className="group relative flex flex-col gap-2 rounded-xl bg-surface-container-low p-2.5 shadow-sm transition-shadow duration-200 hover:shadow-md">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-surface-container">
                  <img
                    src={image?.src}
                    alt={image?.alt ?? product.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="truncate text-label-md text-on-surface">
                    <Link
                      to={`/product/${product.slug}`}
                      className="after:absolute after:inset-0 after:content-['']"
                    >
                      {product.name}
                    </Link>
                  </h3>
                  <span className="text-body-sm font-medium text-primary">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
