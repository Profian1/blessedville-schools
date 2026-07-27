import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import { TESTIMONIALS } from "../data";
import { Container, Reveal, SectionHeading, EASE } from "../lib/ui";

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const t = TESTIMONIALS[idx];

  const go = (dir: number) => setIdx((idx + dir + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="bg-mist py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Voices of Meridian"
          title={<>Trusted by <span className="text-gold-gradient">families</span>.</>}
          subtitle="The truest measure of a school is the trust of the people who know it best."
        />

        <Reveal className="mt-14">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white bg-white p-8 shadow-[0_30px_80px_-30px_rgba(11,31,58,0.4)] sm:p-14">
            <Quote className="absolute right-8 top-8 h-20 w-20 text-gold/10" />
            <div className="flex items-center gap-1 text-gold">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <blockquote className="mt-5 font-display text-2xl font-medium leading-snug text-navy sm:text-3xl">
                  “{t.quote}”
                </blockquote>
                <div className="mt-8 flex items-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    loading="lazy"
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-gold/40"
                  />
                  <div>
                    <p className="font-semibold text-navy">{t.name}</p>
                    <p className="text-sm text-ink/55">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="mt-10 flex items-center justify-between border-t border-navy/10 pt-6">
              <button
                onClick={() => go(-1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors hover:bg-navy hover:text-white"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-2.5 rounded-full transition-all ${
                      i === idx ? "w-8 bg-gold" : "w-2.5 bg-navy/20"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => go(1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors hover:bg-navy hover:text-white"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy/70 transition-colors hover:text-navy"
            >
              <PlayCircle className="h-5 w-5 text-gold" />
              Watch video stories from our community
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
