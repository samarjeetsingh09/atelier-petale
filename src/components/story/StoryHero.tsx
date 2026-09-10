import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { images } from '@/data/images';
import { siteConfig } from '@/config/site';

/**
 * Editorial opener. Stacked on mobile exactly as Stitch has it; from lg the copy
 * and the studio photograph sit side by side so the page starts as a spread
 * rather than a very long column.
 */
export function StoryHero() {
  return (
    <section className="pb-space-lg pt-space-md lg:pb-space-2xl lg:pt-space-xl">
      <Container width="wide">
        <div className="flex flex-col gap-space-sm lg:grid lg:grid-cols-12 lg:items-center lg:gap-space-2xl">
          <div className="flex flex-col gap-space-sm lg:col-span-5">
            <span className="flex items-center gap-space-xs text-label-sm uppercase tracking-widest text-primary">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              The atelier chronicle · our story
            </span>

            <h1 className="text-headline-lg-mobile font-medium leading-tight text-on-surface lg:text-display-lg">
              Born from patience,
              <br />
              <span className="font-normal italic text-primary">spun with love.</span>
            </h1>

            <p className="text-body-md leading-relaxed text-on-surface-variant lg:text-body-lg">
              In a quiet, sunlit corner studio in {siteConfig.location}, {siteConfig.name} began
              with one wooden crochet hook, skeins of fine combed cotton, and a stubborn wish: to
              make botanicals that never give up their bloom to the seasons.
            </p>
          </div>

          <div className="mt-space-xs lg:col-span-7 lg:mt-0">
            <div className="relative overflow-hidden rounded-xl bg-surface-container shadow-sm lg:rounded-2xl">
              <img
                src={images.handsCrocheting}
                alt="Hands crocheting a dusty rose blossom petal at a sunlit rustic oak table"
                fetchPriority="high"
                decoding="async"
                className="h-72 w-full object-cover object-center sm:h-80 lg:h-[28rem]"
              />
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-surface/90 px-2.5 py-1 shadow-sm backdrop-blur-md">
                <Icon name="eco" size={14} className="text-secondary" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-secondary">
                  Studio specimen · Bombay
                </span>
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
