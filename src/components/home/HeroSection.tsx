import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { FlightPath, Sparkle } from '@/components/ui/FlightPath';
import { images } from '@/data/images';

const copy = {
  pill: '100% handmade · made to order',
  eyebrow: 'made by hand, sent with love',
  headingLead: 'Flowers that last',
  headingAccent: 'forever.',
  body: 'Handcrafted crochet blooms, made with patience, love and a little bit of magic.',
};

const heroImage = {
  src: images.daisyBouquet,
  alt: 'A hand-crocheted bouquet of white daisies with yellow centres, tied with twine on beige linen',
};

function StatusPill({ className = '' }: { className?: string }) {
  return (
    <span
      className={`sticker inline-flex items-center gap-1.5 rounded-full bg-surface-container-lowest px-3 py-1 text-label-sm font-bold text-on-surface ${className}`}
    >
      <Sparkle size={12} tone="butter" />
      {copy.pill}
    </span>
  );
}

function Heading({ className = '' }: { className?: string }) {
  return (
    <h1 className={className}>
      {copy.headingLead}{' '}
      <em className="text-brand-gradient italic">{copy.headingAccent}</em>
    </h1>
  );
}

/** The photo, mounted like a print with the logo's white sticker edge. */
function HeroPhoto({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border-[6px] border-white bg-surface-container shadow-[0_24px_48px_-20px_rgba(155,31,85,0.45)] ${className}`}
    >
      <img
        src={heroImage.src}
        alt={heroImage.alt}
        fetchPriority="high"
        decoding="async"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

/**
 * The paper plane from the logo flies out of the headline and across to the
 * photograph, drawing its dashed heart-loop on arrival. That trail is the one
 * piece of motion on the page; everything around it holds still.
 */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-space-xl pt-4 lg:pb-space-3xl lg:pt-space-xl">
      <Container width="wide">
        {/* Mobile & tablet: copy first, the trail, then the photo */}
        <div className="flex flex-col lg:hidden">
          <StatusPill className="self-start" />
          <span className="mt-4 font-script text-[1.5rem] leading-none text-secondary">
            {copy.eyebrow}
          </span>
          <Heading className="mt-2 text-display-lg-mobile text-on-surface sm:text-headline-lg" />
          <p className="mt-2 max-w-md text-body-md text-on-surface-variant">{copy.body}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button to="/shop" size="md">
              Explore collection
              <Icon name="arrow_downward" size={18} />
            </Button>
            <Button to="/story" variant="quiet" size="md">
              Our story
            </Button>
          </div>

          <div className="relative mt-2">
            <FlightPath className="pointer-events-none relative z-10 -mb-10 ml-auto block w-[78%] max-w-sm" />
            <HeroPhoto className="aspect-[4/5] rotate-[1.5deg] sm:aspect-[16/11]" />
            <Sparkle size={22} twinkle className="absolute -left-1 bottom-10 z-10" />
          </div>
        </div>

        {/* Desktop: copy left, photo right, the trail bridging the two */}
        <div className="relative hidden lg:grid lg:grid-cols-12 lg:items-center lg:gap-space-2xl">
          <div className="relative z-10 lg:col-span-5">
            <StatusPill className="mb-space-lg" />
            <span className="block font-script text-[2rem] leading-none text-secondary">
              {copy.eyebrow}
            </span>
            <Heading className="mt-3 text-display-lg text-on-surface xl:text-[4.25rem]" />
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

          <div className="relative lg:col-span-7">
            <FlightPath className="pointer-events-none absolute -left-24 -top-16 z-10 w-[26rem]" />
            <HeroPhoto className="aspect-[5/4] rotate-[1.5deg]" />
            <Sparkle size={28} twinkle className="absolute -right-3 -top-4" />
            <Sparkle size={18} tone="lilac" className="absolute -bottom-5 left-10" />
          </div>
        </div>
      </Container>
    </section>
  );
}
