"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-[#021526] via-[#03346E] to-[#021526] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.3),transparent_70%)]"></div>

      <div className="relative z-10 text-center max-w-3xl px-6">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold leading-tight mb-6"
        >
          Where <span className="text-blue-400">Hosts</span> meet{" "}
          <span className="text-rose-400">Vendors</span> to create unforgettable events ✨
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg md:text-xl text-gray-200 mb-10"
        >
          Plan. Connect. Celebrate.  
          Whether you’re organizing your dream wedding or offering top-class services, everything starts here.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/events"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-lg font-medium shadow-lg"
          >
            I’m a Host 🎉
          </Link>
          <Link
            href="/vendors"
            className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 transition text-lg font-medium shadow-lg"
          >
            I’m a Vendor 🛠️
          </Link>
        </motion.div>
      </div>

      {/* Floating circles for depth */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-10 left-10 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl"
      ></motion.div>
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute bottom-10 right-10 w-32 h-32 bg-rose-500/20 rounded-full blur-2xl"
      ></motion.div>
    </section>
  )
}
