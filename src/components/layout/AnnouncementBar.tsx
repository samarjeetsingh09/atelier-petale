import { useEffect, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { ANNOUNCEMENT_INTERVAL_MS, announcements } from '@/data/announcements';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * One-line offers strip above the header pill.
 *
 * Lines crossfade in place rather than scrolling, so nothing is ever half-read.
 * It holds on hover and on keyboard focus, and does not advance at all for
 * visitors who have asked for reduced motion — a line that changes by itself is
 * exactly the kind of movement that setting is meant to stop.
 *
 * The rotation is decorative: every line is in the DOM for screen readers, so
 * nothing here is announced repeatedly.
 */
export function AnnouncementBar() {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reducedMotion || paused || announcements.length < 2) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % announcements.length),
      ANNOUNCEMENT_INTERVAL_MS,
    );
    return () => window.clearInterval(timer);
  }, [reducedMotion, paused]);

  if (announcements.length === 0) return null;

  return (
    <div
      className="bg-inverse-surface text-inverse-on-surface"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative mx-auto h-8 max-w-wide overflow-hidden px-4 sm:px-5">
        {/* Visible, rotating line */}
        <div aria-hidden="true" className="relative h-full">
          {announcements.map((item, itemIndex) => (
            <span
              key={item.id}
              className={[
                'absolute inset-0 flex items-center justify-center gap-1.5 text-center',
                'text-[11px] font-medium uppercase tracking-[0.08em]',
                'transition-all duration-500 ease-out',
                itemIndex === index
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none -translate-y-1 opacity-0',
              ].join(' ')}
            >
              <Icon name={item.icon} size={14} className="text-inverse-primary" />
              <span className="truncate">{item.text}</span>
            </span>
          ))}
        </div>

        {/* Full list for assistive tech — read once, in order, never re-announced */}
        <ul className="sr-only">
          {announcements.map((item) => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
