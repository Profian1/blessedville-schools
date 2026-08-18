import { motion } from "framer-motion";
import {
  ClipboardList,
  SearchCheck,
  School,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ADMISSIONS_STEPS, ADMISSIONS_ASSESSMENT_NOTE, type AdmissionsStep } from "../../data/admissions";
import { Container, SectionHeading, EASE, Button } from "../../lib/ui";

const ICONS: Record<string, React.ElementType> = {
  ClipboardList,
  SearchCheck,
  School,
  CheckCircle2,
};

function StepIcon({ icon }: { icon: string }) {
  const Icon = ICONS[icon] ?? ClipboardList;
  return <Icon className="h-6 w-6" />;
}

/* ------------------------------------------------------------------ */
/* Desktop — horizontal timeline                                       */
/* ------------------------------------------------------------------ */
function DesktopTimeline() {
  return (
    <div className="relative hidden lg:block">
      <div className="absolute left-0 right-0 top-7">
        <div className="mx-16 h-1 rounded-full bg-navy/10" />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.6, ease: EASE }}
          className="h-1 origin-left rounded-full bg-gradient-to-r from-gold via-gold-light to-gold"
        />
      </div>

      <div className="grid grid-cols-4 gap-6">
        {ADMISSIONS_STEPS.map((s: AdmissionsStep, i) => (
          <motion.div
            key={s.number}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.15 }}
            className="relative flex flex-col items-center pt-16 text-center"
          >
            <span className="absolute top-1 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-gold bg-white text-navy shadow-[0_8px_24px_-8px_rgba(245,184,19,0.6)]">
              <StepIcon icon={s.icon} />
              <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-navy font-button text-[11px] font-bold text-gold">
                {s.number}
              </span>
            </span>
            <h3 className="font-display text-xl font-semibold text-navy">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/60">{s.description}</p>
            {s.cta && s.ctaHref && (
              <Link
                to={s.ctaHref}
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-navy px-5 py-2.5 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-navy/90"
              >
                {s.cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile — vertical timeline                                          */
/* ------------------------------------------------------------------ */
function MobileTimeline() {
  return (
    <ol className="relative mx-auto max-w-md space-y-0 lg:hidden">
      <div className="absolute bottom-6 left-7 top-6 w-0.5 bg-navy/10" aria-hidden />
      {ADMISSIONS_STEPS.map((s: AdmissionsStep, i) => (
        <motion.li
          key={s.number}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
          className="relative flex gap-6 pb-10 last:pb-0"
        >
          <span className="relative z-10 flex h-15 w-15 shrink-0 items-center justify-center rounded-2xl border-2 border-gold bg-white text-navy shadow-[0_8px_24px_-8px_rgba(245,184,19,0.6)]">
            <StepIcon icon={s.icon} />
            <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-navy font-button text-[11px] font-bold text-gold">
              {s.number}
            </span>
          </span>
          <div>
            <h3 className="font-display text-lg font-semibold text-navy">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/60">{s.description}</p>
            {s.cta && s.ctaHref && (
              <Link
                to={s.ctaHref}
                className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-navy px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-navy/90"
              >
                {s.cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </motion.li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function AdmissionsSteps() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      <Container className="relative">
        <SectionHeading
          eyebrow="Admissions Process"
          title={<>Our <span className="text-gold-gradient">Admissions Process</span></>}
          subtitle="From your first enquiry to your child's first day, we're here to guide you every step of the way."
        />

        <div className="mt-16">
          <DesktopTimeline />
          <MobileTimeline />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-12 max-w-2xl rounded-2xl border border-navy/10 bg-mist p-5 text-center text-sm leading-relaxed text-ink/60"
        >
          {ADMISSIONS_ASSESSMENT_NOTE}
        </motion.p>

        <div className="mt-10 text-center">
          <Button href="/admissions/apply" variant="gold">
            Apply Online <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
