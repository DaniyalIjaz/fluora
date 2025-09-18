


// import { supabase } from "@/utils/supabase/client";

// /**
//  * Upload a file to a bucket path.
//  * Returns { error, data } - data contains file metadata.
//  */
// export async function uploadFile(bucket: string, path: string, file: File) {
//   const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
//     cacheControl: "3600",
//     upsert: false, // change to true if you want to overwrite existing files
//   });
//   return { data, error };
// }

// /**
//  * Get public URL for a file in a public bucket.
//  * Returns { publicUrl, error }
//  */
// export function getPublicUrl(bucket: string, path: string) {
//   const { data, error } = supabase.storage.from(bucket).getPublicUrl(path);
//   return { publicUrl: data?.publicUrl ?? null, error };
// }



// Save login state in localStorage
export function setAuthenticated(p0: string, isAuth: boolean) {
  if (typeof window !== "undefined") {
    localStorage.setItem("isAuthenticated", isAuth ? "true" : "false");
  }
}

// Check login state
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("isAuthenticated") === "true";
}

// Clear login state
export function clearAuth() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("isAuthenticated");
  }
}
