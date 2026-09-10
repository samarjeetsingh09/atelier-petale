import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * True when the visitor has asked the system to reduce motion. Anything that
 * moves or advances on its own should check this and hold still instead.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    if (!window.matchMedia) return;
    const mediaQuery = window.matchMedia(QUERY);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
