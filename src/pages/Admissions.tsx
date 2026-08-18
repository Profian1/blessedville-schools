import { motion } from "framer-motion";
import { ArrowRight, ClipboardList, SearchCheck, School, CheckCircle2, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "../lib/Seo";
import { Container, EASE, Button } from "../lib/ui";
import { ADMISSIONS_SEO, ADMISSIONS_HEADER, ADMISSIONS_STEPS, type AdmissionsStep } from "../data/admissions";

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
        <div className="mx-16 h-1 rounded-full bg-white/10" />
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
            <span className="absolute top-1 flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/50 bg-navy text-gold shadow-[0_8px_24px_-8px_rgba(245,184,19,0.45)]">
              <StepIcon icon={s.icon} />
              <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gold font-button text-[11px] font-bold text-navy">
                {s.number}
              </span>
            </span>
            <h3 className="font-display text-xl font-semibold text-white">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">{s.description}</p>
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
      <div className="absolute bottom-6 left-7 top-6 w-0.5 bg-white/10" aria-hidden />
      {ADMISSIONS_STEPS.map((s: AdmissionsStep, i) => (
        <motion.li
          key={s.number}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
          className="relative flex gap-6 pb-10 last:pb-0"
        >
          <span className="relative z-10 flex h-15 w-15 shrink-0 items-center justify-center rounded-2xl border border-gold/50 bg-navy text-gold shadow-[0_8px_24px_-8px_rgba(245,184,19,0.45)]">
            <StepIcon icon={s.icon} />
            <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gold font-button text-[11px] font-bold text-navy">
              {s.number}
            </span>
          </span>
          <div>
            <h3 className="font-display text-lg font-semibold text-white">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">{s.description}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}

export default function Admissions() {
  return (
    <>
      <Seo
        title={ADMISSIONS_SEO.title}
        description={ADMISSIONS_SEO.description}
        path={ADMISSIONS_SEO.path}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: ADMISSIONS_SEO.title,
            description: ADMISSIONS_SEO.description,
            url: `https://blessedville.edu${ADMISSIONS_SEO.path}`,
          },
        ]}
      />

      <section className="relative min-h-screen overflow-hidden bg-navy py-28 sm:py-32">
        <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-10 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {ADMISSIONS_HEADER.eyebrow}
            </span>
            <h1 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              {ADMISSIONS_HEADER.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/70">{ADMISSIONS_HEADER.subtitle}</p>
          </motion.div>

          <div className="mt-16">
            <DesktopTimeline />
            <MobileTimeline />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button href={ADMISSIONS_HEADER.primaryHref} variant="gold">
              {ADMISSIONS_HEADER.primaryCta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Link
              to={ADMISSIONS_HEADER.secondaryHref}
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-navy"
            >
              <MessageCircle className="h-4 w-4" />
              {ADMISSIONS_HEADER.secondaryCta}
            </Link>
          </motion.div>
        </Container>
      </section>
    </>
  );
}