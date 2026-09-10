import type { ReactNode } from 'react';

type Width = 'editorial' | 'wide' | 'narrow';

/**
 * Horizontal rhythm for every section.
 *
 * Mobile keeps the Stitch 1rem gutter untouched. Larger screens step the gutter
 * up and cap the measure so desktop reads as an editorial page rather than a
 * stretched phone.
 */
const widths: Record<Width, string> = {
  narrow: 'max-w-3xl',
  editorial: 'max-w-editorial',
  wide: 'max-w-wide',
};

export function Container({
  width = 'editorial',
  className = '',
  children,
}: {
  width?: Width;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`mx-auto w-full px-gutter-mobile sm:px-6 lg:px-gutter-desktop ${widths[width]} ${className}`}
    >
      {children}
    </div>
  );
}
