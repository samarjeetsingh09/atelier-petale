import { Icon } from '@/components/ui/Icon';
import { siteConfig } from '@/config/site';
import { buildOrderLink, buildOrderMessage, type OrderDetails } from '@/lib/whatsapp';

const WhatsAppGlyph = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.24-8.23 8.24zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.78 2.71 4.3 3.8 1.4.61 1.95.66 2.64.56.42-.06 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31z" />
  </svg>
);

/**
 * The only checkout. Nothing is charged here — the order becomes a WhatsApp
 * conversation with the studio, so the exact message is shown before it is sent.
 *
 * The order cannot be sent without a name. Rather than a dead disabled control,
 * the button stays live and sends the shopper to the field that is missing.
 */
export function WhatsAppCheckout({
  order,
  onMissingName,
}: {
  order: OrderDetails;
  onMissingName: () => void;
}) {
  const message = buildOrderMessage(order);
  const isEmpty = order.lines.length === 0;
  const nameMissing = !order.customerName.trim();

  const sharedClasses =
    'flex min-h-[56px] w-full items-center justify-between gap-3 rounded-xl px-4 py-3.5 ' +
    'shadow-[0_4px_16px_rgba(37,211,102,0.25)] transition-colors duration-200 active:scale-[0.98] ' +
    'cursor-pointer bg-whatsapp text-white hover:bg-whatsapp-dark';

  const label = (
    <>
      <span className="flex items-center gap-3">
        <WhatsAppGlyph />
        <span className="text-left leading-tight">
          <span className="block text-label-lg font-bold tracking-wide">
            Send order on WhatsApp
          </span>
          <span className="block text-[11px] opacity-90">
            {nameMissing ? 'Add your name first' : `Confirms directly with ${siteConfig.makerName}`}
          </span>
        </span>
      </span>
      <Icon name="arrow_forward" size={20} />
    </>
  );

  return (
    <section
      className="flex flex-col gap-4 rounded-2xl bg-surface-container-lowest p-4 shadow-md"
      aria-labelledby="checkout-heading"
    >
      <h2 id="checkout-heading" className="sr-only">
        Send your order
      </h2>

      {isEmpty ? (
        <p className="rounded-xl bg-surface-container p-3.5 text-body-sm text-on-surface-variant">
          Add a bouquet before sending an order.
        </p>
      ) : nameMissing ? (
        // A real button, not a disabled link: tapping explains what is missing
        // and moves focus to the field, instead of doing nothing.
        <button type="button" onClick={onMissingName} className={sharedClasses}>
          {label}
        </button>
      ) : (
        <a
          href={buildOrderLink(order)}
          target="_blank"
          rel="noopener noreferrer"
          className={sharedClasses}
        >
          {label}
        </a>
      )}

      <div className="flex flex-col gap-1.5 rounded-xl bg-surface-container-high p-3.5">
        <span className="flex items-center gap-1.5 text-primary">
          <Icon name="psychology_alt" size={18} />
          <span className="text-label-md font-semibold">How this works</span>
        </span>
        <p className="text-body-sm leading-relaxed text-on-surface-variant">
          Sending opens WhatsApp with the message below already filled in. You confirm the delivery
          address and pay by UPI or card in the chat — nothing is charged on this site.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-label-sm uppercase tracking-wider text-outline">
            What {siteConfig.makerName} receives
          </span>
          <span className="flex items-center gap-1 text-[10px] text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            Updates as you edit
          </span>
        </div>
        <pre className="select-all whitespace-pre-wrap rounded-xl bg-surface-container-low p-3 font-mono text-body-sm leading-relaxed text-on-surface shadow-inner">
          {message}
        </pre>
      </div>
    </section>
  );
}
