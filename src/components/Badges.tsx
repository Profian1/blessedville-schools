import { motion } from "framer-motion";
import { GraduationCap, Star, Heart, Globe, type LucideIcon } from "lucide-react";
import { BADGES } from "../data";
import { Container, SectionHeading, EASE } from "../lib/ui";

const ICONS: Record<string, LucideIcon> = { GraduationCap, Star, Heart, Globe };

export default function Badges() {
  return (
    <section className="relative -mt-1 overflow-hidden py-20 sm:py-28">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/home/outdoor2.jpeg)" }}
      />
      <div className="absolute inset-0 bg-navy/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,184,19,0.12),transparent_45%)]" />
      <Container className="relative">
        <SectionHeading
          light
          eyebrow="Why Families Choose Us"
          title={<>A foundation built on <span className="text-gold-gradient">trust and values</span>.</>}
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BADGES.map((b, i) => {
            const Icon = ICONS[b.icon] ?? Star;
            return (
              <motion.div
                key={b.text}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
                className="group flex flex-col items-center rounded-3xl border border-white/10 bg-white/5 p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_-22px_rgba(8,8,8,0.35)]"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-gold transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-navy">
                  <Icon className="h-8 w-8" />
                </span>
                <p className="mt-5 font-display text-lg font-semibold text-white">{b.text}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
