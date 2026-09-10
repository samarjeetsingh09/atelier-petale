import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { siteConfig } from '@/config/site';
import { palettes } from '@/data/story';
import { buildEnquiryLink } from '@/lib/whatsapp';

/**
 * Commission prompt. The palette choice is not decorative — it is written into
 * the WhatsApp message, so the conversation starts with the buyer's colourway
 * already stated.
 */
export function CommissionCta() {
  const [selectedId, setSelectedId] = useState(palettes[0]!.id);
  const selected = palettes.find((palette) => palette.id === selectedId) ?? palettes[0]!;

  return (
    <section className="py-space-lg lg:py-space-2xl" aria-labelledby="commission-heading">
      <Container width="editorial">
        <div className="relative flex flex-col gap-space-md overflow-hidden rounded-2xl bg-surface-container-high p-space-lg shadow-sm lg:grid lg:grid-cols-12 lg:items-center lg:gap-space-2xl lg:p-space-2xl">
          {/* Soft light, not decoration for its own sake — it lifts the panel off the page. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-primary-fixed/40 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-secondary-fixed/40 blur-xl"
          />

          <div className="relative z-10 flex flex-col gap-1.5 lg:col-span-6">
            <span className="flex items-center gap-1.5 text-label-sm font-semibold uppercase tracking-widest text-secondary">
              <Icon name="temp_preferences_custom" size={18} />
              Custom bespoke commissions
            </span>
            <h2
              id="commission-heading"
              className="text-headline-md font-medium leading-snug text-on-surface lg:text-headline-lg"
            >
              Want a floral memory stitched forever?
            </h2>
            <p className="mt-1 text-body-sm leading-relaxed text-on-surface-variant lg:text-body-md">
              A bridal bouquet, an anniversary flower, a blossom from a childhood garden — we work
              custom colourways with a personalised date tag.
            </p>
          </div>

          <div className="relative z-10 flex flex-col gap-space-md lg:col-span-6">
            <fieldset className="rounded-xl bg-surface/80 p-space-sm shadow-sm backdrop-blur-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <legend className="text-[11px] uppercase tracking-wider text-on-surface-variant">
                  Pick a palette to start from
                </legend>
                <span className="text-[11px] font-semibold text-primary">{selected.name}</span>
              </div>

              <div className="mt-2 flex items-center gap-1">
                {palettes.map((palette) => {
                  const isSelected = palette.id === selectedId;
                  return (
                    <button
                      key={palette.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedId(palette.id)}
                      className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full transition-transform duration-200 active:scale-90"
                    >
                      <span
                        className={[
                          'block h-7 w-7 rounded-full transition-shadow duration-200',
                          isSelected
                            ? 'ring-2 ring-primary ring-offset-2 ring-offset-surface'
                            : 'ring-1 ring-outline-variant',
                        ].join(' ')}
                        style={{ backgroundColor: palette.swatch }}
                      />
                      <span className="sr-only">{palette.name}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <Button
              href={buildEnquiryLink(`a custom bouquet in ${selected.name.toLowerCase()}`)}
              variant="whatsapp"
              size="lg"
              fullWidth
            >
              <Icon name="chat" size={20} />
              Chat with {siteConfig.makerName} on WhatsApp
            </Button>

            <p className="flex items-center justify-center gap-1.5 text-[11px] text-on-surface-variant">
              <Icon name="schedule" size={14} />
              Typical reply within 2 studio hours
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
