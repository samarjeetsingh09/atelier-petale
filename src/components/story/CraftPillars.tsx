import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { craftPillars } from '@/data/story';

/**
 * The four commitments. Single column on mobile as in Stitch; two columns from
 * md so the section does not run long on wider screens. The numbers are kept
 * because Stitch numbers them and they label a fixed, ordered set of four.
 */
export function CraftPillars() {
  return (
    <section className="py-space-md lg:py-space-xl" aria-labelledby="pillars-heading">
      <Container width="editorial" className="flex flex-col gap-space-md">
        <SectionHeader
          eyebrow="The pillars"
          eyebrowTone="secondary"
          title={<span id="pillars-heading">Philosophy in every stitch</span>}
        />

        <ol className="grid grid-cols-1 gap-space-sm md:grid-cols-2 md:gap-space-md">
          {craftPillars.map((pillar) => (
            <li
              key={pillar.number}
              className="flex items-start gap-space-md rounded-xl bg-surface-container p-space-md shadow-sm transition-transform duration-200 active:scale-[0.99] lg:p-space-lg"
            >
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container-lowest font-display text-sm font-semibold text-primary shadow-sm"
              >
                {pillar.number}
              </span>
              <div className="flex min-w-0 flex-col">
                <h3 className="mb-1 font-display text-[1.05rem] text-on-surface lg:text-headline-sm">
                  {pillar.title}
                </h3>
                <p className="text-body-sm leading-relaxed text-on-surface-variant">
                  {pillar.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
