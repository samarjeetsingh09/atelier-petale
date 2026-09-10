import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { storyMilestone, vignettes } from '@/data/story';

/**
 * Studio vignettes. Snap-scrolls on mobile as in Stitch; from lg the same three
 * frames lay out as a grid, so nothing is hidden off-screen on a wide display.
 */
export function VignetteGallery() {
  return (
    <section
      className="flex flex-col gap-space-sm py-space-md lg:py-space-xl"
      aria-labelledby="vignettes-heading"
    >
      <Container width="wide">
        <SectionHeader
          eyebrow="Atelier vignettes"
          eyebrowTone="secondary"
          title={<span id="vignettes-heading">Behind the stitches</span>}
          action={
            <span className="text-label-sm text-on-surface-variant lg:hidden">
              Swipe to explore
            </span>
          }
        />
      </Container>

      <Container width="wide" className="!px-0 lg:!px-gutter-desktop">
        <ul className="no-scrollbar flex snap-x snap-mandatory gap-space-sm overflow-x-auto px-gutter-mobile pb-2 pt-1 lg:grid lg:grid-cols-3 lg:gap-space-md lg:overflow-visible lg:px-0">
          {vignettes.map((vignette) => (
            <li key={vignette.caption} className="w-64 shrink-0 snap-start lg:w-auto">
              <figure className="relative h-72 w-full overflow-hidden rounded-xl bg-surface-container shadow-sm lg:h-96">
                <img
                  src={vignette.src}
                  alt={vignette.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
                <figcaption className="absolute bottom-2 left-2 rounded-full bg-surface/90 px-2 py-0.5 text-[10px] text-on-surface backdrop-blur-md">
                  {vignette.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>

      <Container width="wide" className="pt-space-2xs">
        <p className="flex items-center justify-center gap-space-sm rounded-xl bg-surface-container-highest/60 p-space-sm text-center lg:p-space-md">
          <span className="text-primary">
            <Icon name="favorite" size={20} filled />
          </span>
          <span className="text-label-lg font-medium tracking-normal text-on-surface">
            Over <span className="font-bold text-primary">{storyMilestone.count} bouquets</span>{' '}
            {storyMilestone.text}
          </span>
        </p>
      </Container>
    </section>
  );
}
