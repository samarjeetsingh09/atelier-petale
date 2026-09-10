import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { CartLineItem } from '@/components/cart/CartLineItem';
import { CUSTOMER_NAME_INPUT_ID, GiftDetailsForm } from '@/components/cart/GiftDetailsForm';
import { OrderSummary } from '@/components/cart/OrderSummary';
import { TrustPillars } from '@/components/cart/TrustPillars';
import { WhatsAppCheckout } from '@/components/cart/WhatsAppCheckout';
import { siteConfig } from '@/config/site';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { pluralise } from '@/lib/format';
import { useCart } from '@/store/cart-context';

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-surface-container-low p-8 text-center">
      <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
        <Icon name="local_florist" size={28} />
      </span>
      <h2 className="text-headline-sm text-on-surface">Your basket is waiting</h2>
      <p className="mt-1 max-w-xs text-body-sm text-on-surface-variant">
        Everything here is crocheted by hand, stitch by stitch. Start with a bouquet.
      </p>
      <Button to="/shop" size="md" className="mt-4">
        Browse the collection
      </Button>
    </div>
  );
}

export function Cart() {
  const { resolvedLines, subtotal, totalHours, itemCount } = useCart();
  const [customerName, setCustomerName] = useLocalStorageState('atelier-petale.name.v1');
  const [giftNote, setGiftNote] = useLocalStorageState('atelier-petale.note.v1');
  const [nameErrorShown, setNameErrorShown] = useState(false);

  // Tapping send without a name explains the problem and takes them to it,
  // rather than leaving a dead button on screen.
  const focusNameField = () => {
    setNameErrorShown(true);
    const field = document.getElementById(CUSTOMER_NAME_INPUT_ID);
    field?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    field?.focus({ preventScroll: true });
  };

  useEffect(() => {
    document.title = `Cart — ${siteConfig.name}`;
  }, []);

  const isEmpty = resolvedLines.length === 0;
  const order = { lines: resolvedLines, total: subtotal, customerName, giftNote };

  return (
    <Container width="wide" className="flex flex-col gap-space-lg py-space-md lg:py-space-xl">
      <header>
        <span className="mb-1.5 flex items-center gap-2 text-label-sm uppercase tracking-widest text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Selected flora
        </span>
        <h1 className="text-headline-lg-mobile text-on-surface lg:text-headline-lg">
          Your little collection
        </h1>
        <p className="mt-1 text-body-sm text-on-surface-variant">
          {isEmpty
            ? 'Handmade blooms, prepared to order in our studio.'
            : `${pluralise(itemCount, 'bouquet')} being prepared for you in our studio.`}
        </p>
      </header>

      {isEmpty ? (
        <EmptyCart />
      ) : (
        <div className="flex flex-col gap-space-lg lg:grid lg:grid-cols-12 lg:items-start lg:gap-space-2xl">
          {/* Items + personalisation */}
          <div className="flex flex-col gap-space-lg lg:col-span-7">
            <ul className="flex flex-col gap-3.5">
              {resolvedLines.map((line) => (
                <CartLineItem key={`${line.productId}-${line.variantId}`} line={line} />
              ))}
            </ul>

            <GiftDetailsForm
              value={{ customerName, giftNote }}
              showNameError={nameErrorShown}
              onChange={(next) => {
                setCustomerName(next.customerName);
                setGiftNote(next.giftNote);
                if (next.customerName.trim()) setNameErrorShown(false);
              }}
            />
          </div>

          {/* Summary + checkout — sticky beside the items on desktop */}
          <div className="flex flex-col gap-space-lg lg:sticky lg:top-28 lg:col-span-5">
            <OrderSummary subtotal={subtotal} totalHours={totalHours} />
            <WhatsAppCheckout order={order} onMissingName={focusNameField} />
            <TrustPillars />
          </div>
        </div>
      )}

      <p className="flex items-center justify-center gap-1.5 pt-space-xs text-center text-label-sm text-on-surface-variant">
        <Icon name="volunteer_activism" size={16} className="text-primary" />
        Crocheted slowly, with love, in small batches
      </p>
    </Container>
  );
}
