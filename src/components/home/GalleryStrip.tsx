import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { siteConfig } from '@/config/site';
import { images } from '@/data/images';

const gallery = [
  { src: images.pastelBloomTissue, alt: 'Crochet roses and daisies wrapped in tissue on linen' },
  {
    src: images.packagingRibbon,
    alt: 'A bouquet being wrapped in tissue with a sage velvet ribbon',
  },
  {
    src: images.yarnFlatlay,
    alt: 'Pastel yarn skeins, wooden crochet hooks and brass scissors on linen',
  },
  { src: images.peonyEucalyptus, alt: 'Pink crochet peonies with eucalyptus in craft parchment' },
  { src: images.lavenderHaven, alt: 'Lavender and cotton crochet stems tied with twine' },
  {
    src: images.daisyLoveDetail,
    alt: 'Close detail of a crochet daisy showing the stitch texture',
  },
];

/**
 * Photo diary. Three columns on mobile as in Stitch; the extra frames only
 * appear from sm up, where there is room for them.
 */
export function GalleryStrip() {
  return (
    <section className="py-space-md lg:py-space-xl" aria-labelledby="gallery-heading">
      <Container width="wide" className="flex flex-col gap-3">
        <SectionHeader
          eyebrow="Gallery diary"
          title={<span id="gallery-heading">Moments in cotton & twine</span>}
          action={
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center text-label-sm font-medium text-secondary transition-colors duration-200 hover:text-primary"
            >
              {siteConfig.instagram}
            </a>
          }
        />

        <ul className="grid grid-cols-3 gap-2 lg:grid-cols-6 lg:gap-4">
          {gallery.map((photo, index) => (
            <li
              key={photo.src + index}
              className={[
                'overflow-hidden rounded-xl bg-surface-container',
                index > 2 ? 'hidden sm:block' : '',
              ].join(' ')}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
              />
            </li>
          ))}
        </ul>

        <p className="text-center text-label-sm text-on-surface-variant">
          Handcrafted in micro-batches · each bloom unique
        </p>
      </Container>
    </section>
  );
}
