import { useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import type { Product } from '@/types';

/**
 * Mobile keeps the Stitch treatment: a 4:5 snap carousel with dot indicators.
 * Desktop switches to a large frame plus thumbnails, because swiping is not the
 * natural gesture with a mouse and a wide screen has room to show the set.
 */
export function ProductGallery({ product }: { product: Product }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const images = product.images;
  const active = images[activeIndex] ?? images[0];

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.round(track.scrollLeft / track.offsetWidth);
    setActiveIndex(Math.min(images.length - 1, Math.max(0, index)));
  };

  const scrollToSlide = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: track.offsetWidth * index, behavior: 'smooth' });
  };

  return (
    <>
      {/* Mobile & tablet carousel */}
      <section className="relative bg-surface-container-low lg:hidden" aria-label="Product photos">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="no-scrollbar flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth"
        >
          {images.map((image) => (
            <div
              key={image.src}
              className="relative aspect-[4/5] w-full shrink-0 snap-start bg-surface-container sm:aspect-[16/11]"
            >
              <img
                src={image.src}
                alt={image.alt}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>
          ))}
        </div>

        {product.badge && (
          <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1 rounded-full bg-surface/90 px-3 py-1 text-label-md uppercase tracking-wider text-on-surface shadow-sm backdrop-blur-md">
            <Icon name="local_florist" size={14} filled className="text-primary" />
            {product.badge.label} · hand-crocheted
          </span>
        )}

        {images.length > 1 && (
          <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-2">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                aria-label={`Go to photo ${index + 1} of ${images.length}`}
                aria-current={index === activeIndex}
                onClick={() => scrollToSlide(index)}
                className="flex min-h-[44px] min-w-[24px] cursor-pointer items-center justify-center"
              >
                <span
                  className={`block h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'w-4 bg-primary' : 'w-2 bg-surface-container-lowest/70'
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Desktop frame + thumbnails */}
      <section className="hidden lg:block" aria-label="Product photos">
        <div className="relative overflow-hidden rounded-2xl bg-surface-container shadow-sm">
          <img
            src={active?.src}
            alt={active?.alt ?? product.name}
            fetchPriority="high"
            decoding="async"
            className="aspect-[4/5] w-full object-cover"
          />
          {product.badge && (
            <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-surface/90 px-3 py-1 text-label-md uppercase tracking-wider text-on-surface shadow-sm backdrop-blur-md">
              <Icon name="local_florist" size={14} filled className="text-primary" />
              {product.badge.label} · hand-crocheted
            </span>
          )}
        </div>

        {images.length > 1 && (
          <ul className="mt-3 flex gap-3">
            {images.map((image, index) => (
              <li key={image.src}>
                <button
                  type="button"
                  aria-label={`Show photo ${index + 1}`}
                  aria-current={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                  className={`block h-24 w-24 cursor-pointer overflow-hidden rounded-xl transition-shadow duration-200 ${
                    index === activeIndex
                      ? 'ring-2 ring-primary ring-offset-2 ring-offset-surface'
                      : 'ring-1 ring-outline-variant hover:ring-primary/60'
                  }`}
                >
                  <img
                    src={image.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
