"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";


// Import the original landing page content
import LandingPageContent from "../ui/landing-page";
// import { useMagicLink } from "@/hooks/auth/useMagicLink";
// If the hook does not exist, create a placeholder implementation below:
// Placeholder implementation for useMagicLink hook
function useMagicLink() {
  return {
    mutate: async (_params: any) => {
      // Simulate sending magic link
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
  };
}
// Or update the path to the correct relative location if needed.
// If you have a types/users.ts file, ensure it exists and exports UserType like this:
// export type UserType = "planner" | "couple" | "vendor";
// Otherwise, you can define UserType directly here:

type UserType = "planner" | "couple" | "vendor";

export default function LandingPageWithOnboarding() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserType>("planner");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate: sendMagicLink } = useMagicLink();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleStartOnboarding = () => {
    setShowOnboarding(true);
    setStep(1);
  };

  const handleContinue = async () => {
    if (step === 1 && userType) {
      setStep(2);
    } else if (step === 2) {
      if (!email) {
        setEmailError("Email is required");
        return;
      }

      if (!validateEmail(email)) {
        setEmailError("Please enter a valid email address");
        return;
      }

      setIsSubmitting(true);

      try {
        // Simulate API call to send magic link
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        sendMagicLink({
          user: {
            email,
            role: userType,
          },
          emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
        });
        setIsSubmitting(false);
        setStep(3);
      } catch (error) {
        setIsSubmitting(false);
        setEmailError("Failed to send magic link. Please try again.");
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      setShowOnboarding(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 2) {
      handleContinue();
    }
  };

  const handleResendLink = async () => {
    setIsSubmitting(true);
    sendMagicLink({
      user: {
        email,
        role: userType,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    });
    setIsSubmitting(false);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
  };

  // Render different background patterns based on the current step
  const renderBackgroundPattern = () => {
    return <div className="absolute inset-0 bg-rose-100/20"></div>;
  };

  if (!showOnboarding) {
    return <LandingPageContent onGetStarted={handleStartOnboarding} />;
  }

  console.log('userType', userType)
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#021526] via-[#03346E] to-[#021526]">
      {/* Consistent background gradient */}
      <div className="absolute inset-0 z-0 opacity-90" />

      {/* Simple background */}
      {renderBackgroundPattern()}

      {/* Floating decorative elements with consistent colors */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/15 rounded-full filter blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-500/20 rounded-full filter blur-3xl" />

      {/* Progress indicator */}
      <div className="fixed top-0 left-0 w-full h-2 bg-gray-200 z-50">
        <div
          className="h-full bg-[#0552A1] transition-all duration-500 ease-in-out"
          style={{
            width: step === 1 ? "33.33%" : step === 2 ? "66.66%" : "100%",
          }}
        />
      </div>

      {/* Back button */}
      <button
        onClick={handleBack}
        className="fixed top-6 left-6 z-50 flex items-center text-gray-600 cursor-pointer hover:text-[#0552A1] transition-colors bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full shadow-sm"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </button>

      {/* Logo - Updated to use large size to match homepage */}
      <div className="mb-12 flex justify-center">
        {/* <Logo linkWrapper={false} size="large" /> */}
                  <img
      src="/images/logo.png"
      alt="Fluora Logo"
      className="w-32 sm:w-40 h-auto"
    />
      </div>

      {/* Form card */}
      <motion.div
        className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-10 mx-4 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
                Who are you?
              </h1>

              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <UserTypeOption
                  id="planner"
                  label="Event Planner"
                  description="I help people plan their perfect day"
                  emoji="🌟"
                  selected={userType === "planner"}
                  onClick={() => setUserType("planner")}
                />

                <UserTypeOption
                  id="couple"
                  label="Host / Client"
                  description="I’m planning an event"
                  emoji="🎉"
                  selected={userType === "couple"}
                  onClick={() => setUserType("couple")}
                />

                <UserTypeOption
                  id="vendor"
                  label="Event Vendor"
                  description="I provide services for Events"
                  emoji="🏢"
                  selected={userType === "vendor"}
                  onClick={() => setUserType("vendor")}
                />
              </div>

              <Button
                onClick={handleContinue}
                disabled={!userType}
                className="w-full bg-[#03346E] cursor-pointer text-white hover:bg-[#0552A1] h-10 md:h-12 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
             <h1 className="text-3xl font-bold text-center mb-6">
  {userType === "planner" && "Welcome, Event Planner! ✨"}
  {userType === "couple" && "Excited to Plan Your Event? 🎉"}
  {userType === "vendor" && "Grow Your Event Business! 🚀"}
</h1>


              <p className="text-lg text-gray-600 mb-8 text-center">
                Enter your email to get started. We'll send you a magic link to
                sign in securely.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-400 text-lg">✉️</span>
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Your email address"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                        emailError
                          ? "border-[#0552A1] focus:ring-[#0552A1]"
                          : "border-gray-300 focus:ring-[#0552A1]"
                      } focus:border-transparent focus:outline-none focus:ring-2 transition-colors`}
                      autoComplete="email"
                    />
                  </div>
                  {emailError && (
                    <p className="text-[#0552A1] text-sm ml-1">{emailError}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="w-full bg-[#03346E] hover:bg-[#0552A1] h-12 rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending Magic Link...
                    </span>
                  ) : (
                    <>
                      Send Magic Link
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="h-20 w-20 bg-[#0552A1]/10 rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="h-10 w-10 text-[#0552A1]" />
                </motion.div>
              </div>

              <h1 className="text-3xl font-bold mb-4">Check Your Email</h1>

              <p className="text-lg text-gray-600 mb-4">
                We've sent a magic link to{" "}
                <span className="font-semibold">{email}</span>
              </p>

              <p className="text-gray-600 mb-8">
                Click the link in the email to sign in to your account. The link
                will expire in 10 minutes.
              </p>

              <div className="space-y-4">
                <Button
                  onClick={handleResendLink}
                  variant="outline"
                  disabled={isSubmitting}
                  className="w-full border-[#0552A1]/30 text-[#03346E] hover:bg-[#0552A1]/10 h-12 rounded-full transition-all duration-300"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#0552A1]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Resending...
                    </span>
                  ) : (
                    "Resend Magic Link"
                  )}
                </Button>

                <p className="text-sm text-gray-500">
                  Didn't receive an email? Check your spam folder or try again
                  with a different email address.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

interface UserTypeOptionProps {
  id: string;
  label: string;
  description: string;
  emoji: string;
  selected: boolean;
  onClick: () => void;
}

function UserTypeOption({
  id,
  label,
  description,
  emoji,
  selected,
  onClick,
}: UserTypeOptionProps) {
  return (
    <div
      onClick={onClick}
      className={`
        relative flex items-center p-3 md:p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
        ${
          selected
            ? "border-[#0552A1] bg-[#0552A1]/10"
            : "border-gray-200 hover:border-gray-300"
        }
      `}
    >
      <input
        type="radio"
        id={id}
        name="userType"
        className="sr-only"
        checked={selected}
        onChange={() => {}}
      />

      <div
        className={`
        flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full mr-3 md:mr-4 transition-colors text-xl md:text-2xl
        ${selected ? "bg-[#0552A1] text-white" : "bg-gray-100 text-gray-500"}
      `}
      >
        {emoji}
      </div>

      <div className="flex-1">
        <label
          htmlFor={id}
          className="block text-base md:text-lg font-medium cursor-pointer"
        >
          {label}
        </label>
        <p className="text-gray-500 text-xs md:text-sm">{description}</p>
      </div>

      <div
        className={`
        h-4 w-4 md:h-5 md:w-5 rounded-full border-2 ml-2 flex items-center justify-center transition-colors
        ${selected ? "border-[#0552A1]" : "border-gray-300"}
      `}
      >
        {selected && (
          <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-[#0552A1]" />
        )}
      </div>
    </div>
  );
}
