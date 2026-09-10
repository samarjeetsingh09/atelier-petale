import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { buildEnquiryLink } from '@/lib/whatsapp';

/** Commission prompt. WhatsApp is the only way to order, so it is the only CTA. */
export function CustomOrderCta() {
  return (
    <section className="pb-space-xl" aria-labelledby="custom-heading">
      <Container width="wide">
        <div className="flex flex-col gap-3 rounded-3xl bg-gradient-to-br from-primary/10 via-surface-container-high to-secondary-container/40 p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between lg:gap-space-2xl lg:p-space-2xl">
          <div className="lg:max-w-2xl">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Icon name="palette" size={24} />
            </span>
            <h2 id="custom-heading" className="mt-3 text-headline-sm lg:text-headline-md">
              Have something special in mind?
            </h2>
            <p className="mt-1 text-body-sm leading-relaxed text-on-surface-variant lg:text-body-md">
              Tell us your flowers, your colours, or the date that matters. We'll crochet a
              one-of-a-kind arrangement for you.
            </p>
          </div>

          <Button
            href={buildEnquiryLink()}
            variant="secondary"
            size="lg"
            className="mt-1 shrink-0 lg:mt-0"
          >
            <Icon name="chat" size={20} />
            Request a custom bouquet
          </Button>
        </div>
      </Container>
    </section>
  );
}
