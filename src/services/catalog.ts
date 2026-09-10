import { getSupabase } from '@/lib/supabase';
import {
  applyRatings,
  categoryFromRow,
  categoryToRow,
  productFromRow,
  productToRow,
  reviewFromRow,
  reviewToRow,
  type CategoryRow,
  type ProductRow,
  type ReviewRow,
} from '@/lib/mappers';
import type { Product, ProductCategory, Review } from '@/types';

export interface Catalog {
  products: Product[];
  categories: ProductCategory[];
  reviews: Review[];
}

/** One round trip per table on load. The catalogue is small; paging would be premature. */
export async function fetchCatalog(): Promise<Catalog> {
  const client = await getSupabase();

  const [categoriesResult, productsResult, reviewsResult] = await Promise.all([
    client.from('categories').select('*').order('sort_order'),
    client.from('products').select('*').order('sort_order'),
    client.from('reviews').select('*').order('review_date', { ascending: false }),
  ]);

  if (categoriesResult.error) throw categoriesResult.error;
  if (productsResult.error) throw productsResult.error;
  if (reviewsResult.error) throw reviewsResult.error;

  const reviews = (reviewsResult.data as ReviewRow[]).map(reviewFromRow);
  const products = applyRatings((productsResult.data as ProductRow[]).map(productFromRow), reviews);

  return {
    categories: (categoriesResult.data as CategoryRow[]).map(categoryFromRow),
    products,
    reviews,
  };
}

/* --------------------------------------------------------------------------
 * Writes. Every one of these is refused by Postgres unless the caller is in
 * the admins table — the UI guard is convenience, this is the boundary.
 * ------------------------------------------------------------------------ */

export async function saveProduct(product: Product, sortOrder = 0): Promise<void> {
  const { error } = await (
    await getSupabase()
  )
    .from('products')
    .upsert(productToRow(product, sortOrder));
  if (error) throw error;
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await (await getSupabase()).from('products').delete().eq('id', id);
  if (error) throw error;
}

export async function saveCategory(category: ProductCategory, sortOrder = 0): Promise<void> {
  const { error } = await (
    await getSupabase()
  )
    .from('categories')
    .upsert(categoryToRow(category, sortOrder));
  if (error) throw error;
}

export async function deleteCategory(id: string): Promise<void> {
  const { error } = await (await getSupabase()).from('categories').delete().eq('id', id);
  if (error) throw error;
}

export async function saveReview(review: Omit<Review, 'id'> & { id?: string }): Promise<void> {
  const { error } = await (await getSupabase()).from('reviews').upsert(reviewToRow(review));
  if (error) throw error;
}

export async function deleteReview(id: string): Promise<void> {
  const { error } = await (await getSupabase()).from('reviews').delete().eq('id', id);
  if (error) throw error;
}

export async function setReviewFeatured(id: string, featured: boolean): Promise<void> {
  const { error } = await (
    await getSupabase()
  )
    .from('reviews')
    .update({ featured_on_home: featured })
    .eq('id', id);
  if (error) throw error;
}

/**
 * Pushes the bundled starter catalogue into an empty database. Categories first
 * so the product foreign keys resolve. Safe to re-run: everything is an upsert.
 */
export async function importStarterCatalog(
  categories: ProductCategory[],
  products: Product[],
  reviews: Review[],
): Promise<void> {
  const client = await getSupabase();

  const categoryRows = categories.map((category, index) => categoryToRow(category, index));
  const { error: categoryError } = await client.from('categories').upsert(categoryRows);
  if (categoryError) throw categoryError;

  const productRows = products.map((product, index) => productToRow(product, index));
  const { error: productError } = await client.from('products').upsert(productRows);
  if (productError) throw productError;

  // Starter review ids are slugs, not uuids — let Postgres mint real ones.
  const reviewRows = reviews.map((review) => {
    const row = reviewToRow(review);
    delete (row as { id?: string }).id;
    return row;
  });
  const { error: reviewError } = await client.from('reviews').insert(reviewRows);
  if (reviewError) throw reviewError;
}
