import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { images } from '@/data/images';

const copy = {
  pill: '100% hand-knitted · everlasting',
  eyebrow: 'Atelier signature',
  heading: 'Flowers that last forever.',
  body: 'Handcrafted crochet blooms, made with patience, love and a little bit of magic.',
};

const heroImage = {
  src: images.daisyBouquet,
  alt: 'A hand-crocheted bouquet of white daisies with yellow centres, tied with twine on beige linen',
};

function StatusPill({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-surface-container-lowest/90 px-3 py-1 text-label-sm font-medium tracking-wide text-on-surface shadow-sm backdrop-blur-md ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {copy.pill}
    </span>
  );
}

/**
 * Mobile keeps the Stitch treatment exactly: a 4:5 photo with the headline
 * overlaid on a bottom scrim. From lg the same elements re-compose into a
 * split editorial spread rather than stretching the overlay across a wide
 * screen, where the scrim would swamp the photograph.
 */
export function HeroSection() {
  return (
    <section className="pb-space-lg pt-3">
      <Container width="wide">
        {/* Mobile & tablet: overlay composition */}
        <div className="relative overflow-hidden rounded-2xl bg-surface-container shadow-md lg:hidden">
          <div className="relative aspect-[4/5] w-full sm:aspect-[16/11]">
            <img
              src={heroImage.src}
              alt={heroImage.alt}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 via-inverse-surface/30 to-transparent" />
            <StatusPill className="absolute left-3.5 top-3.5" />

            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5">
              <span className="text-label-sm uppercase tracking-widest text-secondary-fixed">
                {copy.eyebrow}
              </span>
              <h1 className="font-display text-headline-lg-mobile leading-tight text-white drop-shadow-sm sm:text-headline-lg">
                {copy.heading}
              </h1>
              <p className="line-clamp-2 max-w-md text-body-sm font-light leading-relaxed text-surface-container-high/90">
                {copy.body}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <Button to="/shop" size="sm">
                  Explore collection
                  <Icon name="arrow_downward" size={16} />
                </Button>
                <Button to="/story" variant="onImage" size="sm">
                  Our story
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: editorial split */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:items-center lg:gap-space-2xl">
          <div className="lg:col-span-5">
            <StatusPill className="mb-space-lg" />
            <span className="block text-label-md uppercase tracking-widest text-primary">
              {copy.eyebrow}
            </span>
            <h1 className="mt-3 font-display text-display-lg text-on-surface">{copy.heading}</h1>
            <p className="mt-space-md max-w-md text-body-lg text-on-surface-variant">{copy.body}</p>
            <div className="mt-space-lg flex flex-wrap items-center gap-3">
              <Button to="/shop" size="lg">
                Explore collection
                <Icon name="arrow_forward" size={18} />
              </Button>
              <Button to="/story" variant="quiet" size="lg">
                Our story
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl bg-surface-container shadow-md">
              <img
                src={heroImage.src}
                alt={heroImage.alt}
                fetchPriority="high"
                decoding="async"
                className="aspect-[5/4] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
