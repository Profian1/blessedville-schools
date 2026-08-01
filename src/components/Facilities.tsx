import { motion } from "framer-motion";
import {
  Waves,
  Disc,
  Music,
  Sparkles,
  Trophy,
  TreeDeciduous,
  Palette,
  type LucideIcon,
} from "lucide-react";
import { FACILITIES } from "../data";
import { Container, SectionHeading, EASE } from "../lib/ui";

const ICONS: Record<string, LucideIcon> = {
  Waves,
  Disc,
  Music,
  Sparkles,
  Trophy,
  TreeDeciduous,
  Palette,
};

export default function Facilities() {
  return (
    <section className="bg-mist py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Co-curricular Activities"
          title={<>Activities that <span className="text-gold-gradient">spark joy</span>.</>}
          subtitle="From splashing in the pool to painting masterpieces — our activities build confidence, creativity, and teamwork in every child."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FACILITIES.map((f, i) => {
            const Icon = ICONS[f.icon] ?? Sparkles;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, ease: EASE, delay: (i % 3) * 0.1 }}
                className="group overflow-hidden rounded-3xl bg-white shadow-[0_14px_40px_-24px_rgba(30,90,168,0.35)]"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={f.image}
                    alt={f.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                  <span className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 text-navy backdrop-blur transition-colors group-hover:bg-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="font-display text-xl font-semibold text-navy">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{f.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
