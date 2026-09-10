import { images } from './images';

/** Swap `portrait` for a real studio photograph — portrait crop works best. */
export const founder = {
  name: 'Shreya M.',
  role: 'Founder & lead artisan',
  portrait: images.founderPortrait,
  portraitAlt:
    'Shreya, founder and lead artisan, in a linen apron at her sunlit Mumbai studio, surrounded by yarn spools and dried florals',
  quote:
    'I wanted to give people a flower that keeps holding the exact moment, smile and feeling of the day it was gifted.',
  bio: [
    'Shreya learned to crochet at her grandmother’s side, on a balcony in Bombay, working through a winter with one hook and a bag of leftover cotton. The flowers started as a way to keep her hands busy. They became the whole studio.',
    'Today she still works every bouquet herself — dyeing in small lots, counting stitches by hand, and answering each WhatsApp message personally. Nothing leaves the studio that she has not tied off and inspected.',
  ],
  chips: [
    { icon: 'location_on', label: 'Handcrafted in Mumbai' },
    { icon: 'all_inclusive', label: 'Made to endure' },
    { icon: 'schedule', label: 'Working since 2019' },
  ],
} as const;

export interface CraftPillar {
  /** Displayed as 01–04. These are the four commitments, in the order Stitch sets. */
  number: string;
  title: string;
  body: string;
}

export const craftPillars: CraftPillar[] = [
  {
    number: '01',
    title: '100% combed natural cotton',
    body: 'Spun from soft hypoallergenic botanical fibres, naturally dyed in small ethical batches so the yarn keeps its touchable softness.',
  },
  {
    number: '02',
    title: 'The slow stitch philosophy',
    body: 'No shortcuts, no assembly moulds. A single ruffled garden rose takes up to 45 minutes of mindful micro-crochet looping.',
  },
  {
    number: '03',
    title: 'Zero waste, forever kept',
    body: 'No discarded stems, no chemical sprays, no vase water to change. A quiet heirloom made to sit through decades of milestones.',
  },
  {
    number: '04',
    title: 'A thoughtful gifting ritual',
    body: 'Every bouquet arrives in raw Japanese parchment, hand-tied with velvet ribbon, inside a recyclable keepsake box.',
  },
];

export interface Vignette {
  src: string;
  alt: string;
  caption: string;
}

export const vignettes: Vignette[] = [
  {
    src: images.pastelBloomTissue,
    alt: 'Blush crochet garden roses and cream daisies wrapped in textured parchment with a silk ribbon',
    caption: 'Signature blossom bouquet',
  },
  {
    src: images.yarnFlatlay,
    alt: 'Pastel cotton yarn skeins, rosewood crochet hooks and brass scissors laid out on beige linen',
    caption: 'Ethical dye lots',
  },
  {
    src: images.packagingRibbon,
    alt: 'Hands wrapping a bouquet in warm white tissue with a sage velvet ribbon and a wax seal',
    caption: 'Heirloom packaging',
  },
];

export interface PaletteOption {
  id: string;
  name: string;
  swatch: string;
}

/** Starting points for a commission conversation — the choice is sent to WhatsApp. */
export const palettes: PaletteOption[] = [
  { id: 'rose-sage', name: 'Rose dust & sage', swatch: '#c98b94' },
  { id: 'ivory-linen', name: 'Ivory cream & wild linen', swatch: '#e8dacb' },
  { id: 'forest-eucalyptus', name: 'Forest sage & eucalyptus', swatch: '#708272' },
  { id: 'amber-marigold', name: 'Vintage amber marigold', swatch: '#d69f68' },
];

export const storyMilestone = {
  count: '800+',
  text: 'bouquets bloomed & cherished across India',
};
