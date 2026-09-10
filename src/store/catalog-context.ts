import { createContext, useContext } from 'react';
import type { Product, ProductCategory, Review } from '@/types';

export interface CatalogContextValue {
  products: Product[];
  categories: ProductCategory[];
  reviews: Review[];
  /** Where this data came from — surfaced in the admin panel, never to shoppers. */
  source: 'starter' | 'supabase';
  loading: boolean;
  /** Set when Supabase was configured but the load failed; the starter data is showing instead. */
  error: string | null;
  refresh: () => Promise<void>;

  getProductById: (id: string) => Product | undefined;
  getFeaturedProducts: () => Product[];
  getReviewsForProduct: (productId: string) => Review[];
  getFeaturedReviews: () => Review[];
  getAggregateRating: () => { average: number; count: number };
}

export const CatalogContext = createContext<CatalogContextValue | null>(null);

export function useCatalog(): CatalogContextValue {
  const context = useContext(CatalogContext);
  if (!context) throw new Error('useCatalog must be used inside <CatalogProvider>');
  return context;
}
