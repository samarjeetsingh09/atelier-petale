import { useId, useState, type ReactNode } from 'react';
import { Icon } from './Icon';

export interface AccordionItemProps {
  icon?: string;
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

/**
 * Disclosure row. Uses a real button + region pair so screen readers and the
 * keyboard get the same behaviour as the pointer.
 */
export function AccordionItem({ icon, title, defaultOpen = false, children }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className="overflow-hidden rounded-xl bg-surface-container-low">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((current) => !current)}
          className="flex min-h-[44px] w-full cursor-pointer items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors duration-200 hover:bg-surface-container"
        >
          <span className="flex items-center gap-2.5">
            {icon && <Icon name={icon} size={20} className="text-primary" />}
            <span className="font-display text-[15px] font-medium text-on-surface">{title}</span>
          </span>
          <Icon
            name="expand_more"
            size={20}
            className={`text-outline transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
        className="px-4 pb-4 pt-1 text-body-sm leading-relaxed text-on-surface-variant"
      >
        {children}
      </div>
    </div>
  );
}

export function Accordion({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>;
}
