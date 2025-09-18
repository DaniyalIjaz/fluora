"use client"

import { Flower } from "lucide-react"
import { motion } from "framer-motion"

interface WelcomeProps {
  onNext: () => void
}

export default function OnboardingWelcome({ onNext }: WelcomeProps) {
  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #021526, #03346E, #021526)" }}
    >
      {/* subtle overlay */}
      <div className="absolute inset-0 bg-black/10"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/20 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden p-6 sm:p-8 relative z-10 max-w-md w-full text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-white/30 p-4 rounded-full">
            <Flower className="h-12 w-12 text-[#03346E]" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">Welcome to Flora!</h1>
        <p className="text-gray-200 mb-8">
          Let me get to know you so we can plan your perfect day.
        </p>

        <motion.button
          onClick={onNext}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 text-white rounded-md font-medium cursor-pointer transition-all duration-200 bg-gradient-to-r from-[#03346E] via-[#0552A1] to-[#021526] hover:scale-105 shadow-lg"
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  )
}
