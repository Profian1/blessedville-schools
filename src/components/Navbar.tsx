import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MapPin, Phone, ChevronDown } from "lucide-react";
import { NAV, SCHOOL } from "../data";
import { PROGRAMS_NAV } from "../data/programs";
import { Button, EASE } from "../lib/ui";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const location = useLocation();

  const isProgramsActive = location.pathname.startsWith("/programmes");

  useEffect(() => {
    setOpen(false);
    setProgramsOpen(false);
    setMobileProgramsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close programs dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProgramsOpen(false);
      }
    };
    if (programsOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [programsOpen]);

  return (
    <>
      {/* Utility bar */}
      <div className={`fixed inset-x-0 z-[51] transition-all duration-500 ${
        scrolled
          ? "-translate-y-full bg-navy/90"
          : "translate-y-0 bg-navy/40 backdrop-blur-sm"
      }`}>
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-4 text-[11px] font-medium text-white/70">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-gold/80" />
              {SCHOOL.address}
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Phone className="h-3 w-3 text-gold/80" />
              {SCHOOL.phone}
            </span>
          </div>
        </div>
      </div>

      <header
        className={`fixed inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "top-0 bg-white/90 shadow-[0_8px_30px_-12px_rgba(8,8,8,0.18)] backdrop-blur-md"
            : "top-9 bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3" aria-label={`${SCHOOL.name} home`}>
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 ${
                scrolled ? "bg-navy text-gold" : "bg-white/15 text-white glass"
              }`}
            >
              <img src="/blessedville.svg" alt={`${SCHOOL.name} logo`} className="h-7 w-7" />
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
                Schools
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const isPrograms = item.href === "/programmes";

              if (isPrograms) {
                return (
                  <li key={item.href} ref={dropdownRef} className="relative">
                    <button
                      onClick={() => setProgramsOpen(!programsOpen)}
                      onMouseEnter={() => setProgramsOpen(true)}
                      onMouseLeave={() => setProgramsOpen(false)}
                      className={`relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                        isProgramsActive
                          ? scrolled
                            ? "text-gold"
                            : "text-gold-light"
                          : scrolled
                          ? "text-ink/70 hover:text-navy"
                          : "text-white/85 hover:text-white"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${
                          programsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {programsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.96 }}
                          transition={{ duration: 0.25, ease: EASE }}
                          onMouseEnter={() => setProgramsOpen(true)}
                          onMouseLeave={() => setProgramsOpen(false)}
                          className="absolute left-0 top-full mt-1 w-56 overflow-hidden rounded-2xl border border-navy/10 bg-white p-2 shadow-[0_20px_60px_-20px_rgba(8,8,8,0.35)]"
                        >
                          {PROGRAMS_NAV.map((p) => (
                            <NavLink
                              key={p.slug}
                              to={p.href}
                              className={({ isActive }) =>
                                `block rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                                  isActive
                                    ? "bg-navy/5 text-navy"
                                    : "text-ink/60 hover:bg-mist hover:text-navy"
                                }`
                              }
                            >
                              {p.label}
                            </NavLink>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    end={item.href === "/"}
                    className={({ isActive }) =>
                      `relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                        isActive
                          ? scrolled
                            ? "text-gold"
                            : "text-gold-light"
                          : scrolled
                          ? "text-ink/70 hover:text-navy"
                          : "text-white/85 hover:text-white"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <Button href="/admissions" variant={scrolled ? "gold" : "outline"}>
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
                {NAV.map((item) => {
                  const isPrograms = item.href === "/programmes";

                  if (isPrograms) {
                    return (
                      <li key={item.href}>
                        <button
                          onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)}
                          className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-mist hover:text-navy ${
                            isProgramsActive ? "bg-mist text-navy font-semibold" : "text-ink/80"
                          }`}
                        >
                          {item.label}
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-300 ${
                              mobileProgramsOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {mobileProgramsOpen && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: EASE }}
                              className="overflow-hidden ml-4 border-l-2 border-navy/10"
                            >
                              {PROGRAMS_NAV.map((p) => (
                                <li key={p.slug}>
                                  <NavLink
                                    to={p.href}
                                    className={({ isActive }) =>
                                      `block rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                                        isActive
                                          ? "bg-mist text-navy font-semibold"
                                          : "text-ink/70 hover:bg-mist hover:text-navy"
                                      }`
                                    }
                                  >
                                    {p.shortLabel}
                                  </NavLink>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  }

                  return (
                    <li key={item.href}>
                      <NavLink
                        to={item.href}
                        end={item.href === "/"}
                        className={({ isActive }) =>
                          `block rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-mist hover:text-navy ${
                            isActive ? "bg-mist text-navy font-semibold" : "text-ink/80"
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
              <Button href="/admissions" variant="gold" className="mt-auto w-full">
                Apply Now
              </Button>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
