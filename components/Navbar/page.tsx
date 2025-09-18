"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Events", href: "/events" },
  { label: "Vendors", href: "/vendors" },
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

  const pathname = usePathname();

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
        setShowNav(false); // scrolling down
      } else {
        setShowNav(true); // scrolling up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
              <div className="relative">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={150}
                  height={10}
                  priority
                  className="object-contain cursor-pointer"
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden items-center space-x-8 md:flex">
              {navItems.map(({ label, href }) => {
                const isActive = pathname === href;
                return (
                  <li key={href} className="list-none relative">
                    <Link href={href} className="relative inline-block px-1">
                      <motion.span
                        initial={false}
                        animate={{
                          color: isActive ? "#6140FE" : "#fff",
                        }}
                        whileHover={{ y: -2 }}
                        transition={{
                          duration: 0.4,
                          ease: "easeInOut",
                          type: "spring",
                          stiffness: 250,
                          damping: 20,
                        }}
                        className="text-lg inline-block cursor-pointer transition-colors duration-300"
                      >
                        {label}
                      </motion.span>
                    </Link>
                  </li>
                );
              })}
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
                      transition: { staggerChildren: 0.08, staggerDirection: -1 },
                    },
                  }}
                >
                  {navItems.map(({ label, href }) => (
                    <motion.div
                      key={href}
                      variants={{
                        hidden: { x: 80, scale: 1.05, opacity: 0 },
                        visible: { x: 0, scale: 1, opacity: 1 },
                        exit: { x: 80, scale: 1.05, opacity: 0 },
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <Link
                        href={href}
                        onClick={() => setIsOpen(false)}
                        className="text-4xl font-extrabold uppercase text-white"
                      >
                        {label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </motion.div>
  );
}
