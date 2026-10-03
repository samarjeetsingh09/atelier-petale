# my strokes

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

The theme is extracted from the client logo (`public/brand/logo.jpg`); the sampled
hues and what each became are listed at the top of the `@theme` block in `src/index.css`.

- Type: Fraunces (headings, full `SOFT` axis), Damion (brush-script accents — eyebrows and
  the wordmark only), Nunito (body).
- Logo: `public/brand/avatar.png` is a round crop of the illustration, used as the mark and
  favicon. The "my strokes" wordmark is live text (`src/components/ui/Logo.tsx`).
- Signature: the paper plane and dashed heart-loop trail from the logo
  (`src/components/ui/FlightPath.tsx`), drawn once in the hero and static in the footer.

Tablet and desktop extend the same tokens: the bottom tab bar is replaced by header
navigation from `md`, grids step 2 → 3 → 4 columns, and the hero becomes a split spread at `lg`.

## Conventions

- Every interactive element clears 44×44px and has a `focus-visible` ring.
- Icon-only controls carry an `aria-label`; icons themselves are `aria-hidden`.
- Motion is CSS transitions and React state only. No animation library.
- Images sit on a `surface-container-high` background so a slow or missing image
  degrades to a warm block rather than a white gap.
