"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { ArrowRight } from "lucide-react"

export default function LandingPage({ onGetStarted }: { onGetStarted?: () => void }) {
  const [mounted, setMounted] = useState(false)
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setMounted(true)

    // Trigger confetti animation when component mounts
    if (typeof window !== "undefined") {
      // Create a confetti canvas that fills the screen
      const myConfetti = confetti.create(confettiCanvasRef.current!, {
        resize: true,
        useWorker: true,
      })

      // First burst of confetti
      myConfetti({
        particleCount: 100,
        spread: 160,
        origin: { y: 0.6 },
        colors: ["#ef4444", "#f87171", "#fca5a5", "#fecdd3", "#ffe4e6"],
        disableForReducedMotion: true,
      })

      // Second burst with different angle
      setTimeout(() => {
        myConfetti({
          particleCount: 50,
          angle: 60,
          spread: 80,
          origin: { x: 0 },
          colors: ["#ef4444", "#f87171", "#fca5a5", "#fed7aa", "#fef3c7"],
          disableForReducedMotion: true,
        })
      }, 250)

      // Third burst from opposite side
      setTimeout(() => {
        myConfetti({
          particleCount: 50,
          angle: 120,
          spread: 80,
          origin: { x: 1 },
          colors: ["#ef4444", "#f87171", "#fca5a5", "#fed7aa", "#fef3c7"],
          disableForReducedMotion: true,
        })
      }, 400)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#021526] via-[#03346E] to-[#021526] items-center justify-center relative overflow-hidden">
      {/* Canvas for confetti */}
      <canvas ref={confettiCanvasRef} className="fixed inset-0 w-full  h-full pointer-events-none z-50" />

      {/* Hero content */}
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 relative z-10">
        {/* Logo */}
        <motion.div
          className="mb-6 sm:mb-12 flex justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* <Logo size="large" className="transform scale-90 sm:scale-100" /> */}
              <img
      src="/images/logo.png"
      alt="Fluora Logo"
      className="w-32 sm:w-40 h-auto"
    />
        </motion.div>

        {/* Content card with subtle shadow and rounded corners */}
        <motion.div
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-4 sm:p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Title - using same font styling as logo with emojis */}
          <div className="space-y-2 sm:space-y-3 md:space-y-4 mb-4 sm:mb-7 md:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-wide text-gray-900 leading-tight text-center">
              <div className="flex items-center justify-center">
                <span className="inline-flex items-center">
                  <span className="mr-3xl sm:text-3xl">✨</span>
                  <span>Plan Events</span>
                </span>
              </div>
            </h1>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-wide text-gray-900 leading-tight text-center">
              <div className="flex items-center justify-center">
                <span className="inline-flex items-center">
                  <span className="mr-3xl sm:text-3xl">🎉</span>
                  <span>Look Professional</span>
                </span>
              </div>
            </h1>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-wide text-gray-900 leading-tight text-center">
              <div className="flex items-center justify-center">
                <span className="inline-flex items-center">
                  <span className="mr-3xl sm:text-3xl">🌟</span>
                  <span>Stay Organized</span>
                </span>
              </div>
            </h1>
          </div>

          {/* Subheader - using Poppins for readability */}
          <div className="mb-7 sm:mb-9 md:mb-10">
            <p className="font-poppins text-sm sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto text-center leading-relaxed">
              Flora equips event managers with modern tools to organize schedules, vendors, budgets, and guest lists — keeping every detail on track in one professional workspace.
            </p>
          </div>

          {/* Buttons - stacked on mobile, side by side on desktop */}
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={onGetStarted}
                size="lg"
                className="w-full sm:w-auto px-4 sm:px-8 cursor-pointer text-white bg-[#03346E] hover:bg-[#0552A1] h-12 sm:h-14 text-sm sm:text-lg font-medium rounded-full shadow-md hover:shadow-md transition-colors duration-150"
              >
                Get Started
                <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </motion.div>

            <Link href="/login" className="w-full sm:w-auto">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-6 sm:px-8 cursor-pointer border-[#0552A1]/30 text-[#0552A1] hover:bg-[#0552A1]/10 h-12 sm:h-14 text-sm sm:text-lg font-medium rounded-full transition-colors duration-150"
                >
                  Log In
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Simple footer */}
      <footer className="w-full py-4 absolute bottom-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-xs sm:text-sm text-gray-400">
            <span>&copy; {new Date().getFullYear()} Fluora. All rights reserved.</span>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline">•</span>
              <Link href="/terms-of-service" className="hover:text-white transition-colors duration-150">
                Terms & Conditions
              </Link>
              <span>•</span>
              <Link href="/privacy-policy" className="hover:text-white transition-colors duration-150">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
