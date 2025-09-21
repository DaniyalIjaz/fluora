'use client';

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
      setLoading(false);
    };

    fetchVendor();
  }, [router]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl animate-pulse">
        Loading vendor profile...
      </div>
    );

  if (!vendor)
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Vendor profile not found.
      </div>
    );

  const servicesList = Array.isArray(vendor.services)
    ? vendor.services
    : typeof vendor.services === "string"
    ? JSON.parse(vendor.services)
    : [];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#021526] via-[#03346E] to-[#021526] flex justify-center py-40 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20 text-white flex flex-col gap-8"
      >
        {/* Header */}
        <h1 className="text-4xl font-bold mb-6 flex items-center gap-3">
          <User size={36} /> {vendor.name}
        </h1>

        {/* Contact & Basic Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center gap-2 bg-white/20 rounded-xl p-4">
            <Mail /> <span><strong>Email:</strong> {vendor.email}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 rounded-xl p-4">
            <Phone /> <span><strong>Phone:</strong> {vendor.phone || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 rounded-xl p-4">
            <Briefcase /> <span><strong>Company:</strong> {vendor.company || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 rounded-xl p-4">
            <MapPin /> <span><strong>Location:</strong> {[vendor.city, vendor.state, vendor.country].filter(Boolean).join(", ") || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 rounded-xl p-4">
            <span className="font-semibold text-xl">Rs.</span> <span><strong>Fixed Price / Day:</strong> {vendor.fixed_price_per_day || 0} Rupees</span>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-white/20 rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Bio</h2>
          <p className="whitespace-pre-wrap text-gray-200">{vendor.bio || "No bio provided."}</p>
        </div>

        {/* Services Section */}
        <div className="bg-white/20 rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Services Offered</h2>
          <div className="flex flex-wrap gap-3">
            {servicesList.length
              ? servicesList.map((s: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, i: Key | null | undefined) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-white text-black rounded-full text-center font-medium"
                  >
                    {s}
                  </span>
                ))
              : <span className="text-gray-200">No services listed.</span>}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
