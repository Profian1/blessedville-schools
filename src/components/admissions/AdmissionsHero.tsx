import { motion } from "framer-motion";
import { ArrowRight, CalendarDays } from "lucide-react";
import { ADMISSIONS_HERO } from "../../data/admissions";
import { Button, Container, EASE } from "../../lib/ui";

export default function AdmissionsHero() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-navy">
      <motion.img
        src={ADMISSIONS_HERO.image}
        alt=""
        aria-hidden
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: EASE }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/60 to-navy/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-navy/20" />

      <Container className="relative z-10 pt-36 pb-24 sm:pt-40 sm:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="max-w-2xl"
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {ADMISSIONS_HERO.badge}
          </span>
          <h1 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            {ADMISSIONS_HERO.heading}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">{ADMISSIONS_HERO.text}</p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button href={ADMISSIONS_HERO.primaryHref} variant="gold">
              {ADMISSIONS_HERO.primaryCta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button href={ADMISSIONS_HERO.secondaryHref} variant="outline">
              <CalendarDays className="h-4 w-4" />
              {ADMISSIONS_HERO.secondaryCta}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
