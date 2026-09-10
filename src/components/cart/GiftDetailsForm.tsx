import { Icon } from '@/components/ui/Icon';

export interface GiftDetails {
  customerName: string;
  giftNote: string;
}

/** Stable so the checkout button can send focus here when the name is missing. */
export const CUSTOMER_NAME_INPUT_ID = 'cart-customer-name';

/**
 * Name and gift note. Both feed the WhatsApp message directly, so the labels say
 * what the studio will do with them rather than naming a field.
 *
 * The name is required: the order arrives as a chat message, and without a name
 * the studio has nothing to match the conversation to.
 */
export function GiftDetailsForm({
  value,
  onChange,
  showNameError = false,
}: {
  value: GiftDetails;
  onChange: (next: GiftDetails) => void;
  /** Set once someone has tried to check out without a name. */
  showNameError?: boolean;
}) {
  const nameMissing = !value.customerName.trim();
  const invalid = showNameError && nameMissing;

  return (
    <section className="flex flex-col gap-4 rounded-xl bg-surface-container-lowest p-4 shadow-sm">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-fixed text-primary">
          <Icon name="edit_note" size={18} />
        </span>
        <div>
          <h2 className="text-headline-sm leading-tight text-on-surface">Personalise your gift</h2>
          <p className="text-label-sm text-on-surface-variant">
            Complimentary card, handwritten in ink
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <div className="mb-1 flex items-center justify-between gap-2">
            <label htmlFor={CUSTOMER_NAME_INPUT_ID} className="text-label-md text-on-surface">
              Your name
            </label>
            <span className="text-label-sm text-on-surface-variant">Required</span>
          </div>
          <div className="relative">
            <input
              id={CUSTOMER_NAME_INPUT_ID}
              type="text"
              required
              autoComplete="name"
              value={value.customerName}
              aria-invalid={invalid}
              aria-describedby={invalid ? `${CUSTOMER_NAME_INPUT_ID}-error` : undefined}
              onChange={(event) => onChange({ ...value, customerName: event.target.value })}
              placeholder="So we know who we're making this for"
              className={[
                'min-h-[44px] w-full rounded-lg bg-surface px-3.5 py-2.5 pr-10 text-body-sm text-on-surface',
                'outline-none transition-colors duration-200 placeholder:text-outline',
                'focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary',
                invalid ? 'ring-2 ring-error' : '',
              ].join(' ')}
            />
            <span
              className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${
                invalid ? 'text-error' : 'text-outline'
              }`}
            >
              <Icon name="badge" size={18} />
            </span>
          </div>
          {invalid && (
            <p
              id={`${CUSTOMER_NAME_INPUT_ID}-error`}
              className="mt-1.5 text-body-sm text-error"
              role="alert"
            >
              Add your name so the studio knows who the order is from.
            </p>
          )}
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between gap-2">
            <label htmlFor="cart-gift-note" className="text-label-md text-on-surface">
              Gift note
            </label>
            <span className="text-label-sm text-secondary">Free calligraphy</span>
          </div>
          <textarea
            id="cart-gift-note"
            rows={3}
            value={value.giftNote}
            onChange={(event) => onChange({ ...value, giftNote: event.target.value })}
            placeholder="We'll write this on the card by hand. Optional."
            className="w-full resize-none rounded-lg bg-surface px-3.5 py-2.5 text-body-sm text-on-surface outline-none transition-colors duration-200 placeholder:text-outline focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
    </section>
  );
}
