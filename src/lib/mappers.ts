import type {
  Product,
  ProductBadge,
  ProductCategory,
  ProductImage,
  ProductInclusion,
  ProductVariant,
  Review,
} from '@/types';

/** Row shapes as they come back from Postgres (snake_case, jsonb as unknown). */
export interface CategoryRow {
  id: string;
  label: string;
  icon: string;
  image: string | null;
  image_alt: string | null;
  sort_order: number;
}

export interface ProductRow {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category_id: string | null;
  badge: ProductBadge | null;
  images: ProductImage[] | null;
  variants: ProductVariant[] | null;
  includes: ProductInclusion[] | null;
  care: string;
  gifting: string;
  hours_to_make: number | string;
  in_stock: boolean;
  featured: boolean;
  sort_order: number;
}

export interface ReviewRow {
  id: string;
  product_id: string;
  author: string;
  initials: string;
  location: string | null;
  rating: number;
  body: string;
  review_date: string;
  verified: boolean;
  featured_on_home: boolean;
}

const asArray = <T>(value: T[] | null | undefined): T[] => (Array.isArray(value) ? value : []);

export const categoryFromRow = (row: CategoryRow): ProductCategory => ({
  id: row.id,
  label: row.label,
  icon: row.icon,
  image: row.image ?? '',
  imageAlt: row.image_alt ?? row.label,
});

export const productFromRow = (row: ProductRow): Product => ({
  id: row.id,
  slug: row.slug,
  name: row.name,
  tagline: row.tagline,
  description: row.description,
  price: row.price,
  categoryId: row.category_id ?? '',
  // jsonb null and SQL null both mean "no badge"; the app expects undefined.
  badge: row.badge ?? undefined,
  images: asArray(row.images),
  variants: asArray(row.variants),
  includes: asArray(row.includes),
  care: row.care,
  gifting: row.gifting,
  // numeric(5,2) arrives as a string from Postgres.
  hoursToMake: Number(row.hours_to_make),
  rating: 0, // filled in from reviews
  reviewCount: 0,
  inStock: row.in_stock,
  featured: row.featured,
});

export const reviewFromRow = (row: ReviewRow): Review => ({
  id: row.id,
  productId: row.product_id,
  author: row.author,
  initials: row.initials,
  location: row.location ?? undefined,
  rating: row.rating,
  body: row.body,
  date: row.review_date,
  verified: row.verified,
  featuredOnHome: row.featured_on_home,
});

export const categoryToRow = (
  category: ProductCategory,
  sortOrder = 0,
): Omit<CategoryRow, never> => ({
  id: category.id,
  label: category.label,
  icon: category.icon,
  image: category.image || null,
  image_alt: category.imageAlt || null,
  sort_order: sortOrder,
});

export const productToRow = (product: Product, sortOrder = 0) => ({
  id: product.id,
  slug: product.slug,
  name: product.name,
  tagline: product.tagline,
  description: product.description,
  price: product.price,
  category_id: product.categoryId || null,
  badge: product.badge ?? null,
  images: product.images,
  variants: product.variants,
  includes: product.includes,
  care: product.care,
  gifting: product.gifting,
  hours_to_make: product.hoursToMake,
  in_stock: product.inStock,
  featured: product.featured,
  sort_order: sortOrder,
});

export const reviewToRow = (review: Omit<Review, 'id'> & { id?: string }) => ({
  ...(review.id ? { id: review.id } : {}),
  product_id: review.productId,
  author: review.author,
  initials: review.initials,
  location: review.location ?? null,
  rating: review.rating,
  body: review.body,
  review_date: review.date,
  verified: review.verified,
  featured_on_home: review.featuredOnHome ?? false,
});

/** Ratings live in the reviews table, so products get theirs computed on load. */
export function applyRatings(products: Product[], reviews: Review[]): Product[] {
  return products.map((product) => {
    const own = reviews.filter((review) => review.productId === product.id);
    if (own.length === 0) return { ...product, rating: 0, reviewCount: 0 };
    const total = own.reduce((sum, review) => sum + review.rating, 0);
    return {
      ...product,
      rating: Math.round((total / own.length) * 10) / 10,
      reviewCount: own.length,
    };
  });
}
