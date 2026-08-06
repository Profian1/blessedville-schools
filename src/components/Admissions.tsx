import { motion } from "framer-motion";
import { Mail, MapPin, FileText, MessageCircle, PartyPopper, ArrowRight } from "lucide-react";
import { ADMISSIONS } from "../data";
import { Container, Reveal, SectionHeading, EASE, Button } from "../lib/ui";

const ICONS: Record<string, React.ElementType> = {
  Mail,
  MapPin,
  FileText,
  MessageCircle,
  PartyPopper,
};

export default function Admissions() {
  return (
    <section id="admissions" className="relative overflow-hidden bg-navy py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-10 h-96 w-96 rounded-full bg-royal/20 blur-3xl" />

      <Container className="relative">
        <SectionHeading
          light
          eyebrow="Admissions"
          title={<>Your journey to <span className="text-gold-gradient">Blessedville</span>.</>}
          subtitle="A warm, simple process designed to help your family feel at home with us from the very first step."
        />

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-gold/40 via-gold/20 to-gold/40 lg:block" />
          <div className="grid gap-8 lg:grid-cols-5">
            {ADMISSIONS.map((s, i) => {
              const Icon = ICONS[s.icon] ?? Mail;
              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
                  className="relative text-center"
                >
                  <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/40 bg-navy text-gold shadow-[0_0_0_8px_rgba(8,8,8,1)]">
                    <Icon className="h-6 w-6" />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold font-button text-xs font-bold text-navy">
                      {s.step}
                    </span>
                  </div>
                  <h4 className="mt-5 font-display text-xl font-semibold text-white">{s.title}</h4>
                  <p className="mx-auto mt-2 max-w-[15rem] text-sm leading-relaxed text-white/60">
                    {s.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <Reveal delay={0.2} className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/contact" variant="gold">
            Apply Now <ArrowRight className="h-4 w-4" />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
