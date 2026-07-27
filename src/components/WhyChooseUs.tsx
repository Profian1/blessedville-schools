import { motion } from "framer-motion";
import {
  Users,
  GraduationCap,
  MonitorSmartphone,
  FlaskConical,
  BookOpen,
  Trophy,
  Sparkles,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { WHY } from "../data";
import { Container, SectionHeading, EASE } from "../lib/ui";

const ICONS: Record<string, LucideIcon> = {
  Users,
  GraduationCap,
  MonitorSmartphone,
  FlaskConical,
  BookOpen,
  Trophy,
  Sparkles,
  Globe,
};

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-mist py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <Container>
        <SectionHeading
          eyebrow="Why Meridian"
          title={<>An education designed to <span className="text-gold-gradient">matter</span>.</>}
          subtitle="Small details, big differences. Everything we do is built around the child at the centre of it all."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                <div className="group relative h-full overflow-hidden rounded-3xl border border-white bg-white p-7 shadow-[0_14px_40px_-22px_rgba(11,31,58,0.35)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-24px_rgba(11,31,58,0.5)]">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy/0 via-navy/0 to-gold/0 transition-all duration-500 group-hover:from-navy/5 group-hover:to-gold/10" />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-gold transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-navy">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="relative mt-6 font-display text-xl font-semibold text-navy">
                    {w.title}
                  </h3>
                  <p className="relative mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-ink/60 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
                    {w.text}
                  </p>
                  {/* Visible summary for no-hover devices */}
                  <p className="relative mt-3 text-sm leading-relaxed text-ink/60 transition-opacity duration-300 group-hover:hidden">
                    {w.text.slice(0, 48)}…
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
