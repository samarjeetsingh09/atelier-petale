import { siteConfig } from '@/config/site';

/**
 * The client logo, whole — illustration and lettering together, never cropped.
 * Only the empty margin and the flat pink ground were removed, so it sits on
 * any surface. `size` is the rendered height; width follows the artwork.
 */
export function LogoMark({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <img
      src="/brand/logo.png"
      width={Math.round(size * (520 / 539))}
      height={size}
      alt={siteConfig.name}
      decoding="async"
      className={`shrink-0 bg-transparent ${className}`}
      style={{ height: size, width: 'auto' }}
    />
  );
}
