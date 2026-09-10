import type { ProductVariant } from '@/types';

/**
 * Palette and ribbon choice. Rendered as a radio group so arrow keys move
 * between options the way a keyboard user expects from a single-choice control.
 */
export function VariantPicker({
  variants,
  selectedId,
  onSelect,
}: {
  variants: ProductVariant[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const selected = variants.find((variant) => variant.id === selectedId);

  return (
    <fieldset className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <legend className="text-label-md uppercase tracking-wider text-on-surface">
          Palette & ribbon wrap
        </legend>
        <span className="text-body-sm font-medium text-primary">{selected?.name}</span>
      </div>

      <div
        role="radiogroup"
        aria-label="Palette and ribbon wrap"
        className="grid grid-cols-3 gap-2"
      >
        {variants.map((variant) => {
          const isSelected = variant.id === selectedId;
          return (
            <button
              key={variant.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(variant.id)}
              className={[
                'flex min-h-[44px] cursor-pointer flex-col items-start gap-1 rounded-xl p-2.5 text-left transition-all duration-200',
                isSelected
                  ? 'bg-primary-fixed text-on-primary-fixed shadow-sm ring-2 ring-primary'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high',
              ].join(' ')}
            >
              <span
                className="h-4 w-4 rounded-full shadow-inner ring-1 ring-black/5"
                style={{ backgroundColor: variant.swatch }}
              />
              <span className="text-label-sm font-semibold leading-tight">{variant.name}</span>
              <span
                className={`text-[10px] ${
                  isSelected ? 'text-on-primary-fixed-variant' : 'text-on-surface-variant'
                }`}
              >
                {variant.descriptor}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
