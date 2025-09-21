"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "../../utils/supabase/client";
import toast from "react-hot-toast";

const navItems = [
  { label: "Events", href: "/events" },
  // Vendors will now show conditionally (not here by default)
];

const headlines = [
  "Crafting unforgettable event experiences for hosts and vendors.",
  "Your vision, our platform — let's make every event shine.",
  "Where seamless planning meets flawless execution.",
  "Smart event solutions designed to scale your success.",
  "Empowering hosts and vendors with technology that works.",
  "Full-cycle event management — from idea to celebration.",
  "Driven by innovation. Inspired by your moments.",
  "Transforming challenges into memorable experiences.",
  "Your trusted partner for effortless event planning.",
  "We build connections that make your events thrive.",
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [host, setHost] = useState<any>(null);

  const pathname = usePathname();
  const router = useRouter();

  // Rotate headlines
  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % headlines.length),
      5000
    );
    return () => clearInterval(id);
  }, []);

  // Handle scroll for hiding navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Check if host is logged in
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setHost(session.user);
        toast.success("Welcome back!");
      } else {
        setHost(null);
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setHost(session.user);
        toast.success("Login successful");
      } else {
        setHost(null);
        toast("You are logged out");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setHost(null);
    toast.success("Host logged out successfully");
    router.push("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Rotating banner */}
      <div
        className="h-6 fixed inset-x-0 top-0 z-[1000] flex select-none items-center 
        justify-center rounded-b-[12px] border-b border-b-gray-200 bg-transparent 
        text-center text-[clamp(0.5rem,1vw,0.875rem)] font-[400] text-white
        shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
        style={{ backdropFilter: "blur(8px)" }}
      >
        <AnimatePresence mode="wait">
          <motion.h1
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {headlines[index]}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: showNav ? 0 : -120 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="flex items-center justify-center text-foreground"
      >
        <div className="fixed top-0 md:top-4 z-[1] w-full py-0 px-6 sm:px-12 md:px-20 ">
          <div className="mx-auto flex max-w-screen-2xl items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={150}
                height={10}
                priority
                className="object-contain cursor-pointer"
              />
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden items-center space-x-8 md:flex">
              {/* Always show Events */}
              <li>
                <Link href="/events" className="text-lg text-white">
                  Events
                </Link>
              </li>

              {/* Show Vendors only if host is logged in */}
              {host && (
                <li>
                  <Link href="/vendors" className="text-lg text-white">
                    Vendors
                  </Link>
                </li>
              )}

              {/* If logged in -> Dashboard + Logout */}
              {host ? (
                <>
                  <li>
                    <Link href="/host/dashboard" className="text-lg text-white">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-lg text-black cursor-pointer bg-white px-6 font-semibold py-2 rounded-md hover:bg-gray-200 transition"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                // If logged out -> Login
                <li>
                  <Link
                    href="/vendors/login"
                    className="text-lg text-black bg-white px-6 font-semibold py-2 rounded-md hover:bg-gray-200 transition"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>

            {/* Hamburger menu toggle (mobile only) */}
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="relative z-[1001] flex h-10 w-10 flex-col items-center justify-center gap-[8px] md:hidden pr-12"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="h-[2px] w-8 bg-white origin-center rounded"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="h-[2px] w-8 bg-white origin-center rounded"
              />
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[100] flex flex-col justify-end items-start 
                 backdrop-blur-sm bg-black/30 px-6 w-[100vw] h-[100vh] pb-52"
              >
                <motion.div
                  className="flex flex-col items-start space-y-6"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    visible: {
                      transition: { staggerChildren: 0.1 },
                    },
                    exit: {
                      transition: {
                        staggerChildren: 0.08,
                        staggerDirection: -1,
                      },
                    },
                  }}
                >
                  {/* Always show Events */}
                  <Link
                    href="/events"
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-extrabold uppercase text-white"
                  >
                    Events
                  </Link>

                  {/* Show Vendors only if host logged in */}
                  {host && (
                    <Link
                      href="/vendors"
                      onClick={() => setIsOpen(false)}
                      className="text-4xl font-extrabold uppercase text-white"
                    >
                      Vendors
                    </Link>
                  )}

                  {/* Mobile: show Dashboard + Logout if logged in, otherwise Login */}
                  {host ? (
                    <>
                      <Link
                        href="/host/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="text-4xl font-extrabold uppercase text-white"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          handleLogout();
                        }}
                        className="text-4xl font-extrabold uppercase text-red-400"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/vendors/login"
                      onClick={() => setIsOpen(false)}
                      className="text-4xl font-extrabold uppercase text-white"
                    >
                      Login
                    </Link>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </motion.div>
  );
}
