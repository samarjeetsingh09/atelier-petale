import type { ReactNode } from 'react';
import { Icon } from './Icon';

/**
 * The Stitch section rhythm: a small tracked uppercase eyebrow, a Playfair
 * headline, and optional supporting copy. Used on every page so section
 * hierarchy reads the same everywhere.
 */
export function SectionHeader({
  eyebrow,
  eyebrowIcon,
  eyebrowTone = 'primary',
  title,
  description,
  align = 'start',
  as: Heading = 'h2',
  className = '',
  action,
}: {
  eyebrow?: string;
  eyebrowIcon?: string;
  eyebrowTone?: 'primary' | 'secondary' | 'muted';
  title: ReactNode;
  description?: ReactNode;
  align?: 'start' | 'center';
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  /** Right-hand slot — a link or count that sits opposite the title. */
  action?: ReactNode;
}) {
  const toneClass = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    muted: 'text-on-surface-variant',
  }[eyebrowTone];

  return (
    <div
      className={`flex items-end justify-between gap-4 ${align === 'center' ? 'text-center' : ''} ${className}`}
    >
      <div className={`flex flex-col ${align === 'center' ? 'mx-auto items-center' : ''}`}>
        {eyebrow && (
          <span
            className={`flex items-center gap-1.5 text-label-sm font-semibold uppercase tracking-widest ${toneClass}`}
          >
            {eyebrowIcon && <Icon name={eyebrowIcon} size={16} />}
            {eyebrow}
          </span>
        )}
        <Heading className="mt-1 text-headline-md text-on-surface md:text-headline-lg">
          {title}
        </Heading>
        {description && (
          <p className="mt-1.5 max-w-prose text-body-sm text-on-surface-variant md:text-body-md">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0 pb-1">{action}</div>}
    </div>
  );
}
