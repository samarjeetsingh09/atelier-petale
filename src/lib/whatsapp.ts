import { siteConfig } from '@/config/site';
import { formatPrice } from './format';
import type { ResolvedCartLine } from '@/types';

const waLink = (message: string) =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;

export interface OrderDetails {
  lines: ResolvedCartLine[];
  total: number;
  customerName: string;
  giftNote: string;
}

/**
 * The message the studio actually receives. It is rendered verbatim in the cart
 * as a preview, so what the buyer reads is what Shreya gets — no surprises.
 */
export const buildOrderMessage = ({
  lines,
  total,
  customerName,
  giftNote,
}: OrderDetails): string => {
  const name = customerName.trim() || 'Not given';
  const note = giftNote.trim() || 'None';

  const items =
    lines.length > 0
      ? lines
          .map(
            (line) =>
              `• ${line.product.name} (${line.variant.name}) × ${line.qty} — ${formatPrice(line.lineTotal)}`,
          )
          .join('\n')
      : '(No items selected)';

  return [
    `Hello ${siteConfig.name}! I'd like to place an order.`,
    '',
    'Order details:',
    items,
    '',
    `Total: ${formatPrice(total)}`,
    `Name: ${name}`,
    `Gift note: ${note}`,
    '',
    'Thank you!',
  ].join('\n');
};

export const buildOrderLink = (details: OrderDetails): string => waLink(buildOrderMessage(details));

/** Used by the custom-commission calls to action. */
export const buildEnquiryLink = (topic?: string): string =>
  waLink(
    topic
      ? `Hello ${siteConfig.name}! I'd love to ask about ${topic}.`
      : `Hello ${siteConfig.name}! I'd love to request a custom crochet bouquet.`,
  );

export const buildProductEnquiryLink = (productName: string): string =>
  waLink(`Hello ${siteConfig.name}! I have a question about the ${productName}.`);
