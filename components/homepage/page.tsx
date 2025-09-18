"use client";

import React, { JSX, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Calendar,
  Users,
  CreditCard,
  Clock,
  MessageSquare,
  FileText,
  Sparkles,
} from "lucide-react";

// import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Ballpit from "../ui/Ballpit";
import SplitText from "../ui/SplitText";
import Navbar from "../Navbar/page";

export default function Homepage(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setSuccess(false);

    // try {
    //   const supabase = createClient();
    //   const { error } = await supabase.from("users").insert([{ email }]);

    //   if (error) {
    //     console.error("Error saving email:", error.message);
    //   } else {
    //     setSuccess(true);
    //     setEmail("");
    //   }
    // } catch (err) {
    //   console.error(err);
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <div className="flex flex-col bg-[#021526] text-white">
      {/* Top hero */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom, #021526, #03346E, #021526)",
        }}
      >
        <div className=" relative z-20 ">

          <Navbar />
        </div>
        {/* Decorative animated layers */}
        <div className="absolute inset-0 pointer-events-none">
          <Ballpit
            count={70}
            gravity={0.01}
            friction={0.9975}
            wallBounce={0.95}
            followCursor={false}
          />
        </div>

        <section
          className="
            relative z-10 
            min-h-[70vh] sm:min-h-[80vh] md:min-h-[90vh] lg:min-h-screen    
            px-4 sm:px-6 lg:px-8 
            flex flex-col justify-center
          "
        >

          <div className="mx-auto max-w-6xl text-center pt-24 sm:pt-28">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <SplitText
                text="Glow Your Moments with Fluora"
                className="text-3xl sm:text-4xl md:text-7xl font-bold leading-tight mb-6"
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
                onLetterAnimationComplete={handleAnimationComplete}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Plan. Connect. Celebrate. Whether you’re hosting an event or providing unforgettable services, it all begins here.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto mb-6"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  className="h-12 bg-[#03346E] hover:bg-[#0552A1] text-white px-6 sm:flex-1"
                >
                  <a href="/planmyevent">Plan My Event</a>
                </Button>

                <Button
                  asChild
                  className="h-12 border border-[#0552A1] hover:bg-[#03346E]/20 text-[#03346E] px-6 sm:flex-1"
                >
                  <a href="/vendors">I'm a Vendor</a>
                </Button>
              </div>
            </motion.div>


            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-base text-gray-400 "
            >
              Join{" "}
              <span className="font-medium text-white">
                250+ hosts & vendors
              </span>{" "}
              already on the waitlist
            </motion.p>
          </div>
        </section>
      </div>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Powerful Features for Hosts & Vendors
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Everything you need to connect, collaborate, and bring events to
              life with ease.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <CreditCard className="h-6 w-6 text-[#4FC3F7]" />
                ),
                title: "Smart Budget Tools",
                bullets: ["Track costs easily", "Share budgets with hosts"],
                desc: "Hosts set budgets, vendors provide quotes, and both stay on the same page with real-time updates.",
              },
              {
                icon: (
                  <Calendar className="h-6 w-6 text-[#4FC3F7]" />
                ),
                title: "Event Scheduling",
                bullets: [
                  "Integrated calendar",
                  "Vendor availability tracking",
                ],
                desc: "Hosts plan event dates, vendors sync their schedules — no double bookings.",
              },
              {
                icon: <Users className="h-6 w-6 text-[#4FC3F7]" />,
                title: "Host–Vendor Collaboration",
                bullets: ["Direct chat & updates", "Secure info sharing"],
                desc: "Keep hosts and vendors aligned with instant communication and shared details.",
              },
              {
                icon: <Clock className="h-6 w-6 text-[#4FC3F7]" />,
                title: "Task Coordination",
                bullets: ["Milestone tracking", "Deadline reminders"],
                desc: "Hosts assign tasks, vendors deliver — everything is tracked and transparent.",
              },
              {
                icon: (
                  <MessageSquare className="h-6 w-6 text-[#4FC3F7]" />
                ),
                title: "Vendor Profiles",
                bullets: ["Service listings", "Ratings & reviews"],
                desc: "Vendors showcase services, portfolios, and pricing. Hosts hire with confidence.",
              },
              {
                icon: <FileText className="h-6 w-6 text-[#4FC3F7]" />,
                title: "Custom Packages",
                bullets: ["Tailored vendor offers", "Bundle services easily"],
                desc: "Vendors create unique packages, hosts pick what fits their vision.",
              },
            ].map((f) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-[#0B1E39] p-6 rounded-xl shadow-lg border border-gray-700 hover:border-[#4FC3F7] transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#03346E] rounded-full flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {f.title}
                </h3>
                <p className="text-gray-300 mb-4">{f.desc}</p>
                <ul className="text-sm text-gray-400 space-y-2">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-start">
                      <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-[#021526] via-[#03346E] to-[#021526] px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-3">
            How Fluora Works
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Whether you’re a host or a vendor — here’s how you connect and
            collaborate.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              step: "1",
              title: "Hosts Create Events",
              desc: "Set up your event with budget, details, and requirements.",
            },
            {
              step: "2",
              title: "Vendors Apply",
              desc: "Vendors showcase their services and submit tailored offers.",
            },
            {
              step: "3",
              title: "Book & Celebrate",
              desc: "Confirm vendors, track progress, and enjoy a stress-free event.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-[#021526] p-8 rounded-2xl shadow-lg border border-gray-700 hover:shadow-2xl hover:border-[#4FC3F7] transition-all"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#03346E] text-xl font-bold text-[#4FC3F7] mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-[#021526]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Is Fluora free to start?",
                a: "Yes, joining as a host or vendor is free. Premium tools launch later.",
              },
              {
                q: "Can vendors list multiple services?",
                a: "Absolutely. Vendors can create unlimited service listings with full details.",
              },
              {
                q: "Do hosts pay vendors inside the app?",
                a: "Yes, secure payments are handled directly through the app with Stripe.",
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-[#0B1E39] p-6 rounded-xl border border-gray-700"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-400">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        viewport={{ once: true }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-xl bg-[#03346E] text-white p-4 rounded-xl shadow-lg flex items-center justify-between z-50"
      >
        <p className="font-semibold">🚀 Ready to simplify your event planning?</p>
        <Button className="bg-white text-[#03346E] hover:bg-gray-200">
          Join Now
        </Button>
      </motion.div>

      {/* CTA / Footer */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#021526] via-[#03346E] to-[#021526]">
        <div className="mx-auto max-w-4xl bg-[#0B1E39] p-8 sm:p-12 rounded-2xl shadow-2xl border border-gray-700 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#03346E] rounded-full mb-6">
            <Sparkles className="h-7 w-7 text-[#4FC3F7]" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Take Your Events to the Next Level
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            Join the waitlist today and be among the first to simplify bookings,
            connect with trusted vendors, and make events effortless.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="h-12 w-full border-0 focus-visible:ring-0"
            />
            <Button
              type="submit"
              disabled={loading}
              className="h-12 bg-[#03346E] hover:bg-[#0552A1] text-white px-6"
            >
              {loading ? "Saving..." : "Get Early Access"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          {success && (
            <p className="text-green-600 mt-3 text-sm">
              Thanks! We'll notify you when Fluora launches.
            </p>
          )}

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-[#0B1E39] flex items-center justify-center text-xs text-white">
                JD
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-600 border-2 border-[#0B1E39] flex items-center justify-center text-xs text-white">
                SM
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-[#0B1E39] flex items-center justify-center text-xs text-white">
                KL
              </div>
            </div>
            <span>500+ hosts & vendors already joined</span>
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-400">
          <p className="text-sm mb-3">
            Launching Summer 2025 | Built for hosts & vendors
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/terms-of-service"
              className="text-sm hover:text-[#4FC3F7]"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy-policy"
              className="text-sm hover:text-[#4FC3F7]"
            >
              Privacy Policy
            </Link>
          </div>
        </footer>
      </section>
    </div>
  );
}
