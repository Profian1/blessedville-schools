import { motion } from "framer-motion";
import { ArrowRight, ClipboardList, SearchCheck, School, CheckCircle2, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "../../lib/Seo";
import ProgramHero from "../../components/ProgramHero";
import { FinalCTA } from "../../components/admissions/AdmissionsCTA";
import { Container, SectionHeading, Reveal, EASE, Button } from "../../lib/ui";
import { ADMISSIONS_STEPS, ADMISSIONS_ASSESSMENT_NOTE, PROCESS_SEO } from "../../data/admissions";

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

      <ProgramHero
        badge="Admissions Process"
        title="Your Journey to Blessedville"
        subtitle="From your first enquiry to your child's first day — here is exactly what to expect at every step."
        image="/gallery/students.jpg"
        crumbs={[{ label: "Admissions", href: "/admissions" }, { label: "Admissions Process" }]}
      />

      <section className="bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Step by Step"
            title={<>A Clear Path, <span className="text-gold-gradient">Every Step of the Way</span></>}
          />
          <div className="mx-auto mt-14 max-w-4xl space-y-6">
            {ADMISSIONS_STEPS.map((s, i) => {
              const Icon = ICONS[s.icon] ?? ClipboardList;
              return (
                <motion.div
                  key={s.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                  className="flex flex-col gap-5 rounded-2xl border border-navy/10 bg-mist p-6 transition-all duration-500 hover:border-gold/40 hover:shadow-[0_18px_40px_-18px_rgba(8,8,8,0.25)] sm:flex-row sm:items-start sm:p-8"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy text-gold">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="font-button text-xs font-bold uppercase tracking-[0.2em] text-gold">Step {s.number}</p>
                    <h3 className="mt-1 font-display text-2xl font-semibold text-navy">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-ink/65">{s.description}</p>
                    {s.cta && s.ctaHref && (
                      <Link
                        to={s.ctaHref}
                        className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-navy px-5 py-2.5 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-navy/90"
                      >
                        {s.cta}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <Reveal className="mx-auto mt-12 max-w-3xl">
            <div className="rounded-2xl border border-gold/30 bg-gold/5 p-6 text-center">
              <p className="leading-relaxed text-ink/70">{ADMISSIONS_ASSESSMENT_NOTE}</p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
                <Button href="/admissions/apply" variant="gold">
                  Apply Online <ArrowRight className="h-4 w-4" />
                </Button>
                <Link
                  to="/admissions/faqs"
                  className="inline-flex items-center gap-2 rounded-full border border-navy/20 px-7 py-3.5 text-sm font-semibold text-navy transition-all hover:border-navy hover:bg-navy hover:text-white"
                >
                  <MessageCircle className="h-4 w-4" />
                  Read the FAQs
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
