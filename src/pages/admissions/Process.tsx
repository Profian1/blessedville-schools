import { motion } from "framer-motion";
import { ArrowRight, ClipboardList, SearchCheck, School, CheckCircle2, CalendarDays } from "lucide-react";
import Seo from "../../lib/Seo";
import TourBookingForm from "../../components/admissions/TourBookingForm";
import { Container, EASE, Button } from "../../lib/ui";
import {
  PROCESS_SEO,
  PROCESS_HEADER,
  ADMISSIONS_STEPS,
  ADMISSIONS_ASSESSMENT_NOTE,
  TOUR_SECTION,
} from "../../data/admissions";

const ICONS: Record<string, React.ElementType> = {
  ClipboardList,
  SearchCheck,
  School,
  CheckCircle2,
};

export default function Process() {
  return (
    <>
      <Seo
        title={PROCESS_SEO.title}
        description={PROCESS_SEO.description}
        path={PROCESS_SEO.path}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: PROCESS_SEO.title,
            description: PROCESS_SEO.description,
            url: `https://blessedville.edu${PROCESS_SEO.path}`,
          },
        ]}
      />

      <section className="relative overflow-hidden bg-navy py-28 sm:py-32">
        <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

        <Container className="relative">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {PROCESS_HEADER.eyebrow}
            </span>
            <h1 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              {PROCESS_HEADER.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/70">{PROCESS_HEADER.subtitle}</p>
          </motion.div>

          {/* Steps */}
          <div className="mx-auto mt-16 max-w-4xl space-y-6">
            {ADMISSIONS_STEPS.map((s, i) => {
              const Icon = ICONS[s.icon] ?? ClipboardList;
              return (
                <motion.div
                  key={s.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                  className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-500 hover:border-gold/40 sm:flex-row sm:items-start sm:p-8"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gold/50 bg-navy text-gold shadow-[0_8px_24px_-8px_rgba(245,184,19,0.45)]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="font-button text-xs font-bold uppercase tracking-[0.2em] text-gold">Step {s.number}</p>
                    <h2 className="mt-1 font-display text-2xl font-semibold text-white">{s.title}</h2>
                    <p className="mt-2 leading-relaxed text-white/60">{s.description}</p>
                    {s.cta && s.ctaHref && (
                      <Button href={s.ctaHref} variant="gold" className="mt-5">
                        {s.cta}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Assessment note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mt-12 max-w-3xl rounded-2xl border border-gold/30 bg-gold/5 p-6 text-center"
          >
            <p className="leading-relaxed text-white/75">{ADMISSIONS_ASSESSMENT_NOTE}</p>
          </motion.div>

          {/* Book a school tour */}
          <div className="mx-auto mt-20 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-center"
            >
              <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
                <CalendarDays className="h-3.5 w-3.5" />
                {TOUR_SECTION.eyebrow}
              </span>
              <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">{TOUR_SECTION.title}</h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/65">{TOUR_SECTION.subtitle}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="mt-10"
            >
              <TourBookingForm />
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}