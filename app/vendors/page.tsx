'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Briefcase,
  MapPin,
  DollarSign,
  X,
  ArrowLeft,
  Star,
  Sparkles,
  PartyPopper,
  HelpCircle,
} from 'lucide-react';

type Vendor = {
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

  useEffect(() => {
    const fetchVendors = async () => {
      const { data, error } = await supabase.from('vendors').select('*');
      if (!error && data) setVendors(data);
      setLoading(false);
    };
    fetchVendors();
  }, []);

  const fadeIn = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      {/* === HERO === */}
      <section className="relative px-6 py-20 text-center">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold mb-4"
        >
          Find Your Perfect <span className="text-[#3b82f6]">Vendor</span>
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto text-lg text-white/80"
        >
          Browse trusted professionals and bring your event dreams to life.
        </motion.p>
      </section>

      {/* === VENDOR GRID === */}
      <section className="py-14 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-2">
          <Sparkles className="text-[#06b6d4]" /> Featured Vendors
        </h2>
        {loading ? (
          <p className="text-center animate-pulse">Loading vendors…</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {vendors.map((v) => (
              <motion.div
                key={v.id}
                variants={fadeIn}
                whileHover={{ scale: 1.04 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg"
              >
                <h3 className="text-2xl font-semibold flex items-center gap-2 mb-2">
                  <User /> {v.name}
                </h3>
                <p className="flex items-center gap-2">
                  <Briefcase /> {v.company || 'N/A'}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin /> {[v.city, v.state, v.country].filter(Boolean).join(', ') || 'N/A'}
                </p>
                <p className="flex items-center gap-2">
                  <DollarSign /> ₨{v.fixed_price_per_day?.toLocaleString() || 0}/day
                </p>
                <button
                  onClick={() => setActiveVendor(v)}
                  className="mt-4 w-full bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] py-2 rounded-lg font-medium hover:scale-105 transition"
                >
                  Book Now
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* === ABOUT === */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-3xl font-bold mb-6"
        >
          Why Choose Us?
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-white/80 max-w-3xl mx-auto"
        >
          We connect event planners with the best professionals in the industry. Whether it’s a wedding, corporate party, or private celebration, our curated list of vendors ensures you get quality service every time.
        </motion.p>
      </section>

      {/* === SERVICES === */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Photography', 'Catering', 'Decoration'].map((service) => (
            <motion.div
              key={service}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-md text-center shadow-md"
            >
              <PartyPopper className="mx-auto mb-3 text-[#06b6d4]" size={36} />
              <h3 className="text-xl font-semibold mb-2">{service}</h3>
              <p className="text-white/70">
                Professional {service.toLowerCase()} services to elevate your event.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === PROCESS === */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {['Browse Vendors', 'Book Instantly', 'Enjoy Your Event'].map((step, i) => (
            <motion.div
              key={step}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-md shadow-md"
            >
              <p className="text-5xl mb-3 text-[#3b82f6] font-extrabold">{i + 1}</p>
              <h3 className="text-xl font-semibold">{step}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === TESTIMONIALS === */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">What Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white/10 p-6 rounded-xl border border-white/20 shadow-md"
            >
              <p className="italic mb-4">
                “Amazing service! The vendor was professional and made our day unforgettable.”
              </p>
              <div className="flex gap-1 justify-center">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="text-yellow-400" size={20} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === FAQ === */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            { q: 'How do I book a vendor?', a: 'Simply click the “Book Now” button and fill out the form.' },
            { q: 'Is there a booking fee?', a: 'No, our platform is completely free to use.' },
            { q: 'Can I cancel a booking?', a: 'Yes, cancellations are allowed based on vendor policy.' },
          ].map(({ q, a }) => (
            <motion.div
              key={q}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white/10 p-4 rounded-lg border border-white/20 backdrop-blur-md flex gap-3"
            >
              <HelpCircle className="text-[#3b82f6] flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold mb-1">{q}</p>
                <p className="text-white/70">{a}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="py-10 text-center text-white/60 border-t border-white/10">
        &copy; {new Date().getFullYear()} Fluora. All rights reserved.
      </footer>

      {/* === POPUP FORM === */}
      <AnimatePresence>
        {activeVendor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              transition={{ duration: 0.3 }}
              className="relative w-[95%] max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6"
            >
              <button
                onClick={() => setActiveVendor(null)}
                className="absolute top-3 right-3 text-white hover:text-gray-200"
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

/* === EVENT FORM === */
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
    await supabase.from('events').insert({ ...draft, vendor_id: vendor.id });
    onClose();
    alert('Event request submitted!');
  };

  return (
    <div className="text-white">
      <h3 className="text-2xl font-bold mb-4">Book {vendor.name}</h3>
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

      <div className="mt-6 flex justify-between">
        {step > 0 && (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="flex items-center gap-1 px-4 py-2 border border-white/30 rounded-md hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        )}
        <button
          onClick={step === steps.length - 1 ? submit : () => setStep((s) => s + 1)}
          className="ml-auto px-4 py-2 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] rounded-md font-medium hover:scale-105 transition"
        >
          {step === steps.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
}

/* === REUSABLE INPUTS === */
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
        className="w-full p-3 rounded-md bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
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
          className="flex-1 accent-[#3b82f6]"
        />
        <span className="w-28 text-right font-medium">
          {format ? format(value) : value}
        </span>
      </div>
    </div>
  );
}
