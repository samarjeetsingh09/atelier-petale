import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { founder } from '@/data/story';

/**
 * The maker, properly introduced.
 *
 * Phone: portrait first, then who she is and what she says, reading top to
 * bottom. Laptop: the portrait moves alongside the text, so the section reads as
 * a spread instead of a very tall column.
 */
export function FounderNote() {
  return (
    <section className="py-space-md lg:py-space-xl" aria-labelledby="founder-heading">
      <Container width="editorial">
        <div className="overflow-hidden rounded-2xl bg-surface-container-low shadow-sm lg:grid lg:grid-cols-12 lg:items-stretch">
          {/* Portrait */}
          <div className="lg:col-span-5">
            <figure className="relative h-full">
              <img
                src={founder.portrait}
                alt={founder.portraitAlt}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover object-center sm:aspect-[3/2] lg:aspect-auto lg:h-full lg:min-h-[30rem]"
              />
              <figcaption className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-surface/90 px-2.5 py-1 shadow-sm backdrop-blur-md">
                <Icon name="eco" size={13} className="text-secondary" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-secondary">
                  In the studio
                </span>
              </figcaption>
            </figure>
          </div>

          {/* Who she is */}
          <div className="flex flex-col gap-space-md p-space-lg lg:col-span-7 lg:justify-center lg:p-space-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-label-sm font-semibold uppercase tracking-widest text-primary">
                  Meet the maker
                </span>
                <h2
                  id="founder-heading"
                  className="mt-1 text-headline-md text-on-surface lg:text-headline-lg"
                >
                  {founder.name}
                </h2>
                <span className="text-label-md text-on-surface-variant">{founder.role}</span>
              </div>
              <span aria-hidden="true" className="shrink-0 select-none text-primary-fixed-dim">
                <Icon name="format_quote" size={38} />
              </span>
            </div>

            <blockquote className="border-l-2 border-primary-container pl-4 font-display text-[1.15rem] font-normal italic leading-snug text-on-surface lg:text-headline-sm lg:leading-relaxed">
              “{founder.quote}”
            </blockquote>

            <div className="flex flex-col gap-3">
              {founder.bio.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="text-body-sm leading-relaxed text-on-surface-variant lg:text-body-md"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <ul className="flex flex-wrap items-center gap-2 pt-space-2xs">
              {founder.chips.map((chip, index) => (
                <li key={chip.label}>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] tracking-wide ${
                      index === 0
                        ? 'bg-secondary-container text-on-secondary-container'
                        : 'bg-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    <Icon name={chip.icon} size={12} />
                    {chip.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
