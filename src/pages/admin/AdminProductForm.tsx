import { useMemo, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import {
  NumberField,
  SelectField,
  TextAreaField,
  TextField,
  ToggleField,
  adminInputClasses,
} from '@/components/admin/Field';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { useCatalog } from '@/store/catalog-context';
import { saveProduct } from '@/services/catalog';
import type { Product, ProductInclusion, ProductVariant } from '@/types';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const blankProduct = (categoryId: string): Product => ({
  id: '',
  slug: '',
  name: '',
  tagline: '',
  description: '',
  price: 0,
  categoryId,
  images: [],
  variants: [{ id: 'default', name: 'Standard', descriptor: 'Default', swatch: '#c98b94' }],
  includes: [],
  care: '',
  gifting: '',
  hoursToMake: 1,
  rating: 0,
  reviewCount: 0,
  inStock: true,
  featured: false,
});

export function AdminProductForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, categories, getProductById, refresh } = useCatalog();

  const isNew = !id || id === 'new';
  const existing = isNew ? undefined : getProductById(id);

  const [draft, setDraft] = useState<Product>(
    () => existing ?? blankProduct(categories[0]?.id ?? ''),
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const patch = (changes: Partial<Product>) => setDraft((current) => ({ ...current, ...changes }));

  const problems = useMemo(() => {
    const list: string[] = [];
    if (!draft.name.trim()) list.push('Name is required.');
    if (draft.price <= 0) list.push('Price must be more than zero.');
    if (draft.images.length === 0) list.push('Add at least one photo.');
    if (draft.images.some((image) => !image.alt.trim())) {
      list.push('Every photo needs alt text.');
    }
    if (draft.variants.length === 0) list.push('Add at least one variant.');
    const slug = draft.slug || slugify(draft.name);
    if (
      slug &&
      products.some((product) => product.slug === slug && product.id !== (existing?.id ?? ''))
    ) {
      list.push(`Another product already uses the web address "${slug}".`);
    }
    return list;
  }, [draft, products, existing]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (problems.length > 0) return;
    setBusy(true);
    setError(null);
    try {
      const slug = draft.slug || slugify(draft.name);
      await saveProduct({ ...draft, slug, id: draft.id || slug });
      await refresh();
      navigate('/admin');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not save.');
    } finally {
      setBusy(false);
    }
  };

  const setVariant = (index: number, changes: Partial<ProductVariant>) =>
    patch({
      variants: draft.variants.map((variant, i) =>
        i === index ? { ...variant, ...changes } : variant,
      ),
    });

  const setInclusion = (index: number, changes: Partial<ProductInclusion>) =>
    patch({
      includes: draft.includes.map((item, i) => (i === index ? { ...item, ...changes } : item)),
    });

  return (
    <form onSubmit={submit} className="flex flex-col gap-space-lg">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            to="/admin"
            className="mb-1 inline-flex min-h-[44px] items-center gap-1.5 text-label-md uppercase text-primary"
          >
            <Icon name="arrow_back_ios_new" size={14} />
            Products
          </Link>
          <h1 className="font-display text-headline-md text-on-surface">
            {isNew ? 'New product' : draft.name || 'Edit product'}
          </h1>
        </div>
        <button
          type="submit"
          disabled={busy || problems.length > 0}
          className="flex min-h-[48px] cursor-pointer items-center gap-2 rounded-xl bg-primary px-5 text-label-lg text-on-primary shadow-md transition-colors duration-200 hover:bg-on-primary-fixed-variant disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Icon name="check" size={20} />
          {busy ? 'Saving…' : 'Save product'}
        </button>
      </div>

      {problems.length > 0 && (
        <ul className="flex flex-col gap-1 rounded-xl bg-surface-container p-4 text-body-sm text-on-surface-variant">
          {problems.map((problem) => (
            <li key={problem} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {problem}
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p
          role="alert"
          className="rounded-lg bg-error-container p-3 text-body-sm text-on-error-container"
        >
          {error}
        </p>
      )}

      <div className="grid gap-space-lg lg:grid-cols-2">
        {/* Essentials */}
        <section className="flex flex-col gap-3 rounded-xl bg-surface-container-lowest p-4 shadow-sm">
          <h2 className="text-label-md uppercase tracking-wider text-on-surface-variant">
            Essentials
          </h2>
          <TextField
            label="Name"
            required
            value={draft.name}
            onChange={(name) => patch({ name })}
          />
          <TextField
            label="Web address"
            hint={`atelier-petale.com/product/${draft.slug || slugify(draft.name) || '…'}`}
            value={draft.slug}
            onChange={(slug) => patch({ slug: slugify(slug) })}
            placeholder="Leave blank to build from the name"
          />
          <TextField
            label="Tagline"
            hint="One line under the name on cards"
            value={draft.tagline}
            onChange={(tagline) => patch({ tagline })}
          />
          <TextAreaField
            label="Description"
            rows={4}
            value={draft.description}
            onChange={(description) => patch({ description })}
          />
          <div className="grid grid-cols-2 gap-3">
            <NumberField
              label="Price (₹)"
              value={draft.price}
              onChange={(price) => patch({ price })}
            />
            <NumberField
              label="Hours by hand"
              step={0.25}
              value={draft.hoursToMake}
              onChange={(hoursToMake) => patch({ hoursToMake })}
            />
          </div>
          <SelectField
            label="Collection"
            value={draft.categoryId}
            onChange={(categoryId) => patch({ categoryId })}
            options={categories.map((category) => ({
              value: category.id,
              label: category.label,
            }))}
          />
          <ToggleField
            label="In stock"
            hint="Off shows “Made to order” instead"
            checked={draft.inStock}
            onChange={(inStock) => patch({ inStock })}
          />
          <ToggleField
            label="Show on the home page"
            hint="Appears in “Made with love”"
            checked={draft.featured}
            onChange={(featured) => patch({ featured })}
          />
        </section>

        {/* Photos */}
        <section className="flex flex-col gap-3 rounded-xl bg-surface-container-lowest p-4 shadow-sm">
          <ImageUploader
            productId={draft.id || slugify(draft.name) || 'new'}
            images={draft.images}
            onChange={(images) => patch({ images })}
          />
        </section>

        {/* Variants */}
        <section className="flex flex-col gap-3 rounded-xl bg-surface-container-lowest p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-label-md uppercase tracking-wider text-on-surface-variant">
              Palette & ribbon options
            </h2>
            <button
              type="button"
              onClick={() =>
                patch({
                  variants: [
                    ...draft.variants,
                    {
                      id: `variant-${draft.variants.length + 1}`,
                      name: '',
                      descriptor: '',
                      swatch: '#c98b94',
                    },
                  ],
                })
              }
              className="flex min-h-[44px] cursor-pointer items-center gap-1 rounded-full px-3 text-label-md uppercase text-primary hover:bg-surface-container"
            >
              <Icon name="add" size={16} />
              Add
            </button>
          </div>

          {draft.variants.map((variant, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-lg bg-surface-container p-2"
            >
              <input
                type="color"
                value={variant.swatch}
                aria-label={`Colour for option ${index + 1}`}
                onChange={(event) => setVariant(index, { swatch: event.target.value })}
                className="h-11 w-11 shrink-0 cursor-pointer rounded-full border-none bg-transparent p-0"
              />
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <input
                  type="text"
                  value={variant.name}
                  placeholder="Option name"
                  aria-label={`Name for option ${index + 1}`}
                  onChange={(event) =>
                    setVariant(index, {
                      name: event.target.value,
                      id: slugify(event.target.value) || `variant-${index + 1}`,
                    })
                  }
                  className={adminInputClasses}
                />
                <input
                  type="text"
                  value={variant.descriptor}
                  placeholder="Short qualifier, e.g. Subtle warm"
                  aria-label={`Qualifier for option ${index + 1}`}
                  onChange={(event) => setVariant(index, { descriptor: event.target.value })}
                  className={adminInputClasses}
                />
              </div>
              <button
                type="button"
                onClick={() => patch({ variants: draft.variants.filter((_, i) => i !== index) })}
                aria-label={`Remove option ${index + 1}`}
                className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full text-outline hover:bg-error-container hover:text-on-error-container"
              >
                <Icon name="delete" size={18} />
              </button>
            </div>
          ))}
        </section>

        {/* Craft details */}
        <section className="flex flex-col gap-3 rounded-xl bg-surface-container-lowest p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-label-md uppercase tracking-wider text-on-surface-variant">
              What's included
            </h2>
            <button
              type="button"
              onClick={() => patch({ includes: [...draft.includes, { label: '', note: '' }] })}
              className="flex min-h-[44px] cursor-pointer items-center gap-1 rounded-full px-3 text-label-md uppercase text-primary hover:bg-surface-container"
            >
              <Icon name="add" size={16} />
              Add
            </button>
          </div>

          {draft.includes.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={item.label}
                placeholder="3 hand-crocheted garden roses"
                aria-label={`Item ${index + 1}`}
                onChange={(event) => setInclusion(index, { label: event.target.value })}
                className={`${adminInputClasses} flex-[2]`}
              />
              <input
                type="text"
                value={item.note}
                placeholder="sc · 45 min each"
                aria-label={`Craft note for item ${index + 1}`}
                onChange={(event) => setInclusion(index, { note: event.target.value })}
                className={`${adminInputClasses} flex-1`}
              />
              <button
                type="button"
                onClick={() => patch({ includes: draft.includes.filter((_, i) => i !== index) })}
                aria-label={`Remove item ${index + 1}`}
                className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full text-outline hover:bg-error-container hover:text-on-error-container"
              >
                <Icon name="delete" size={18} />
              </button>
            </div>
          ))}

          <TextAreaField
            label="Care instructions"
            value={draft.care}
            onChange={(care) => patch({ care })}
          />
          <TextAreaField
            label="Gifting & packaging"
            value={draft.gifting}
            onChange={(gifting) => patch({ gifting })}
          />
        </section>
      </div>
    </form>
  );
}
