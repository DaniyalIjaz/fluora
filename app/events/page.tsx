"use client"

import { useState } from "react"
import { motion } from "framer-motion"

type Event = {
  id: string
  title: string
  description: string
  date: string
  location: string
  status: "draft" | "published" | "completed"
  host: string
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Alex & Jordan’s Wedding",
    description: "Elegant wedding ceremony at Lakeside Garden.",
    date: "2025-10-12",
    location: "Lakeside Garden",
    status: "published",
    host: "Alex & Jordan",
  },
  {
    id: "2",
    title: "Corporate Gala Dinner",
    description: "Annual corporate dinner with live band and catering.",
    date: "2025-11-05",
    location: "Downtown Hotel",
    status: "published",
    host: "FutureTech Ltd",
  },
  {
    id: "3",
    title: "Birthday Bash for Riley",
    description: "Colorful outdoor birthday party for kids.",
    date: "2025-09-25",
    location: "City Park",
    status: "draft",
    host: "Riley’s Family",
  },
]

export default function EventsPage() {
  const [search, setSearch] = useState("")

  const filtered = mockEvents.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#021526] via-[#03346E] to-[#021526] text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-6">Explore Events</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 mb-8 rounded-xl text-black focus:ring-2 focus:ring-blue-400"
        />

        {/* Event Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-md border border-white/20"
            >
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-sm text-gray-200 mb-3">{event.description}</p>
              <p className="text-sm">📍 {event.location}</p>
              <p className="text-sm">📅 {event.date}</p>
              <span
                className={`inline-block mt-3 px-3 py-1 text-xs rounded-full ${
                  event.status === "published"
                    ? "bg-green-500/80"
                    : event.status === "draft"
                    ? "bg-yellow-500/80"
                    : "bg-blue-500/80"
                }`}
              >
                {event.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
