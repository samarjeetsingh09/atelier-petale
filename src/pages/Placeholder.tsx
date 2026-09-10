import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';

/**
 * Honest stand-in for routes that are scheduled but not built yet, so the shell
 * and navigation can be exercised end to end without pretending a page exists.
 */
export function Placeholder({
  title,
  description,
  icon = 'local_florist',
}: {
  title: string;
  description: string;
  icon?: string;
}) {
  return (
    <Container
      width="narrow"
      className="flex flex-1 flex-col items-center justify-center py-space-3xl text-center"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
        <Icon name={icon} size={28} />
      </span>
      <h1 className="mt-4 text-headline-md">{title}</h1>
      <p className="mt-2 max-w-md text-body-md text-on-surface-variant">{description}</p>
      <Button to="/" variant="quiet" size="md" className="mt-space-lg">
        Back to home
      </Button>
    </Container>
  );
}
