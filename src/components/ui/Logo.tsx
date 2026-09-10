/**
 * Inline monogram — a six-petal bloom drawn from one repeated petal, echoing the
 * way a crochet flower is worked in rounds. Drawn rather than loaded so the most
 * repeated element on the site never waits on the network.
 */
export function LogoMark({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      role="img"
      aria-label="Atelier Pétale"
      className={className}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <ellipse
            key={angle}
            cx="24"
            cy="15"
            rx="6.4"
            ry="9.6"
            transform={`rotate(${angle} 24 24)`}
          />
        ))}
      </g>
      <circle cx="24" cy="24" r="3.4" fill="currentColor" />
    </svg>
  );
}

export function Wordmark({ subtitle, className = '' }: { subtitle?: string; className?: string }) {
  return (
    <span className={`flex min-w-0 flex-col ${className}`}>
      <span className="font-display text-headline-sm leading-none tracking-tight text-on-surface">
        Atelier Pétale
      </span>
      {subtitle && (
        <span className="mt-0.5 text-label-sm uppercase leading-none tracking-widest text-primary">
          {subtitle}
        </span>
      )}
    </span>
  );
}
