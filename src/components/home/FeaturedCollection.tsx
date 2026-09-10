import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProductCard } from '@/components/product/ProductCard';
import { useCatalog } from '@/store/catalog-context';

/**
 * The catalogue grid. Stitch specifies two columns on mobile; the grid steps to
 * three on tablet and four on large desktop so cards keep their proportions
 * instead of growing to fill the width.
 */
export function FeaturedCollection() {
  const { getFeaturedProducts } = useCatalog();
  const featured = getFeaturedProducts();

  return (
    <section className="pb-space-lg pt-space-md" aria-labelledby="collection-heading">
      <Container width="wide" className="flex flex-col gap-4">
        <SectionHeader
          eyebrow="Seasonal palette"
          eyebrowIcon="favorite"
          title={<span id="collection-heading">Made with love</span>}
          description="Little handmade pieces crafted for life's big, heartfelt moments."
          action={
            <Link
              to="/shop"
              className="hidden min-h-[44px] items-center gap-1 text-label-md uppercase text-primary transition-colors duration-200 hover:text-on-primary-fixed-variant sm:inline-flex"
            >
              See all
              <Icon name="arrow_forward" size={16} />
            </Link>
          }
        />

        <ul className="grid grid-cols-2 gap-3.5 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
          {featured.map((product) => (
            <li key={product.id} className="flex">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>

        <Link
          to="/shop"
          className="mt-1 inline-flex min-h-[44px] items-center justify-center gap-1 text-label-md uppercase text-primary sm:hidden"
        >
          See all bouquets
          <Icon name="arrow_forward" size={16} />
        </Link>
      </Container>
    </section>
  );
}
