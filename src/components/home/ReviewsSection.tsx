import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { StarRow } from '@/components/ui/Rating';
import { useCatalog } from '@/store/catalog-context';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const ADVANCE_MS = 5000;

/**
 * Social proof, low on the page where it belongs — after someone has seen the
 * work.
 *
 * Built on scroll-snap rather than a transformed track, so a thumb swipe works
 * natively and the auto-advance is the same smooth scroll a person would do by
 * hand. It holds while someone is touching, hovering or tabbing through it, and
 * does not advance at all under reduced motion.
 */
export function ReviewsSection() {
  const reducedMotion = usePrefersReducedMotion();
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const { getProductById, getAggregateRating, getFeaturedReviews } = useCatalog();
  const featured = getFeaturedReviews();
  const { average, count } = getAggregateRating();

  useEffect(() => {
    if (reducedMotion || paused || featured.length < 2) return;
    const timer = window.setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      // Step by one card; wrap when the last one is fully in view.
      const cardWidth = track.firstElementChild?.clientWidth ?? track.clientWidth;
      const maxScroll = track.scrollWidth - track.clientWidth;
      const next = track.scrollLeft >= maxScroll - 8 ? 0 : track.scrollLeft + cardWidth;
      track.scrollTo({ left: next, behavior: 'smooth' });
    }, ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [reducedMotion, paused, featured.length]);

  if (featured.length === 0) return null;

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.firstElementChild?.clientWidth ?? track.clientWidth;
    setIndex(Math.round(track.scrollLeft / Math.max(cardWidth, 1)));
  };

  const goTo = (next: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.firstElementChild?.clientWidth ?? track.clientWidth;
    track.scrollTo({ left: cardWidth * next, behavior: 'smooth' });
  };

  return (
    <section className="py-space-lg" aria-labelledby="reviews-heading">
      <Container width="wide">
        <div className="flex flex-col gap-4 rounded-2xl bg-surface-container p-4 shadow-sm lg:p-space-xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="reviews-heading" className="flex items-center gap-1.5 text-primary">
              <Icon name="star" size={20} filled />
              <span className="font-display text-headline-sm text-on-surface">
                {average.toFixed(1)}{' '}
                <span className="font-body text-label-md font-normal text-on-surface-variant">
                  out of 5
                </span>
              </span>
            </h2>
            <span className="text-label-sm font-semibold uppercase tracking-wider text-secondary">
              {count}+ happy gifters
            </span>
          </div>

          <ul
            ref={trackRef}
            onScroll={handleScroll}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            className="no-scrollbar -mr-4 flex snap-x snap-mandatory overflow-x-auto scroll-smooth lg:-mr-6"
          >
            {featured.map((review) => {
              const product = getProductById(review.productId);
              return (
                <li
                  key={review.id}
                  className="w-full shrink-0 snap-start pr-4 sm:w-1/2 lg:w-1/3 lg:pr-6"
                >
                  <figure className="flex h-full flex-col gap-2 rounded-xl bg-surface-container-lowest p-3.5 shadow-sm">
                    <div className="flex items-center justify-between gap-3">
                      <StarRow value={review.rating} size={15} />
                      {product && (
                        <Link
                          to={`/product/${product.slug}`}
                          className="truncate text-label-sm text-primary transition-colors duration-200 hover:text-on-primary-fixed-variant"
                        >
                          {product.name}
                        </Link>
                      )}
                    </div>

                    <blockquote className="text-body-sm italic leading-relaxed text-on-surface">
                      “{review.body}”
                    </blockquote>

                    <figcaption className="mt-auto flex items-center gap-2 pt-1">
                      <span
                        aria-hidden="true"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-fixed text-label-sm font-bold text-primary"
                      >
                        {review.initials}
                      </span>
                      <span className="truncate text-label-sm font-semibold text-on-surface-variant">
                        {review.author}
                        {review.location ? `, ${review.location}` : ''}
                      </span>
                      {review.verified && (
                        <span className="ml-auto shrink-0 text-[10px] uppercase tracking-wider text-secondary">
                          Verified
                        </span>
                      )}
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>

          {featured.length > 1 && (
            <div className="flex items-center justify-center gap-1.5">
              {featured.map((review, dotIndex) => (
                <button
                  key={review.id}
                  type="button"
                  aria-label={`Show review ${dotIndex + 1} of ${featured.length}`}
                  aria-current={dotIndex === index}
                  onClick={() => goTo(dotIndex)}
                  className="flex h-11 w-4 cursor-pointer items-center justify-center"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      dotIndex === index ? 'w-5 bg-primary' : 'w-1.5 bg-outline-variant'
                    }`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
