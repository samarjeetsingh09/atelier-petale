import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProductCard } from '@/components/product/ProductCard';
import { CollectionCircles } from '@/components/collections/CollectionCircles';
import { useCatalog } from '@/store/catalog-context';
import { siteConfig } from '@/config/site';

export function Shop() {
  const { products, categories } = useCatalog();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategoryId = searchParams.get('category');
  const query = searchParams.get('q')?.trim() ?? '';

  const activeCategory = categories.find((category) => category.id === activeCategoryId);

  useEffect(() => {
    document.title = activeCategory
      ? `${activeCategory.label} — ${siteConfig.name}`
      : `Shop — ${siteConfig.name}`;
  }, [activeCategory]);

  const visible = products.filter((product) => {
    if (activeCategoryId && product.categoryId !== activeCategoryId) return false;
    if (!query) return true;
    const haystack = `${product.name} ${product.tagline} ${product.description}`.toLowerCase();
    return query
      .toLowerCase()
      .split(/\s+/)
      .every((term) => haystack.includes(term));
  });

  const clearQuery = () => {
    setSearchParams(activeCategoryId ? { category: activeCategoryId } : {}, { replace: true });
  };

  return (
    <>
      <Container width="wide" className="pt-space-md">
        <SectionHeader
          as="h1"
          eyebrow="The collection"
          title="Every bloom in the studio"
          description={`Made to order, one stitch at a time. Lead time is currently ${siteConfig.makingTime}.`}
        />
      </Container>

      {/* Same circles as the home page — one component, so they cannot drift. */}
      <CollectionCircles activeId={activeCategoryId} showAll heading="Browse by collection" />

      <Container width="wide" className="flex flex-col gap-space-md pb-space-lg">
        {query && (
          <div className="flex flex-wrap items-center gap-2 rounded-xl bg-surface-container-low p-3">
            <span className="text-body-sm text-on-surface-variant">
              Showing {visible.length} {visible.length === 1 ? 'result' : 'results'} for
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-fixed px-3 py-1 text-label-md text-on-primary-fixed">
              {query}
              <button
                type="button"
                onClick={clearQuery}
                aria-label={`Clear search for ${query}`}
                className="-mr-1.5 flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full transition-colors duration-200 hover:text-primary"
              >
                <Icon name="close" size={16} />
              </button>
            </span>
          </div>
        )}

        <section aria-labelledby="pieces-heading" className="flex flex-col gap-4">
          <h2
            id="pieces-heading"
            className="text-label-sm uppercase tracking-widest text-on-surface-variant"
          >
            {activeCategory ? activeCategory.label : 'All pieces'}
          </h2>

          {visible.length > 0 ? (
            <ul className="grid grid-cols-2 gap-3.5 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
              {visible.map((product) => (
                <li key={product.id} className="flex">
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-2xl bg-surface-container-low p-space-xl text-center text-body-md text-on-surface-variant">
              Nothing in this collection yet. Message the studio on WhatsApp and we'll make it.
            </p>
          )}
        </section>
      </Container>
    </>
  );
}
