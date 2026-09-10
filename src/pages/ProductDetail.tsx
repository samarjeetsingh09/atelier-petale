import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Accordion, AccordionItem } from '@/components/ui/Accordion';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { Rating } from '@/components/ui/Rating';
import { AddToCartButton } from '@/components/product/AddToCartButton';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ReviewList } from '@/components/product/ReviewList';
import { SimilarProducts } from '@/components/product/SimilarProducts';
import { VariantPicker } from '@/components/product/VariantPicker';
import { WishlistButton } from '@/components/product/WishlistButton';
import { siteConfig } from '@/config/site';
import { useCatalog } from '@/store/catalog-context';
import { formatHours, formatPrice } from '@/lib/format';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { products, getProductById, getReviewsForProduct } = useCatalog();
  const product = id ? getProductById(id) : undefined;

  const [variantId, setVariantId] = useState(product?.variants[0]?.id ?? '');
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) document.title = `${product.name} — ${siteConfig.name}`;
  }, [product]);

  // Reset the selection when navigating between products.
  useEffect(() => {
    setVariantId(product?.variants[0]?.id ?? '');
    setQty(1);
  }, [product]);

  if (!product) return <Navigate to="/shop" replace />;

  const variant = product.variants.find((item) => item.id === variantId) ?? product.variants[0]!;
  const reviews = getReviewsForProduct(product.id);
  const similar = products.filter((item) => item.id !== product.id).slice(0, 3);

  return (
    <>
      {/* Mobile: gallery runs full-bleed above the copy, as in Stitch. */}
      <div className="lg:hidden">
        <ProductGallery product={product} />
      </div>

      <Container width="wide" className="lg:py-space-xl">
        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-space-2xl">
          {/* Desktop: large gallery on the left */}
          <div className="hidden lg:col-span-7 lg:block">
            <ProductGallery product={product} />
          </div>

          {/* Product information */}
          <div className="flex flex-col gap-space-md pt-space-lg lg:col-span-5 lg:sticky lg:top-28 lg:pt-0">
            <header className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-3">
                <span className="text-label-md uppercase tracking-widest text-secondary">
                  Artisanal bouquet series
                </span>
                <a href="#reviews" className="inline-flex min-h-[44px] items-center gap-1">
                  <Rating value={product.rating} size={16} />
                  <span className="text-body-sm text-on-surface-variant underline decoration-outline-variant underline-offset-2">
                    ({product.reviewCount} reviews)
                  </span>
                </a>
              </div>
              <h1 className="text-headline-lg-mobile text-on-surface lg:text-headline-lg">
                {product.name}
              </h1>
            </header>

            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="font-display text-headline-md font-medium text-primary">
                {formatPrice(product.price)}
              </span>
              <span className="text-body-sm text-on-surface-variant">
                tax included · {formatHours(product.hoursToMake)} by hand
              </span>
              <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-secondary-container px-2 py-0.5 text-label-sm text-secondary">
                <Icon name="all_inclusive" size={13} />
                Never wilts
              </span>
            </div>

            <p className="text-body-md leading-relaxed text-on-surface-variant">
              {product.description}
            </p>

            <div className="mt-1 flex items-center gap-2 rounded-xl bg-surface-container-low p-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary-container text-secondary">
                <Icon name="hourglass_top" size={16} />
              </span>
              <span className="flex flex-col">
                <span className="text-label-md font-semibold text-on-surface">
                  {product.inStock ? 'In stock · made to order' : 'Made to order'}
                </span>
                <span className="text-body-sm text-on-surface-variant">
                  Crafted by hand in {siteConfig.makingTime}
                </span>
              </span>
            </div>

            <VariantPicker
              variants={product.variants}
              selectedId={variant.id}
              onSelect={setVariantId}
            />

            <div className="flex items-center justify-between gap-4 py-1">
              <span className="flex flex-col">
                <span className="text-label-md uppercase tracking-wider text-on-surface">
                  Quantity
                </span>
                <span className="text-body-sm text-on-surface-variant">
                  Each piece uniquely stitched
                </span>
              </span>
              <QuantityStepper value={qty} onChange={setQty} label={product.name} />
            </div>

            {/* Desktop buy row — mobile uses the sticky bar below. */}
            <div className="hidden items-center gap-3 lg:flex">
              <WishlistButton productName={product.name} />
              <AddToCartButton product={product} variant={variant} qty={qty} />
            </div>

            <section aria-labelledby="craft-heading" className="flex flex-col gap-2 pt-space-xs">
              <h2
                id="craft-heading"
                className="mb-1 text-label-md uppercase tracking-wider text-on-surface-variant"
              >
                Bouquet craft details
              </h2>
              <Accordion>
                <AccordionItem icon="inventory_2" title="What's included" defaultOpen>
                  <ul className="flex flex-col gap-1.5">
                    {product.includes.map((item) => (
                      <li key={item.label} className="flex items-start gap-2">
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-container"
                        />
                        <span className="flex flex-wrap items-baseline gap-x-2">
                          {item.label}
                          <span className="text-[11px] uppercase tracking-wider text-outline">
                            {item.note}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </AccordionItem>
                <AccordionItem icon="spa" title="Care instructions">
                  {product.care}
                </AccordionItem>
                <AccordionItem icon="featured_seasonal_and_gifts" title="Gifting & packaging">
                  {product.gifting}
                </AccordionItem>
              </Accordion>
            </section>
          </div>
        </div>

        {/* Full-width sections below the split */}
        <div className="flex flex-col gap-space-2xl pt-space-xl">
          <ReviewList reviews={reviews} rating={product.rating} productName={product.name} />
          <SimilarProducts products={similar} />
        </div>
      </Container>

      {/* Mobile sticky buy bar */}
      {/* Sits above the tab bar on mobile; the tab bar is gone from md, so it
          drops to the bottom edge there. */}
      <div className="fixed inset-x-0 bottom-[calc(6.25rem+env(safe-area-inset-bottom,0px))] z-40 border-t border-outline-variant/40 bg-surface/95 px-gutter-mobile py-3 shadow-[0_-4px_20px_rgba(42,36,33,0.06)] backdrop-blur-xl md:bottom-0 md:px-6 lg:hidden">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <WishlistButton productName={product.name} />
          <AddToCartButton product={product} variant={variant} qty={qty} />
        </div>
      </div>
    </>
  );
}
