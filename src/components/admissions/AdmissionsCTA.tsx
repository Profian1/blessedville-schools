import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { READY_TO_APPLY, SCHOOL_TOUR_CTA, FINAL_CTA } from "../../data/admissions";
import { SCHOOL } from "../../data";
import { Button, Container, Reveal, EASE } from "../../lib/ui";

/* ------------------------------------------------------------------ */
/* Ready to apply — prominent CTA card                                 */
/* ------------------------------------------------------------------ */
export function ReadyToApplyCTA() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-14 text-center sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-royal/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">{READY_TO_APPLY.heading}</h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">{READY_TO_APPLY.text}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button href={READY_TO_APPLY.primaryHref} variant="gold">
                  {READY_TO_APPLY.primaryCta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button href={READY_TO_APPLY.secondaryHref} variant="outline">
                  <MessageCircle className="h-4 w-4" />
                  {READY_TO_APPLY.secondaryCta}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* School tour — visually engaging image section                       */
/* ------------------------------------------------------------------ */
export function SchoolTourCTA() {
  return (
    <section className="bg-mist py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl shadow-[0_24px_60px_-20px_rgba(8,8,8,0.35)]">
              <img
                src={SCHOOL_TOUR_CTA.image}
                alt={SCHOOL_TOUR_CTA.imageAlt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/35 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-navy backdrop-blur-sm">
                <CalendarDays className="h-4 w-4 text-gold" />
                Visits by appointment — Mon – Fri
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-navy">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Visit Us
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-navy sm:text-4xl">{SCHOOL_TOUR_CTA.heading}</h2>
            <p className="mt-4 text-base leading-relaxed text-ink/65">{SCHOOL_TOUR_CTA.text}</p>
            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button href={SCHOOL_TOUR_CTA.href} variant="gold">
                {SCHOOL_TOUR_CTA.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <a
                href={`tel:${SCHOOL.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-gold"
              >
                <Phone className="h-4 w-4" />
                {SCHOOL.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Final CTA                                                           */
/* ------------------------------------------------------------------ */
export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 sm:py-28">
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-royal/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 -bottom-32 h-80 w-80 rounded-full bg-gold/15 blur-3xl" />
      <Container className="relative text-center">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">{FINAL_CTA.heading}</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/65">{FINAL_CTA.text}</p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button href={FINAL_CTA.primaryHref} variant="gold">
              {FINAL_CTA.primaryCta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Link
              to={FINAL_CTA.secondaryHref}
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-navy"
            >
              <MessageCircle className="h-4 w-4" />
              {FINAL_CTA.secondaryCta}
            </Link>
          </motion.div>
        </Reveal>
      </Container>
    </section>
  );
}
