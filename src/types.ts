export type BadgeTone = 'bestseller' | 'trending' | 'artisan' | 'neutral';

export interface ProductBadge {
  label: string;
  tone: BadgeTone;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  /** Short qualifier shown under the variant name, e.g. "Subtle warm". */
  descriptor: string;
  /** Hex swatch for the colour dot. */
  swatch: string;
}

export interface ProductInclusion {
  label: string;
  /** Craft note — stitch type and time, shown in the utility face. */
  note: string;
}

export interface ProductCategory {
  id: string;
  label: string;
  icon: string;
  /** Round thumbnail shown in the collections row. */
  image: string;
  imageAlt: string;
}

export interface Product {
  id: string;
  /** URL segment used by /product/:id — kept equal to `id` for now. */
  slug: string;
  name: string;
  /** One-line descriptor under the name on cards. */
  tagline: string;
  description: string;
  price: number;
  categoryId: string;
  badge?: ProductBadge;
  images: ProductImage[];
  variants: ProductVariant[];
  includes: ProductInclusion[];
  care: string;
  gifting: string;
  /** Hours of handwork. Merchandised beside price. */
  hoursToMake: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured: boolean;
}

export interface Review {
  id: string;
  /** Foreign key. Reviews are stored per product so this can move to a DB as-is. */
  productId: string;
  author: string;
  initials: string;
  location?: string;
  rating: number;
  body: string;
  /** ISO date. */
  date: string;
  verified: boolean;
  /** Marked in the admin panel to appear in the home page reviews carousel. */
  featuredOnHome?: boolean;
}

export interface CartLine {
  productId: string;
  variantId: string;
  qty: number;
}

/** A cart line joined with its product + variant for rendering. */
export interface ResolvedCartLine extends CartLine {
  product: Product;
  variant: ProductVariant;
  lineTotal: number;
}
