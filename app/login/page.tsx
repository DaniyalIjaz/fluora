"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Flower } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setAuthenticated } from "@/lib/storage-helpers";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setEmailSent(true);

      setTimeout(() => {
        setAuthenticated("couple", true);
        router.push("/couple");
      }, 3000);
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #021526, #03346E, #021526)",
      }}
    >
      {/* subtle overlay */}
      <div className="absolute inset-0 bg-black/10"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md z-10"
      >
        {/* Logo + heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8"
        >
          <div className="flex justify-center mb-4 sm:mb-6">
              {/* Top logo (responsive positioning) */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute top-0 left-0 md:left-5 z-20 w-full flex justify-center md:justify-start p-0 md:p-5"
              >
                <img
                  src="/images/logo.png"
                  alt="Fluora Logo"
                  className="w-32 sm:w-40 h-auto"
                />
              </motion.div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Welcome to Flora
          </h1>
          <p className="text-gray-200 mt-1 sm:mt-2 text-sm sm:text-base">
            Simple AI-powered wedding planning
          </p>
        </motion.div>

        {!emailSent ? (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 sm:space-y-6 bg-white/20 backdrop-blur-sm p-5 sm:p-8 rounded-xl shadow-lg"
          >
            <div className="space-y-2">
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                Sign in with email
              </h2>
              <p className="text-xs sm:text-sm text-gray-200">
                Enter your email address and we'll send you a magic link to sign
                in.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`p-3 sm:p-4 text-base sm:text-lg ${
                    error ? "border-red-500" : ""
                  }`}
                />
                {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
              </div>

              <Button
                type="submit"
                className="w-full bg-[#03346E] hover:bg-[#0552A1] transition-colors duration-150 text-white py-4 sm:py-6 text-base sm:text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Magic Link"}
              </Button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 bg-white/20 backdrop-blur-sm p-8 rounded-xl shadow-lg text-center"
          >
            <div className="text-5xl mb-4 animate-bounce">✉️</div>
            <h2 className="text-xl font-semibold text-white">Check your inbox</h2>
            <p className="text-gray-200">
              We've sent a magic link to <strong>{email}</strong>
            </p>
            <p className="text-sm text-gray-300">
              Click the link in the email to sign in to your account.
            </p>
            <div className="pt-4 flex justify-center gap-2">
              <div className="h-2 w-2 bg-red-500 rounded-full animate-bounce"></div>
              <div
                className="h-2 w-2 bg-red-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="h-2 w-2 bg-red-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
            <p className="text-xs text-gray-300 mt-6">
              For demo purposes, you'll be automatically redirected in a few
              seconds.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
