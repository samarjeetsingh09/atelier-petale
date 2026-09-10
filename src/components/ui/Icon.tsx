export interface IconProps {
  /** Material Symbols ligature name, e.g. "shopping_bag". */
  name: string;
  /** Optical size in px. Matches the Stitch usage of `text-[Npx]` on icon spans. */
  size?: number;
  filled?: boolean;
  className?: string;
}

/**
 * Material Symbols are loaded as a subsetted font in index.html.
 * Icons are decorative here — every icon-only control carries its own aria-label.
 */
export function Icon({ name, size = 20, filled = false, className = '' }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined shrink-0 ${className}`}
      data-filled={filled ? 'true' : 'false'}
      style={{ fontSize: `${size}px`, width: `${size}px`, height: `${size}px` }}
    >
      {name}
    </span>
  );
}
