// "use client";

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import { ArrowLeft } from "lucide-react";
// import { supabase } from "@/utils/supabase/client";
// // import { supabase } from "@/utils/supabase/client";

// /* --- Types --- */
// interface EventDraft {
//   hostName: string;
//   hostEmail?: string;
//   hostPhone?: string;
//   title: string;
//   date: string;
//   startTime?: string;
//   endTime?: string;
//   timezone?: string;
//   venueName?: string;
//   address?: string;
//   city?: string;
//   state?: string;
//   postcode?: string;
//   country?: string;
//   guestCount: number;
//   budgetINR: number;
//   categories: string[];
//   otherCategory?: string;
//   logistics: {
//     indoor?: boolean;
//     alcoholAllowed?: boolean;
//     parking?: boolean;
//     powerAvailable?: boolean;
//     curfewTime?: string | null;
//   };
//   notes?: string;
//   createdAt?: string;
// }

// interface InputProps { label?: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; }
// interface SliderProps { label?: string; value: number; onChange: (v: number) => void; min: number; max: number; step?: number; format?: (v: number) => string; description?: string; }
// interface ButtonProps { children: React.ReactNode; onClick: () => void; variant?: "solid" | "outline"; }

// const rupeeFmt = (v: number) =>
//   new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(v);

// export default function HostEventOnboarding() {
//   const router = useRouter();
//   const [step, setStep] = useState<number>(0);
//   const [loading, setLoading] = useState(false);
// const [password, setPassword] = useState("");

//   const [draft, setDraft] = useState<EventDraft>(() => {
//     const stored = typeof window !== "undefined" ? localStorage.getItem("hostEventDraft") : null;
//     return stored
//       ? (JSON.parse(stored) as EventDraft)
//       : {
//           hostName: "",
//           hostEmail: "",
//           hostPhone: "",
//           title: "",
//           date: "",
//           startTime: "",
//           endTime: "",
//           timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
//           venueName: "",
//           address: "",
//           city: "",
//           state: "",
//           postcode: "",
//           country: "",
//           guestCount: 100,
//           budgetINR: 200000,
//           categories: [],
//           otherCategory: "",
//           logistics: {},
//           notes: "",
//           createdAt: new Date().toISOString(),
//         };
//   });

//   useEffect(() => { localStorage.setItem("hostEventDraft", JSON.stringify(draft)); }, [draft]);
//   const update = (patch: Partial<EventDraft>) => setDraft((d) => ({ ...d, ...patch }));

//   const stepLabels: string[] = ["Your details","Event & date","Venue / address","Guests","Budget"];
//   const progress: number = Math.round(((step + 1) / stepLabels.length) * 100);
//   const goNext = () => setStep((s) => Math.min(s + 1, stepLabels.length - 1));
//   const goBack = () => setStep((s) => Math.max(s - 1, 0));

//   /* --- Submit: Sign up + create host --- */
//   const handleSubmit = async () => {
//     if(!draft.hostEmail) return alert("Please enter a valid email");
//     const { data, error } = await supabase.auth.signUp({
//   email: draft.hostEmail,
//   password: password,
//   options: {
//     data: {
//       role: "host",
//       host_name: draft.hostName,
//       phone: draft.hostPhone
//     }
//   }
// }); 
// console.log('data, error', data, error)

//     router.push("/vendors"); 
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#021526] via-[#03346E] to-[#021526] flex items-center justify-center p-6">
//       <div className="w-full max-w-3xl">
//         {/* Progress */}
//         <div className="mb-6">
//           <div className="text-sm text-white/80 mb-2 flex justify-between">
//             <span>{stepLabels[step]}</span>
//             <span>{step + 1}/{stepLabels.length}</span>
//           </div>
//           <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
//             <motion.div
//               initial={{ width: 0 }}
//               animate={{ width: `${progress}%` }}
//               transition={{ duration: 0.5 }}
//               className="h-2 bg-gradient-to-r from-[#021526] via-[#0552A1] to-[#03346E]"
//             />
//           </div>
//         </div>

//         {/* Card */}
//         <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
//           className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20"
//         >
//           {/* Header */}
//           <div className="mb-4 flex items-center gap-4">
//             {step > 0 && (
//               <button onClick={goBack} className="text-white/80 hover:text-white flex items-center gap-1">
//                 <ArrowLeft className="w-5 h-5" /> Back
//               </button>
//             )}
//             <h2 className="text-xl font-semibold text-white">{stepLabels[step]}</h2>
//           </div>

//           {/* Step content */}
//           <div className="space-y-5">
//             {step === 0 && (
//   <div className="space-y-3">
//     <Input
//       label="Host name"
//       placeholder="e.g. Alex & Jordan"
//       value={draft.hostName}
//       onChange={(v) => update({ hostName: v })}
//     />
//     <Input
//       label="Email"
//       placeholder="host@domain.com"
//       value={draft.hostEmail ?? ""}
//       onChange={(v) => update({ hostEmail: v })}
//       type="email"
//     />
//     <Input
//       label="Password"
//       placeholder="Enter password"
//       value={password}
//       onChange={setPassword}
//       type="password"
//     />
//     <Input
//       label="Phone (optional)"
//       placeholder="+91 98XXXXXXXX"
//       value={draft.hostPhone ?? ""}
//       onChange={(v) => update({ hostPhone: v })}
//     />
//   </div>
// )}


//             {step === 1 && (
//               <div className="space-y-3">
//                 <Input label="Event title" placeholder="e.g. Alex & Jordan's Wedding" value={draft.title} onChange={(v) => update({ title: v })} />
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                   <Input label="Date" type="date" value={draft.date} onChange={(v) => update({ date: v })} />
//                   <Input label="Start time" type="time" value={draft.startTime ?? ""} onChange={(v) => update({ startTime: v })} />
//                   <Input label="End time" type="time" value={draft.endTime ?? ""} onChange={(v) => update({ endTime: v })} />
//                 </div>
//               </div>
//             )}

//             {step === 2 && (
//               <div className="space-y-3">
//                 <Input label="Venue name" placeholder="e.g. Lakeside Garden" value={draft.venueName ?? ""} onChange={(v) => update({ venueName: v })} />
//                 <Input label="Address" placeholder="Street, area, city" value={draft.address ?? ""} onChange={(v) => update({ address: v })} />
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                   <Input placeholder="City" value={draft.city ?? ""} onChange={(v) => update({ city: v })} />
//                   <Input placeholder="State" value={draft.state ?? ""} onChange={(v) => update({ state: v })} />
//                   <Input placeholder="Postcode" value={draft.postcode ?? ""} onChange={(v) => update({ postcode: v })} />
//                 </div>
//               </div>
//             )}

//             {step === 3 && (
//               <Slider label="Guests" value={draft.guestCount} min={1} max={2000} onChange={(v) => update({ guestCount: v })}
//                 format={(v) => `${v} guests`} description="Vendors use this to size staff, quantity and seating."
//               />
//             )}

//             {step === 4 && (
//               <Slider label="Budget (INR)" value={draft.budgetINR} min={10000} max={5000000} step={1000} onChange={(v) => update({ budgetINR: v })}
//                 format={rupeeFmt} description="Select your budget to help vendors prepare."
//               />
//             )}
//           </div>

//           {/* Footer */}
//           <div className="mt-6 flex items-center justify-between">
//             <span className="text-sm text-white/70">{step + 1}/{stepLabels.length}</span>
//             <div className="flex gap-3">
//               {step > 0 && <Button onClick={goBack} variant="outline">Back</Button>}
//               <Button onClick={step === stepLabels.length - 1 ? handleSubmit : goNext}>
//                 {loading ? "Processing..." : step === stepLabels.length - 1 ? "Submit" : "Next"}
//               </Button>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// /* --- Input component --- */
// const Input: React.FC<InputProps> = ({ label, value, onChange, placeholder, type = "text" }) => (
//   <div className="flex flex-col gap-1">
//     {label && <label className="text-sm text-white/80">{label}</label>}
//     <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)}
//       className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white placeholder-white/60"
//     />
//   </div>
// );

// /* --- Slider component --- */
// const Slider: React.FC<SliderProps> = ({ label, value, onChange, min, max, step = 1, format, description }) => (
//   <div className="flex flex-col gap-2">
//     {label && <label className="text-sm text-white/80">{label}</label>}
//     <div className="flex items-center gap-4">
//       <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="flex-1 accent-black"/>
//       <span className="w-36 text-right text-white/90 font-medium">{format ? format(value) : value}</span>
//     </div>
//     {description && <div className="text-sm text-white/60">{description}</div>}
//   </div>
// );

// /* --- Button component --- */
// const Button: React.FC<ButtonProps> = ({ children, onClick, variant = "solid" }) => (
//   <button onClick={onClick}
//     className={`px-4 py-2 rounded-md font-medium ${
//       variant === "solid"
//         ? "bg-gradient-to-r from-[#021526] via-[#0552A1] to-[#03346E] text-white"
//         : "border border-white/10 text-white/90"
//     }`}
//   >
//     {children}
//   </button>
// );






"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HostSignup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [hostName, setHostName] = useState("");
  const [hostEmail, setHostEmail] = useState("");
  const [hostPhone, setHostPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hostName || !hostEmail || !password) {
      toast.error("Please fill in Name, Email, and Password.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: hostEmail,
      password,
      options: {
        data: {
          role: "host",
          host_name: hostName,
          phone: hostPhone,
        },
      },
    });
    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Signup successful!", {
        onClose: () => router.push("/vendors"),
        autoClose: 2500,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-[#021526] via-[#03346E] to-[#021526]">
      <ToastContainer position="top-center" />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20"
      >
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Host Signup
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Host Name"
            placeholder="e.g. Alex & Jordan"
            value={hostName}
            onChange={setHostName}
          />
          <Input
            label="Email"
            placeholder="host@domain.com"
            type="email"
            value={hostEmail}
            onChange={setHostEmail}
          />
          <Input
            label="Phone (optional)"
            placeholder="+92 3XX XXXXXXX"
            value={hostPhone}
            onChange={setHostPhone}
          />
          <Input
            label="Password"
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={setPassword}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 mt-4 rounded-md font-medium bg-gradient-to-r from-[#021526] via-[#0552A1] to-[#03346E] text-white hover:opacity-90 transition-colors duration-300"
          >
            {loading ? "Processing..." : "Sign Up"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

/* --- Reusable Input Component --- */
interface InputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}
const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-white/80">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:border-white/30"
    />
  </div>
);
