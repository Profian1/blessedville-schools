import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MapPin, Phone } from "lucide-react";
import { NAV, SCHOOL } from "../data";
import { Button } from "../lib/ui";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            {NAV.map((item) => (
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
            ))}
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
                {NAV.map((item) => (
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
                ))}
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
