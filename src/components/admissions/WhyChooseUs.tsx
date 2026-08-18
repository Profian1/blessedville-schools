import { motion } from "framer-motion";
import { Heart, BookOpen, Sparkles, Trophy, GraduationCap, Users } from "lucide-react";
import { WHY_CHOOSE_US } from "../../data/admissions";
import { Container, SectionHeading, EASE } from "../../lib/ui";

const ICONS: Record<string, React.ElementType> = {
  Heart,
  BookOpen,
  Sparkles,
  Trophy,
  GraduationCap,
  Users,
};

export default function WhyChooseUs() {
  return (
    <section className="bg-mist py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Why Blessedville?"
          title={<>Why Families <span className="text-gold-gradient">Choose Blessedville</span></>}
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_US.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Heart;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.1 }}
                className="group rounded-2xl border border-navy/10 bg-white p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_-18px_rgba(8,8,8,0.3)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-navy">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{item.text}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
