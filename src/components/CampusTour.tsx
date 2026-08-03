import { motion } from "framer-motion";
import { MapPin, Play, RotateCcw } from "lucide-react";
import { CAMPUS_HOTSPOTS } from "../data";
import { Container, Reveal, SectionHeading, EASE } from "../lib/ui";

export default function CampusTour() {
  return (
    <section id="campus" className="relative bg-navy py-24 sm:py-32">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-royal/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />

      <Container className="relative">
        <SectionHeading
          light
          eyebrow="Virtual Tour"
          title={<>Step inside <span className="text-gold-gradient">Blessedville</span>.</>}
          subtitle="Explore our school from anywhere. Hover over the map to discover our learning spaces — or take a closer look at our classrooms and play areas."
        />

        <Reveal delay={0.1} className="mt-14">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)]">
            <img
              src="/home.jpg"
              alt="Aerial view of the Blessedville Schools campus"
              className="h-[28rem] w-full object-cover sm:h-[34rem]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-navy/30" />

            {/* Hotspots */}
            {CAMPUS_HOTSPOTS.map((h) => (
              <div
                key={h.label}
                className="group absolute z-10"
                style={{ top: h.top, left: h.left }}
              >
                <span className="relative flex h-5 w-5 items-center justify-center">
                  <span className="absolute h-5 w-5 animate-ping rounded-full bg-gold/60" />
                  <span className="relative h-3 w-3 rounded-full bg-gold ring-4 ring-gold/30 transition-transform group-hover:scale-125" />
                </span>
                <span className="absolute left-1/2 top-7 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-navy opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
                  {h.label}
                </span>
              </div>
            ))}

            {/* Center play */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <button
                aria-label="Play drone tour"
                className="goldpulse flex h-20 w-20 items-center justify-center rounded-full bg-gold text-navy transition-transform hover:scale-105"
              >
                <Play className="ml-1 h-8 w-8 fill-current" />
              </button>
              <p className="mt-5 max-w-xs font-display text-xl text-white">Take a closer look</p>
            </div>
          </div>

          {/* Quick links */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: RotateCcw, t: "Classroom Tour", d: "Peek inside our warm, colourful learning spaces." },
              { icon: MapPin, t: "Find Us", d: "Located along the Northern Bypass, Kahawa West." },
              { icon: Play, t: "Virtual Walkthrough", d: "Experience a day at Blessedville from home." },
            ].map((c) => (
              <motion.div
                key={c.t}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/20 text-gold">
                  <c.icon className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="font-semibold text-white">{c.t}</h4>
                  <p className="mt-1 text-sm text-white/60">{c.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
