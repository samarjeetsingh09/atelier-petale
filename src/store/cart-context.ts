import { createContext, useContext } from 'react';
import type { CartLine, Product, ProductVariant, ResolvedCartLine } from '@/types';

export interface CartContextValue {
  lines: CartLine[];
  /** Cart lines joined with product + variant. Skips any line whose product was removed from the catalogue. */
  resolvedLines: ResolvedCartLine[];
  itemCount: number;
  subtotal: number;
  /** Total handwork hours across the cart — the studio's real lead-time signal. */
  totalHours: number;
  addItem: (product: Product, variant: ProductVariant, qty?: number) => void;
  setQty: (productId: string, variantId: string, qty: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  clear: () => void;
  /** Set on every add, so a toast can react without prop drilling. Null once dismissed. */
  lastAdded: { product: Product; at: number } | null;
  dismissLastAdded: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside <CartProvider>');
  }
  return context;
}
