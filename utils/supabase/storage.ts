// utils/supabase/storage.ts
import { supabase } from "@/utils/supabase/client";

/**
 * Upload a file to a Supabase storage bucket.
 *
 * @param bucket - The name of the storage bucket
 * @param path - The full path (folder/filename.ext) where the file will be stored
 * @param file - The File object to upload
 *
 * @returns { error, path }
 */
export async function uploadFile(bucket: string, path: string, file: File) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false, // prevent overwriting existing files
    });

  return { error, path: data?.path };
}

/**
 * Get a public URL for a file in a Supabase storage bucket.
 *
 * @param bucket - The name of the storage bucket
 * @param path - The path to the file (folder/filename.ext)
 *
 * @returns { publicUrl, error }
 */
export function getPublicUrl(bucket: string, path: string) {
  const { data, error } = supabase.storage.from(bucket).getPublicUrl(path);

  return { publicUrl: data?.publicUrl, error };
}

/**
 * Delete a file from a Supabase storage bucket.
 *
 * @param bucket - The name of the storage bucket
 * @param path - The path to the file (folder/filename.ext)
 *
 * @returns { error }
 */
export async function deleteFile(bucket: string, path: string) {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  return { error };
}
