

"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "@/utils/supabase/client";

type VendorDraft = {
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  bio: string;
  company?: string;
  services: string[];
  city?: string;
  state?: string;
  country?: string;
  fixedPricePerDay?: number;
  createdAt?: string;
};

const VENDOR_SERVICES = [
  "Photography & Videography","Music / DJ","Catering","Cake & Desserts","Decoration & Lighting",
  "Makeup & Styling","Transportation","Venue / Hall","Furniture & Stage Setup","Invitation Cards",
  "Sound System","Drinks & Bar","Drone Coverage","LED Screens / Projectors","Performers / Entertainment",
  "Security & Bouncers","Power Backup / Generators","Event Planner / Coordinator","Event Staff / Waiters",
  "Medical / First Aid Support","Kids Entertainment","Fireworks / Light Show"
];

export default function VendorRegistration() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [draft, setDraft] = useState<VendorDraft>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    bio: "",
    company: "",
    services: [],
    city: "",
    state: "",
    country: "",
    fixedPricePerDay: 0,
    createdAt: new Date().toISOString(),
  });

  useEffect(() => {
    localStorage.setItem("vendorDraft", JSON.stringify(draft));
  }, [draft]);

  const update = (patch: Partial<VendorDraft>) => setDraft((d) => ({ ...d, ...patch }));
  const isEmailValid = (email?: string) => email && email.includes("@");

  console.log('other service draft', draft)
  const stepValid = (s: number) => {
    if (s === 0) {
      return (
        draft.name.trim().length > 1 &&
        isEmailValid(draft.email) &&
        (draft.password?.length ?? 0) >= 6 &&
        draft.password === draft.confirmPassword &&
        draft.bio.trim().length > 5
      );
    }
    if (s === 1) {
      return (draft.company ?? "").trim().length > 1 && draft.services.length > 0;
    }
    if (s === 2) {
      return !!draft.city && !!draft.state && !!draft.country;
    }
    if (s === 3) {
      return (draft.fixedPricePerDay ?? 0) > 0;
    }
    return true;
  };

  const goNext = () => {
    if (!stepValid(step)) {
      toast.error("Please complete all required fields.");
      return;
    }
    setStep((s) => Math.min(s + 1, 3));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    if (!stepValid(3)) {
      toast.error("Complete all required fields before submitting.");
      return;
    }

    // 1️⃣ Sign up user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: draft.email,
      password: draft.password!,
      options: {
        data: {
          name: draft.name,
          phone: draft.phone,
          bio: draft.bio,
          company: draft.company,
          services: draft.services,
          city: draft.city,
          state: draft.state,
          country: draft.country,
          fixed_price_per_day: draft.fixedPricePerDay,
        },
      },
    });

    if (authError) {
      toast.error(authError.message);
      return;
    }

    const userId = authData.user?.id;
    if (!userId) {
      toast.error("Signup failed. Try again.");
      return;
    }

    toast.success("Registration complete! Redirecting...");
    setTimeout(() => router.push("/vendors/login"), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#021526] via-[#03346E] to-[#021526] flex items-center justify-center p-6">
      <ToastContainer position="top-right" />
      <div className="w-full max-w-3xl">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="text-sm text-white/80 mb-2">Step {step + 1} of 4</div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.round(((step + 1) / 4) * 100)}%` }}
              transition={{ duration: 0.45 }}
              className="h-2 bg-gradient-to-r from-[#021526] via-[#0552A1] to-[#03346E]"
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
        >
          <div className="mb-4 flex items-center gap-4">
            {step > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goBack}
                className="text-white/80 hover:text-white flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 cursor-pointer" /> Back
              </motion.button>
            )}
            <h2 className="text-xl font-semibold text-white">
              {["Basic Info", "Company & Services", "Location", "Pricing"][step]}
            </h2>
          </div>

          <div className="space-y-4">
            {/* Step 0: Basic Info */}
            {step === 0 && (
              <>
                <label className="text-sm text-white/80">Full Name</label>
                <input
                  value={draft.name}
                  onChange={(e) => update({ name: e.target.value })}
                  className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
                />

                <label className="text-sm text-white/80">Email</label>
                <input
                  type="email"
                  value={draft.email}
                  onChange={(e) => update({ email: e.target.value })}
                  className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
                />

                <label className="text-sm text-white/80">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={draft.password}
                    onChange={(e) => update({ password: e.target.value })}
                    className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>

                <label className="text-sm text-white/80">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={draft.confirmPassword}
                    onChange={(e) => update({ confirmPassword: e.target.value })}
                    className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400"
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>

                <label className="text-sm text-white/80">Phone</label>
                <input
                  value={draft.phone}
                  onChange={(e) => update({ phone: e.target.value })}
                  className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
                />

                <label className="text-sm text-white/80">Bio</label>
                <textarea
                  value={draft.bio}
                  onChange={(e) => update({ bio: e.target.value })}
                  rows={4}
                  className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
                />
              </>
            )}

            {/* Step 1: Company & Services */}
            {step === 1 && (
              <>
                <label className="text-sm text-white/80">Company / Brand</label>
                <input
                  value={draft.company}
                  onChange={(e) => update({ company: e.target.value })}
                  className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
                />

                <label className="text-sm text-white/80">Services</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {VENDOR_SERVICES.map((s) => (
                    <motion.button
                      key={s}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        update({
                          services: draft.services.includes(s)
                            ? draft.services.filter((x) => x !== s)
                            : [...draft.services, s],
                        })
                      }
                      className={`cursor-pointer text-sm px-3 py-2 rounded-md border transition-all ${
                        draft.services.includes(s)
                          ? "bg-gradient-to-r from-[#021526] via-[#0552A1] to-[#03346E] text-white"
                          : "bg-white/5 text-white border-white/10 hover:bg-white/20"
                      }`}
                    >
                      {s}
                    </motion.button>
                  ))}
                </div>

               <div className="flex gap-2 mt-2">
  <input
    type="text"
    placeholder="Add custom service"
    id="customServiceInput"
    className="flex-1 p-3 rounded-md bg-white/5 border border-white/10 text-white"
  />
  <button
    type="button"
    onClick={() => {
      const input = document.getElementById(
        "customServiceInput"
      ) as HTMLInputElement;
      const newService = input.value.trim();
      if (newService && !draft.services.includes(newService)) {
        update({ services: [...draft.services, newService] });
      }
    }}
    className="px-4 py-2 bg-[#0552A1] text-white rounded-md hover:opacity-90"
  >
    +
  </button>
</div>
              </>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
              <>
                <label className="text-sm text-white/80">City</label>
                <input
                  value={draft.city}
                  onChange={(e) => update({ city: e.target.value })}
                  className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
                />

                <label className="text-sm text-white/80">State</label>
                <input
                  value={draft.state}
                  onChange={(e) => update({ state: e.target.value })}
                  className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
                />

                <label className="text-sm text-white/80">Country</label>
                <input
                  value={draft.country}
                  onChange={(e) => update({ country: e.target.value })}
                  className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
                />
              </>
            )}

            {/* Step 3: Pricing */}
            {step === 3 && (
              <>
                <label className="text-sm text-white/80 mb-2">Fixed Price Per Day (Rs)</label>
                <motion.div className="w-full ">
                  <input
                    type="range"
                    min={10000}
                    max={1000000}
                    step={50}
                    value={draft.fixedPricePerDay}
                    onChange={(e) => update({ fixedPricePerDay: Number(e.target.value) })}
                    className="w-full cursor-pointer accent-[#000000] h-2 rounded-lg"
                  />
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                    className="text-white mt-2 font-bold text-xl text-center"
                  >
                    {draft.fixedPricePerDay} Rupees
                  </motion.div>
                </motion.div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-white/70">
              Step {step + 1} of 4 • {stepValid(step) ? "Ready" : "Incomplete"}
            </div>
            <div className="flex items-center gap-3">
              {step < 3 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={goNext}
                  className="px-5 py-2 rounded-md bg-white text-black font-medium cursor-pointer"
                >
                  Next
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  className="px-5 py-2 rounded-md bg-white text-black font-medium  cursor-pointer"
                >
                  Submit
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
