import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { useCatalog } from '@/store/catalog-context';
import { deleteProduct, importStarterCatalog } from '@/services/catalog';
import { categories as starterCategories, products as starterProducts } from '@/data/products';
import { reviews as starterReviews } from '@/data/reviews';
import { formatPrice } from '@/lib/format';
import { isSupabaseConfigured } from '@/lib/supabase';

export function AdminProducts() {
  const { products, categories, source, refresh } = useCatalog();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const categoryLabel = (id: string) =>
    categories.find((category) => category.id === id)?.label ?? '—';

  const runImport = async () => {
    if (
      !window.confirm(
        'Copy the 7 starter products, 5 collections and 10 reviews into the database?',
      )
    ) {
      return;
    }
    setBusy('import');
    setError(null);
    try {
      await importStarterCatalog(starterCategories, starterProducts, starterReviews);
      await refresh();
    } catch (importError) {
      setError(importError instanceof Error ? importError.message : 'Import failed.');
    } finally {
      setBusy(null);
    }
  };

  const remove = async (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}" permanently? Its reviews go with it.`)) return;
    setBusy(id);
    setError(null);
    try {
      await deleteProduct(id);
      await refresh();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Delete failed.');
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="flex flex-col gap-space-md">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-headline-md text-on-surface">Products</h1>
          <p className="text-body-sm text-on-surface-variant">{products.length} in the catalogue</p>
        </div>
        <Link
          to="/admin/products/new"
          className="flex min-h-[48px] items-center gap-2 rounded-xl bg-primary px-5 text-label-lg text-on-primary shadow-md transition-colors duration-200 hover:bg-on-primary-fixed-variant"
        >
          <Icon name="add" size={20} />
          New product
        </Link>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-lg bg-error-container p-3 text-body-sm text-on-error-container"
        >
          {error}
        </p>
      )}

      {isSupabaseConfigured && source === 'starter' && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-surface-container p-4">
          <p className="text-body-sm text-on-surface-variant">
            The database has no products yet. Import the starter catalogue to begin, or add your own
            from scratch.
          </p>
          <button
            type="button"
            onClick={() => void runImport()}
            disabled={busy === 'import'}
            className="flex min-h-[44px] cursor-pointer items-center gap-2 rounded-xl bg-secondary px-4 text-label-md uppercase text-on-secondary transition-colors duration-200 disabled:opacity-60"
          >
            {busy === 'import' ? 'Importing…' : 'Import starter catalogue'}
          </button>
        </div>
      )}

      <ul className="flex flex-col gap-2">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex items-center gap-3 rounded-xl bg-surface-container p-3 shadow-sm"
          >
            <img
              src={product.images[0]?.src}
              alt=""
              loading="lazy"
              className="h-14 w-14 shrink-0 rounded-lg object-cover"
            />
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-body-md font-medium text-on-surface">
                {product.name}
                {product.featured && (
                  <span className="ml-2 rounded-full bg-primary-fixed px-2 py-0.5 text-[10px] uppercase tracking-wider text-on-primary-fixed">
                    On home
                  </span>
                )}
              </span>
              <span className="truncate text-label-sm text-on-surface-variant">
                {categoryLabel(product.categoryId)} · {formatPrice(product.price)} ·{' '}
                {product.reviewCount} reviews
              </span>
            </div>

            <Link
              to={`/admin/products/${product.id}`}
              className="flex min-h-[44px] items-center gap-1.5 rounded-full px-3 text-label-md uppercase text-primary transition-colors duration-200 hover:bg-surface-container-high"
            >
              <Icon name="edit_note" size={18} />
              Edit
            </Link>
            <button
              type="button"
              onClick={() => void remove(product.id, product.name)}
              disabled={busy === product.id || source === 'starter'}
              aria-label={`Delete ${product.name}`}
              className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full text-outline transition-colors duration-200 hover:bg-error-container hover:text-on-error-container disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Icon name="delete" size={18} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
