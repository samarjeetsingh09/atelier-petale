export interface NavItem {
  to: string;
  label: string;
  icon: string;
  /** Shown under the wordmark in the mobile header. */
  headerLabel: string;
  end?: boolean;
}

export const navItems: NavItem[] = [
  { to: '/', label: 'Home', icon: 'local_florist', headerLabel: 'Home', end: true },
  { to: '/shop', label: 'Shop', icon: 'storefront', headerLabel: 'Shop' },
  { to: '/cart', label: 'Cart', icon: 'shopping_bag', headerLabel: 'Cart' },
  { to: '/story', label: 'Our story', icon: 'auto_stories', headerLabel: 'Our story' },
];
