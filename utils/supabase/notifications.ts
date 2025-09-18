// import { supabase } from "./client"; // your browser-safe Supabase client

// // Send notification
// export const sendVendorNotification = async (vendorId: string, eventId: string) => {
//   const { data, error } = await supabase
//     .from("vendor_notifications")
//     .insert([{ 
//       vendor_id: vendorId, 
//       host_event_id: eventId, 
//       message: `You have been selected for event ${eventId}` 
//     }]);

//   if (error) {
//     console.error(error.message);
//     return { success: false, error };
//   }

//   return { success: true, data };
// };

// // Fetch notifications for vendor
// export const fetchVendorNotifications = async (vendorId: string) => {
//   const { data, error } = await supabase
//     .from("vendor_notifications")
//     .select("*")
//     .eq("vendor_id", vendorId)
//     .order("created_at", { ascending: false });

//   if (error) {
//     console.error(error.message);
//     return [];
//   }

//   return data;
// };




import { supabase } from "@/utils/supabase/client";

// send notification to vendor
export const sendVendorNotification = async (vendorId: string, eventId: string) => {
  const { error } = await supabase.from("vendor_notifications").insert([
    {
      vendor_id: vendorId,
      host_event_id: eventId,
      message: `You have been selected for event ${eventId}`,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error("Notification error:", error.message);
    return { success: false };
  }

  return { success: true };
};

// fetch notifications for vendor
export const fetchVendorNotifications = async (vendorId: string) => {
  const { data, error } = await supabase
    .from("vendor_notifications")
    .select("*")
    .eq("vendor_id", vendorId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error.message);
    return [];
  }

  return data;
};
