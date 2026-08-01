import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { GALLERY } from "../data";
import { Container, Reveal, SectionHeading, EASE } from "../lib/ui";

const CATEGORIES = ["All", "Learning", "Sports", "Events", "Activities"];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = useMemo(
    () => (filter === "All" ? GALLERY : GALLERY.filter((g) => g.category === filter)),
    [filter]
  );

  const close = () => setLightbox(null);
  const nav = (dir: number) => {
    if (lightbox === null) return;
    setLightbox((lightbox + dir + GALLERY.length) % GALLERY.length);
  };

  return (
    <section id="gallery" className="bg-navy py-24 sm:py-32">
      <Container>
        <SectionHeading
          light
          eyebrow="Student Life & Gallery"
          title={<>Moments that <span className="text-gold-gradient">matter</span>.</>}
          subtitle="From morning lessons to swimming and creative arts — every day at Blessedville is filled with discovery and joy."
        />

        {/* Filters */}
        <Reveal className="mt-12 flex flex-wrap justify-center gap-2.5">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                filter === c
                  ? "bg-gold text-navy"
                  : "border border-white/20 text-white/75 hover:border-white/50 hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </Reveal>

        {/* Masonry */}
        <div className="mt-12 columns-2 gap-4 sm:columns-3 lg:gap-6 [&>*]:mb-4 [&>*]:break-inside-avoid">
          <AnimatePresence mode="popLayout">
            {items.map((g) => (
              <motion.button
                key={g.src}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.5, ease: EASE }}
                onClick={() => setLightbox(GALLERY.indexOf(g))}
                className="group relative block w-full overflow-hidden rounded-2xl"
                aria-label={`Open ${g.title}`}
              >
                <img
                  src={g.src}
                  alt={g.title}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold">{g.category}</p>
                    <p className="font-display text-lg font-semibold text-white">{g.title}</p>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-navy">
                    <Expand className="h-4 w-4" />
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </Container>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-navy/95 p-4 backdrop-blur-sm"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nav(-1); }}
              className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-10"
              aria-label="Previous"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>
            <motion.img
              key={GALLERY[lightbox].src}
              src={GALLERY[lightbox].src}
              alt={GALLERY[lightbox].title}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[82vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            />
            <button
              onClick={(e) => { e.stopPropagation(); nav(1); }}
              className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-10"
              aria-label="Next"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
