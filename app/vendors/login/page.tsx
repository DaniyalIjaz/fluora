



"use client";

import { supabase } from "@/utils/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react"; // 👁️ icons
import "react-toastify/dist/ReactToastify.css";

export default function VendorLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- LOGIN ---
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error("Login failed: " + error.message);
    } else {
      toast.success("Login successful 🎉");
      setTimeout(() => router.push("/vendors/profile"), 1200);
    }
    setLoading(false);
  };

  // --- REDIRECT TO REGISTER ---
  const goToSignup = () => router.push("/vendors/register");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#021526] to-[#03346E] text-white p-4">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="dark" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl font-bold text-center mb-6 text-white"
        >
          Vendor Portal
        </motion.h1>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-3 w-full p-3 rounded-lg text-white bg-white/20 placeholder-gray-200 focus:outline-none focus:ring-1 focus:ring-white"
          />
        </motion.div>

        {/* Password with toggle */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative mb-4"
        >
          <input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg text-white bg-white/20 placeholder-gray-200 focus:outline-none focus:ring-1 focus:ring-white pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-200 hover:text-white"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col gap-3"
        >
          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-white hover:bg-gray-200 text-black transition-colors px-4 py-3 rounded-lg font-semibold shadow-md"
          >
            {loading ? "Please wait..." : "Login"}
          </button>

          <p className="text-center text-gray-300">
            Don’t have an account?{" "}
            <button
              onClick={goToSignup}
              className="text-blue-400 hover:underline font-semibold cursor-pointer"
            >
              Sign Up
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
