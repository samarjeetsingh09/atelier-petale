import type { BadgeTone } from '@/types';
import type { ReactNode } from 'react';

const tones: Record<BadgeTone, string> = {
  bestseller: 'bg-surface-container-lowest/90 text-primary backdrop-blur-sm',
  trending: 'bg-secondary text-on-secondary',
  artisan: 'bg-surface-container-highest text-on-surface-variant',
  neutral: 'bg-surface-container-highest text-on-surface-variant',
};

export function Badge({
  tone = 'neutral',
  className = '',
  children,
}: {
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/** Pill used over photography and inside cards — e.g. "100% hand-knitted". */
export function Pill({
  icon,
  className = '',
  children,
}: {
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-label-sm ${className}`}
    >
      {icon}
      {children}
    </span>
  );
}
