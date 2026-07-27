import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Search, CalendarDays } from "lucide-react";
import { NEWS } from "../data";
import { Container, Reveal, SectionHeading, EASE } from "../lib/ui";

const CATEGORIES = ["All", ...Array.from(new Set(NEWS.map((n) => n.category)))];

export default function News() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return NEWS.filter(
      (n) =>
        (cat === "All" || n.category === cat) &&
        (q === "" || n.title.toLowerCase().includes(q.toLowerCase()) || n.excerpt.toLowerCase().includes(q.toLowerCase()))
    );
  }, [cat, q]);

  const featured = filtered.find((n) => n.featured) ?? filtered[0];
  const rest = filtered.filter((n) => n !== featured);

  return (
    <section id="news" className="bg-white py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="News & Stories"
          title={<>The latest from <span className="text-gold-gradient">Meridian</span>.</>}
          subtitle="Discover achievements, events, and ideas shaping our community."
        />

        {/* Controls */}
        <Reveal className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2.5">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                  cat === c ? "bg-navy text-white" : "border border-navy/15 text-navy hover:bg-mist"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search stories…"
              aria-label="Search news"
              className="w-full rounded-full border border-navy/15 bg-mist py-3 pl-11 pr-4 text-sm text-navy outline-none transition-colors placeholder:text-ink/40 focus:border-gold"
            />
          </div>
        </Reveal>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-ink/50">No stories match your search.</p>
        )}

        {featured && (
          <Reveal className="mt-12">
            <a
              href="#"
              className="group grid overflow-hidden rounded-[2rem] border border-navy/10 bg-mist lg:grid-cols-2"
            >
              <div className="relative h-72 overflow-hidden lg:h-auto">
                <img
                  src={featured.image}
                  alt={featured.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy">
                  Featured · {featured.category}
                </span>
                <h3 className="mt-4 font-display text-3xl font-semibold leading-tight text-navy">
                  {featured.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-ink/65">{featured.excerpt}</p>
                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-ink/50">
                  <CalendarDays className="h-4 w-4" /> {featured.date}
                  <ArrowUpRight className="ml-4 h-4 w-4 text-gold transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </a>
          </Reveal>
        )}

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((n, i) => (
            <motion.a
              key={n.title}
              href="#"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              className="group overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-[0_14px_40px_-24px_rgba(11,31,58,0.3)]"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={n.image}
                  alt={n.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy">
                  {n.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs font-medium text-ink/45">
                  <CalendarDays className="h-3.5 w-3.5" /> {n.date}
                </div>
                <h4 className="mt-2 font-display text-xl font-semibold leading-snug text-navy">
                  {n.title}
                </h4>
                <p className="mt-2 line-clamp-3 text-sm text-ink/60">{n.excerpt}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
}
