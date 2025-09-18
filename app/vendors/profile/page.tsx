"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

type Vendor = {
  name: string;
  email: string;
  phone?: string;
  bio: string;
  image?: string;
  company?: string;
  services: string[];
  otherService?: string;
  city?: string;
  state?: string;
  country?: string;
  availableStartTime?: string;
  availableEndTime?: string;
  createdAt?: string;
};

export default function VendorProfile() {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("vendorFinal");
    if (stored) {
      setVendor(JSON.parse(stored));
    } else {
      router.push("/vendor/register"); // redirect if no data
    }
  }, [router]);

  if (!vendor) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#021526]">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#021526] via-[#03346E] to-[#021526] text-white p-6">
      {/* Header with back */}
      <div className="flex items-center gap-3 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/")}
          className="text-white/80 hover:text-white flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </motion.button>
        <h1 className="text-2xl font-bold">Vendor Profile</h1>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg max-w-3xl mx-auto"
      >
        <div className="flex flex-col items-center">
          {vendor.image ? (
            <img
              src={vendor.image}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white/20 shadow-md"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-500 flex items-center justify-center text-xl">
              {vendor.name.charAt(0)}
            </div>
          )}
          <h2 className="mt-4 text-2xl font-semibold">{vendor.name}</h2>
          <p className="text-white/70">{vendor.company}</p>
          <p className="mt-2 text-center text-white/80 max-w-md">{vendor.bio}</p>
        </div>

        {/* Contact Info */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h3 className="font-semibold">Email</h3>
            <p className="text-white/80">{vendor.email}</p>
          </div>
          {vendor.phone && (
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <h3 className="font-semibold">Phone</h3>
              <p className="text-white/80">{vendor.phone}</p>
            </div>
          )}
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h3 className="font-semibold">Location</h3>
            <p className="text-white/80">
              {[vendor.city, vendor.state, vendor.country].filter(Boolean).join(", ")}
            </p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h3 className="font-semibold">Availability</h3>
            <p className="text-white/80">
              {vendor.availableStartTime} - {vendor.availableEndTime}
            </p>
          </div>
        </div>

        {/* Services */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Services</h3>
          <div className="flex flex-wrap gap-2">
            {vendor.services.map((s, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gradient-to-r from-[#021526] via-[#0552A1] to-[#03346E] rounded-full text-sm"
              >
                {s === "Other" ? vendor.otherService : s}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-sm text-white/60">
          Joined: {vendor.createdAt ? new Date(vendor.createdAt).toLocaleDateString() : "N/A"}
        </div>
      </motion.div>
    </div>
  );
}
