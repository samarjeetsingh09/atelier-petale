import { useState, type FormEvent } from 'react';
import { Icon } from '@/components/ui/Icon';
import { TextField } from '@/components/admin/Field';
import { useCatalog } from '@/store/catalog-context';
import { deleteCategory, saveCategory } from '@/services/catalog';
import { uploadProductImage, validateImage } from '@/services/storage';
import type { ProductCategory } from '@/types';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const blank = (): ProductCategory => ({
  id: '',
  label: '',
  icon: 'local_florist',
  image: '',
  imageAlt: '',
});

export function AdminCollections() {
  const { categories, products, refresh, source } = useCatalog();
  const [draft, setDraft] = useState<ProductCategory>(blank);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const readOnly = source === 'starter';
  const countFor = (id: string) => products.filter((product) => product.categoryId === id).length;

  const patch = (changes: Partial<ProductCategory>) =>
    setDraft((current) => ({ ...current, ...changes }));

  const uploadCover = async (file: File | undefined) => {
    if (!file) return;
    const problem = validateImage(file);
    if (problem) {
      setError(problem);
      return;
    }
    setBusy('upload');
    setError(null);
    try {
      const src = await uploadProductImage(file, `collections/${draft.id || 'new'}`);
      patch({ image: src });
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Upload failed.');
    } finally {
      setBusy(null);
    }
  };

  const add = async (event: FormEvent) => {
    event.preventDefault();
    const id = draft.id || slugify(draft.label);
    if (!id || !draft.label.trim()) return;
    setBusy('add');
    setError(null);
    try {
      await saveCategory({ ...draft, id }, categories.length);
      await refresh();
      setDraft(blank());
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not save.');
    } finally {
      setBusy(null);
    }
  };

  const remove = async (category: ProductCategory) => {
    const count = countFor(category.id);
    const warning =
      count > 0
        ? `Delete "${category.label}"? ${count} product${count === 1 ? '' : 's'} will be left without a collection.`
        : `Delete "${category.label}"?`;
    if (!window.confirm(warning)) return;
    setBusy(category.id);
    setError(null);
    try {
      await deleteCategory(category.id);
      await refresh();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Could not delete.');
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="flex flex-col gap-space-lg">
      <div>
        <h1 className="font-display text-headline-md text-on-surface">Collections</h1>
        <p className="text-body-sm text-on-surface-variant">
          {categories.length} shown as circles on the home page and shop
        </p>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-lg bg-error-container p-3 text-body-sm text-on-error-container"
        >
          {error}
        </p>
      )}

      {readOnly && (
        <p className="rounded-lg bg-surface-container p-3 text-body-sm text-on-surface-variant">
          Collections can only be edited once the catalogue is in the database. Import it from the
          Products tab first.
        </p>
      )}

      <form
        onSubmit={add}
        className="flex flex-col gap-3 rounded-xl bg-surface-container-lowest p-4 shadow-sm"
      >
        <h2 className="text-label-md uppercase tracking-wider text-on-surface-variant">
          New collection
        </h2>

        <TextField
          label="Name"
          value={draft.label}
          onChange={(label) => patch({ label, id: slugify(label) })}
          placeholder="Wedding bouquets"
        />
        <TextField
          label="Describe the cover photo"
          hint="Read aloud to anyone using a screen reader"
          value={draft.imageAlt}
          onChange={(imageAlt) => patch({ imageAlt })}
          placeholder="A bridal crochet bouquet in ivory and blush"
        />

        <div className="flex items-center gap-3">
          {draft.image ? (
            <img
              src={draft.image}
              alt=""
              className="h-16 w-16 shrink-0 rounded-full object-cover ring-1 ring-outline-variant"
            />
          ) : (
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-surface-container text-outline">
              <Icon name="local_florist" size={22} />
            </span>
          )}
          <input
            type="file"
            id="collection-cover"
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="sr-only"
            onChange={(event) => void uploadCover(event.target.files?.[0])}
          />
          <label
            htmlFor="collection-cover"
            className="flex min-h-[44px] cursor-pointer items-center gap-2 rounded-xl border border-dashed border-outline-variant px-4 text-label-md uppercase text-on-surface-variant transition-colors duration-200 hover:border-primary hover:text-primary"
          >
            <Icon name={busy === 'upload' ? 'hourglass_top' : 'add'} size={18} />
            {busy === 'upload' ? 'Uploading…' : 'Cover photo'}
          </label>
        </div>

        <button
          type="submit"
          disabled={busy === 'add' || readOnly}
          className="flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary text-label-lg text-on-primary shadow-md transition-colors duration-200 hover:bg-on-primary-fixed-variant disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Icon name="add" size={20} />
          {busy === 'add' ? 'Saving…' : 'Add collection'}
        </button>
      </form>

      <ul className="flex flex-col gap-2">
        {categories.map((category) => (
          <li
            key={category.id}
            className="flex items-center gap-3 rounded-xl bg-surface-container p-3 shadow-sm"
          >
            {category.image ? (
              <img
                src={category.image}
                alt=""
                loading="lazy"
                className="h-12 w-12 shrink-0 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-container-high text-outline">
                <Icon name={category.icon} size={20} />
              </span>
            )}
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-body-md font-medium text-on-surface">
                {category.label}
              </span>
              <span className="text-label-sm text-on-surface-variant">
                {countFor(category.id)} products
              </span>
            </div>
            <button
              type="button"
              onClick={() => void remove(category)}
              disabled={busy === category.id || readOnly}
              aria-label={`Delete ${category.label}`}
              className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full text-outline transition-colors duration-200 hover:bg-error-container hover:text-on-error-container disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Icon name="delete" size={18} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
