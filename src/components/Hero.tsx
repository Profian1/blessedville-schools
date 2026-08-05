import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { PlayCircle } from "lucide-react";
import { HERO_IMAGES } from "../data";
import { Button, EASE } from "../lib/ui";

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
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden sm:h-[130vh] sm:min-h-0">
      {/* Background crossfade */}
      {HERO_IMAGES.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out ${i === active ? "opacity-100" : "opacity-0"
            }`}
        >
          <img
            src={src}
            alt=""
            aria-hidden
            className={`h-full w-full object-cover object-center ${i === active ? "kenburns" : ""}`}
          />
        </div>
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/45 via-navy/25 to-navy/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/35 via-transparent to-navy/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(245,184,19,0.10),transparent_55%)]" />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-52 pb-44 sm:px-8 lg:px-10"
      >
        <motion.h1
          variants={item}
          className="max-w-4xl font-display text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl"
        >
          Where Little Minds
          <span className="block text-gold-gradient">Sparkle and Grow.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 max-w-xl text-base leading-relaxed text-white/80"
        >
          At Blessedville Schools, we nurture confident, curious learners through the Competency-Based Curriculum, caring teachers, and strong Christian values.
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
          <Button href="/contact" variant="gold">
            Book a School Tour
          </Button>
          <Button href="/admissions" variant="outline">
            <PlayCircle className="h-4 w-4" />
            Enroll Today
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator removed */}
    </section>
  );
}
