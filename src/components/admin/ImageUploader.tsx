import { useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { uploadProductImage, validateImage } from '@/services/storage';
import type { ProductImage } from '@/types';

/**
 * Product photos. Uploads go to the `product-images` bucket, which only admins
 * can write to — the storage policies in schema.sql enforce that regardless of
 * what this component does.
 *
 * Alt text is a required field, not an afterthought: these photos carry the
 * whole product, and a shopper on a screen reader gets nothing without it.
 */
export function ImageUploader({
  productId,
  images,
  onChange,
}: {
  productId: string;
  images: ProductImage[];
  onChange: (next: ProductImage[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError(null);
    setBusy(true);
    try {
      const uploaded: ProductImage[] = [];
      for (const file of Array.from(files)) {
        const problem = validateImage(file);
        if (problem) throw new Error(problem);
        const src = await uploadProductImage(file, productId);
        uploaded.push({ src, alt: '' });
      }
      onChange([...images, ...uploaded]);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Upload failed.');
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const update = (index: number, patch: Partial<ProductImage>) => {
    onChange(images.map((image, i) => (i === index ? { ...image, ...patch } : image)));
  };

  const remove = (index: number) => {
    // The file stays in the bucket on purpose — another product may reference
    // the same URL, and an orphaned image is cheaper than a broken one.
    onChange(images.filter((_, i) => i !== index));
  };

  const move = (index: number, delta: number) => {
    const target = index + delta;
    if (target < 0 || target >= images.length) return;
    const next = [...images];
    const [moved] = next.splice(index, 1);
    next.splice(target, 0, moved!);
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-label-md text-on-surface">Photos</span>
        <span className="text-label-sm text-on-surface-variant">First photo leads the card</span>
      </div>

      {images.length > 0 && (
        <ul className="flex flex-col gap-2">
          {images.map((image, index) => (
            <li
              key={`${image.src}-${index}`}
              className="flex gap-3 rounded-xl bg-surface-container p-2.5"
            >
              <img
                src={image.src}
                alt=""
                className="h-20 w-20 shrink-0 rounded-lg object-cover"
                loading="lazy"
              />
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <input
                  type="text"
                  value={image.alt}
                  placeholder="Describe the photo — required"
                  aria-label={`Alt text for photo ${index + 1}`}
                  onChange={(event) => update(index, { alt: event.target.value })}
                  className={[
                    'min-h-[44px] w-full rounded-lg bg-surface px-3 py-2 text-body-sm outline-none',
                    'transition-colors duration-200 focus:ring-2 focus:ring-primary',
                    image.alt.trim() ? 'ring-1 ring-outline-variant' : 'ring-1 ring-error',
                  ].join(' ')}
                />
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    aria-label={`Move photo ${index + 1} earlier`}
                    className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full text-on-surface-variant transition-colors duration-200 hover:bg-surface-container-high hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Icon name="arrow_back_ios_new" size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(index, 1)}
                    disabled={index === images.length - 1}
                    aria-label={`Move photo ${index + 1} later`}
                    className="flex min-h-[44px] min-w-[44px] rotate-180 cursor-pointer items-center justify-center rounded-full text-on-surface-variant transition-colors duration-200 hover:bg-surface-container-high hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Icon name="arrow_back_ios_new" size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    aria-label={`Remove photo ${index + 1}`}
                    className="ml-auto flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full text-outline transition-colors duration-200 hover:bg-error-container hover:text-on-error-container"
                  >
                    <Icon name="delete" size={18} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        multiple
        onChange={(event) => void handleFiles(event.target.files)}
        className="sr-only"
        id="product-photo-input"
      />
      <label
        htmlFor="product-photo-input"
        className="flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-outline-variant bg-surface-container-low text-label-md uppercase text-on-surface-variant transition-colors duration-200 hover:border-primary hover:text-primary"
      >
        <Icon name={busy ? 'hourglass_top' : 'add'} size={18} />
        {busy ? 'Uploading…' : 'Add photos'}
      </label>

      {error && (
        <p
          role="alert"
          className="rounded-lg bg-error-container p-3 text-body-sm text-on-error-container"
        >
          {error}
        </p>
      )}
    </div>
  );
}
