import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { WELCOME } from "../data";
import { Button, Container, EASE } from "../lib/ui";

const textVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const imageVariant = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE } },
};

export default function WelcomeSection() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[45fr_55fr] lg:gap-16">
          {/* Image */}
          <motion.div
            variants={imageVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="order-1 lg:order-1"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-[0_24px_60px_-20px_rgba(8,8,8,0.35)]">
              <img
                src={WELCOME.image}
                alt={WELCOME.imageAlt}
                className="aspect-[4/5] w-full object-cover lg:aspect-[5/4]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent" />
            </div>
            {/* Decorative accent */}
            <div className="mt-3 hidden h-1.5 w-24 rounded-full bg-gold/30 lg:block" />
          </motion.div>

          {/* Content */}
          <motion.div
            variants={textVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="order-2 lg:order-2 lg:text-left text-center"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-navy/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-navy">
              <BookOpen className="h-3.5 w-3.5 text-gold" />
              {WELCOME.badge}
            </span>

            <h2 className="font-display text-3xl font-semibold leading-tight text-navy sm:text-4xl">
              {WELCOME.heading}
            </h2>

            <p className="mt-3 font-display text-lg font-medium italic text-ink/50">
              {WELCOME.subheading}
            </p>

            <p className="mt-5 text-left text-base leading-relaxed text-ink/65">
              {WELCOME.p1}
            </p>

            <p className="mt-4 text-left text-base leading-relaxed text-ink/65">
              {WELCOME.p2}
            </p>

            <div className="mt-8">
              <Button href={WELCOME.ctaLink} variant="gold">
                {WELCOME.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
