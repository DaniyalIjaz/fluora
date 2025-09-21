// "use client";
// import React from "react";
// import CardSwap, { Card } from "../../components/ui/CardSwap";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import DomeGallery from "@/components/ui/DomeGallery";

// import { useInView } from "react-intersection-observer";

// const events = [
//   {
//     title: "Wedding Ceremony",
//     description: "A beautiful wedding event with floral decor and stage setup.",
//     image: "/images/events/1.jpg",
//   },
//   {
//     title: "Corporate Event",
//     description: "Professional corporate setup with stage, screens, and seating.",
//     image: "/images/events/2.jpg",
//   },
//   {
//     title: "Birthday Party",
//     description: "Fun-filled birthday event with balloons, cake, and music.",
//     image: "/images/events/3.jpg",
//   },
//   {
//     title: "Sound System & DJ",
//     description: "Energetic DJ party with professional sound and lighting.",
//     image: "/images/events/4.jpg",
//   },
//   {
//     title: "Photography",
//     description: "Capturing beautiful memories with professional photography.",
//     image: "/images/events/5.jpg",
//   },
// ];

// const happeningEvents = [
//   {
//     name: "Music Festival",
//     date: "25th Sept 2025",
//     location: "Lahore Expo Center",
//     description:
//       "A night full of music and energy with top DJs and artists performing live.",
//   },
//   {
//     name: "Wedding Expo",
//     date: "10th Oct 2025",
//     location: "Karachi Marriott",
//     description:
//       "Meet top wedding planners, decorators, and vendors all in one place.",
//   },
//   {
//     name: "Corporate Meetup",
//     date: "20th Nov 2025",
//     location: "Islamabad Serena Hotel",
//     description:
//       "Networking event for professionals with keynote speakers and workshops.",
//   },
// ];


// const Page = () => {


//    const { ref, inView } = useInView({
//     triggerOnce: true,
//     threshold: 0.2, // trigger when 20% is visible
//   });



//   return (
//     <div className="bg-gradient-to-b from-[#021526] via-[#03346E] to-[#021526] text-white overflow-hidden">
//       {/*  Featured Event Section */}
//       <div className="pt-36 pb-48 px-6 max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
//         {/* Animated Text Left */}
//         <motion.div
//           initial={{ opacity: 0, x: -60 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="space-y-6"
//         >
//           <motion.h2
//             className="text-4xl font-bold leading-tight"
//             initial={{ opacity: 0, y: -20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//           >
//             Experience Unforgettable Events
//           </motion.h2>
//           <motion.p
//             className="text-lg opacity-80 max-w-md"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//           >
//             From weddings to corporate meetups and live concerts, our platform
//             connects you with trusted vendors and planners to make every event
//             extraordinary.
//           </motion.p>
//         </motion.div>

//         {/* Swipeable Event Cards Right */}
//         <motion.div
//           style={{  position: "relative" }}
//           className="relative -ml-10 md:-ml-20 h-[270px] md:h-[570px]"
//           initial={{ opacity: 0, x: 60 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, delay: 0.3 }}
//           viewport={{ once: true }}
//         >
//           <CardSwap
//             cardDistance={60}
//             verticalDistance={70}
//             delay={5000}
//             pauseOnHover={true}
//           >
//             {events.map((event, idx) => (
//               <Card key={idx}>
//                 <motion.div
//                   className="flex flex-col items-center text-center"
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.6, delay: idx * 0.15 }}
//                 >
//                   <div className="relative w-96 h-80 rounded-lg overflow-hidden shadow-lg mb-4">
//                     <Image
//                       src={event.image}
//                       alt={event.title}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                   <h3 className="text-lg font-semibold">{event.title}</h3>
//                   <p className="text-sm mt-2 opacity-80">
//                     {event.description}
//                   </p>
//                 </motion.div>
//               </Card>
//             ))}
//           </CardSwap>
//         </motion.div>
//       </div>
      
      


// {/* Dome Gallery  */}

//   <div
//       style={{ width: "100vw" }}
//       className="flex flex-col items-center justify-center md:py-16 h-[100vh] md:h-[150vh]"
//     >
//       {/* Animated Heading + Paragraph */}
//       <motion.div
//         ref={ref}
//         initial={{ opacity: 0, y: 50 }}
//         animate={inView ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         className="text-center max-w-3xl"
//       >
//         <h2 className="text-4xl md:text-5xl font-bold py-10">
//          Events Gallery
//         </h2>
//         <p className="text-lg md:text-xl text-gray-400">
//           Explore moments captured from our past events — bringing people,
//           creativity, and unforgettable experiences together.
//         </p>
//       </motion.div>
//         <DomeGallery />



//     </div>













//       {/* 🎤 Happening Events Section */}
//       <motion.div
//         className="pb-40 px-6 max-w-6xl mx-auto"
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         viewport={{ once: true }}
//       >
//         <motion.h2
//           className="text-center text-3xl font-bold mb-12"
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//         >
//           Happening Events
//         </motion.h2>

//         <div className="grid md:grid-cols-3 gap-8">
//           {happeningEvents.map((event, idx) => (
//             <motion.div
//               key={idx}
//               className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: idx * 0.2 }}
//               viewport={{ once: true }}
//             >
//               <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
//               <p className="text-sm opacity-80">{event.date}</p>
//               <p className="text-sm opacity-80 mb-4">{event.location}</p>
//               <p className="text-sm">{event.description}</p>
//             </motion.div>
//           ))}
//         </div>

//       </motion.div>
       
//     </div>
//   );
// };

// export default Page;




"use client";
import React, { useEffect, useState } from "react";
import CardSwap, { Card } from "../../components/ui/CardSwap";
import { motion } from "framer-motion";
import Image from "next/image";
import DomeGallery from "@/components/ui/DomeGallery";
import { useInView } from "react-intersection-observer";
import { supabase } from "@/utils/supabase/client"; // ✅ import supabase client

type Event = {
  id: string;
  event_title: string;
  event_date: string;
  venue_name: string;
  city: string;
  address?: string;
  notes?: string;
};

const events = [
  {
    title: "Wedding Ceremony",
    description: "A beautiful wedding event with floral decor and stage setup.",
    image: "/images/events/1.jpg",
  },
  {
    title: "Corporate Event",
    description: "Professional corporate setup with stage, screens, and seating.",
    image: "/images/events/2.jpg",
  },
  {
    title: "Birthday Party",
    description: "Fun-filled birthday event with balloons, cake, and music.",
    image: "/images/events/3.jpg",
  },
  {
    title: "Sound System & DJ",
    description: "Energetic DJ party with professional sound and lighting.",
    image: "/images/events/4.jpg",
  },
  {
    title: "Photography",
    description: "Capturing beautiful memories with professional photography.",
    image: "/images/events/5.jpg",
  },
];

const Page = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // 🔥 State for happening events
  const [happeningEvents, setHappeningEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("id, event_title, event_date, venue_name, city, address, notes")
        .order("event_date", { ascending: true })
        .limit(6);

      if (error) {
        console.error("Error fetching events:", error.message);
      } else {
        setHappeningEvents(data || []);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#021526] via-[#03346E] to-[#021526] text-white overflow-hidden">
      {/*  Featured Event Section */}
      <div className="pt-36 pb-48 px-6 max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
        {/* Animated Text Left */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <motion.h2
            className="text-4xl font-bold leading-tight"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience Unforgettable Events
          </motion.h2>
          <motion.p
            className="text-lg opacity-80 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            From weddings to corporate meetups and live concerts, our platform
            connects you with trusted vendors and planners to make every event
            extraordinary.
          </motion.p>
        </motion.div>

        {/* Swipeable Event Cards Right */}
        <motion.div
          style={{ position: "relative" }}
          className="relative -ml-10 md:-ml-20 h-[270px] md:h-[570px]"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <CardSwap
            cardDistance={60}
            verticalDistance={70}
            delay={5000}
            pauseOnHover={true}
          >
            {events.map((event, idx) => (
              <Card key={idx}>
                <motion.div
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                >
                  <div className="relative w-96 h-80 rounded-lg overflow-hidden shadow-lg mb-4">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <p className="text-sm mt-2 opacity-80">{event.description}</p>
                </motion.div>
              </Card>
            ))}
          </CardSwap>
        </motion.div>
      </div>



         {/* 🎤 Happening Events Section */}
      <motion.div
        className="pb-40 px-6 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-center text-3xl font-bold mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Events Happening Now
        </motion.h2>

        {loading ? (
          <p className="text-center opacity-70">Loading events...</p>
        ) : happeningEvents.length === 0 ? (
          <p className="text-center opacity-70">No events happening right now.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {happeningEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-2">
                  {event.event_title}
                </h3>
                <p className="text-sm opacity-80">
                  📅 {new Date(event.event_date).toLocaleDateString()}
                </p>
                <p className="text-sm opacity-80 mb-4">
                  📍 {event.venue_name}, {event.city}
                </p>
                {event.notes && <p className="text-sm">{event.notes}</p>}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Dome Gallery */}
      <div
        style={{ width: "100vw" }}
        className="flex flex-col items-center justify-center md:py-16 h-[100vh] md:h-[150vh]"
      >
        {/* Animated Heading + Paragraph */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold py-10">Events Gallery</h2>
          <p className="text-lg md:text-xl text-gray-400">
            Explore moments captured from our past events — bringing people,
            creativity, and unforgettable experiences together.
          </p>
        </motion.div>
        <DomeGallery />
      </div>

   
    </div>
  );
};

export default Page;
