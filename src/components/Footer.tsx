import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { NAV, SCHOOL, SOCIALS } from "../data";

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
          <div className="mt-5 flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-white/50 transition-colors hover:text-gold"
              >
                {s.name}
              </a>
            ))}
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
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 py-7 sm:px-8 lg:px-10">
          <div className="text-center">
            <p className="text-sm text-white/50">
              © {new Date().getFullYear()} {SCHOOL.name}. All rights reserved.
            </p>
            <p className="mt-1 text-xs text-white/40">
              Web developed by{" "}
              <a
                href="https://inactechnologies.co.ke"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors hover:text-gold"
              >
                INac Technologies
              </a>
            </p>
          </div>
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
