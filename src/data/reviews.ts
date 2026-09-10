import type { Review } from '@/types';

/**
 * Reviews are keyed by `productId` so this array can move to a database table
 * unchanged. Nothing reads reviews except through the selectors below.
 */
export const reviews: Review[] = [
  {
    id: 'r-pastel-1',
    productId: 'pastel-bloom-bouquet',
    author: 'Tanya S.',
    initials: 'TS',
    location: 'Mumbai',
    rating: 5,
    body: 'The yarn quality is exceptional and the wrapping looks straight out of a Paris boutique. Still on my bedside table, still perfect.',
    date: '2026-07-14',
    verified: true,
  },
  {
    id: 'r-pastel-2',
    productId: 'pastel-bloom-bouquet',
    author: 'Rohan K.',
    initials: 'RK',
    location: 'Delhi',
    rating: 5,
    body: 'Ordered this for our anniversary. My girlfriend was speechless. 10/10 craftsmanship down to each knitted petal.',
    date: '2026-06-28',
    verified: true,
    featuredOnHome: true,
  },
  {
    id: 'r-pastel-3',
    productId: 'pastel-bloom-bouquet',
    author: 'Ananya R.',
    initials: 'AR',
    location: 'Bengaluru',
    rating: 5,
    body: 'The bouquet was even prettier in person. I placed it on my study table and it makes me smile every single morning.',
    date: '2026-06-02',
    verified: true,
  },
  {
    id: 'r-daisy-1',
    productId: 'daisy-love-bouquet',
    author: 'Priya M.',
    initials: 'PM',
    location: 'Pune',
    rating: 5,
    body: 'Gave this to my best friend for her graduation. She cried happy tears because it will never wither.',
    date: '2026-07-30',
    verified: true,
    featuredOnHome: true,
  },
  {
    id: 'r-daisy-2',
    productId: 'daisy-love-bouquet',
    author: 'Ishaan V.',
    initials: 'IV',
    location: 'Hyderabad',
    rating: 5,
    body: 'Shreya sent progress photos while she made it. That alone was worth it. The daisies are so neat.',
    date: '2026-05-19',
    verified: true,
  },
  {
    id: 'r-peony-1',
    productId: 'peony-eucalyptus',
    author: 'Meera D.',
    initials: 'MD',
    location: 'Kolkata',
    rating: 5,
    body: 'The peonies are enormous and the ruffles hold their shape. Worth every rupee and the wait.',
    date: '2026-08-09',
    verified: true,
    featuredOnHome: true,
  },
  {
    id: 'r-peony-2',
    productId: 'peony-eucalyptus',
    author: 'Farhan A.',
    initials: 'FA',
    rating: 4,
    body: 'Beautiful piece. Took a little longer than quoted, but she kept me updated on WhatsApp the whole time.',
    date: '2026-04-22',
    verified: true,
  },
  {
    id: 'r-mini-1',
    productId: 'sunlit-meadow-mini',
    author: 'Divya N.',
    initials: 'DN',
    location: 'Chennai',
    rating: 5,
    body: 'Exactly desk-sized. I bought one, then three more for my team.',
    date: '2026-07-05',
    verified: true,
    featuredOnHome: true,
  },
  {
    id: 'r-lav-1',
    productId: 'lavender-haven',
    author: 'Sana Q.',
    initials: 'SQ',
    rating: 5,
    body: 'Quiet and lovely. Sits on my bookshelf and looks like it has always been there.',
    date: '2026-06-17',
    verified: true,
  },
  {
    id: 'r-single-1',
    productId: 'single-garden-rose',
    author: 'Kabir J.',
    initials: 'KJ',
    rating: 5,
    body: 'Sent one with a note instead of a card. Best ₹349 I have spent.',
    date: '2026-08-21',
    verified: true,
    featuredOnHome: true,
  },
];

export const getReviewsForProduct = (productId: string): Review[] =>
  reviews.filter((review) => review.productId === productId);

/**
 * Reviews chosen for the home page carousel. Marked per review, so the studio
 * decides what appears there rather than it being whatever is newest.
 */
export const getFeaturedReviews = (): Review[] =>
  reviews.filter((review) => review.featuredOnHome).sort((a, b) => b.date.localeCompare(a.date));

export const getAggregateRating = () => {
  if (reviews.length === 0) return { average: 0, count: 0 };
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return {
    average: Math.round((total / reviews.length) * 10) / 10,
    count: reviews.length,
  };
};
