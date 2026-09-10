import { CollectionCircles } from '@/components/collections/CollectionCircles';

/** Home page collections row. The circles themselves live in a shared component
 *  so the shop page renders exactly the same thing. */
export function CategoryStrip() {
  return <CollectionCircles />;
}
