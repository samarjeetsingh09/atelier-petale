import { siteConfig } from '@/config/site';

const { symbol, locale } = siteConfig.currency;

/** ₹1,299 — Indian digit grouping, no decimals. */
export const formatPrice = (amount: number): string =>
  `${symbol}${amount.toLocaleString(locale, { maximumFractionDigits: 0 })}`;

/** "4.5 hrs" / "45 min" — handwork time, merchandised beside price. */
export const formatHours = (hours: number): string => {
  if (hours < 1) return `${Math.round(hours * 60)} min`;
  const rounded = Math.round(hours * 10) / 10;
  return `${rounded} ${rounded === 1 ? 'hr' : 'hrs'}`;
};

export const pluralise = (count: number, singular: string, plural = `${singular}s`): string =>
  `${count} ${count === 1 ? singular : plural}`;
