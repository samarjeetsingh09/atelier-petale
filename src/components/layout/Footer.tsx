import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { LogoMark } from '@/components/ui/Logo';
import { FlightPath } from '@/components/ui/FlightPath';
import { siteConfig } from '@/config/site';
import { buildEnquiryLink } from '@/lib/whatsapp';
import { navItems } from './navItems';

export function Footer() {
  return (
    <footer className="mt-space-2xl border-t border-outline-variant/50 bg-surface-container-low">
      <Container width="wide" className="relative py-space-xl md:py-space-2xl">
        <FlightPath
          animate={false}
          className="pointer-events-none absolute -top-10 right-4 hidden w-64 opacity-80 md:block"
        />
        <div className="flex flex-col gap-space-lg md:flex-row md:justify-between md:gap-space-2xl">
          <div className="max-w-sm">
            <Link to="/" aria-label={`${siteConfig.name}, home`} className="inline-flex">
              <LogoMark size={128} />
            </Link>
            <p className="mt-3 text-body-sm text-on-surface-variant">
              Hand-crocheted flower bouquets, made to order in {siteConfig.location}. Every piece is
              worked stitch by stitch and built to be kept.
            </p>
          </div>

          {/* Browse and Say hello sit side by side at every width — two short
              lists read faster in columns than stacked. */}
          <div className="grid grid-cols-2 gap-space-lg sm:gap-space-2xl">
            <nav aria-label="Footer">
              <h2 className="text-label-sm uppercase tracking-widest text-on-surface-variant">
                Browse
              </h2>
              <ul className="mt-3 flex flex-col gap-1">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="inline-flex min-h-[44px] items-center text-body-sm text-on-surface transition-colors duration-200 hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="text-label-sm uppercase tracking-widest text-on-surface-variant">
                Say hello
              </h2>
              <ul className="mt-3 flex flex-col gap-1">
                <li>
                  <a
                    href={buildEnquiryLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 text-body-sm text-on-surface transition-colors duration-200 hover:text-primary"
                  >
                    <Icon name="chat" size={18} />
                    Order on WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 text-body-sm text-on-surface transition-colors duration-200 hover:text-primary"
                  >
                    <Icon name="favorite" size={18} />
                    {siteConfig.instagram}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-space-lg flex items-center gap-1.5 border-t border-outline-variant/50 pt-space-md text-label-sm text-on-surface-variant">
          <span className="text-primary">
            <Icon name="volunteer_activism" size={16} />
          </span>
          Made slowly, in small batches, in {siteConfig.location}.
        </p>
      </Container>
    </footer>
  );
}
