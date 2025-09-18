"use client"

import { motion } from "framer-motion"

type Vendor = {
  id: string
  name: string
  serviceType: string
  priceRange: string
  rating: number
  description: string
  image: string
}

const mockVendors: Vendor[] = [
  {
    id: "1",
    name: "Elegant Catering Co.",
    serviceType: "Catering",
    priceRange: "$500 - $2000",
    rating: 4.8,
    description: "Delicious menus tailored for weddings, parties, and corporate events.",
    image: "https://source.unsplash.com/400x300/?food,catering",
  },
  {
    id: "2",
    name: "DJ Sonic",
    serviceType: "Music / DJ",
    priceRange: "$300 - $1000",
    rating: 4.6,
    description: "Bring energy to your event with curated playlists and live mixes.",
    image: "https://source.unsplash.com/400x300/?dj,music",
  },
  {
    id: "3",
    name: "Golden Lens Photography",
    serviceType: "Photography",
    priceRange: "$800 - $2500",
    rating: 4.9,
    description: "Capture timeless memories with professional photography services.",
    image: "https://source.unsplash.com/400x300/?wedding,photography",
  },
]

export default function VendorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#021526] via-[#03346E] to-[#021526] text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-6">Find Vendors</h1>

        {/* Vendor Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockVendors.map((vendor) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-md border border-white/20"
            >
              <img src={vendor.image} alt={vendor.name} className="w-full h-40 object-cover" />
              <div className="p-5">
                <h2 className="text-xl font-semibold">{vendor.name}</h2>
                <p className="text-sm text-gray-200 mb-2">{vendor.serviceType}</p>
                <p className="text-sm mb-2">{vendor.description}</p>
                <p className="text-sm">💵 {vendor.priceRange}</p>
                <p className="text-sm">⭐ {vendor.rating.toFixed(1)}</p>
                <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition">
                  Request Booking
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
