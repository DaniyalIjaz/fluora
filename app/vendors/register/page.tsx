// "use client";

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import { ArrowLeft } from "lucide-react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// type VendorDraft = {
//   name: string;
//   email: string;
//   phone?: string;
//   bio: string;
//   image?: string;
//   company?: string;
//   services: string[];
//   otherService?: string;
//   city?: string;
//   state?: string;
//   country?: string;
//   availableStartTime?: string;
//   availableEndTime?: string;
//   createdAt?: string;
// };

// const VENDOR_SERVICES = [
//   "Photography & Videography", "Music / DJ", "Catering", "Cake & Desserts", "Decoration & Lighting",
//   "Makeup & Styling", "Transportation", "Venue / Hall", "Furniture & Stage Setup", "Invitation Cards",
//   "Sound System", "Drinks & Bar", "Drone Coverage", "LED Screens / Projectors", "Performers / Entertainment",
//   "Security & Bouncers", "Power Backup / Generators", "Event Planner / Coordinator", "Event Staff / Waiters",
//   "Medical / First Aid Support", "Kids Entertainment", "Fireworks / Light Show", "Other"
// ];

// export default function VendorRegistration() {
//   const router = useRouter();
//   const [step, setStep] = useState(0);

//   // Load draft from localStorage
//   const [draft, setDraft] = useState<VendorDraft>(() => {
//     if (typeof window !== "undefined") {
//       const stored = localStorage.getItem("vendorDraft");
//       if (stored) {
//         try {
//           return JSON.parse(stored) as VendorDraft;
//         } catch {
//           return {
//             name: "", email: "", phone: "", bio: "", image: "", company: "",
//             services: [], otherService: "", city: "", state: "", country: "",
//             availableStartTime: "", availableEndTime: "", createdAt: new Date().toISOString()
//           };
//         }
//       }
//     }
//     return {
//       name: "", email: "", phone: "", bio: "", image: "", company: "",
//       services: [], otherService: "", city: "", state: "", country: "",
//       availableStartTime: "", availableEndTime: "", createdAt: new Date().toISOString()
//     };
//   });

//   // Save draft to localStorage
//   useEffect(() => {
//     localStorage.setItem("vendorDraft", JSON.stringify(draft));
//   }, [draft]);

//   const update = (patch: Partial<VendorDraft>) => setDraft((d) => ({ ...d, ...patch }));

//   // Validation helpers
//   const isEmailValid = (email?: string) => typeof email === "string" && email.includes("@");

//   const stepValid = (s: number) => {
//     if (s === 0) {
//       return (
//         draft.name.trim().length > 1 &&
//         isEmailValid(draft.email) &&
//         draft.bio.trim().length > 5 &&
//         !!draft.image
//       );
//     }
//     if (s === 1) {
//       return (
//         (draft.company ?? "").trim().length > 1 &&
//         (draft.services.length > 0 || (draft.otherService?.trim().length ?? 0) > 1)
//       );
//     }
//     if (s === 2) {
//       return (
//         !!draft.city &&
//         !!draft.state &&
//         !!draft.country &&
//         !!draft.availableStartTime &&
//         !!draft.availableEndTime
//       );
//     }
//     return true;
//   };

//   const goNext = () => {
//     if (!stepValid(step)) {
//       toast.error("Please complete all required fields.");
//       return;
//     }
//     setStep((s) => Math.min(s + 1, 2));
//   };

//   const goBack = () => setStep((s) => Math.max(s - 1, 0));

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => update({ image: reader.result as string });
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = () => {
//     if (!stepValid(2)) {
//       toast.error("Complete all required fields before submitting.");
//       return;
//     }
//     localStorage.setItem("vendorFinal", JSON.stringify(draft));
//     toast.success("Registration complete! Redirecting to profile...");
//     setTimeout(() => router.push("/vendors/profile"), 1800);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#021526] via-[#03346E] to-[#021526] flex items-center justify-center p-6">
//       <ToastContainer position="top-right" />
//       <div className="w-full max-w-3xl">
//         {/* Progress Bar */}
//         <div className="mb-6">
//           <div className="text-sm text-white/80 mb-2">Step {step + 1} of 3</div>
//           <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
//             <motion.div
//               initial={{ width: 0 }}
//               animate={{ width: `${Math.round(((step + 1) / 3) * 100)}%` }}
//               transition={{ duration: 0.45 }}
//               className="h-2 bg-gradient-to-r from-[#021526] via-[#0552A1] to-[#03346E]"
//             />
//           </div>
//         </div>

//         {/* Form Card */}
//         <motion.div
//           initial={{ opacity: 0, y: 12 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.45 }}
//           className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
//         >
//           {/* Header */}
//           <div className="mb-4 flex items-center gap-4">
//             {step > 0 && (
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={goBack}
//                 className="text-white/80 hover:text-white flex items-center gap-2 cursor-pointer"
//               >
//                 <ArrowLeft className="w-5 h-5" /> Back
//               </motion.button>
//             )}
//             <h2 className="text-xl font-semibold text-white">
//               {["Basic Info", "Company & Services", "Location & Availability"][step]}
//             </h2>
//           </div>

//           {/* Step Content */}
//           <div className="space-y-4">
//             {/* Step 0 */}
//             {step === 0 && (
//               <>
//                 <label className="text-sm text-white/80">Full Name</label>
//                 <input
//                   value={draft.name}
//                   onChange={(e) => update({ name: e.target.value })}
//                   className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white placeholder-white/60"
//                 />
//                 <label className="text-sm text-white/80">Email (include @)</label>
//                 <input
//                   type="email"
//                   value={draft.email}
//                   onChange={(e) => update({ email: e.target.value })}
//                   className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white placeholder-white/60"
//                 />
//                 <label className="text-sm text-white/80">Phone (optional)</label>
//                 <input
//                   value={draft.phone}
//                   onChange={(e) => update({ phone: e.target.value })}
//                   className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white placeholder-white/60"
//                 />
//                 <label className="text-sm text-white/80">Bio</label>
//                 <textarea
//                   value={draft.bio}
//                   onChange={(e) => update({ bio: e.target.value })}
//                   rows={4}
//                   className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
//                 />
                

//                 {/* Upload Image Button */}
//                 <label className="text-sm text-white/80 pr-4">Upload Profile Image</label>
//                 <motion.label
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className={`cursor-pointer px-4 py-2 rounded-md inline-block text-center transition-all ${
//                     draft.image
//                       ? "bg-gradient-to-r from-[#021526] via-[#0552A1] to-[#03346E] text-white hover:opacity-90"
//                       : "bg-red-600 text-white hover:bg-red-700"
//                   }`}
//                 >
//                   Choose Image
//                   <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
//                 </motion.label>
//                 {draft.image && (
//                   <img
//                     src={draft.image}
//                     alt="Preview"
//                     className="mt-2 w-32 h-32 object-cover rounded-full border border-white/20"
//                   />
//                 )}
//               </>
//             )}

//             {/* Step 1 */}
//             {step === 1 && (
//               <>
//                 <label className="text-sm text-white/80">Company / Brand Name</label>
//                 <input
//                   value={draft.company}
//                   onChange={(e) => update({ company: e.target.value })}
//                   className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white placeholder-white/60"
//                 />
//                 <label className="text-sm text-white/80">Services you provide</label>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//                   {VENDOR_SERVICES.map((s) => (
//                     <motion.button
//                       key={s}
//                       type="button"
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() =>
//                         update({
//                           services: draft.services.includes(s)
//                             ? draft.services.filter((x) => x !== s)
//                             : [...draft.services, s],
//                         })
//                       }
//                       className={`cursor-pointer text-sm px-3 py-2 rounded-md border transition-all ${
//                         draft.services.includes(s)
//                           ? "bg-gradient-to-r from-[#021526] via-[#0552A1] to-[#03346E] text-white border-transparent"
//                           : "bg-white/5 text-white border-white/10 hover:bg-white/20"
//                       }`}
//                     >
//                       {s}
//                     </motion.button>
//                   ))}
//                 </div>
//                 {draft.services.includes("Other") && (
//                   <input
//                     type="text"
//                     value={draft.otherService}
//                     onChange={(e) => update({ otherService: e.target.value })}
//                     placeholder="Other service"
//                     className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white mt-2"
//                   />
//                 )}
//               </>
//             )}

//             {/* Step 2 */}
//             {step === 2 && (
//               <>
//                 <label className="text-sm text-white/80">City</label>
//                 <input
//                   value={draft.city}
//                   onChange={(e) => update({ city: e.target.value })}
//                   className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
//                 />
//                 <label className="text-sm text-white/80">State</label>
//                 <input
//                   value={draft.state}
//                   onChange={(e) => update({ state: e.target.value })}
//                   className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
//                 />
//                 <label className="text-sm text-white/80">Country</label>
//                 <input
//                   value={draft.country}
//                   onChange={(e) => update({ country: e.target.value })}
//                   className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
//                 />
//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <label className="text-sm text-white/80">Available Start Time</label>
//                     <input
//                       type="time"
//                       value={draft.availableStartTime}
//                       onChange={(e) => update({ availableStartTime: e.target.value })}
//                       className="w-full p-2 rounded-md bg-white/5 border border-white/10 text-white"
//                     />
//                   </div>
//                   <div>
//                     <label className="text-sm text-white/80">Available End Time</label>
//                     <input
//                       type="time"
//                       value={draft.availableEndTime}
//                       onChange={(e) => update({ availableEndTime: e.target.value })}
//                       className="w-full p-2 rounded-md bg-white/5 border border-white/10 text-white"
//                     />
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>

//           {/* Footer */}
//           <div className="mt-6 flex items-center justify-between">
//             <div className="text-sm text-white/70">
//               Step {step + 1} of 3 • {stepValid(step) ? "Ready" : "Incomplete"}
//             </div>
//             <div className="flex items-center gap-3">
//               {step < 2 ? (
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={goNext}
//                   className="px-5 py-2 rounded-md bg-gradient-to-r from-[#021526] via-[#0552A1] to-[#03346E] text-white font-medium transition-all hover:opacity-90 cursor-pointer"
//                 >
//                   Next
//                 </motion.button>
//               ) : (
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={handleSubmit}
//                   className="px-5 py-2 rounded-md bg-green-600 text-white font-medium transition-all hover:bg-green-700 cursor-pointer"
//                 >
//                   Submit
//                 </motion.button>
//               )}
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }
// "use client";

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import { ArrowLeft, Eye, EyeOff } from "lucide-react";
// import { ToastContainer, toast } from "react-toastify";
// import { supabase } from "@/utils/supabase/client";
// import "react-toastify/dist/ReactToastify.css";

// type VendorDraft = {
//   name: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   phone?: string;
//   bio: string;
//   image?: string;
//   company?: string;
//   services: string[];
//   otherService?: string;
//   city?: string;
//   state?: string;
//   country?: string;
//   availableStartTime?: string;
//   availableEndTime?: string;
//   createdAt?: string;
// };

// export default function VendorRegistration() {
//   const router = useRouter();
//   const [step, setStep] = useState(0);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const [draft, setDraft] = useState<VendorDraft>({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone: "",
//     bio: "",
//     image: "",
//     company: "",
//     services: [],
//     otherService: "",
//     city: "",
//     state: "",
//     country: "",
//     availableStartTime: "",
//     availableEndTime: "",
//     createdAt: new Date().toISOString(),
//   });

//   const update = (patch: Partial<VendorDraft>) =>
//     setDraft((d) => ({ ...d, ...patch }));

//   const isEmailValid = (email?: string) =>
//     typeof email === "string" && /\S+@\S+\.\S+/.test(email);

//   const stepValid = (s: number) => {
//     if (s === 0) {
//       return (
//         (draft.name ?? "").trim().length > 1 &&
//         isEmailValid(draft.email) &&
//         (draft.password ?? "").trim().length >= 6 &&
//         (draft.confirmPassword ?? "").trim().length >= 6 &&
//         draft.password === draft.confirmPassword &&
//         (draft.bio ?? "").trim().length > 0 &&
//         !!draft.image
//       );
//     }
//     if (s === 1) {
//       return (
//         (draft.company ?? "").trim().length > 0 &&
//         (draft.services.length > 0 ||
//           (draft.otherService?.trim().length ?? 0) > 0)
//       );
//     }
//     if (s === 2) {
//       return (
//         !!draft.city &&
//         !!draft.state &&
//         !!draft.country &&
//         !!draft.availableStartTime &&
//         !!draft.availableEndTime
//       );
//     }
//     return true;
//   };

//   const goNext = () => {
//     if (!stepValid(step)) {
//       toast.error("Please complete all required fields.");
//       return;
//     }
//     setStep((s) => Math.min(s + 1, 2));
//   };

//   const goBack = () => setStep((s) => Math.max(s - 1, 0));

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => update({ image: reader.result as string });
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = async () => {
//     if (!stepValid(2)) {
//       toast.error("Complete all required fields before submitting.");
//       return;
//     }

//     try {
//       const { data: authData, error: authError } = await supabase.auth.signUp({
//         email: draft.email,
//         password: draft.password,
//       });

//       if (authError) {
//         toast.error("Signup failed: " + authError.message);
//         return;
//       }

//       const userId = authData.user?.id;
//       if (!userId) {
//         toast.error("User not created.");
//         return;
//       }

//       const { error: insertError } = await supabase.from("vendors").insert([
//         {
//           id: userId,
//           name: draft.name,
//           email: draft.email,
//           phone: draft.phone,
//           bio: draft.bio,
//           image: draft.image,
//           company: draft.company,
//           services: draft.services,
//           other_service: draft.otherService,
//           city: draft.city,
//           state: draft.state,
//           country: draft.country,
//           available_start_time: draft.availableStartTime,
//           available_end_time: draft.availableEndTime,
//           created_at: draft.createdAt,
//         },
//       ]);

//       if (insertError) {
//         toast.error("Error saving vendor profile: " + insertError.message);
//         return;
//       }

//       toast.success("Registration complete! Redirecting...");
//       setTimeout(() => router.push("/vendors/profile"), 2000);
//     } catch (err: any) {
//       toast.error("Unexpected error: " + err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#021526] via-[#03346E] to-[#021526] flex items-center justify-center p-6">
//       <ToastContainer position="top-right" />
//       <div className="w-full max-w-3xl">
//         {/* Progress */}
//         <div className="mb-6">
//           <div className="text-sm text-white/80 mb-2">
//             Step {step + 1} of 3
//           </div>
//           <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
//             <motion.div
//               initial={{ width: 0 }}
//               animate={{ width: `${Math.round(((step + 1) / 3) * 100)}%` }}
//               transition={{ duration: 0.45 }}
//               className="h-2 bg-gradient-to-r from-[#021526] via-[#0552A1] to-[#03346E]"
//             />
//           </div>
//         </div>

//         {/* Form */}
//         <motion.div
//           initial={{ opacity: 0, y: 12 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.45 }}
//           className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
//         >
//           <div className="mb-4 flex items-center gap-4">
//             {step > 0 && (
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={goBack}
//                 className="text-white/80 hover:text-white flex items-center gap-2"
//               >
//                 <ArrowLeft className="w-5 h-5" /> Back
//               </motion.button>
//             )}
//             <h2 className="text-xl font-semibold text-white">
//               {["Basic Info", "Company & Services", "Location & Availability"][
//                 step
//               ]}
//             </h2>
//           </div>

//           <div className="space-y-4">
//             {step === 0 && (
//               <>
//                 <input
//                   placeholder="Full Name"
//                   value={draft.name}
//                   onChange={(e) => update({ name: e.target.value })}
//                   className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   value={draft.email}
//                   onChange={(e) => update({ email: e.target.value })}
//                   className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
//                 />

//                 {/* Password with toggle */}
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Password"
//                     value={draft.password}
//                     onChange={(e) => update({ password: e.target.value })}
//                     className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white pr-10"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword((p) => !p)}
//                     className="absolute inset-y-0 right-3 flex items-center text-white/70 hover:text-white"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="w-5 h-5" />
//                     ) : (
//                       <Eye className="w-5 h-5" />
//                     )}
//                   </button>
//                 </div>

//                 {/* Confirm Password */}
//                 <div className="relative">
//                   <input
//                     type={showConfirm ? "text" : "password"}
//                     placeholder="Confirm Password"
//                     value={draft.confirmPassword}
//                     onChange={(e) => update({ confirmPassword: e.target.value })}
//                     className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white pr-10"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirm((p) => !p)}
//                     className="absolute inset-y-0 right-3 flex items-center text-white/70 hover:text-white"
//                   >
//                     {showConfirm ? (
//                       <EyeOff className="w-5 h-5" />
//                     ) : (
//                       <Eye className="w-5 h-5" />
//                     )}
//                   </button>
//                 </div>

//                 <input
//                   placeholder="Phone (optional)"
//                   value={draft.phone}
//                   onChange={(e) => update({ phone: e.target.value })}
//                   className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
//                 />
//                 <textarea
//                   placeholder="Bio"
//                   value={draft.bio}
//                   onChange={(e) => update({ bio: e.target.value })}
//                   rows={3}
//                   className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
//                 />
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="text-white"
//                 />
//                 {draft.image && (
//                   <img
//                     src={draft.image}
//                     className="mt-2 w-24 h-24 object-cover rounded-full"
//                   />
//                 )}
//               </>
//             )}

//             {step === 1 && (
//               <>
//                 <input
//                   placeholder="Company Name"
//                   value={draft.company}
//                   onChange={(e) => update({ company: e.target.value })}
//                   className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
//                 />
//                 <input
//                   placeholder="Services (comma separated)"
//                   value={draft.services.join(", ")}
//                   onChange={(e) =>
//                     update({
//                       services: e.target.value
//                         .split(",")
//                         .map((s) => s.trim())
//                         .filter(Boolean),
//                     })
//                   }
//                   className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
//                 />
//                 <input
//                   placeholder="Other Service (optional)"
//                   value={draft.otherService}
//                   onChange={(e) => update({ otherService: e.target.value })}
//                   className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
//                 />
//               </>
//             )}

//             {step === 2 && (
//               <>
//                 <input
//                   placeholder="City"
//                   value={draft.city}
//                   onChange={(e) => update({ city: e.target.value })}
//                   className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
//                 />
//                 <input
//                   placeholder="State"
//                   value={draft.state}
//                   onChange={(e) => update({ state: e.target.value })}
//                   className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
//                 />
//                 <input
//                   placeholder="Country"
//                   value={draft.country}
//                   onChange={(e) => update({ country: e.target.value })}
//                   className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
//                 />
//                 <input
//                   type="time"
//                   value={draft.availableStartTime}
//                   onChange={(e) =>
//                     update({ availableStartTime: e.target.value })
//                   }
//                   className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
//                 />
//                 <input
//                   type="time"
//                   value={draft.availableEndTime}
//                   onChange={(e) => update({ availableEndTime: e.target.value })}
//                   className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
//                 />
//               </>
//             )}
//           </div>

//           <div className="mt-6 flex items-center justify-between">
//             <div className="text-sm text-white/70">
//               Step {step + 1} of 3 • {stepValid(step) ? "Ready" : "Incomplete"}
//             </div>
//             <div className="flex items-center gap-3">
//               {step < 2 ? (
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={goNext}
//                   className="px-5 py-2 rounded-md bg-gradient-to-r from-[#021526] via-[#0552A1] to-[#03346E] text-white font-medium"
//                 >
//                   Next
//                 </motion.button>
//               ) : (
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={handleSubmit}
//                   className="px-5 py-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700"
//                 >
//                   Submit
//                 </motion.button>
//               )}
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "@/utils/supabase/client";

type VendorDraft = {
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  bio: string;
  image?: string;
  company?: string;
  services: string[];
  otherService?: string;
  city?: string;
  state?: string;
  country?: string;
  availableStartTime?: string;
  availableEndTime?: string;
  createdAt?: string;
};

const VENDOR_SERVICES = [
  "Photography & Videography", "Music / DJ", "Catering", "Cake & Desserts", "Decoration & Lighting",
  "Makeup & Styling", "Transportation", "Venue / Hall", "Furniture & Stage Setup", "Invitation Cards",
  "Sound System", "Drinks & Bar", "Drone Coverage", "LED Screens / Projectors", "Performers / Entertainment",
  "Security & Bouncers", "Power Backup / Generators", "Event Planner / Coordinator", "Event Staff / Waiters",
  "Medical / First Aid Support", "Kids Entertainment", "Fireworks / Light Show", "Other"
];

export default function VendorRegistration() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Draft state
  const [draft, setDraft] = useState<VendorDraft>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    bio: "",
    image: "",
    company: "",
    services: [],
    otherService: "",
    city: "",
    state: "",
    country: "",
    availableStartTime: "",
    availableEndTime: "",
    createdAt: new Date().toISOString(),
  });

  // Save draft to localStorage for persistence
  useEffect(() => {
    localStorage.setItem("vendorDraft", JSON.stringify(draft));
  }, [draft]);

  const update = (patch: Partial<VendorDraft>) => setDraft((d) => ({ ...d, ...patch }));

  const isEmailValid = (email?: string) => typeof email === "string" && email.includes("@");

  const stepValid = (s: number) => {
    if (s === 0) {
      return (
        draft.name.trim().length > 1 &&
        isEmailValid(draft.email) &&
        (draft.password?.length ?? 0) >= 6 &&
        draft.password === draft.confirmPassword &&
        draft.bio.trim().length > 5 &&
        !!draft.image
      );
    }
    if (s === 1) {
      return (
        (draft.company ?? "").trim().length > 1 &&
        (draft.services.length > 0 || (draft.otherService?.trim().length ?? 0) > 1)
      );
    }
    if (s === 2) {
      return (
        !!draft.city &&
        !!draft.state &&
        !!draft.country &&
        !!draft.availableStartTime &&
        !!draft.availableEndTime
      );
    }
    return true;
  };

  const goNext = () => {
    if (!stepValid(step)) {
      toast.error("Please complete all required fields.");
      return;
    }
    setStep((s) => Math.min(s + 1, 2));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update({ image: reader.result as string });
    reader.readAsDataURL(file);
  };

  // Submit to Supabase
  const handleSubmit = async () => {
    if (!stepValid(2)) {
      toast.error("Complete all required fields before submitting.");
      return;
    }

    // 1. Sign up in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: draft.email,
      password: draft.password!,
    });

    if (authError) {
      toast.error(authError.message);
      return;
    }

    const userId = authData.user?.id;
    if (!userId) {
      toast.error("Signup failed. Try again.");
      return;
    }

    // 2. Insert vendor profile in Supabase
    const { error: dbError } = await supabase.from("vendors").insert({
      id: userId,
      name: draft.name,
      email: draft.email,
      phone: draft.phone,
      bio: draft.bio,
      image: draft.image,
      company: draft.company,
      services: draft.services,
      otherService: draft.otherService,
      city: draft.city,
      state: draft.state,
      country: draft.country,
      availableStartTime: draft.availableStartTime,
      availableEndTime: draft.availableEndTime,
    });

    if (dbError) {
      toast.error(dbError.message);
      return;
    }

    toast.success("Registration complete! Redirecting...");
    setTimeout(() => router.push("/vendors/profile"), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#021526] via-[#03346E] to-[#021526] flex items-center justify-center p-6">
      <ToastContainer position="top-right" />
      <div className="w-full max-w-3xl">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="text-sm text-white/80 mb-2">Step {step + 1} of 3</div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.round(((step + 1) / 3) * 100)}%` }}
              transition={{ duration: 0.45 }}
              className="h-2 bg-gradient-to-r from-[#021526] via-[#0552A1] to-[#03346E]"
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
          <div className="mb-4 flex items-center gap-4">
            {step > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goBack}
                className="text-white/80 hover:text-white flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" /> Back
              </motion.button>
            )}
            <h2 className="text-xl font-semibold text-white">
              {["Basic Info", "Company & Services", "Location & Availability"][step]}
            </h2>
          </div>

          {/* Step Content */}
          <div className="space-y-4">
            {/* Step 0 */}
            {step === 0 && (
              <>
                <label className="text-sm text-white/80">Full Name</label>
                <input
                  value={draft.name}
                  onChange={(e) => update({ name: e.target.value })}
                  className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white placeholder-white/60"
                />
                <label className="text-sm text-white/80">Email</label>
                <input
                  type="email"
                  value={draft.email}
                  onChange={(e) => update({ email: e.target.value })}
                  className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white placeholder-white/60"
                />

                <label className="text-sm text-white/80">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={draft.password}
                    onChange={(e) => update({ password: e.target.value })}
                    className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>

                <label className="text-sm text-white/80">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={draft.confirmPassword}
                    onChange={(e) => update({ confirmPassword: e.target.value })}
                    className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400"
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>

                <label className="text-sm text-white/80">Phone</label>
                <input
                  value={draft.phone}
                  onChange={(e) => update({ phone: e.target.value })}
                  className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
                />

                <label className="text-sm text-white/80">Bio</label>
                <textarea
                  value={draft.bio}
                  onChange={(e) => update({ bio: e.target.value })}
                  rows={4}
                  className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
                />

                <label className="text-sm text-white/80 pr-4">Upload Profile Image</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-2" />
                {draft.image && (
                  <img
                    src={draft.image}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover rounded-full border border-white/20"
                  />
                )}
              </>
            )}

            {/* Step 1 */}
            {step === 1 && (
              <>
                <label className="text-sm text-white/80">Company / Brand</label>
                <input
                  value={draft.company}
                  onChange={(e) => update({ company: e.target.value })}
                  className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
                />
                <label className="text-sm text-white/80">Services</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {VENDOR_SERVICES.map((s) => (
                    <motion.button
                      key={s}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        update({
                          services: draft.services.includes(s)
                            ? draft.services.filter((x) => x !== s)
                            : [...draft.services, s],
                        })
                      }
                      className={`cursor-pointer text-sm px-3 py-2 rounded-md border transition-all ${
                        draft.services.includes(s)
                          ? "bg-gradient-to-r from-[#021526] via-[#0552A1] to-[#03346E] text-white border-transparent"
                          : "bg-white/5 text-white border-white/10 hover:bg-white/20"
                      }`}
                    >
                      {s}
                    </motion.button>
                  ))}
                </div>
                {draft.services.includes("Other") && (
                  <input
                    value={draft.otherService}
                    onChange={(e) => update({ otherService: e.target.value })}
                    placeholder="Other service"
                    className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white mt-2"
                  />
                )}
              </>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <>
                <label className="text-sm text-white/80">City</label>
                <input
                  value={draft.city}
                  onChange={(e) => update({ city: e.target.value })}
                  className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
                />
                <label className="text-sm text-white/80">State</label>
                <input
                  value={draft.state}
                  onChange={(e) => update({ state: e.target.value })}
                  className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
                />
                <label className="text-sm text-white/80">Country</label>
                <input
                  value={draft.country}
                  onChange={(e) => update({ country: e.target.value })}
                  className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
                />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-white/80">Available Start</label>
                    <input
                      type="time"
                      value={draft.availableStartTime}
                      onChange={(e) => update({ availableStartTime: e.target.value })}
                      className="w-full p-2 rounded-md bg-white/5 border border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-white/80">Available End</label>
                    <input
                      type="time"
                      value={draft.availableEndTime}
                      onChange={(e) => update({ availableEndTime: e.target.value })}
                      className="w-full p-2 rounded-md bg-white/5 border border-white/10 text-white"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-white/70">
              Step {step + 1} of 3 • {stepValid(step) ? "Ready" : "Incomplete"}
            </div>
            <div className="flex items-center gap-3">
              {step < 2 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={goNext}
                  className="px-5 py-2 rounded-md bg-gradient-to-r from-[#021526] via-[#0552A1] to-[#03346E] text-white font-medium"
                >
                  Next
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  className="px-5 py-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700"
                >
                  Submit
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
