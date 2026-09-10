import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { useCatalog } from '@/store/catalog-context';
import { formatPrice } from '@/lib/format';
import type { Product } from '@/types';

/** Name, tagline and collection all count — people search for "daisy" and for "mini". */
const matches = (product: Product, query: string, collectionLabel: string) => {
  const haystack = [product.name, product.tagline, product.description, collectionLabel]
    .join(' ')
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
};

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { products, categories } = useCatalog();
  const categoryLabel = (categoryId: string) =>
    categories.find((category) => category.id === categoryId)?.label ?? '';

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return products.slice(0, 4);
    return products.filter((product) =>
      matches(product, trimmed, categoryLabel(product.categoryId)),
    );
    // categoryLabel is derived from categories, which is in the dep list.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, products, categories]);

  // Focus the field on open, and let Escape close from anywhere in the dialog.
  useEffect(() => {
    if (!open) return;
    setQuery('');
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 40);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const goTo = (path: string) => {
    onClose();
    navigate(path);
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    if (results.length === 1) {
      goTo(`/product/${results[0]!.slug}`);
      return;
    }
    goTo(`/shop?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center">
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-inverse-surface/40 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search the boutique"
        className="relative mx-3 mt-3 w-full max-w-xl overflow-hidden rounded-3xl bg-surface shadow-[0_24px_60px_-16px_rgba(42,36,33,0.35)] sm:mt-20"
      >
        <form onSubmit={submit} className="flex items-center gap-2 px-3 py-2">
          <span className="pl-1 text-on-surface-variant">
            <Icon name="search" size={22} />
          </span>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search bouquets, daisies, mini…"
            aria-label="Search bouquets"
            className="min-h-[48px] flex-1 bg-transparent text-body-md text-on-surface outline-none placeholder:text-outline"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full text-on-surface-variant transition-colors duration-200 hover:bg-surface-container hover:text-primary"
          >
            <Icon name="close" size={22} />
          </button>
        </form>

        <div className="max-h-[60vh] overflow-y-auto border-t border-outline-variant/50">
          {results.length > 0 ? (
            <>
              <p className="px-4 pt-3 text-label-sm uppercase tracking-widest text-on-surface-variant">
                {query.trim() ? `${results.length} found` : 'Popular right now'}
              </p>
              <ul className="p-2">
                {results.map((product) => {
                  const [image] = product.images;
                  return (
                    <li key={product.id}>
                      <button
                        type="button"
                        onClick={() => goTo(`/product/${product.slug}`)}
                        className="flex w-full cursor-pointer items-center gap-3 rounded-xl p-2 text-left transition-colors duration-200 hover:bg-surface-container"
                      >
                        <img
                          src={image?.src}
                          alt=""
                          loading="lazy"
                          className="h-12 w-12 shrink-0 rounded-lg object-cover"
                        />
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span className="truncate text-body-md text-on-surface">
                            {product.name}
                          </span>
                          <span className="truncate text-label-sm text-on-surface-variant">
                            {categoryLabel(product.categoryId)} · {product.tagline}
                          </span>
                        </span>
                        <span className="shrink-0 text-label-lg font-semibold text-primary">
                          {formatPrice(product.price)}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
              <span className="text-outline">
                <Icon name="search_off" size={28} />
              </span>
              <p className="text-body-md text-on-surface">Nothing matches “{query.trim()}”</p>
              <p className="max-w-xs text-body-sm text-on-surface-variant">
                We make custom pieces too — message the studio and describe what you want.
              </p>
              <button
                type="button"
                onClick={() => goTo('/shop')}
                className="mt-1 inline-flex min-h-[44px] cursor-pointer items-center text-label-md uppercase text-primary"
              >
                Browse everything
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
