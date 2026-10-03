import { useId, type CSSProperties } from 'react';

/**
 * The brand's signature: the paper plane from the logo, trailing a dashed line
 * that loops into a heart. The dashed stroke is revealed by an animated solid
 * mask, so the dashes stay put while the line appears to be drawn.
 *
 * Decorative only — it is hidden from assistive tech everywhere it is used.
 */
const TRAIL =
  'M6 104 C 52 106, 98 92, 150 74 C 126 60, 130 32, 150 46 C 170 32, 174 60, 150 74 C 192 90, 232 64, 270 44';

export function FlightPath({
  className = '',
  animate = true,
}: {
  className?: string;
  animate?: boolean;
}) {
  const maskId = `trail-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  return (
    <svg
      viewBox="0 0 320 120"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          <path
            d={TRAIL}
            pathLength={1}
            stroke="#fff"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="1"
            style={
              animate
                ? ({
                    '--trail-length': 1,
                    animation: 'trail-draw 1.6s cubic-bezier(0.55, 0, 0.25, 1) 0.2s both',
                  } as CSSProperties)
                : undefined
            }
          />
        </mask>
      </defs>

      <path
        d={TRAIL}
        mask={`url(#${maskId})`}
        className="stroke-primary-container"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="5 6"
      />

      {/* Paper plane, angled along the trail's exit. The outer group places it;
          the inner one animates, so the CSS transform cannot clobber the SVG one. */}
      <g transform="translate(306 26) rotate(-18)">
        <g style={animate ? { animation: 'plane-arrive 0.6s ease-out 1.55s both' } : undefined}>
          <path d="M0 0 L-40 12 L-26 17 Z" className="fill-primary-fixed stroke-primary-container" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M0 0 L-26 17 L-23 30 Z" className="fill-primary-fixed-dim stroke-primary-container" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M-26 17 L-23 30 L-31 21" className="fill-primary-fixed-dim stroke-primary-container" strokeWidth="1.6" strokeLinejoin="round" />
        </g>
      </g>
    </svg>
  );
}

/** Four-point sparkle from the logo, in butter or lilac. */
export function Sparkle({
  size = 16,
  tone = 'butter',
  twinkle = false,
  className = '',
}: {
  size?: number;
  tone?: 'butter' | 'lilac' | 'pink';
  twinkle?: boolean;
  className?: string;
}) {
  const fill = {
    butter: 'fill-sparkle-deep',
    lilac: 'fill-secondary-fixed-dim',
    pink: 'fill-primary-fixed-dim',
  }[tone];

  return (
    <svg
      viewBox="-10 -10 20 20"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={className}
      style={twinkle ? { animation: 'sparkle-twinkle 2.8s ease-in-out infinite' } : undefined}
    >
      <path
        className={fill}
        d="M0 -10 C1.2 -3 3 -1.2 10 0 C3 1.2 1.2 3 0 10 C-1.2 3 -3 1.2 -10 0 C-3 -1.2 -1.2 -3 0 -10 Z"
      />
    </svg>
  );
}
