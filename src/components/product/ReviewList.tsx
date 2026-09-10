import { Button } from '@/components/ui/Button';
import { StarRow } from '@/components/ui/Rating';
import { buildProductEnquiryLink } from '@/lib/whatsapp';
import type { Review } from '@/types';

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <article className="flex flex-col gap-2 rounded-xl bg-surface-container p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className={`flex h-7 w-7 items-center justify-center rounded-full text-label-sm font-bold ${
              index % 2 === 0
                ? 'bg-primary-fixed text-primary'
                : 'bg-secondary-fixed text-secondary'
            }`}
          >
            {review.initials}
          </span>
          <span className="text-label-md font-semibold text-on-surface">
            {review.author}
            {review.location && (
              <span className="font-normal text-on-surface-variant">, {review.location}</span>
            )}
          </span>
        </div>
        <StarRow value={review.rating} size={14} />
      </div>

      <blockquote className="text-body-sm italic leading-relaxed text-on-surface-variant">
        “{review.body}”
      </blockquote>

      {review.verified && (
        <span className="text-[10px] uppercase tracking-wider text-secondary">
          Verified purchase
        </span>
      )}
    </article>
  );
}

export function ReviewList({
  reviews,
  rating,
  productName,
}: {
  reviews: Review[];
  rating: number;
  productName: string;
}) {
  return (
    <section id="reviews" className="flex flex-col gap-4" aria-labelledby="reviews-heading">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <h2 id="reviews-heading" className="text-headline-sm text-on-surface">
            Artisan notes & reviews
          </h2>
          <span className="text-body-sm text-on-surface-variant">
            Loved by botanical textile collectors
          </span>
        </div>
        <div className="shrink-0 text-right">
          <span className="font-display text-headline-sm font-bold text-primary">
            {rating.toFixed(1)}
          </span>
          <span className="block text-xs text-on-surface-variant">out of 5.0</span>
        </div>
      </div>

      {reviews.length > 0 ? (
        <ul className="flex flex-col gap-3 lg:grid lg:grid-cols-2">
          {reviews.map((review, index) => (
            <li key={review.id} className="flex">
              <div className="w-full">
                <ReviewCard review={review} index={index} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-xl bg-surface-container-low p-4 text-body-sm text-on-surface-variant">
          No notes yet for this piece. Yours would be the first.
        </p>
      )}

      <Button href={buildProductEnquiryLink(productName)} variant="quiet" size="md" fullWidth>
        Leave a note about this bouquet
      </Button>
    </section>
  );
}
