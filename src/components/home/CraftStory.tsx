import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { images } from '@/data/images';
import { siteConfig } from '@/config/site';

const stats = [
  { value: '4.5 hrs', label: 'Per bouquet' },
  { value: '100%', label: 'Cotton fibre' },
  { value: 'Zero', label: 'Wilting or waste' },
];

/**
 * The craft note. Stacked on mobile exactly as Stitch has it; from lg the photo
 * and the copy sit side by side so the section does not become a very tall
 * column on a desktop screen.
 */
export function CraftStory() {
  return (
    <section className="bg-surface-container-low py-space-lg lg:py-space-2xl" id="story">
      <Container width="wide">
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-12 lg:items-center lg:gap-space-2xl">
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-2xl shadow-sm">
              <img
                src={images.handsCrocheting}
                alt="Hands crocheting a dusty rose petal at a sunlit wooden table, yarn and tools nearby"
                loading="lazy"
                decoding="async"
                className="h-56 w-full object-cover sm:h-72 lg:h-[26rem]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-inverse-surface/20 to-transparent" />
              <div className="absolute inset-x-4 bottom-3 flex items-center justify-between gap-3 text-surface-container-lowest">
                <span className="text-label-sm font-medium uppercase tracking-widest text-secondary-fixed">
                  Bespoke heritage
                </span>
                <span className="text-label-sm opacity-90">{siteConfig.location}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 lg:col-span-6">
            <span className="text-label-sm font-semibold uppercase tracking-widest text-primary">
              The slow craft philosophy
            </span>
            <h2 className="text-headline-md leading-tight text-on-surface lg:text-headline-lg">
              Made by hand, meant to be kept.
            </h2>
            <p className="text-body-md leading-relaxed text-on-surface-variant lg:text-body-lg">
              Every petal is crocheted by hand from spun combed cotton. Unlike fresh cuts that wilt
              within days, these arrangements hold a memory for years without losing their lustre.
            </p>

            <ul className="grid grid-cols-3 gap-2 pt-2 lg:gap-4">
              {stats.map((stat) => (
                <li
                  key={stat.label}
                  className="flex flex-col items-center justify-center rounded-xl bg-surface-container p-2.5 text-center lg:p-4"
                >
                  <span className="font-display text-headline-sm text-primary lg:text-headline-md">
                    {stat.value}
                  </span>
                  <span className="mt-0.5 text-[10px] uppercase tracking-wider text-on-surface-variant lg:text-label-sm">
                    {stat.label}
                  </span>
                </li>
              ))}
            </ul>

            <Button to="/story" variant="quiet" size="md" className="mt-space-md self-start">
              Read our story
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
