import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { isSupabaseConfigured } from '@/lib/supabase';
import { fetchCatalog } from '@/services/catalog';
import { categories as starterCategories, products as starterProducts } from '@/data/products';
import { reviews as starterReviews } from '@/data/reviews';
import type { Product, ProductCategory, Review } from '@/types';
import { CatalogContext, type CatalogContextValue } from './catalog-context';

interface State {
  products: Product[];
  categories: ProductCategory[];
  reviews: Review[];
  source: 'starter' | 'supabase';
  loading: boolean;
  error: string | null;
}

const starterState: State = {
  products: starterProducts,
  categories: starterCategories,
  reviews: starterReviews,
  source: 'starter',
  loading: false,
  error: null,
};

/**
 * Single source of catalogue data for the whole app.
 *
 * With Supabase configured it loads from there; without it — or if that load
 * fails — it serves the bundled starter catalogue. A shopper never sees an
 * empty shop because of a backend problem, and the site works before the
 * database exists at all.
 */
export function CatalogProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(() =>
    isSupabaseConfigured ? { ...starterState, loading: true } : starterState,
  );

  const load = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setState(starterState);
      return;
    }
    setState((current) => ({ ...current, loading: true }));
    try {
      const catalog = await fetchCatalog();
      // An empty database is not an error — it means the starter catalogue has
      // not been imported yet, so keep showing something real.
      if (catalog.products.length === 0) {
        setState({ ...starterState, error: null });
        return;
      }
      setState({ ...catalog, source: 'supabase', loading: false, error: null });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not reach the database.';
      console.error('[catalog] falling back to the starter catalogue:', message);
      setState({ ...starterState, error: message });
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const value = useMemo<CatalogContextValue>(() => {
    const { products, categories, reviews } = state;
    return {
      ...state,
      refresh: load,
      getProductById: (id) => products.find((product) => product.id === id),
      getFeaturedProducts: () => products.filter((product) => product.featured),
      getReviewsForProduct: (productId) =>
        reviews.filter((review) => review.productId === productId),
      getFeaturedReviews: () =>
        reviews
          .filter((review) => review.featuredOnHome)
          .sort((a, b) => b.date.localeCompare(a.date)),
      getAggregateRating: () => {
        if (reviews.length === 0) return { average: 0, count: 0 };
        const total = reviews.reduce((sum, review) => sum + review.rating, 0);
        return {
          average: Math.round((total / reviews.length) * 10) / 10,
          count: reviews.length,
        };
      },
      products,
      categories,
      reviews,
    };
  }, [state, load]);

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}
