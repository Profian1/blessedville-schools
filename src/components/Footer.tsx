import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send, ArrowUp } from "lucide-react";
import { NAV, SCHOOL } from "../data";

const SocialIcon = ({ name }: { name: string }) => {
  const paths: Record<string, React.ReactNode> = {
    Instagram: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </>
    ),
    Facebook: <path d="M14 9V7c0-1 .5-2 2-2h1V2.5h-2A3.5 3.5 0 0 0 11.5 6v3H9v3.5h2.5V22H15V12.5H18l.5-3.5h-3.5z" fill="currentColor" stroke="none" />,
    Youtube: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="4" />
        <path d="M10 9l5 3-5 3V9z" fill="currentColor" stroke="none" />
      </>
    ),
    X: <path d="M4 4l6.5 8L4.5 20H7l4.2-5 3.8 5H21l-7-8.5L20 4h-2.4l-3.7 4.5L10 4H4z" fill="currentColor" stroke="none" />,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-4 w-4">
      {paths[name]}
    </svg>
  );
};
const SOCIALS = ["Instagram", "Facebook", "Youtube", "X"];

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
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/70 transition-colors hover:bg-gold hover:text-navy"
              >
                <SocialIcon name={s} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Back to top */}
      <Link
        to="/"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-28 right-5 z-40 hidden h-11 w-11 items-center justify-center rounded-full bg-navy text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-gold hover:text-navy sm:flex"
      >
        <ArrowUp className="h-5 w-5" />
      </Link>
    </footer>
  );
}
