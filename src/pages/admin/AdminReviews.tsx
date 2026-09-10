import { useState, type FormEvent } from 'react';
import { Icon } from '@/components/ui/Icon';
import { StarRow } from '@/components/ui/Rating';
import {
  NumberField,
  SelectField,
  TextAreaField,
  TextField,
  ToggleField,
} from '@/components/admin/Field';
import { useCatalog } from '@/store/catalog-context';
import { deleteReview, saveReview, setReviewFeatured } from '@/services/catalog';
import type { Review } from '@/types';

const initialsFrom = (author: string) =>
  author
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

const blankReview = (productId: string): Omit<Review, 'id'> => ({
  productId,
  author: '',
  initials: '',
  location: '',
  rating: 5,
  body: '',
  date: new Date().toISOString().slice(0, 10),
  verified: true,
  featuredOnHome: false,
});

/**
 * Reviews are typed in here by the studio — customers do not post them.
 * "Show on the home page" is the flag the home carousel reads.
 */
export function AdminReviews() {
  const { products, reviews, refresh, source } = useCatalog();
  const [draft, setDraft] = useState<Omit<Review, 'id'>>(() => blankReview(products[0]?.id ?? ''));
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const featuredCount = reviews.filter((review) => review.featuredOnHome).length;
  const readOnly = source === 'starter';

  const patch = (changes: Partial<Omit<Review, 'id'>>) =>
    setDraft((current) => ({ ...current, ...changes }));

  const add = async (event: FormEvent) => {
    event.preventDefault();
    if (!draft.productId || !draft.author.trim() || !draft.body.trim()) return;
    setBusy('add');
    setError(null);
    try {
      await saveReview({
        ...draft,
        initials: draft.initials.trim() || initialsFrom(draft.author),
        location: draft.location?.trim() || undefined,
      });
      await refresh();
      setDraft(blankReview(draft.productId));
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not save the review.');
    } finally {
      setBusy(null);
    }
  };

  const toggleFeatured = async (review: Review) => {
    setBusy(review.id);
    setError(null);
    try {
      await setReviewFeatured(review.id, !review.featuredOnHome);
      await refresh();
    } catch (toggleError) {
      setError(toggleError instanceof Error ? toggleError.message : 'Could not update.');
    } finally {
      setBusy(null);
    }
  };

  const remove = async (review: Review) => {
    if (!window.confirm(`Delete the review by ${review.author}?`)) return;
    setBusy(review.id);
    setError(null);
    try {
      await deleteReview(review.id);
      await refresh();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Could not delete.');
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="flex flex-col gap-space-lg">
      <div>
        <h1 className="font-display text-headline-md text-on-surface">Reviews</h1>
        <p className="text-body-sm text-on-surface-variant">
          {reviews.length} total · {featuredCount} showing on the home page
        </p>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-lg bg-error-container p-3 text-body-sm text-on-error-container"
        >
          {error}
        </p>
      )}

      {readOnly && (
        <p className="rounded-lg bg-surface-container p-3 text-body-sm text-on-surface-variant">
          Reviews can only be edited once the catalogue is in the database. Import it from the
          Products tab first.
        </p>
      )}

      {/* Add */}
      <form
        onSubmit={add}
        className="flex flex-col gap-3 rounded-xl bg-surface-container-lowest p-4 shadow-sm"
      >
        <h2 className="text-label-md uppercase tracking-wider text-on-surface-variant">
          Add a review
        </h2>

        <SelectField
          label="Product"
          value={draft.productId}
          onChange={(productId) => patch({ productId })}
          options={products.map((product) => ({ value: product.id, label: product.name }))}
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <TextField
            label="Customer name"
            value={draft.author}
            onChange={(author) => patch({ author, initials: initialsFrom(author) })}
            placeholder="Tanya S."
          />
          <TextField
            label="City"
            value={draft.location ?? ''}
            onChange={(location) => patch({ location })}
            placeholder="Mumbai"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <NumberField
            label="Rating out of 5"
            min={1}
            value={draft.rating}
            onChange={(rating) => patch({ rating: Math.min(5, Math.max(1, rating)) })}
          />
          <TextField
            label="Date"
            type="date"
            value={draft.date}
            onChange={(date) => patch({ date })}
          />
        </div>

        <TextAreaField
          label="What they said"
          rows={3}
          value={draft.body}
          onChange={(body) => patch({ body })}
        />

        <ToggleField
          label="Verified purchase"
          checked={draft.verified}
          onChange={(verified) => patch({ verified })}
        />
        <ToggleField
          label="Show on the home page"
          hint="Adds it to the reviews carousel"
          checked={draft.featuredOnHome ?? false}
          onChange={(featuredOnHome) => patch({ featuredOnHome })}
        />

        <button
          type="submit"
          disabled={busy === 'add' || readOnly}
          className="flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary text-label-lg text-on-primary shadow-md transition-colors duration-200 hover:bg-on-primary-fixed-variant disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Icon name="add" size={20} />
          {busy === 'add' ? 'Saving…' : 'Add review'}
        </button>
      </form>

      {/* Existing, grouped by product */}
      {products.map((product) => {
        const own = reviews.filter((review) => review.productId === product.id);
        if (own.length === 0) return null;
        return (
          <section key={product.id} className="flex flex-col gap-2">
            <h2 className="text-label-md uppercase tracking-wider text-on-surface-variant">
              {product.name} · {own.length}
            </h2>
            <ul className="flex flex-col gap-2">
              {own.map((review) => (
                <li
                  key={review.id}
                  className="flex flex-col gap-2 rounded-xl bg-surface-container p-3 shadow-sm sm:flex-row sm:items-start"
                >
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <StarRow value={review.rating} size={14} />
                      <span className="text-label-md font-semibold text-on-surface">
                        {review.author}
                        {review.location ? `, ${review.location}` : ''}
                      </span>
                      <span className="text-label-sm text-on-surface-variant">{review.date}</span>
                    </div>
                    <p className="text-body-sm italic text-on-surface-variant">“{review.body}”</p>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => void toggleFeatured(review)}
                      disabled={busy === review.id || readOnly}
                      aria-pressed={review.featuredOnHome ?? false}
                      className={[
                        'flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-full px-3 text-label-sm uppercase transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40',
                        review.featuredOnHome
                          ? 'bg-primary-fixed text-on-primary-fixed'
                          : 'text-on-surface-variant hover:bg-surface-container-high',
                      ].join(' ')}
                    >
                      <Icon name="star" size={16} filled={review.featuredOnHome ?? false} />
                      {review.featuredOnHome ? 'On home' : 'Show on home'}
                    </button>
                    <button
                      type="button"
                      onClick={() => void remove(review)}
                      disabled={busy === review.id || readOnly}
                      aria-label={`Delete review by ${review.author}`}
                      className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full text-outline transition-colors duration-200 hover:bg-error-container hover:text-on-error-container disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Icon name="delete" size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
