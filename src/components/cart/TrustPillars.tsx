import { Icon } from '@/components/ui/Icon';

const pillars = [
  { icon: 'chat_bubble', tone: 'text-primary', label: 'Direct artisan contact' },
  { icon: 'all_inclusive', tone: 'text-secondary', label: '100% everlasting yarn' },
  {
    icon: 'featured_seasonal_and_gifts',
    tone: 'text-tertiary',
    label: 'Carefully boxed for gifting',
  },
];

export function TrustPillars() {
  return (
    <ul className="grid grid-cols-3 gap-2.5">
      {pillars.map((pillar) => (
        <li
          key={pillar.label}
          className="flex min-h-[90px] flex-col items-center justify-center rounded-xl bg-surface-container p-2.5 text-center"
        >
          <span
            className={`mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-surface-container-lowest ${pillar.tone}`}
          >
            <Icon name={pillar.icon} size={16} />
          </span>
          <span className="text-label-sm font-medium leading-tight text-on-surface">
            {pillar.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
