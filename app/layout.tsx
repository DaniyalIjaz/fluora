import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ui/scrollToTop";
import Navbar from "@/components/Navbar/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fluora",
  description: "Event Management App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
             <div className=" relative z-20 ">

          <Navbar />
        </div>
        <ScrollToTop/>
        {children}
              {/* FOOTER */}
      <footer className="py-4 text-center bg-[#021526] text-white/90 font-extralight border-t border-gray-700">
        &copy; {new Date().getFullYear()} Fluora. All rights reserved.
      </footer>
      </body>
    </html>
  );
}
