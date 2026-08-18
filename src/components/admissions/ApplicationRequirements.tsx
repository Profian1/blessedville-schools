import { motion } from "framer-motion";
import { CheckCircle2, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { BEFORE_YOU_APPLY } from "../../data/admissions";
import { Container, SectionHeading, EASE } from "../../lib/ui";

export default function ApplicationRequirements() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Preparation"
              title={<>{BEFORE_YOU_APPLY.heading}</>}
              subtitle={BEFORE_YOU_APPLY.description}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                to={BEFORE_YOU_APPLY.ctaHref}
                className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-navy/90"
              >
                <HelpCircle className="h-4 w-4 text-gold" />
                {BEFORE_YOU_APPLY.cta}
              </Link>
            </motion.div>
          </div>

          <div className="rounded-2xl border border-navy/10 bg-mist p-6 sm:p-8">
            <ul className="grid gap-3.5 sm:grid-cols-2">
              {BEFORE_YOU_APPLY.items.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}
                  className="flex items-start gap-2.5 rounded-xl bg-white p-3.5 shadow-[0_6px_18px_-10px_rgba(8,8,8,0.15)]"
                >
                  <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold" />
                  <span className="text-sm leading-snug text-ink/75">{item}</span>
                </motion.li>
              ))}
            </ul>
            <p className="mt-6 rounded-xl border border-gold/30 bg-gold/5 p-4 text-sm leading-relaxed text-ink/70">
              {BEFORE_YOU_APPLY.footnote}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
