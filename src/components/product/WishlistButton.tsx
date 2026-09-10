import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';

/**
 * Local-only save marker, as in the Stitch screen. It is intentionally not
 * persisted — there is no account to persist it to, and a heart that silently
 * forgets on reload would be worse than one that clearly only reacts to a tap.
 */
export function WishlistButton({ productName }: { productName: string }) {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${productName} from saved` : `Save ${productName}`}
      onClick={() => setSaved((current) => !current)}
      className={[
        'flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-xl shadow-sm',
        'transition-colors duration-200 active:scale-95',
        saved ? 'bg-primary-fixed text-primary' : 'bg-surface-container text-on-surface',
      ].join(' ')}
    >
      <Icon name="favorite" size={24} filled={saved} />
    </button>
  );
}
