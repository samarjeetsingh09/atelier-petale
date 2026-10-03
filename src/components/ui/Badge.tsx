import type { BadgeTone } from '@/types';
import type { ReactNode } from 'react';

const tones: Record<BadgeTone, string> = {
  bestseller: 'bg-primary-fixed text-on-primary-fixed-variant',
  trending: 'bg-secondary-container text-on-secondary-container',
  artisan: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
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
      className={`sticker inline-flex -rotate-3 items-center rounded-full px-2.5 py-0.5 text-[11px] font-extrabold ${tones[tone]} ${className}`}
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
