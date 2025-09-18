// "use client";

// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { supabase } from "@/utils/supabase/client";

// type Vendor = {
//   id: string;
//   name: string;
//   serviceType: string;
//   priceRange: string;
//   rating: number;
//   description: string;
//   image: string;
// };

// export default function VendorsPage() {
//   const [vendors, setVendors] = useState<Vendor[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch vendors from Supabase
//   useEffect(() => {
//     const fetchVendors = async () => {
//       const { data, error } = await supabase.from("vendors").select("*");
//       if (error) console.log("Error fetching vendors:", error.message);
//       else setVendors(data || []);
//       setLoading(false);
//     };
//     fetchVendors();
//   }, []);

//   // Handle booking request
//   const handleRequestBooking = async (vendorId: string) => {
//     const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
//     if (sessionError) return alert("Failed to get session: " + sessionError.message);

//     if (!sessionData.session) {
//       return alert("Please login first to request a booking.");
//     }

//     const hostId = sessionData.session.user.id;

//     const { error } = await supabase.from("bookings").insert([{
//       vendor_id: vendorId,
//       host_id: hostId,
//       status: "pending",
//       created_at: new Date().toISOString(),
//     }]);

//     if (error) alert("Failed to request booking: " + error.message);
//     else alert("Booking request sent!");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#021526] via-[#03346E] to-[#021526] text-white">
//       <div className="container mx-auto px-6 py-12">
//         <h1 className="text-3xl font-bold mb-6">Find Vendors</h1>

//         {loading ? (
//           <p>Loading vendors...</p>
//         ) : vendors.length === 0 ? (
//           <p>No vendors found.</p>
//         ) : (
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {vendors.map((vendor) => (
//               <motion.div
//                 key={vendor.id}
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 whileHover={{ scale: 1.05 }}
//                 className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-md border border-white/20"
//               >
//                 <img src={vendor.image} alt={vendor.name} className="w-full h-40 object-cover" />
//                 <div className="p-5">
//                   <h2 className="text-xl font-semibold">{vendor.name}</h2>
//                   <p className="text-sm text-gray-200 mb-2">{vendor.serviceType}</p>
//                   <p className="text-sm mb-2">{vendor.description}</p>
//                   <p className="text-sm">💵 {vendor.priceRange}</p>
//                   <p className="text-sm">⭐ {vendor.rating?.toFixed(1)}</p>
//                   <button
//                     className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition"
//                     onClick={() => handleRequestBooking(vendor.id)}
//                   >
//                     Request Booking
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

export default function VendorRegister() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    bio: "",
    phone: "",
    company: "",
    services: [] as string[],
    otherService: "",
    city: "",
    state: "",
    country: "",
    availableStartTime: "",
    availableEndTime: "",
  });

  useEffect(() => {
    const checkLogin = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) router.push("/vendors/login");
    };
    checkLogin();
  }, [router]);

  const handleSubmit = async () => {
    const { error } = await supabase.from("vendors").insert([form]);
    if (error) return alert(error.message);
    router.push("/vendor/profile");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#021526] to-[#03346E] text-white p-4">
      <h1 className="text-2xl mb-4">Vendor Registration</h1>
      <input placeholder="Name" className="mb-2 p-2 rounded text-black" onChange={e => setForm({ ...form, name: e.target.value })}/>
      <input placeholder="Email" className="mb-2 p-2 rounded text-black" onChange={e => setForm({ ...form, email: e.target.value })}/>
      <textarea placeholder="Bio" className="mb-2 p-2 rounded text-black" onChange={e => setForm({ ...form, bio: e.target.value })}/>
      <button onClick={handleSubmit} className="bg-blue-600 px-4 py-2 rounded">Register</button>
    </div>
  );
}
