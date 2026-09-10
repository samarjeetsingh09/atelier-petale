import { Icon } from './Icon';

export interface QuantityStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  /** Names the thing being counted, for screen readers. */
  label: string;
  size?: 'sm' | 'md';
}

/**
 * Pill stepper from the Stitch product and cart screens. The visible buttons are
 * 28–32px as designed, padded out to a 44px tap area.
 */
export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  label,
  size = 'md',
}: QuantityStepperProps) {
  const buttonSize = size === 'sm' ? 'h-7 w-7' : 'h-8 w-8';
  const iconSize = size === 'sm' ? 16 : 18;

  const step = (delta: number) => {
    const next = Math.min(max, Math.max(min, value + delta));
    if (next !== value) onChange(next);
  };

  return (
    <div
      className={`inline-flex items-center rounded-full bg-surface-container-lowest p-0.5 shadow-sm ${
        size === 'sm' ? 'gap-0.5' : 'gap-2'
      }`}
    >
      <button
        type="button"
        aria-label={`Decrease ${label} quantity`}
        disabled={value <= min}
        onClick={() => step(-1)}
        className={`flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full text-on-surface-variant transition-colors duration-200 hover:bg-surface-container-high active:scale-90 disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100`}
      >
        <span className={`flex ${buttonSize} items-center justify-center`}>
          <Icon name="remove" size={iconSize} />
        </span>
      </button>

      <span
        aria-live="polite"
        className="min-w-[24px] text-center text-label-md font-bold text-on-surface"
      >
        {value}
        <span className="sr-only"> {label}</span>
      </span>

      <button
        type="button"
        aria-label={`Increase ${label} quantity`}
        disabled={value >= max}
        onClick={() => step(1)}
        className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full text-on-surface-variant transition-colors duration-200 hover:bg-surface-container-high active:scale-90 disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100"
      >
        <span className={`flex ${buttonSize} items-center justify-center`}>
          <Icon name="add" size={iconSize} />
        </span>
      </button>
    </div>
  );
}
