/**
 * Single source of truth for everything the studio changes by hand.
 * Swap the WhatsApp number here and every checkout / enquiry link follows.
 */
export const siteConfig = {
  name: 'Atelier Pétale',
  tagline: 'Hand-crocheted flower bouquets',
  location: 'Mumbai, India',
  makerName: 'Shreya',
  instagram: '@atelier.petale',
  instagramUrl: 'https://instagram.com/atelier.petale',

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

export const CART_STORAGE_KEY = 'atelier-petale.cart.v1';
