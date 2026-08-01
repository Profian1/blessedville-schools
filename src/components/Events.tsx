import { motion } from "framer-motion";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { EVENTS } from "../data";
import { Container, Reveal, SectionHeading, EASE } from "../lib/ui";

export default function Events() {
  return (
    <section id="events" className="bg-mist py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="School Calendar"
          title={<>What is on at <span className="text-gold-gradient">Blessedville</span>.</>}
          subtitle="Open days, performances, sports, and celebrations throughout the year."
        />

        <Reveal className="mt-14">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {EVENTS.map((e, i) => (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
                className="group flex gap-5 rounded-3xl border border-white bg-white p-6 shadow-[0_14px_40px_-24px_rgba(30,90,168,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_-26px_rgba(30,90,168,0.45)]"
              >
                <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-navy text-white">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-gold">
                    {e.day}
                  </span>
                  <span className="font-display text-2xl font-semibold leading-none">{e.date.slice(0, 2)}</span>
                  <span className="text-xs text-white/60">{e.date.slice(3)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="inline-flex w-fit rounded-full bg-gold/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-navy">
                    {e.category}
                  </span>
                  <h4 className="mt-2 font-display text-lg font-semibold text-navy">{e.title}</h4>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-ink/55">
                    <MapPin className="h-3.5 w-3.5 text-gold" /> {e.text}
                  </p>
                  <a
                    href="/admissions"
                    className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-navy opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    Add to calendar <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl bg-navy p-8 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-3 text-white">
              <CalendarDays className="h-8 w-8 text-gold" />
              <div>
                <p className="font-display text-xl font-semibold">Download the school calendar</p>
                <p className="text-sm text-white/60">Term dates, holidays, and key events for the academic year.</p>
              </div>
            </div>
            <a
              href="#"
              className="rounded-full bg-gold px-7 py-3 font-button text-sm font-semibold text-navy transition-all hover:-translate-y-0.5"
            >
              Get Calendar
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
