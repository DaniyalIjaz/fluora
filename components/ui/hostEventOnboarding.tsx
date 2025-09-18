"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

/* --- Types (inline for convenience) --- */
type EventDraft = {
  hostName: string;
  hostEmail?: string;
  hostPhone?: string;
  title: string;
  date: string; // yyyy-mm-dd
  startTime?: string;
  endTime?: string;
  timezone?: string;
  venueName?: string;
  address?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  lat?: number;
  lng?: number;
  guestCount: number;
  budgetINR: number;
  categories: string[];
  otherCategory?: string;
  logistics: {
    indoor?: boolean;
    alcoholAllowed?: boolean;
    parking?: boolean;
    powerAvailable?: boolean;
    curfewTime?: string | null;
  };
  notes?: string;
  createdAt?: string;
};

/* --- Mock vendors (expanded list of services; ratings optional) --- */
const MOCK_VENDORS = [
  { id: "v1", name: "Elegant Catering Co.", serviceType: "Catering", priceBracket: "mid", rating: 4.8, availableDates: ["2025-10-12","2025-11-05","2025-09-25"] },
  { id: "v2", name: "Golden Lens Photography", serviceType: "Photography & Videography", priceBracket: "premium", rating: 4.9, availableDates: ["2025-09-25","2025-10-12"] },
  { id: "v3", name: "DJ Sonic", serviceType: "Music / DJ", priceBracket: "budget", rating: 4.5, availableDates: ["2025-11-05","2025-12-01"] },
  { id: "v4", name: "Sweet Layers Bakery", serviceType: "Cake & Desserts", priceBracket: "mid", rating: 4.6, availableDates: ["2025-09-25","2025-12-01"] },
  { id: "v5", name: "StageCraft Decor", serviceType: "Decoration & Lighting", priceBracket: "premium", rating: 4.7, availableDates: ["2025-10-12"] },
  { id: "v6", name: "Glam Squad", serviceType: "Makeup & Styling", priceBracket: "mid", rating: 4.4, availableDates: ["2025-09-25","2025-11-05"] },
  { id: "v7", name: "City Cabs", serviceType: "Transportation", priceBracket: "budget", rating: 4.2, availableDates: ["2025-11-05","2025-12-01"] },
  { id: "v8", name: "Grand Hall Venues", serviceType: "Venue / Hall", priceBracket: "premium", rating: 4.85, availableDates: ["2025-10-12","2025-11-05"] },
  { id: "v9", name: "Seat & Stage", serviceType: "Furniture & Stage Setup", priceBracket: "mid", rating: 4.3, availableDates: ["2025-09-25","2025-12-01"] },
  { id: "v10", name: "InvitePro", serviceType: "Invitation Cards", priceBracket: "budget", rating: 4.1, availableDates: ["2025-09-25"] },
  { id: "v11", name: "SoundWave", serviceType: "Sound System", priceBracket: "mid", rating: 4.5, availableDates: ["2025-10-12"] },
  { id: "v12", name: "BarMasters", serviceType: "Drinks & Bar", priceBracket: "mid", rating: 4.0, availableDates: ["2025-11-05"] },
  { id: "v13", name: "SkyEye Drones", serviceType: "Drone Coverage", priceBracket: "premium", rating: 4.7, availableDates: ["2025-10-12","2025-12-01"] },
  { id: "v14", name: "LED Central", serviceType: "LED Screens / Projectors", priceBracket: "mid", rating: 4.4, availableDates: ["2025-09-25","2025-10-12"] },
  { id: "v15", name: "StageActs", serviceType: "Performers / Entertainment", priceBracket: "premium", rating: 4.6, availableDates: ["2025-11-05"] },
  { id: "v16", name: "SecureLine", serviceType: "Security & Bouncers", priceBracket: "mid", rating: 4.2, availableDates: ["2025-10-12"] },
  { id: "v17", name: "PowerPlus", serviceType: "Power Backup / Generators", priceBracket: "mid", rating: 4.3, availableDates: ["2025-09-25","2025-11-05"] },
  { id: "v18", name: "PlanIt Events", serviceType: "Event Planner / Coordinator", priceBracket: "premium", rating: 4.9, availableDates: ["2025-10-12","2025-11-05"] },
  { id: "v19", name: "Staffers", serviceType: "Event Staff / Waiters", priceBracket: "budget", rating: 4.0, availableDates: ["2025-09-25","2025-12-01"] },
  { id: "v20", name: "MediQuick", serviceType: "Medical / First Aid Support", priceBracket: "mid", rating: 4.1, availableDates: ["2025-10-12"] },
  { id: "v21", name: "KidsFun Co.", serviceType: "Kids Entertainment", priceBracket: "mid", rating: 4.2, availableDates: ["2025-09-25","2025-12-01"] },
  { id: "v22", name: "PyroShows", serviceType: "Fireworks / Light Show", priceBracket: "premium", rating: 4.6, availableDates: ["2025-12-01"] },
  { id: "v23", name: "DroneCinema", serviceType: "Videography (Drone + Ground)", priceBracket: "premium", rating: 4.8, availableDates: ["2025-10-12","2025-11-05"] },
  // ... you can extend MOCK_VENDORS further
];

/* --- Helper: format IN₹ --- */
const rupeeFmt = (v: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(v);

/* --- Utility: save chat / order payloads to localStorage to simulate sending --- */
function pushChatMessage(vendorId: string, payload: any) {
  try {
    const key = `chats_${vendorId}`;
    const existing = localStorage.getItem(key);
    const arr = existing ? JSON.parse(existing) : [];
    arr.push(payload);
    localStorage.setItem(key, JSON.stringify(arr));
  } catch (e) {
    // ignore
  }
}
function pushOrderPayload(vendorId: string, payload: any) {
  try {
    const key = `orders_pending`;
    const existing = localStorage.getItem(key);
    const arr = existing ? JSON.parse(existing) : [];
    arr.push({ vendorId, ...payload });
    localStorage.setItem(key, JSON.stringify(arr));
  } catch (e) {
    // ignore
  }
}

/* --- Main component --- */
export default function HostEventOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [draft, setDraft] = useState<EventDraft>(() => {
    // initial defaults
    const stored = typeof window !== "undefined" ? localStorage.getItem("hostEventDraft") : null;
    if (stored) {
      try {
        return JSON.parse(stored) as EventDraft;
      } catch {
        /* ignore */
      }
    }
    return {
      hostName: "",
      hostEmail: "",
      hostPhone: "",
      title: "",
      date: "", // yyyy-mm-dd
      startTime: "",
      endTime: "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      venueName: "",
      address: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
      guestCount: 100,
      budgetINR: 200000,
      categories: [],
      otherCategory: "",
      logistics: {},
      notes: "",
      createdAt: new Date().toISOString(),
    } as EventDraft;
  });

  // persist locally
  useEffect(() => {
    localStorage.setItem("hostEventDraft", JSON.stringify(draft));
  }, [draft]);

  const update = (patch: Partial<EventDraft>) => setDraft((d) => ({ ...d, ...patch }));

  /* ----- Vendor availability filtering ----- */
  const availableVendors = useMemo(() => {
    if (!draft.date) return [];
    // show all vendors that list this date (simulate registered vendors)
    return MOCK_VENDORS.filter((v) => v.availableDates.includes(draft.date));
  }, [draft.date]);

  /* ----- Validation helpers (stricter) ----- */
  const isEmailValid = (email?: string) => !!email && email.includes("@");
  const stepValid = (s: number) => {
    if (s === 0) return draft.hostName.trim().length > 1 && isEmailValid(draft.hostEmail);
    if (s === 1) return !!draft.date && !!draft.title;
    if (s === 2) return !!draft.venueName || !!draft.address;
    if (s === 3) return draft.guestCount > 0;
    if (s === 4) return draft.budgetINR > 0;
    if (s === 5) return draft.categories.length > 0 || (draft.otherCategory && draft.otherCategory.trim().length > 1);
    return true;
  };

  /* ----- actions ----- */
  const goNext = () => {
    if (!stepValid(step)) {
      setToast("Please complete required fields for this step (check email/name/title/venue/categories).");
      setTimeout(() => setToast(null), 2500);
      return;
    }
    setStep((s) => Math.min(s + 1, 6));
  };
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    // final validation
    if (!stepValid(5)) {
      setToast("Please select at least one vendor category or specify 'Other'.");
      setTimeout(() => setToast(null), 2500);
      return;
    }
    setSaving(true);
    // mock submit -> in future call /api/events
    await new Promise((r) => setTimeout(r, 800));
    // save final
    localStorage.setItem("hostEventFinal", JSON.stringify({ ...draft, submittedAt: new Date().toISOString() }));
    setSaving(false);
    setToast("Event published successfully — redirecting to events dashboard...");
    setTimeout(() => {
      setToast(null);
      router.push("/events");
    }, 1600);
  };

  const progress = Math.round(((step + 1) / 7) * 100);
  /* ----- handlers for chat / orders ----- */
  const startChatWithVendor = (vendor: { id: string; name: string }) => {
    // prepare message payload with host event summary
    const payload = {
      vendorId: vendor.id,
      vendorName: vendor.name,
      message: `Hi ${vendor.name}, ${draft.hostName} is planning an event titled "${draft.title}" on ${draft.date}. Contact: ${draft.hostEmail || "n/a"} / ${draft.hostPhone || "n/a"}. Guests: ${draft.guestCount}. Budget: ${rupeeFmt(draft.budgetINR)}. Venue: ${draft.venueName || draft.address || "n/a"}. Notes: ${draft.notes || "n/a"}`,
      timestamp: new Date().toISOString(),
      hostDraft: draft,
    };
    // persist (simulate sending)
    pushChatMessage(vendor.id, payload);
    setToast(`Chat started with ${vendor.name}. Redirecting...`);
    setTimeout(() => {
      setToast(null);
      // navigate to chat page for that vendor (replace with your real chat route)
      router.push(`/chat/${vendor.id}`);
    }, 900);
  };

  const createOrderForVendor = (vendor: { id: string; name: string }) => {
    const payload = {
      vendorId: vendor.id,
      vendorName: vendor.name,
      createdAt: new Date().toISOString(),
      hostDraft: draft,
      orderStatus: "draft",
    };
    pushOrderPayload(vendor.id, payload);
    setToast(`Order draft created for ${vendor.name}. Opening order page...`);
    setTimeout(() => {
      setToast(null);
      router.push(`/orders/new?vendor=${vendor.id}`);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#021526] via-[#03346E] to-[#021526] flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        {/* Top progress bar */}
        <div className="mb-6">
          <div className="text-sm text-white/80 mb-2">Step {step + 1} of 7</div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.45 }}
              className="h-2 bg-gradient-to-r from-[#021526] via-[#0552A1] to-[#03346E]"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
        >
          {/* header/back */}
          <div className="mb-4 flex items-center gap-4">
            {step > 0 ? (
              <button onClick={goBack} className="text-white/80 hover:text-white">
                <ArrowLeft className="w-5 h-5 inline-block mr-2" /> Back
              </button>
            ) : (
              <div />
            )}
            <h2 className="text-xl font-semibold text-white">
              {[
                "Your details",
                "Event & date",
                "Venue / address",
                "Guests",
                "Budget",
                "Vendors & needs",
                "Review & submit",
              ][step]}
            </h2>
          </div>

          {/* Step content */}
          <div className="space-y-4">
            {/* STEP 0: Host info */}
            {step === 0 && (
              <div className="space-y-3">
                <label className="text-sm text-white/80">Host name</label>
                <input
                  value={draft.hostName}
                  onChange={(e) => update({ hostName: e.target.value })}
                  className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white placeholder-white/60"
                  placeholder="e.g. Alex & Jordan"
                />
                <label className="text-sm text-white/80">Email (for confirmations)</label>
                <input
                  value={draft.hostEmail}
                  onChange={(e) => update({ hostEmail: e.target.value })}
                  className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white placeholder-white/60"
                  placeholder="host@domain.com"
                  type="email"
                />
                <p className="text-xs text-white/70">
                  Email must include <span className="font-medium">@</span>
                </p>
                <label className="text-sm text-white/80">Phone (optional)</label>
                <input
                  value={draft.hostPhone}
                  onChange={(e) => update({ hostPhone: e.target.value })}
                  className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white placeholder-white/60"
                  placeholder="+91 98XXXXXXXX"
                />
              </div>
            )}

            {/* STEP 1: Title + date/time */}
            {step === 1 && (
              <div className="space-y-3">
                <label className="text-sm text-white/80">Event title</label>
                <input
                  value={draft.title}
                  onChange={(e) => update({ title: e.target.value })}
                  className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
                  placeholder="e.g. Alex & Jordan's Wedding"
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-sm text-white/80">Date</label>
                    <input
                      type="date"
                      value={draft.date}
                      onChange={(e) => update({ date: e.target.value })}
                      className="w-full p-2 rounded-md bg-white/5 border border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-white/80">Start time</label>
                    <input
                      type="time"
                      value={draft.startTime}
                      onChange={(e) => update({ startTime: e.target.value })}
                      className="w-full p-2 rounded-md bg-white/5 border border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-white/80">End time</label>
                    <input
                      type="time"
                      value={draft.endTime}
                      onChange={(e) => update({ endTime: e.target.value })}
                      className="w-full p-2 rounded-md bg-white/5 border border-white/10 text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Venue / address */}
            {step === 2 && (
              <div className="space-y-3">
                <label className="text-sm text-white/80">Venue name</label>
                <input
                  value={draft.venueName}
                  onChange={(e) => update({ venueName: e.target.value })}
                  className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
                  placeholder="e.g. Lakeside Garden"
                />
                <label className="text-sm text-white/80">Address (city, neighborhood)</label>
                <input
                  value={draft.address}
                  onChange={(e) => update({ address: e.target.value })}
                  className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
                  placeholder="Street, area, city"
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    value={draft.city}
                    onChange={(e) => update({ city: e.target.value })}
                    placeholder="City"
                    className="p-2 rounded-md bg-white/5 border border-white/10 text-white"
                  />
                  <input
                    value={draft.state}
                    onChange={(e) => update({ state: e.target.value })}
                    placeholder="State"
                    className="p-2 rounded-md bg-white/5 border border-white/10 text-white"
                  />
                  <input
                    value={draft.postcode}
                    onChange={(e) => update({ postcode: e.target.value })}
                    placeholder="Postcode"
                    className="p-2 rounded-md bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <p className="text-sm text-white/60">Tip: Vendors appreciate a precise city & venue name for travel estimates.</p>
              </div>
            )}

            {/* STEP 3: Guests slider */}
            {step === 3 && (
              <div className="space-y-3">
                <label className="text-sm text-white/80">How many guests are you inviting?</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={1}
                    max={2000}
                    value={draft.guestCount}
                    onChange={(e) => update({ guestCount: Number(e.target.value) })}
                    className="flex-1 accent-black"
                    aria-label="guest-count"
                  />
                  <div className="w-36 text-right text-white/90 font-medium">{draft.guestCount} guests</div>
                </div>
                <div className="text-sm text-white/60">Vendors use this to size staff, quantity and seating.</div>
              </div>
            )}

            {/* STEP 4: Budget slider (INR) */}
            {step === 4 && (
              <div className="space-y-3">
                <label className="text-sm text-white/80">Estimated budget (INR)</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={10000}
                    max={5000000}
                    step={1000}
                    value={draft.budgetINR}
                    onChange={(e) => update({ budgetINR: Number(e.target.value) })}
                    className="flex-1 accent-black"
                    aria-label="budget-inr"
                  />
                  <div className="w-48 text-right text-white/90 font-medium">{rupeeFmt(draft.budgetINR)}</div>
                </div>
                <div className="flex gap-3 text-sm">
                  <span className="px-2 py-1 rounded bg-white/5 text-white/80">Economy &lt; {rupeeFmt(100000)}</span>
                  <span className="px-2 py-1 rounded bg-white/5 text-white/80">Mid {rupeeFmt(100000)}–{rupeeFmt(1000000)}</span>
                  <span className="px-2 py-1 rounded bg-white/5 text-white/80">Premium &gt; {rupeeFmt(1000000)}</span>
                </div>
              </div>
            )}

            {/* STEP 5: Vendor categories & logistics */}
            {step === 5 && (
              <div className="space-y-3">
                <label className="text-sm text-white/80">Which vendor services do you need?</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    "Photography & Videography",
                    "Music / DJ",
                    "Catering",
                    "Cake & Desserts",
                    "Decoration & Lighting",
                    "Makeup & Styling",
                    "Transportation",
                    "Venue / Hall",
                    "Furniture & Stage Setup",
                    "Invitation Cards",
                    "Sound System",
                    "Drinks & Bar",
                    "Drone Coverage",
                    "LED Screens / Projectors",
                    "Performers / Entertainment",
                    "Security & Bouncers",
                    "Power Backup / Generators",
                    "Event Planner / Coordinator",
                    "Event Staff / Waiters",
                    "Medical / First Aid Support",
                    "Kids Entertainment",
                    "Fireworks / Light Show",
                    "Other"
                  ].map((c) => (
                    <button
                      key={c}
                      onClick={() =>
                        update({
                          categories: draft.categories.includes(c) ? draft.categories.filter((x) => x !== c) : [...draft.categories, c],
                        })
                      }
                      className={`text-sm px-3 py-2 rounded-md border ${
                        draft.categories.includes(c)
                          ? "bg-gradient-to-r from-[#021526] via-[#0552A1] to-[#03346E] text-white border-transparent"
                          : "bg-white/5 text-white border-white/10"
                      }`}
                      type="button"
                    >
                      {c}
                    </button>
                  ))}
                </div>

                {draft.categories.includes("Other") && (
                  <input
                    type="text"
                    value={draft.otherCategory}
                    onChange={(e) => update({ otherCategory: e.target.value })}
                    placeholder="Other (please specify)"
                    className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white mt-2"
                  />
                )}

                <div className="mt-3 space-y-2">
                  <label className="text-sm text-white/80">Logistics (quick checklist)</label>
                  <div className="flex gap-3 flex-wrap">
                    <label className="inline-flex items-center gap-2 text-white/90">
                      <input
                        type="checkbox"
                        checked={!!draft.logistics.indoor}
                        onChange={(e) => update({ logistics: { ...draft.logistics, indoor: e.target.checked } })}
                        className="accent-black"
                      />
                      Indoor
                    </label>
                    <label className="inline-flex items-center gap-2 text-white/90">
                      <input
                        type="checkbox"
                        checked={!!draft.logistics.alcoholAllowed}
                        onChange={(e) => update({ logistics: { ...draft.logistics, alcoholAllowed: e.target.checked } })}
                        className="accent-black"
                      />
                      Alcohol allowed
                    </label>
                    <label className="inline-flex items-center gap-2 text-white/90">
                      <input
                        type="checkbox"
                        checked={!!draft.logistics.parking}
                        onChange={(e) => update({ logistics: { ...draft.logistics, parking: e.target.checked } })}
                        className="accent-black"
                      />
                      Parking on-site
                    </label>
                    <label className="inline-flex items-center gap-2 text-white/90">
                      <input
                        type="checkbox"
                        checked={!!draft.logistics.powerAvailable}
                        onChange={(e) => update({ logistics: { ...draft.logistics, powerAvailable: e.target.checked } })}
                        className="accent-black"
                      />
                      Power available
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: Vendors available + review */}
            {step === 6 && (
              <div className="space-y-3">
                <label className="text-sm text-white/80">Vendors registered on this application (on {draft.date || "—"})</label>

                {draft.date ? (
                  availableVendors.length ? (
                    <div className="grid gap-3">
                      {availableVendors.map((v) => (
                        <div key={v.id} className="p-3 bg-white/5 rounded-md border border-white/10 flex justify-between items-center">
                          <div>
                            <div className="text-white font-medium">{v.name}</div>
                            <div className="text-sm text-white/70">{v.serviceType}{v.priceBracket ? ` • ${v.priceBracket}` : ""}{v.rating ? ` • ${v.rating} ★` : ""}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => startChatWithVendor(v)}
                              className="px-3 py-2 rounded-md bg-gradient-to-r from-[#021526] via-[#0552A1] to-[#03346E] text-white"
                            >
                              Start Chat
                            </button>
                            <button
                              onClick={() => createOrderForVendor(v)}
                              className="px-3 py-2 rounded-md bg-black text-white border border-white/10"
                            >
                              Create Order
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-white/70">No vendors registered for this date — expand date range or remove filters.</div>
                  )
                ) : (
                  <div className="text-sm text-white/70">Select an event date to see vendors registered on our app.</div>
                )}

                <label className="text-sm text-white/80 mt-4">Additional notes for vendors (requirements, theme)</label>
                <textarea
                  value={draft.notes}
                  onChange={(e) => update({ notes: e.target.value })}
                  placeholder="E.g. vegetarian menu required, 1800-2200 music slot, local vendors preferred..."
                  className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
                  rows={4}
                />
              </div>
            )}
          </div>

          {/* Footer actions */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-white/70">
              {step < 6 ? (
                <span>Step {step + 1} of 7 • {stepValid(step) ? "Ready" : "Incomplete"}</span>
              ) : (
                <span>Review and submit</span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {step > 0 && (
                <button onClick={goBack} className="px-4 py-2 rounded-md border border-white/10 text-white/90">
                  Back
                </button>
              )}

              {step < 6 ? (
                <button
                  onClick={goNext}
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-[#021526] via-[#0552A1] to-[#03346E] text-white font-medium"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={submit}
                  disabled={saving}
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-[#021526] via-[#0552A1] to-[#03346E] text-white font-medium"
                >
                  {saving ? "Publishing…" : "Publish & Invite Vendors"}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Toast popup */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 bg-black text-white px-6 py-3 rounded-lg shadow-lg"
        >
          {toast}
        </motion.div>
      )}
    </div>
  );
}
