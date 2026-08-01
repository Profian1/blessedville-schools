import { motion } from "framer-motion";
import { Users, GraduationCap, Award, Star, Trophy, type LucideIcon } from "lucide-react";
import { STATS } from "../data";
import { Counter, Container, EASE } from "../lib/ui";

const ICONS: Record<string, LucideIcon> = { Users, GraduationCap, Award, Star, Trophy };

export default function Stats() {
  return (
    <section id="stats" className="relative -mt-1 bg-navy py-16 sm:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(244,196,48,0.12),transparent_45%)]" />
      <Container className="relative">
        <div className="grid grid-cols-2 gap-y-10 sm:gap-x-6 lg:grid-cols-5">
          {STATS.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Trophy;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
                className="group text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-gold transition-colors duration-300 group-hover:bg-gold/20">
                  <Icon className="h-7 w-7" />
                </div>
                <div className="font-display text-4xl font-semibold text-white sm:text-5xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-white/55">
                  {s.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
