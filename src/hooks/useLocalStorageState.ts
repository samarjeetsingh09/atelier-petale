import { useCallback, useEffect, useState } from 'react';

/**
 * String state that survives a reload. Every access is guarded: private mode and
 * blocked site data both throw, and neither should take the page down.
 */
export function useLocalStorageState(
  key: string,
  initialValue = '',
): [string, (next: string) => void] {
  const [value, setValue] = useState<string>(() => {
    try {
      return window.localStorage.getItem(key) ?? initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // Storage unavailable — the value still works for this session.
    }
  }, [key, value]);

  const set = useCallback((next: string) => setValue(next), []);

  return [value, set];
}
