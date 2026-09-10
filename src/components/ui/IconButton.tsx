import { Link } from 'react-router-dom';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type Tone = 'plain' | 'filled' | 'onImage';

const tones: Record<Tone, string> = {
  plain: 'text-on-surface-variant hover:text-primary hover:bg-surface-container',
  filled: 'bg-primary text-on-primary hover:bg-on-primary-fixed-variant shadow-sm',
  onImage: 'bg-surface/80 text-on-surface backdrop-blur-sm hover:text-primary',
};

interface BaseProps {
  /** Required: icon-only controls have no visible text. */
  label: string;
  tone?: Tone;
  /** Visual diameter. The tap area is padded to 44px regardless. */
  size?: number;
  className?: string;
  children: ReactNode;
}

type AsButton = BaseProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof BaseProps | 'aria-label'> & { to?: never };
type AsLink = BaseProps &
  Omit<ComponentPropsWithoutRef<'a'>, keyof BaseProps | 'aria-label'> & { to: string };

export type IconButtonProps = AsButton | AsLink;

/**
 * Icon-only control. The visual circle can be small (Stitch uses 32–36px) while
 * the hit area stays at least 44×44 via padding, so touch accuracy never
 * depends on the icon's drawn size.
 */
export function IconButton(props: IconButtonProps) {
  const { label, tone = 'plain', size = 44, className = '', children, ...rest } = props;

  const classes = [
    'relative inline-flex items-center justify-center rounded-full cursor-pointer',
    'min-h-[44px] min-w-[44px] transition-colors duration-200 active:scale-90 transition-transform',
    tones[tone],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style = { width: `${Math.max(size, 44)}px`, height: `${Math.max(size, 44)}px` };

  if ('to' in rest && rest.to) {
    const { to, ...linkProps } = rest as AsLink;
    return (
      <Link to={to} aria-label={label} className={classes} style={style} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as AsButton;
  return (
    <button type="button" aria-label={label} className={classes} style={style} {...buttonProps}>
      {children}
    </button>
  );
}
