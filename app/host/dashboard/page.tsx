"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabase/client";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface Event {
  id: string;
  event_title: string;
  event_date: string;
  venue_name: string;
  city: string;
  guest_count: number;
  budget_pkr: number;
}

export default function HostDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHostEvents = async () => {
      try {
        const {
          data: { user },
          error: authErr,
        } = await supabase.auth.getUser();

        if (authErr || !user) {
          toast.error("Please login to view your events");
          return;
        }

        const { data, error } = await supabase
          .from("events")
          .select("*")
          .eq("host_id", user.id)
          .order("event_date", { ascending: true });

        if (error) throw error;
        setEvents(data || []);
      } catch (err: any) {
        console.error(err);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHostEvents();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex flex-col items-center justify-start px-6 py-16 overflow-hidden pt-40">
      {/* Floating Glow Circles */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 8 }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ repeat: Infinity, duration: 10 }}
      />

      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-12 text-center"
      >
        My Booked Events
      </motion.h2>

      {/* Events Grid */}
      {loading ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white/80 text-lg"
        >
          Loading your events...
        </motion.p>
      ) : events.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white/60 text-lg text-center"
        >
          No events booked yet. Start planning your next big day!
        </motion.p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl"
        >
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              className="relative bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-purple-500/20 hover:scale-[1.03] transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="text-2xl font-semibold text-white mb-2">
                {event.event_title}
              </h3>
              <p className="text-sm text-purple-200 mb-1">
                📅 {new Date(event.event_date).toLocaleDateString()}
              </p>
              <p className="text-sm text-purple-200 mb-3">
                📍 {event.venue_name}, {event.city}
              </p>
              <div className="flex justify-between mt-4 text-white/90">
                <span className="text-sm">👥 Guests: {event.guest_count}</span>
                <span className="text-sm font-bold">
                   ₨ {event.budget_pkr.toLocaleString()}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
