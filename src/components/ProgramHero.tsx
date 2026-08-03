import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button, Container, EASE } from "../lib/ui";

type ProgramHeroProps = {
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function ProgramHero({ badge, title, subtitle, image, ctaLabel = "Book a School Tour", ctaHref = "/contact" }: ProgramHeroProps) {
  return (
    <section className="relative flex min-h-[50vh] items-center overflow-hidden bg-navy sm:min-h-[55vh]">
      <img
        src={image}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/65 to-navy/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-navy/20" />

      <Container className="relative z-10 py-24 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-2xl"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {badge}
          </span>
          <h1 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">{subtitle}</p>
          <div className="mt-8">
            <Button href={ctaHref} variant="gold">
              {ctaLabel}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
