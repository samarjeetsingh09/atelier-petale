/**
 * Single source of truth for everything the studio changes by hand.
 * Swap the WhatsApp number here and every checkout / enquiry link follows.
 */
export const siteConfig = {
  name: 'my strokes',
  tagline: 'Handmade with love',
  location: 'Mumbai, India',
  makerName: 'Shreya',
  instagram: '@mystrokes9',
  instagramUrl: 'https://www.instagram.com/mystrokes9/',

  /** Country code + number, digits only. No "+", no spaces. */
  whatsappNumber: '919115090584',

  /** Working days quoted on product and cart pages. */
  makingTime: '2–3 working days',

  currency: {
    code: 'INR',
    symbol: '₹',
    locale: 'en-IN',
  },
} as const;

export const CART_STORAGE_KEY = 'my-strokes.cart.v1';
