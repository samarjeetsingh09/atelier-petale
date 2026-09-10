import { getSupabase } from '@/lib/supabase';

const BUCKET = 'product-images';

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

/**
 * Client-side checks are a courtesy — they give a clear message before a wasted
 * upload. The real limits are the bucket's own file-size cap and the storage
 * policies in schema.sql, which is what actually stops a non-admin.
 */
export function validateImage(file: File): string | null {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return 'Use a JPEG, PNG, WebP or AVIF image.';
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return `That file is ${(file.size / 1024 / 1024).toFixed(1)}MB. Keep it under 5MB.`;
  }
  return null;
}

const safeName = (name: string) =>
  name
    .toLowerCase()
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48) || 'image';

/** Uploads one image and returns its public URL, ready to store on the product. */
export async function uploadProductImage(file: File, productId: string): Promise<string> {
  const problem = validateImage(file);
  if (problem) throw new Error(problem);

  const client = await getSupabase();
  const extension = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
  const path = `${productId || 'unassigned'}/${Date.now()}-${safeName(file.name)}.${extension}`;

  const { error } = await client.storage.from(BUCKET).upload(path, file, {
    cacheControl: '31536000',
    upsert: false,
    contentType: file.type,
  });
  if (error) throw error;

  return client.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

/** Removes an image previously uploaded here. Ignores URLs from anywhere else. */
export async function deleteProductImage(publicUrl: string): Promise<void> {
  const marker = `/${BUCKET}/`;
  const index = publicUrl.indexOf(marker);
  if (index === -1) return;

  const path = publicUrl.slice(index + marker.length);
  const client = await getSupabase();
  const { error } = await client.storage.from(BUCKET).remove([path]);
  if (error) throw error;
}
