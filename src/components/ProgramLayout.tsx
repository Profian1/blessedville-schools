import { motion } from "framer-motion";
import { Container, Reveal, SectionHeading, EASE } from "../lib/ui";

export function ProgramSection({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          align="left"
          title={<span className="text-navy">{title}</span>}
          subtitle={subtitle}
        />
        <div className="mt-10">{children}</div>
      </Container>
    </section>
  );
}

const colsMap: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

export function FeatureGrid({ items, columns = 3 }: { items: { title: string; desc: string }[]; columns?: number }) {
  return (
    <div className={`grid gap-5 sm:grid-cols-2 ${colsMap[columns] || "lg:grid-cols-3"}`}>
      {items.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
          className="rounded-2xl border border-navy/10 bg-mist p-6"
        >
          <h4 className="font-semibold text-navy">{item.title}</h4>
          <p className="mt-2 text-sm leading-relaxed text-ink/60">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function GalleryGrid({ images }: { images: { src: string; alt: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {images.map((img, i) => (
        <motion.div
          key={img.src}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
          className="group overflow-hidden rounded-2xl"
        >
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>
      ))}
    </div>
  );
}
