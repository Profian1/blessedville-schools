import { motion } from "framer-motion";
import { Trophy, Globe, Music, Star, Award, Heart, type LucideIcon } from "lucide-react";
import { ACHIEVEMENTS } from "../data";
import { Container, SectionHeading, EASE } from "../lib/ui";

const ICONS: Record<string, LucideIcon> = {
  Trophy,
  Globe,
  Music,
  Star,
  Award,
  Heart,
};

export default function Achievements() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-32 top-40 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      <Container>
        <SectionHeading
          eyebrow="Achievements"
          title={<>A record of <span className="text-gold-gradient">growth and excellence</span>.</>}
          subtitle="Our learners and teachers consistently demonstrate the impact of quality CBC education and a nurturing environment."
        />

        <div className="relative mx-auto mt-16 max-w-4xl">
          {/* center line */}
          <div className="absolute left-[28px] top-0 h-full w-px bg-gradient-to-b from-gold/50 via-navy/15 to-transparent sm:left-1/2" />

          <div className="space-y-10">
            {ACHIEVEMENTS.map((a, i) => {
              const Icon = ICONS[a.icon] ?? Trophy;
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className={`relative flex flex-col gap-5 sm:w-1/2 ${
                    left ? "sm:ml-0 sm:pr-14 sm:text-right" : "sm:ml-auto sm:pl-14"
                  }`}
                >
                  <span
                    className={`absolute top-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-gold shadow-[0_14px_30px_-12px_rgba(8,8,8,0.5)] ${
                      left
                        ? "left-0 -translate-x-0 sm:left-auto sm:right-[-28px] sm:translate-x-0"
                        : "left-0 sm:left-[-28px]"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="font-display text-lg font-semibold text-gold sm:hidden">{a.year}</span>
                  <div className="ml-20 rounded-2xl border border-navy/10 bg-mist p-6 transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_-24px_rgba(8,8,8,0.4)] sm:ml-0">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-navy/50">{a.year}</span>
                    <h3 className="mt-1 font-display text-xl font-semibold text-navy">{a.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/65">{a.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
