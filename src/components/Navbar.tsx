import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GraduationCap } from "lucide-react";
import { NAV, SCHOOL } from "../data";
import { Button } from "../lib/ui";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 shadow-[0_8px_30px_-12px_rgba(11,31,58,0.18)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          {/* Logo */}
          <a href="#home" className="group flex items-center gap-3" aria-label={`${SCHOOL.name} home`}>
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 ${
                scrolled ? "bg-navy text-gold" : "bg-white/15 text-white glass"
              }`}
            >
              <GraduationCap className="h-6 w-6" />
            </span>
            <span className="leading-tight">
              <span
                className={`block font-display text-lg font-semibold tracking-wide ${
                  scrolled ? "text-navy" : "text-white"
                }`}
              >
                {SCHOOL.short}
              </span>
              <span
                className={`block text-[10px] font-medium uppercase tracking-[0.25em] ${
                  scrolled ? "text-ink/50" : "text-white/60"
                }`}
              >
                International Academy
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    scrolled ? "text-ink/70 hover:text-navy" : "text-white/85 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <Button href="#admissions" variant={scrolled ? "gold" : "outline"}>
              Apply Now
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(true)}
            className={`flex h-11 w-11 items-center justify-center rounded-xl lg:hidden ${
              scrolled ? "bg-navy/5 text-navy" : "glass text-white"
            }`}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-white p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xl font-semibold text-navy">{SCHOOL.short}</span>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy/5 text-navy"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="mt-8 flex flex-col gap-1">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-3 text-base font-medium text-ink/80 transition-colors hover:bg-mist hover:text-navy"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <Button href="#admissions" variant="gold" className="mt-auto w-full" onClick={() => setOpen(false)}>
                Apply Now
              </Button>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
