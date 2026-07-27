import { motion } from "framer-motion";
import { Target, Compass, Lightbulb, Heart, Quote, ArrowRight } from "lucide-react";
import { MILESTONES, SCHOOL, VALUES } from "../data";
import { Container, Reveal, SectionHeading, EASE } from "../lib/ui";

const VALUES_ICONS: Record<string, typeof Target> = { Target, Compass, Lightbulb, Heart };

export default function About() {
  return (
    <section id="about" className="bg-white py-24 sm:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Image side */}
          <Reveal className="relative">
            <div className="relative overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-30px_rgba(11,31,58,0.45)]">
              <img
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80"
                alt="Students collaborating in a Meridian classroom"
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
            </div>
            {/* Floating mission card */}
            <div className="absolute -bottom-8 -left-4 max-w-[16rem] rounded-2xl bg-white p-6 shadow-[0_24px_60px_-20px_rgba(11,31,58,0.4)] sm:-left-8">
              <Quote className="h-7 w-7 text-gold" />
              <p className="mt-3 font-display text-lg leading-snug text-navy">
                “Every child who walks through our doors is a future leader in the making.”
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
                {SCHOOL.motto}
              </p>
            </div>
          </Reveal>

          {/* Text side */}
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our Story"
              title={<>A school built on <span className="text-gold-gradient">belief</span>.</>}
              subtitle="For three decades, Meridian has nurtured curious, confident, and compassionate young people — ready not just for university, but for life."
            />

            <Reveal delay={0.1} className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { t: "Mission", d: "To ignite a lifelong love of learning and develop the character, intellect, and courage to lead." },
                { t: "Vision", d: "A world where every child is empowered to shape a brighter, kinder, more innovative future." },
              ].map((m) => (
                <div key={m.t} className="rounded-2xl border border-navy/10 bg-mist p-6">
                  <h4 className="font-display text-xl font-semibold text-navy">{m.t}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{m.d}</p>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.15} className="mt-4 grid gap-4 sm:grid-cols-2">
              {VALUES.map((v) => {
                const Icon = VALUES_ICONS[v.icon] ?? Target;
                return (
                  <div key={v.title} className="group flex gap-4 rounded-2xl p-4 transition-colors hover:bg-mist">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-gold transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-semibold text-navy">{v.title}</h4>
                      <p className="mt-1 text-sm text-ink/60">{v.text}</p>
                    </div>
                  </div>
                );
              })}
            </Reveal>

            <Reveal delay={0.2}>
              <a
                href="#campus"
                className="mt-8 inline-flex items-center gap-2 font-button text-sm font-semibold text-navy transition-all hover:gap-3"
              >
                Discover campus life <ArrowRight className="h-4 w-4" />
              </a>
            </Reveal>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-28">
          <SectionHeading
            eyebrow="Milestones"
            title={<>Three decades of <span className="text-gold-gradient">legacy</span>.</>}
            subtitle="A journey defined by growth, courage, and an unwavering commitment to excellence."
          />
          <div className="relative mt-14">
            <div className="absolute left-0 right-0 top-1/2 hidden h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent lg:block" />
            <div className="grid gap-8 lg:grid-cols-5">
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
                  className="relative"
                >
                  <div className="lg:flex lg:flex-col lg:items-center">
                    <div className="mb-3 flex items-center gap-3 lg:flex-col lg:gap-3">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gold shadow-[0_0_0_6px_rgba(212,175,55,0.18)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-navy" />
                      </span>
                      <span className="font-display text-2xl font-semibold text-navy">{m.year}</span>
                    </div>
                    <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-[0_16px_40px_-22px_rgba(11,31,58,0.4)] lg:w-full lg:text-center">
                      <h4 className="font-semibold text-navy">{m.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-ink/60">{m.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
