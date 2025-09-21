


'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Briefcase,
  MapPin,
  X,
  ArrowLeft,
  Star,
  Sparkles,
  PartyPopper,
  HelpCircle,
} from 'lucide-react';
import { Wrench, Phone, CircleDollarSign } from "lucide-react";

type Vendor = {
  services: string;
  phone: string;
  id: string;
  name: string;
  company?: string;
  city?: string;
  state?: string;
  country?: string;
  fixed_price_per_day?: number;
};

interface EventDraft {
  title: string;
  date: string;
  venueName?: string;
  address?: string;
  city?: string;
  guestCount: number;
  budgetPKR: number;
}

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVendor, setActiveVendor] = useState<Vendor | null>(null);
  const [showAll, setShowAll] = useState(false);


  useEffect(() => {
    const fetchVendors = async () => {
      const { data, error } = await supabase.from('vendors').select('*');
      if (!error && data) setVendors(data);
      setLoading(false);
    };
    fetchVendors();
  }, []);

  // simple fade-only variants so we don't create transform conflicts with CSS hover
  const fadeOnly = { hidden: { opacity: 0 }, visible: { opacity: 1 } };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#021526] via-[#03346E] to-[#021526] text-white pt-40">
      {/* HERO */}
      <section className="relative px-6 py-4 text-center">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeOnly}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold mb-4"
        >
          Find Your Perfect <span className="text-[#ffffff]">Vendor</span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeOnly}
          transition={{ delay: 0.25 }}
          className="max-w-2xl mx-auto text-lg text-white/80"
        >
          Browse trusted professionals and bring your event dreams to life.
        </motion.p>
      </section>





{/* === VENDOR GRID === */}
<section className="py-14 px-6 max-w-7xl mx-auto">
  <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-2">
   Featured Vendors
  </h2>

  {loading ? (
    <p className="text-center animate-pulse">Loading vendors…</p>
  ) : (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        transition={{ staggerChildren: 0.05 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr items-stretch"
      >
        <AnimatePresence>
          {(showAll ? vendors : vendors.slice(0, 6)).map((v) => (
            <motion.article
              key={v.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0B1E39]/95 rounded-2xl p-6 border border-gray-700 shadow-md
                         hover:-translate-y-2 hover:shadow-xl hover:border-[#4FC3F7]
                         transition-transform duration-300 ease-out flex flex-col justify-between h-full min-h-[22rem]"
            >
              {/* TOP: Name */}
              <header>
                <h3 className="text-2xl font-bold flex items-center gap-3 mb-3">
                  <User className="h-5 w-5 shrink-0 text-[#4FC3F7]" />
                  <span>{v.name}</span>
                </h3>
              </header>

              {/* MIDDLE: Full details */}
              <div className="text-sm text-gray-200 space-y-3 flex-1">
                <p className="flex items-center gap-2 text-gray-300">
                  <Briefcase className="h-5 w-5 shrink-0 text-[#4FC3F7]" />
                  <span>{v.company || 'N/A'}</span>
                </p>

                <p className="flex items-center gap-2 text-gray-300">
                  <Wrench className="h-5 w-5 shrink-0 text-[#4FC3F7]" />
                  <span>{v.services || 'Not specified'}</span>
                </p>

                <p className="flex items-center gap-2 text-gray-300">
                  <Phone className="h-5 w-5 shrink-0 text-[#4FC3F7]" />
                  <span>{v.phone || 'N/A'}</span>
                </p>

                <p className="flex items-center gap-2 text-gray-400">
                  <MapPin className="h-5 w-5 shrink-0 text-[#4FC3F7]" />
                  <span>{[v.city, v.state, v.country].filter(Boolean).join(', ') || 'N/A'}</span>
                </p>

                <p className="flex items-center gap-2 text-gray-200 font-medium">
                  <span className="h-5 w-5 flex items-center justify-center text-[#4FC3F7]">₨</span>
                  <span>{v.fixed_price_per_day?.toLocaleString() || 0}/day</span>
                </p>
              </div>

              {/* BOTTOM: CTA */}
              <div className="mt-4">
                <button
                  onClick={() => setActiveVendor(v)}
                  className="w-full py-2 rounded-lg font-semibold bg-white
                             text-black hover:shadow-lg hover:shadow-[#3b82f6]/40 transition cursor-pointer"
                >
                  Book Now
                </button>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* TOGGLE BUTTON */}
      {vendors.length > 6 && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="px-6 py-3 rounded-lg font-semibold bg-[#03346E] text-white
                       hover:bg-[#0552A1] transition cursor-pointer"
          >
            {showAll ? 'Hide Vendors' : 'Show All Vendors'}
          </button>
        </div>
      )}
    </>
  )}
</section>


      {/* ABOUT */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeOnly}
          className="text-3xl font-bold mb-6"
        >
          Why Choose Us?
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeOnly}
          className="text-white/80 max-w-3xl mx-auto"
        >
          We connect event planners with the best professionals in the industry. Whether it’s a wedding, corporate party,
          or private celebration, our curated list of vendors ensures you get quality service every time.
        </motion.p>
      </section>

      {/* SERVICES */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Most Demanding</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr items-stretch">
          {['Photography', 'Catering', 'Decoration'].map((service) => (
            <div
              key={service}
              className="bg-[#0B1E39]/95 p-6 rounded-xl border border-gray-700 text-center shadow-md
                         hover:-translate-y-2 hover:shadow-xl hover:border-[#4FC3F7] transition-transform duration-300 ease-out
                         flex flex-col justify-between h-full min-h-[13rem]"
            >
              <div>
                <PartyPopper className="h-10 w-10 mx-auto mb-3 text-[#4FC3F7]" />
                <h3 className="text-xl font-semibold mb-2">{service}</h3>
                <p className="text-white/70">Professional {service.toLowerCase()} services to elevate your event.</p>
              </div>

           
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6 auto-rows-fr items-stretch">
          {['Browse Vendors', 'Book Instantly', 'Enjoy Your Event'].map((step, i) => (
            <div
              key={step}
              className="bg-[#0B1E39]/95 p-6 rounded-xl border border-gray-700 shadow-md
                         hover:-translate-y-2 hover:shadow-xl hover:border-[#4FC3F7] transition-transform duration-300 ease-out
                         flex flex-col justify-between h-full"
            >
              <div>
                <p className="text-5xl mb-3 text-[#4FC3F7] font-extrabold">{i + 1}</p>
                <h3 className="text-xl font-semibold">{step}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            { q: 'How do I book a vendor?', a: 'Simply click the “Book Now” button and fill out the form.' },
            { q: 'Is there a booking fee?', a: 'No, our platform is completely free to use.' },
            { q: 'Can I cancel a booking?', a: 'Yes, cancellations are allowed based on vendor policy.' },
          ].map(({ q, a }) => (
            <div
              key={q}
              className="bg-[#0B1E39]/95 p-4 rounded-lg border border-gray-700 flex gap-3
                         hover:-translate-y-1 hover:shadow-lg hover:border-[#4FC3F7] transition-transform duration-300 ease-out"
            >
              <HelpCircle className="h-5 w-5 shrink-0 text-[#4FC3F7] mt-1" />
              <div>
                <p className="font-semibold mb-1">{q}</p>
                <p className="text-white/70">{a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* POPUP FORM */}
      <AnimatePresence>
        {activeVendor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.18 }}
              className="relative w-[95%] max-w-2xl bg-[#0B1E39]/95 border border-gray-700 rounded-2xl p-6 shadow-xl"
            >
              <button
                onClick={() => setActiveVendor(null)}
                className="absolute top-3 right-3 text-white hover:text-gray-200"
                aria-label="Close booking form"
              >
                <X className="w-6 h-6" />
              </button>

              <EventForm vendor={activeVendor} onClose={() => setActiveVendor(null)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* EVENT FORM */
function EventForm({ vendor, onClose }: { vendor: Vendor; onClose: () => void }) {
  const steps = ['Event', 'Venue', 'Guests', 'Budget'];
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<EventDraft>({
    title: '',
    date: '',
    venueName: '',
    address: '',
    city: '',
    guestCount: 100,
    budgetPKR: 200000,
  });

  const update = (p: Partial<EventDraft>) => setDraft((d) => ({ ...d, ...p }));

  const submit = async () => {
    // you can add validation here
    await supabase.from('events').insert({ ...draft, vendor_id: vendor.id });
    onClose();
    alert('Event request submitted!');
  };

  return (
    <div className="text-white flex flex-col gap-4">
      <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-[#4FC3F7]" /> Book {vendor.name}
      </h3>

      <div>
        {step === 0 && (
          <>
            <Input label="Event Title" value={draft.title} onChange={(v) => update({ title: v })} />
            <Input label="Date" type="date" value={draft.date} onChange={(v) => update({ date: v })} />
          </>
        )}

        {step === 1 && (
          <>
            <Input label="Venue Name" value={draft.venueName || ''} onChange={(v) => update({ venueName: v })} />
            <Input label="Address" value={draft.address || ''} onChange={(v) => update({ address: v })} />
            <Input label="City" value={draft.city || ''} onChange={(v) => update({ city: v })} />
          </>
        )}

        {step === 2 && (
          <Slider label="Guests" value={draft.guestCount} min={1} max={2000} onChange={(v) => update({ guestCount: v })} />
        )}

        {step === 3 && (
          <Slider
            label="Budget (PKR)"
            value={draft.budgetPKR}
            min={10000}
            max={5000000}
            step={1000}
            onChange={(v) => update({ budgetPKR: v })}
            format={(v) => `₨${v.toLocaleString()}`}
          />
        )}
      </div>

      <div className="mt-4 flex justify-between items-center">
        {step > 0 ? (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-md hover:bg-white/5 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        ) : (
          <div />
        )}

        <button
          onClick={step === steps.length - 1 ? submit : () => setStep((s) => s + 1)}
          className="ml-auto px-4 py-2 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] rounded-md font-medium hover:shadow-md transition"
        >
          {step === steps.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
}

/* REUSABLE INPUTS */
function Input({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label className="text-sm text-white/80">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 rounded-md bg-[#081526] border border-gray-700 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#4FC3F7]"
      />
    </div>
  );
}

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  format,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  format?: (v: number) => string;
}) {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <label className="text-sm text-white/80">{label}</label>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 accent-[#4FC3F7]"
        />
        <span className="w-28 text-right font-medium">{format ? format(value) : value}</span>
      </div>
    </div>
  );
}
