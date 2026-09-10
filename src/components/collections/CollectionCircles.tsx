import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { useCatalog } from '@/store/catalog-context';

export interface CollectionCirclesProps {
  /** Highlights the collection currently being viewed. */
  activeId?: string | null;
  /** Adds an "All" token that clears the filter. Used on the shop page. */
  showAll?: boolean;
  heading?: string;
  hint?: string;
}

/**
 * Collections as round photo tokens with the name beneath — the shape people
 * already know from Instagram, which is where most of this traffic comes from.
 *
 * Shared by the home page and the shop so the two never drift apart. Scrolls on
 * mobile; centres as a row once there is room for all of them.
 */
export function CollectionCircles({
  activeId = null,
  showAll = false,
  heading = 'Curated collections',
  hint = 'Swipe to browse',
}: CollectionCirclesProps) {
  const { categories } = useCatalog();

  const tokens = [
    ...(showAll
      ? [
          {
            id: null as string | null,
            label: 'All',
            to: '/shop',
            image: categories[0]?.image ?? '',
            imageAlt: 'Every piece in the studio',
          },
        ]
      : []),
    ...categories.map((category) => ({
      id: category.id as string | null,
      label: category.label,
      to: `/shop?category=${category.id}`,
      image: category.image,
      imageAlt: category.imageAlt,
    })),
  ];

  return (
    <section className="flex flex-col gap-3 py-space-sm" aria-labelledby="collections-heading">
      <Container width="wide" className="flex items-center justify-between gap-3">
        <h2
          id="collections-heading"
          className="text-label-sm font-medium uppercase tracking-widest text-on-surface-variant"
        >
          {heading}
        </h2>
        {hint && <span className="text-label-sm font-medium text-primary md:hidden">{hint}</span>}
      </Container>

      <Container width="wide" className="!px-0 md:!px-6 lg:!px-gutter-desktop">
        <ul className="no-scrollbar flex snap-x gap-space-md overflow-x-auto px-gutter-mobile pb-1 pt-1 md:justify-center md:overflow-visible md:px-0 lg:gap-space-xl">
          {tokens.map((token) => {
            const isActive = token.id === activeId;
            return (
              <li key={token.label} className="shrink-0 snap-start">
                <Link
                  to={token.to}
                  aria-current={isActive ? 'true' : undefined}
                  className="group flex w-[5.5rem] cursor-pointer flex-col items-center gap-2 rounded-2xl py-1 sm:w-24 lg:w-28"
                >
                  <span
                    className={[
                      'relative block rounded-full p-[3px] transition-all duration-200',
                      isActive
                        ? 'ring-2 ring-primary'
                        : 'ring-1 ring-outline-variant group-hover:ring-2 group-hover:ring-primary',
                    ].join(' ')}
                  >
                    <img
                      src={token.image}
                      alt={token.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="h-16 w-16 rounded-full object-cover shadow-sm transition-transform duration-300 group-hover:scale-[1.04] sm:h-[4.5rem] sm:w-[4.5rem] lg:h-20 lg:w-20"
                    />
                  </span>
                  <span
                    className={[
                      'text-center text-label-sm leading-tight transition-colors duration-200',
                      isActive
                        ? 'font-semibold text-primary'
                        : 'font-medium text-on-surface group-hover:text-primary',
                    ].join(' ')}
                  >
                    {token.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
