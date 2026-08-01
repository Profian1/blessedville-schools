import { motion } from "framer-motion";
import { Globe, GraduationCap } from "lucide-react";
import { FACULTY } from "../data";
import { Container, SectionHeading, EASE } from "../lib/ui";

export default function Faculty() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Our Team"
          title={<>Guided by <span className="text-gold-gradient">caring</span> educators.</>}
          subtitle="A dedicated team of teachers and caregivers who know every child by name — and nurture them with love and patience."
        />

        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {FACULTY.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
              className="group text-center"
            >
              <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full ring-2 ring-navy/10 transition-all duration-500 group-hover:ring-gold sm:h-32 sm:w-32">
                <img
                  src={f.image}
                  alt={f.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <a
                  href="#"
                  aria-label={`${f.name} profile`}
                  className="absolute inset-0 flex items-center justify-center bg-navy/50 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  <Globe className="h-6 w-6" />
                </a>
              </div>
              <h4 className="mt-4 font-display text-base font-semibold text-navy">{f.name}</h4>
              <p className="text-xs font-medium text-ink/55">{f.role}</p>
              <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-gold">
                <GraduationCap className="h-3 w-3" /> {f.dept}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
