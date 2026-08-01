import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send, ArrowUp } from "lucide-react";
import { NAV, SCHOOL } from "../data";

const LINK_GROUPS = [
  {
    title: "Explore",
    links: NAV.filter((n) => !["Home", "Contact"].includes(n.label)),
  },
  {
    title: "Admissions",
    links: [
      { label: "How to Apply", href: "/admissions" },
      { label: "Book a Tour", href: "/contact" },
      { label: "Programmes", href: "/programmes" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Gallery", href: "/gallery" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-10">
          <div>
            <h3 className="font-display text-3xl font-semibold">Stay connected with Blessed Ville.</h3>
            <p className="mt-3 max-w-md text-white/60">
              Receive stories, open-day invitations, and admissions insights — a few times a term, never more.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
              <input
                type="email"
                required
                placeholder="Your email address"
                aria-label="Email for newsletter"
                className="w-full rounded-full border border-white/15 bg-white/5 py-4 pl-12 pr-4 text-white outline-none transition-colors placeholder:text-white/40 focus:border-gold"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 font-button text-sm font-semibold text-navy transition-all hover:-translate-y-0.5"
            >
              Subscribe <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold text-navy">
              <img src="/blessedville.svg" alt={`${SCHOOL.name} logo`} className="h-7 w-7" />
            </span>
            <span className="font-display text-xl font-semibold">{SCHOOL.short}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            {SCHOOL.motto} — a premium international education shaping tomorrow's leaders with
            excellence, innovation, and character.
          </p>
          <div className="mt-5 space-y-2 text-sm text-white/60">
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /> {SCHOOL.address}</p>
            <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold" /> {SCHOOL.email}</p>
            <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /> {SCHOOL.phone}</p>
          </div>
        </div>

        {LINK_GROUPS.map((g) => (
          <div key={g.title}>
            <h4 className="font-button text-sm font-semibold uppercase tracking-wider text-gold">
              {g.title}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {g.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-sm text-white/65 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 py-7 sm:flex-row sm:justify-between sm:px-8 lg:px-10">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} {SCHOOL.name}. All rights reserved.
          </p>
          <button
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 transition-all hover:bg-gold hover:text-navy"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
