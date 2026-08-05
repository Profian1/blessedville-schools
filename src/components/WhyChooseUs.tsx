import { motion } from "framer-motion";
import {
  Users,
  GraduationCap,
  MonitorSmartphone,
  BookOpen,
  Sparkles,
  Shield,
  Handshake,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { WHY } from "../data";
import { Container, SectionHeading, EASE } from "../lib/ui";

const ICONS: Record<string, LucideIcon> = {
  Users,
  GraduationCap,
  MonitorSmartphone,
  BookOpen,
  Sparkles,
  Shield,
  Handshake,
  Heart,
};

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-mist py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <Container>
        <SectionHeading
          eyebrow="Why Blessedville"
          title={<>An education designed to <span className="text-gold-gradient">matter</span>.</>}
        />

        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {WHY.map((w, i) => {
            const Icon = ICONS[w.icon] ?? Sparkles;
            return (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.07 }}
              >
                <div className="group relative h-full overflow-hidden rounded-3xl border border-white bg-white p-7 shadow-[0_14px_40px_-22px_rgba(8,8,8,0.35)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-24px_rgba(8,8,8,0.5)]">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-gold transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-navy">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold text-navy">
                    {w.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60">
                    {w.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
