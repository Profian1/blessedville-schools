import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Trophy, Star, GraduationCap, Globe, ChevronDown, PlayCircle } from "lucide-react";
import { BADGES, HERO_IMAGES, SCHOOL } from "../data";
import { Button, EASE } from "../lib/ui";

const ICONS: Record<string, React.ElementType> = { Trophy, Star, GraduationCap, Globe };

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.2 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % HERO_IMAGES.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Background crossfade */}
      {HERO_IMAGES.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={src}
            alt=""
            aria-hidden
            className={`h-full w-full object-cover ${i === active ? "kenburns" : ""}`}
          />
        </div>
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/65 to-navy/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-navy/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(212,175,55,0.16),transparent_55%)]" />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-28 pb-24 sm:px-8 lg:px-10"
      >
        <motion.div variants={item} className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold-light">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          Est. {SCHOOL.founded} · {SCHOOL.motto}
        </motion.div>

        <motion.h1
          variants={item}
          className="max-w-4xl font-display text-5xl font-semibold leading-[1.05] text-white sm:text-6xl lg:text-7xl"
        >
          Shaping Tomorrow's
          <span className="block text-gold-gradient">Leaders Today.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-7 max-w-xl text-lg leading-relaxed text-white/80"
        >
          Empowering young minds through excellence, innovation, discipline, and character — a
          premium international education for a changing world.
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
          <Button href="#admissions" variant="gold">
            Book a School Tour
          </Button>
          <Button href="#admissions" variant="outline">
            <PlayCircle className="h-4 w-4" />
            Apply Online
          </Button>
        </motion.div>

        {/* Floating achievement badges */}
        <motion.div variants={item} className="mt-14 flex flex-wrap gap-3">
          {BADGES.map((b) => {
            const Icon = ICONS[b.icon] ?? Trophy;
            return (
              <div
                key={b.text}
                className="floaty inline-flex items-center gap-3 rounded-2xl glass-dark px-4 py-3"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/20 text-gold">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium text-white/90">{b.text}</span>
              </div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <a
        href="#stats"
        aria-label="Scroll to explore"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/70 sm:flex"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/40 p-1">
          <span className="scrolldot h-1.5 w-1.5 rounded-full bg-gold" />
        </span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
