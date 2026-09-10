export interface Announcement {
  id: string;
  icon: string;
  text: string;
}

/**
 * The strip above the header. Keep each line short — it has one line to work
 * with on a 375px screen. Add, remove or reorder freely; the carousel adapts.
 */
export const announcements: Announcement[] = [
  { id: 'ribbon', icon: 'redeem', text: 'Free silk ribbon & gift box on every order' },
  { id: 'card', icon: 'edit_note', text: 'Complimentary handwritten calligraphy card' },
  { id: 'ships', icon: 'nest_eco_leaf', text: 'Ships nationwide · made in small batches' },
  { id: 'lead', icon: 'schedule', text: 'Made to order in 2–3 working days' },
  { id: 'forever', icon: 'all_inclusive', text: 'Flowers that never wilt — kept, not cut' },
];

/** How long each line stays before the next one slides in. */
export const ANNOUNCEMENT_INTERVAL_MS = 4000;
