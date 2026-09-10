import { Icon } from './Icon';

/** Compact rating: one filled star, the score, and the count. Matches the Stitch cards. */
export function Rating({
  value,
  count,
  size = 14,
  className = '',
}: {
  value: number;
  count?: number;
  size?: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-1 text-primary ${className}`}>
      <Icon name="star" size={size} filled />
      <span className="text-[11px] font-semibold text-on-surface">
        {value.toFixed(1)}
        {typeof count === 'number' && <span className="font-normal text-outline"> ({count})</span>}
      </span>
      <span className="sr-only">
        Rated {value} out of 5{typeof count === 'number' ? ` from ${count} reviews` : ''}
      </span>
    </span>
  );
}

/** Five discrete stars, for individual review cards. */
export function StarRow({ value, size = 15 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex text-primary" role="img" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Icon key={index} name="star" size={size} filled={index < Math.round(value)} />
      ))}
    </span>
  );
}
