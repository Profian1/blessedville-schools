import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { ACADEMICS } from "../data";
import { Container, Reveal, SectionHeading, EASE } from "../lib/ui";

export default function Academics() {
  const [active, setActive] = useState(0);
  const program = ACADEMICS[active];

  return (
    <section id="academics" className="bg-white py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Programmes"
          title={<>A learning journey for <span className="text-gold-gradient">every age</span>.</>}
          subtitle="From a baby's first days at daycare through to confident lower primary — every stage is designed to nurture, challenge, and inspire."
        />

        {/* Program selector */}
        <Reveal className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ACADEMICS.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setActive(i)}
              className={`group relative overflow-hidden rounded-2xl text-left transition-all duration-300 ${
                active === i ? "ring-2 ring-gold shadow-[0_20px_50px_-22px_rgba(245,184,19,0.6)]" : "hover:shadow-lg"
              }`}
              aria-pressed={active === i}
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className={`h-full w-full object-cover transition-transform duration-700 ${
                    active === i ? "scale-105" : "group-hover:scale-105"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-navy/10" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy">
                  {p.age}
                </span>
              </div>
              <div className="bg-white p-5">
                <h3 className="font-display text-xl font-semibold text-navy">{p.name}</h3>
                <span
                  className={`mt-1 inline-flex items-center gap-1 text-xs font-semibold ${
                    active === i ? "text-gold" : "text-ink/45"
                  }`}
                >
                  {active === i ? "Selected" : "View programme"} <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </button>
          ))}
        </Reveal>

        {/* Detail panel */}
        <Reveal className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={program.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="grid items-center gap-10 rounded-3xl border border-navy/10 bg-mist p-8 sm:p-12 lg:grid-cols-2"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  {program.age}
                </span>
                <h3 className="mt-2 font-display text-3xl font-semibold text-navy">{program.name}</h3>
                <p className="mt-4 text-lg leading-relaxed text-ink/70">{program.overview}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {program.subjects.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1.5 rounded-full border border-navy/15 bg-white px-3.5 py-1.5 text-sm font-medium text-navy"
                    >
                      <BookOpen className="h-3.5 w-3.5 text-gold" />
                      {s}
                    </span>
                  ))}
                </div>
                <a
                  href="/admissions"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 font-button text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-navy-700"
                >
                  Learn More <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={program.image}
                  alt={program.name}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-white/90 p-4 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Approach</p>
                  <p className="mt-1 text-sm font-medium text-navy">{program.approach}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </Container>
    </section>
  );
}
