import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { CART_STORAGE_KEY } from '@/config/site';
import type { CartLine, Product, ProductVariant, ResolvedCartLine } from '@/types';
import { useCatalog } from './catalog-context';
import { CartContext, type CartContextValue } from './cart-context';

const isCartLine = (value: unknown): value is CartLine => {
  if (typeof value !== 'object' || value === null) return false;
  const line = value as Record<string, unknown>;
  return (
    typeof line.productId === 'string' &&
    typeof line.variantId === 'string' &&
    typeof line.qty === 'number' &&
    line.qty > 0
  );
};

/**
 * localStorage can throw (private mode, blocked site data) and can hold data
 * written by an older build. Both cases degrade to an empty cart rather than a
 * blank page.
 */
const readStoredLines = (): CartLine[] => {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isCartLine);
  } catch {
    return [];
  }
};

const sameLine = (line: CartLine, productId: string, variantId: string) =>
  line.productId === productId && line.variantId === variantId;

export function CartProvider({ children }: { children: ReactNode }) {
  const { getProductById } = useCatalog();
  const [lines, setLines] = useState<CartLine[]>(readStoredLines);
  const [lastAdded, setLastAdded] = useState<{ product: Product; at: number } | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Storage unavailable — the cart still works for this session.
    }
  }, [lines]);

  const addItem = useCallback((product: Product, variant: ProductVariant, qty = 1) => {
    setLines((current) => {
      const existing = current.find((line) => sameLine(line, product.id, variant.id));
      if (existing) {
        return current.map((line) =>
          sameLine(line, product.id, variant.id) ? { ...line, qty: line.qty + qty } : line,
        );
      }
      return [...current, { productId: product.id, variantId: variant.id, qty }];
    });
    setLastAdded({ product, at: Date.now() });
  }, []);

  const setQty = useCallback((productId: string, variantId: string, qty: number) => {
    setLines((current) =>
      qty <= 0
        ? current.filter((line) => !sameLine(line, productId, variantId))
        : current.map((line) => (sameLine(line, productId, variantId) ? { ...line, qty } : line)),
    );
  }, []);

  const removeItem = useCallback((productId: string, variantId: string) => {
    setLines((current) => current.filter((line) => !sameLine(line, productId, variantId)));
  }, []);

  const clear = useCallback(() => setLines([]), []);
  const dismissLastAdded = useCallback(() => setLastAdded(null), []);

  const resolvedLines = useMemo<ResolvedCartLine[]>(
    () =>
      lines.flatMap((line) => {
        const product = getProductById(line.productId);
        if (!product) return [];
        const variant =
          product.variants.find((candidate) => candidate.id === line.variantId) ??
          product.variants[0];
        if (!variant) return [];
        return [{ ...line, product, variant, lineTotal: product.price * line.qty }];
      }),
    [lines, getProductById],
  );

  const value = useMemo<CartContextValue>(() => {
    const itemCount = resolvedLines.reduce((sum, line) => sum + line.qty, 0);
    const subtotal = resolvedLines.reduce((sum, line) => sum + line.lineTotal, 0);
    const totalHours = resolvedLines.reduce(
      (sum, line) => sum + line.product.hoursToMake * line.qty,
      0,
    );
    return {
      lines,
      resolvedLines,
      itemCount,
      subtotal,
      totalHours,
      addItem,
      setQty,
      removeItem,
      clear,
      lastAdded,
      dismissLastAdded,
    };
  }, [lines, resolvedLines, addItem, setQty, removeItem, clear, lastAdded, dismissLastAdded]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
