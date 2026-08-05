import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { EASE } from "../lib/ui";

type Crumb = { label: string; href?: string };

type ProgramHeroProps = {
  badge: string;
  title: string;
  subtitle?: string;
  image: string;
  crumbs?: Crumb[];
};

export default function ProgramHero({ badge, title, subtitle, image, crumbs }: ProgramHeroProps) {
  return (
    <section className="relative flex min-h-[45vh] items-center overflow-hidden bg-navy sm:min-h-[50vh]">
      <img
        src={image}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/60 via-navy/40 to-navy/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-navy/10" />

      <div className="relative z-10 w-full">
        {/* Breadcrumbs */}
        {crumbs && (
          <div className="mx-auto w-full max-w-7xl px-5 pt-28 sm:px-8 sm:pt-32 lg:px-10">
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex items-center gap-1.5 text-sm"
              aria-label="Breadcrumb"
            >
              <Link to="/" className="flex items-center gap-1 text-white/55 transition-colors hover:text-white">
                <Home className="h-3.5 w-3.5" />
                Home
              </Link>
              {crumbs.map((c) => (
                <span key={c.label} className="flex items-center gap-1.5">
                  <ChevronRight className="h-3.5 w-3.5 text-white/30" />
                  {c.href ? (
                    <Link to={c.href} className="text-white/55 transition-colors hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="font-medium text-gold-light">{c.label}</span>
                  )}
                </span>
              ))}
            </motion.nav>
          </div>
        )}

        <div className="mx-auto w-full max-w-7xl px-5 pb-20 pt-6 sm:px-8 sm:pb-24 sm:pt-8 lg:px-10">
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
            {subtitle && (
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">{subtitle}</p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
