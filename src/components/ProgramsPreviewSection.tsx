import { motion } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";
import { PROGRAMS_PREVIEW } from "../data";
import { Button, Container, SectionHeading, EASE } from "../lib/ui";

export default function ProgramsPreviewSection() {
  return (
    <section className="bg-mist py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Our Learning Journey"
          title={<>Our <span className="text-gold-gradient">Programs</span></>}
        />

        {/* Cards Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS_PREVIEW.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
              className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_14px_40px_-24px_rgba(8,8,8,0.3)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-24px_rgba(8,8,8,0.5)]"
            >
              {/* Card Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-navy backdrop-blur">
                  <GraduationCap className="h-3.5 w-3.5 text-gold" />
                  Program
                </div>
              </div>

              {/* Card Content */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-semibold text-navy">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/60">{p.description}</p>
                <Button href={p.link} variant="gold" className="mt-5 w-full sm:w-auto">
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
