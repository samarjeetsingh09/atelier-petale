import { Link } from 'react-router-dom';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'quiet' | 'onImage' | 'whatsapp';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-body font-bold cursor-pointer ' +
  'transition-[background-color,box-shadow,transform] duration-200 active:scale-[0.97] ' +
  'disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100';

const variants: Record<Variant, string> = {
  // Strokes pink, deepened from the logo hue so white text clears 4.5:1.
  primary:
    'bg-primary text-on-primary shadow-[0_6px_16px_-6px_rgba(194,48,111,0.55)] hover:bg-on-primary-fixed-variant',
  // Lilac, from the "my" lettering.
  secondary:
    'bg-secondary text-on-secondary shadow-[0_6px_16px_-6px_rgba(139,79,156,0.55)] hover:bg-on-secondary-fixed-variant',
  quiet:
    'bg-surface-container-lowest text-primary hover:bg-primary-fixed border-2 border-primary-fixed-dim',
  onImage: 'bg-white/15 text-white backdrop-blur-md hover:bg-white/25',
  whatsapp: 'bg-whatsapp text-white hover:bg-whatsapp-dark',
};

// Every size clears the 44px touch minimum.
const sizes: Record<Size, string> = {
  sm: 'min-h-[44px] px-5 py-2.5 text-body-sm',
  md: 'min-h-[48px] px-6 py-3 text-body-md',
  lg: 'min-h-[52px] px-7 py-3.5 text-body-md',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof CommonProps> & {
    to?: never;
    href?: never;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<'a'>, keyof CommonProps> & {
    /** Internal route — renders a react-router <Link>. */
    to: string;
    href?: never;
  };

type ButtonAsAnchor = CommonProps &
  Omit<ComponentPropsWithoutRef<'a'>, keyof CommonProps> & {
    /** External URL — renders a plain <a> with safe rel. */
    href: string;
    to?: never;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    children,
    ...rest
  } = props;

  const classes = [base, variants[variant], sizes[size], fullWidth ? 'w-full' : '', className]
    .filter(Boolean)
    .join(' ');

  if ('to' in rest && rest.to) {
    const { to, ...linkProps } = rest as ButtonAsLink;
    return (
      <Link to={to} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  if ('href' in rest && rest.href) {
    const anchorProps = rest as ButtonAsAnchor;
    return (
      <a target="_blank" rel="noopener noreferrer" {...anchorProps} className={classes}>
        {children}
      </a>
    );
  }

  const buttonProps = rest as ButtonAsButton;
  return (
    <button type="button" {...buttonProps} className={classes}>
      {children}
    </button>
  );
}
