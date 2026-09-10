import { Icon } from '@/components/ui/Icon';
import { siteConfig } from '@/config/site';
import { formatHours, formatPrice } from '@/lib/format';

export function OrderSummary({ subtotal, totalHours }: { subtotal: number; totalHours: number }) {
  return (
    <section
      className="flex flex-col gap-2.5 rounded-xl bg-surface-container p-4 shadow-sm"
      aria-labelledby="summary-heading"
    >
      <h2
        id="summary-heading"
        className="pb-1 text-label-md uppercase tracking-wider text-on-surface-variant"
      >
        Price summary
      </h2>

      <div className="flex items-center justify-between text-body-sm text-on-surface-variant">
        <span>Items subtotal</span>
        <span className="text-on-surface">{formatPrice(subtotal)}</span>
      </div>

      <div className="flex items-center justify-between gap-3 text-body-sm text-on-surface-variant">
        <span className="flex items-center gap-1.5">
          Silk ribbon & gift box
          <Icon name="redeem" size={14} className="text-secondary" />
        </span>
        <span className="text-label-md font-semibold text-secondary">Complimentary</span>
      </div>

      <div className="flex items-center justify-between gap-3 text-body-sm text-on-surface-variant">
        <span className="flex items-center gap-1.5">
          Handcrafting schedule
          <Icon name="schedule" size={14} className="text-primary" />
        </span>
        <span className="text-right text-on-surface">
          {siteConfig.makingTime}
          <span className="block text-label-sm text-on-surface-variant">
            ≈ {formatHours(totalHours)} of handwork
          </span>
        </span>
      </div>

      <div className="mt-1 flex items-baseline justify-between gap-3 border-t border-outline-variant/50 pt-3">
        <span className="text-headline-sm text-on-surface">Total</span>
        <span className="text-right">
          <span className="font-display text-headline-md font-semibold text-primary">
            {formatPrice(subtotal)}
          </span>
          <span className="block text-label-sm text-on-surface-variant">
            Inclusive of all artisan fees
          </span>
        </span>
      </div>
    </section>
  );
}
