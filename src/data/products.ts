import type { Product, ProductCategory } from '@/types';
import { images } from './images';

export const categories: ProductCategory[] = [
  {
    id: 'bouquets',
    label: 'Bouquets',
    icon: 'local_florist',
    image: images.pastelBloomTissue,
    imageAlt: 'Crochet roses and daisies wrapped in parchment',
  },
  {
    id: 'mini',
    label: 'Mini bouquets',
    icon: 'spa',
    image: images.daisyLoveDetail,
    imageAlt: 'A small posy of pastel crochet buds',
  },
  {
    id: 'singles',
    label: 'Single flowers',
    icon: 'yard',
    image: images.pastelBloomKraft,
    imageAlt: 'A single crochet garden rose on a wired stem',
  },
  {
    id: 'gifts',
    label: 'Gift sets',
    icon: 'featured_seasonal_and_gifts',
    image: images.packagingRibbon,
    imageAlt: 'A bouquet being wrapped with a velvet ribbon and wax seal',
  },
  {
    id: 'custom',
    label: 'Custom orders',
    icon: 'draw',
    image: images.yarnFlatlay,
    imageAlt: 'Pastel yarn skeins and crochet hooks laid out on linen',
  },
];

/**
 * Placeholder catalogue. Shapes are final — replace the contents, keep the keys.
 * `hoursToMake` is real handwork time and is merchandised next to price.
 */
export const products: Product[] = [
  {
    id: 'pastel-bloom-bouquet',
    slug: 'pastel-bloom-bouquet',
    name: 'Pastel Bloom Bouquet',
    tagline: 'Soft rose & daisy stems',
    description:
      'A soft pastel crochet bouquet handcrafted with dusty blush roses, sunny knit daisies and sage eucalyptus stems, wrapped in textured parchment and finished with a silk chiffon ribbon.',
    price: 1299,
    categoryId: 'bouquets',
    badge: { label: 'Bestseller', tone: 'bestseller' },
    images: [
      {
        src: images.pastelBloomTissue,
        alt: 'Pastel Bloom Bouquet of crochet roses and daisies wrapped in tissue paper on sunlit linen',
      },
      {
        src: images.pastelBloomKraft,
        alt: 'The same crochet bouquet wrapped in artisan brown paper, tied with ribbon',
      },
    ],
    variants: [
      { id: 'blush-sage', name: 'Pastel blush & sage', descriptor: 'Default', swatch: '#c98b94' },
      { id: 'cream-daisy', name: 'Cream daisy duo', descriptor: 'Subtle warm', swatch: '#ece0db' },
      { id: 'rose-twilight', name: 'Rose twilight', descriptor: 'Deep bloom', swatch: '#b49497' },
    ],
    includes: [
      { label: '3 hand-crocheted garden roses', note: 'sc · 45 min each' },
      { label: '4 knitted sunny daisies', note: 'sc · 20 min each' },
      { label: '2 preserved-style eucalyptus stems', note: 'ch · sage cotton' },
      { label: 'Parchment wrap & silk chiffon ribbon', note: 'hand-tied' },
    ],
    care: 'Keep away from damp. Dust with a soft makeup brush, or a hair dryer on cool and low. No water, ever — these blooms never wilt.',
    gifting:
      'Ships cradled in an embossed kraft boutique box. A handwritten calligraphed card is included free — add your message in the cart.',
    hoursToMake: 4.5,
    rating: 4.9,
    reviewCount: 18,
    inStock: true,
    featured: true,
  },
  {
    id: 'daisy-love-bouquet',
    slug: 'daisy-love-bouquet',
    name: 'Daisy Love Bouquet',
    tagline: 'Classic yellow-centre daisies',
    description:
      'Cheerful white daisies with sunny yellow centres, gathered in cream tissue and tied with jute twine. The bouquet people buy when they want the gift to feel like a bright morning.',
    price: 899,
    categoryId: 'bouquets',
    badge: { label: 'Trending', tone: 'trending' },
    images: [
      {
        src: images.daisyBouquet,
        alt: 'Bouquet of white crochet daisies with yellow centres tied with twine on beige linen',
      },
      {
        src: images.daisyLoveDetail,
        alt: 'Close view of the crochet daisies showing the stitch texture of each petal',
      },
    ],
    variants: [
      { id: 'classic-white', name: 'Classic white', descriptor: 'Default', swatch: '#ffffff' },
      { id: 'butter-cream', name: 'Butter cream', descriptor: 'Warmer white', swatch: '#f2e6e1' },
    ],
    includes: [
      { label: '9 knitted daisies with yellow centres', note: 'sc · 20 min each' },
      { label: 'Jute twine tie & cream tissue', note: 'hand-tied' },
    ],
    care: 'Keep away from damp. Dust with a soft brush. Reshape petals with your fingers if they flatten in transit.',
    gifting: 'Boxed with a free handwritten card. Add your message in the cart.',
    hoursToMake: 3,
    rating: 5.0,
    reviewCount: 24,
    inStock: true,
    featured: true,
  },
  {
    id: 'peony-eucalyptus',
    slug: 'peony-eucalyptus',
    name: 'Peony & Eucalyptus',
    tagline: 'Textured cotton & twine',
    description:
      'Full ruffled peonies in hand-dyed blush, set against sage eucalyptus and wrapped in craft parchment with a satin bow. The most involved piece in the collection.',
    price: 1499,
    categoryId: 'bouquets',
    badge: { label: 'Artisan', tone: 'artisan' },
    images: [
      {
        src: images.peonyEucalyptus,
        alt: 'Pink crochet peonies and eucalyptus wrapped in craft parchment with a satin bow',
      },
    ],
    variants: [
      { id: 'blush-peony', name: 'Blush peony', descriptor: 'Default', swatch: '#f8b5be' },
      { id: 'dusk-peony', name: 'Dusk peony', descriptor: 'Deeper rose', swatch: '#844f58' },
    ],
    includes: [
      { label: '2 ruffled peonies', note: 'dc · 90 min each' },
      { label: '5 eucalyptus stems', note: 'ch · sage cotton' },
      { label: 'Craft parchment & satin bow', note: 'hand-tied' },
    ],
    care: 'Keep away from damp. Dust gently — the ruffled petals hold more dust than flat blooms.',
    gifting: 'Boxed with a free handwritten card. Add your message in the cart.',
    hoursToMake: 6,
    rating: 4.8,
    reviewCount: 12,
    inStock: true,
    featured: true,
  },
  {
    id: 'sunlit-meadow-mini',
    slug: 'sunlit-meadow-mini',
    name: 'Sunlit Meadow Mini',
    tagline: 'Trio of pastel buds',
    description:
      'Three small buds in a desk-sized posy. Sized to sit beside a laptop or on a bedside table without asking for a vase.',
    price: 699,
    categoryId: 'mini',
    badge: { label: 'Desk size', tone: 'neutral' },
    images: [
      {
        src: images.daisyLoveDetail,
        alt: 'A small posy of three pastel crochet buds resting on a linen surface',
      },
    ],
    variants: [
      { id: 'meadow-pastel', name: 'Meadow pastel', descriptor: 'Default', swatch: '#ffd9dd' },
      { id: 'meadow-sage', name: 'Meadow sage', descriptor: 'Green-led', swatch: '#cee5da' },
    ],
    includes: [
      { label: '3 pastel buds', note: 'sc · 25 min each' },
      { label: 'Mini twine tie', note: 'hand-tied' },
    ],
    care: 'Keep away from damp. Dust with a soft brush.',
    gifting: 'Arrives in a small kraft sleeve. Free handwritten card on request.',
    hoursToMake: 1.5,
    rating: 4.9,
    reviewCount: 9,
    inStock: true,
    featured: true,
  },
  {
    id: 'lavender-haven',
    slug: 'lavender-haven',
    name: 'Lavender Haven',
    tagline: 'Lavender & cotton stems',
    description:
      'Slim lavender spikes and soft cotton bolls tied with raw twine — the quietest bouquet in the collection, and the one that suits a shelf best.',
    price: 1150,
    categoryId: 'bouquets',
    images: [
      {
        src: images.lavenderHaven,
        alt: 'Lavender and cotton crochet bouquet tied with rustic twine in warm interior light',
      },
    ],
    variants: [
      { id: 'field-lavender', name: 'Field lavender', descriptor: 'Default', swatch: '#b49497' },
      { id: 'dried-lavender', name: 'Dried lavender', descriptor: 'Muted', swatch: '#d5c2c3' },
    ],
    includes: [
      { label: '6 lavender spikes', note: 'ch · 30 min each' },
      { label: '3 cotton bolls', note: 'sc · 25 min each' },
      { label: 'Raw twine tie', note: 'hand-tied' },
    ],
    care: 'Keep away from damp. Dust with a soft brush.',
    gifting: 'Boxed with a free handwritten card.',
    hoursToMake: 4,
    rating: 4.7,
    reviewCount: 7,
    inStock: true,
    featured: false,
  },
  {
    id: 'single-garden-rose',
    slug: 'single-garden-rose',
    name: 'Single Garden Rose',
    tagline: 'One stem, hand-dyed',
    description:
      'One ruffled garden rose on a wired stem. The piece people add to a gift box, or send on its own when the message matters more than the size.',
    price: 349,
    categoryId: 'singles',
    images: [
      {
        src: images.pastelBloomKraft,
        alt: 'A single hand-crocheted garden rose on a wired stem against warm paper',
      },
    ],
    variants: [
      { id: 'blush', name: 'Blush', descriptor: 'Default', swatch: '#f8b5be' },
      { id: 'ivory', name: 'Ivory', descriptor: 'Neutral', swatch: '#fdf1ec' },
      { id: 'dried-rose', name: 'Dried rose', descriptor: 'Deep', swatch: '#844f58' },
    ],
    includes: [{ label: '1 ruffled garden rose on wired stem', note: 'sc · 45 min' }],
    care: 'Keep away from damp. Bend the wired stem slowly to reshape.',
    gifting: 'Sleeved in tissue. Pairs with any bouquet in a gift box.',
    hoursToMake: 0.75,
    rating: 4.8,
    reviewCount: 31,
    inStock: true,
    featured: false,
  },
  {
    id: 'keepsake-gift-set',
    slug: 'keepsake-gift-set',
    name: 'Keepsake Gift Set',
    tagline: 'Mini posy, card & keepsake box',
    description:
      'A mini posy, a hand-calligraphed card and a lidded keepsake box that the bouquet can live in between seasons. Built for graduations and first anniversaries.',
    price: 1650,
    categoryId: 'gifts',
    images: [
      {
        src: images.packagingRibbon,
        alt: 'Hands wrapping a crochet bouquet in warm white tissue with a sage velvet ribbon and wax seal',
      },
    ],
    variants: [
      { id: 'blush-set', name: 'Blush set', descriptor: 'Default', swatch: '#c98b94' },
      { id: 'sage-set', name: 'Sage set', descriptor: 'Green-led', swatch: '#8da399' },
    ],
    includes: [
      { label: 'Mini posy of 3 blooms', note: 'sc · 25 min each' },
      { label: 'Hand-calligraphed card', note: 'ink, by hand' },
      { label: 'Lidded keepsake box & velvet ribbon', note: 'recyclable' },
    ],
    care: 'Store the posy in its box between seasons. Keep away from damp.',
    gifting: 'The set is the gift wrap — it ships ready to hand over.',
    hoursToMake: 2.5,
    rating: 5.0,
    reviewCount: 5,
    inStock: true,
    featured: false,
  },
];

export const getProductById = (id: string): Product | undefined =>
  products.find((product) => product.id === id);

export const getFeaturedProducts = (): Product[] => products.filter((product) => product.featured);
