import { motion } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { ADMISSIONS_PROGRAMS } from "../../data/admissions";
import { Container, SectionHeading, EASE } from "../../lib/ui";

const PROGRAM_ICONS = [GraduationCap, GraduationCap, GraduationCap];

export default function ProgramSelector() {
  return (
    <section className="bg-mist py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Who Can Apply?"
          title={<>Find the Right <span className="text-gold-gradient">Learning Stage</span> for Your Child</>}
        />
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {ADMISSIONS_PROGRAMS.map((p, i) => {
            const Icon = PROGRAM_ICONS[i] ?? GraduationCap;
            return (
              <motion.article
                key={p.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-[0_12px_40px_-12px_rgba(8,8,8,0.15)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_60px_-20px_rgba(8,8,8,0.35)]"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gold text-navy shadow-lg">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-semibold text-navy">{p.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/60">{p.description}</p>
                  <Link
                    to={p.href}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors group-hover:text-gold"
                    aria-label={`${p.cta} — ${p.title}`}
                  >
                    {p.cta}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
