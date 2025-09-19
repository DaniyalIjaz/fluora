'use client';

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { motion, MotionValue } from "framer-motion";
import { User, Phone, Briefcase, MapPin, DollarSign, Mail } from "lucide-react";

type VendorProfile = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  company?: string;
  services?: string[] | string;
  city?: string;
  state?: string;
  country?: string;
  fixed_price_per_day?: number;
};

export default function VendorProfile() {
  const router = useRouter();
  const [vendor, setVendor] = useState<VendorProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData.user) {
          router.push("/vendors/login");
          return;
        }
        const userId = userData.user.id;

        const { data, error } = await supabase
          .from("vendors")
          .select("*")
          .eq("id", userId)
          .single();

        if (!error) setVendor(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, [router]);

  if (loading)
    return (
      <div className="text-white text-center mt-20 text-xl animate-pulse">
        Loading vendor profile...
      </div>
    );

  if (!vendor)
    return (
      <div className="text-white text-center mt-20 text-xl">
        Vendor profile not found.
      </div>
    );

  const servicesList = Array.isArray(vendor.services)
    ? vendor.services
    : typeof vendor.services === "string"
    ? JSON.parse(vendor.services)
    : [];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#021526] via-[#03346E] to-[#021526] flex justify-center items-start py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20 text-white flex flex-col gap-8"
      >
        {/* Header */}
        <motion.h1
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-5xl font-bold mb-6 flex items-center gap-3"
        >
          <User size={40} /> {vendor.name}
        </motion.h1>

        {/* Contact & Basic Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 bg-white/20 rounded-xl p-4 transition-all">
            <Mail /> <span><strong>Email:</strong> {vendor.email}</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 bg-white/20 rounded-xl p-4 transition-all">
            <Phone /> <span><strong>Phone:</strong> {vendor.phone || "N/A"}</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 bg-white/20 rounded-xl p-4 transition-all">
            <Briefcase /> <span><strong>Company:</strong> {vendor.company || "N/A"}</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 bg-white/20 rounded-xl p-4 transition-all">
            <MapPin /> <span><strong>Location:</strong> {[vendor.city, vendor.state, vendor.country].filter(Boolean).join(", ") || "N/A"}</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 bg-white/20 rounded-xl p-4 transition-all">
            <DollarSign /> <span><strong>Fixed Price / Day:</strong> ${vendor.fixed_price_per_day || 0}</span>
          </motion.div>
        </div>

        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/20 rounded-xl p-6"
        >
          <h2 className="text-2xl font-semibold mb-4">Bio</h2>
          <p className="whitespace-pre-wrap text-gray-200">{vendor.bio || "No bio provided."}</p>
        </motion.div>

        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white/20 rounded-xl p-6"
        >
          <h2 className="text-2xl font-semibold mb-4">Services Offered</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {servicesList.length
              ? servicesList.map((s: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | MotionValue<number> | MotionValue<string> | null | undefined, i: Key | null | undefined) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    className="px-4 py-2 bg-gradient-to-r from-[#021526] via-[#0552A1] to-[#03346E] rounded-full text-white text-center font-medium cursor-pointer transition-all duration-200"
                  >
                    {s}
                  </motion.span>
                ))
              : <span className="text-gray-200">No services listed.</span>}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
