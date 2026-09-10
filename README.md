# Atelier Pétale

Mobile-first storefront for hand-crocheted flower bouquets. Vite + React + TypeScript + Tailwind v4.
Orders are placed over WhatsApp — there is no auth, no payment gateway, no order backend.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build
npm run typecheck
```

## Things you will want to change

| What | Where |
| --- | --- |
| WhatsApp number, studio name, lead time, currency | `src/config/site.ts` |
| Products, prices, variants, craft notes | `src/data/products.ts` |
| Product photography | `src/data/images.ts` |
| Reviews (keyed by `productId`) | `src/data/reviews.ts` |
| Colours, type scale, spacing | `@theme` block in `src/index.css` |

## Layout

```
src/
  config/site.ts            single source of truth for studio details
  data/                     products, reviews, image URLs
  lib/                      price/hours formatting, WhatsApp message builder
  store/                    cart context + provider (localStorage backed)
  components/
    layout/                 AppShell, Header, BottomNav, Footer, CartToast
    ui/                     Button, IconButton, Icon, Badge, Rating, Container, SectionHeader, Logo
    product/ProductCard.tsx
    home/                   one file per home page section
  pages/                    Home, Shop, ProductDetail, Cart, Story, NotFound
```

## Design source

Colours, type scale and spacing are lifted verbatim from the Stitch "Atelier Pétale"
design system — see the `@theme` block in `src/index.css`. Do not re-derive them by eye.

Stitch only specifies mobile screens. Tablet and desktop extend the same tokens:
the bottom tab bar is replaced by header navigation from `md`, grids step 2 → 3 → 4
columns, and the hero re-composes from an image overlay into a split spread at `lg`.

## Conventions

- Every interactive element clears 44×44px and has a `focus-visible` ring.
- Icon-only controls carry an `aria-label`; icons themselves are `aria-hidden`.
- Motion is CSS transitions and React state only. No animation library.
- Images sit on a `surface-container-high` background so a slow or missing image
  degrades to a warm block rather than a white gap.
