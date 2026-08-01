import { motion, useInView, useReducedMotion, type Transition } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";

/** Premium easing curve shared across the site */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const REVEAL_TRANSITION: Transition = { duration: 0.8, ease: EASE };

/* ------------------------------------------------------------------ */
/* Reveal — elegant scroll-in animation wrapper                        */
/* ------------------------------------------------------------------ */
type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span" | "article";
};

export function Reveal({ children, delay = 0, y = 28, className = "", as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...REVEAL_TRANSITION, delay }}
    >
      {children}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------ */
/* Counter — animated number that counts up when scrolled into view     */
/* ------------------------------------------------------------------ */
export function Counter({
  to,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 2,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Button — primary (gold) / secondary (outline) / ghost               */
/* ------------------------------------------------------------------ */
type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "gold" | "navy" | "outline" | "ghost";
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
};

export function Button({
  children,
  href = "/",
  variant = "gold",
  className = "",
  onClick,
  ariaLabel,
}: ButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full font-button text-sm font-semibold tracking-wide px-7 py-3.5 transition-all duration-300 will-change-transform focus-visible:outline-none overflow-hidden";
  const variants: Record<string, string> = {
    gold: "bg-gold text-navy hover:shadow-[0_14px_40px_-8px_rgba(245,184,19,0.6)] hover:-translate-y-0.5",
    navy: "bg-navy text-white hover:bg-navy-700 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-8px_rgba(8,8,8,0.55)]",
    outline: "border border-white/40 text-white hover:bg-white hover:text-navy",
    ghost: "border border-navy/20 text-navy hover:border-navy hover:bg-navy hover:text-white",
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  if (href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto") || href.startsWith("tel")) {
    return (
      <a href={href} onClick={onClick} aria-label={ariaLabel} className={cls}>
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </a>
    );
  }

  return (
    <Link to={href} onClick={onClick} aria-label={ariaLabel} className={cls}>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* SectionHeading — eyebrow + title + subtitle                          */
/* ------------------------------------------------------------------ */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl text-left"}>
      {eyebrow && (
        <span
          className={`mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] ${
            light ? "bg-white/10 text-gold-light" : "bg-navy/5 text-navy"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-4xl font-semibold leading-tight sm:text-5xl ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 text-lg leading-relaxed ${light ? "text-white/70" : "text-ink/65"}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Container                                                           */
/* ------------------------------------------------------------------ */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}

/* ------------------------------------------------------------------ */
/* Decorative label chip                                               */
/* ------------------------------------------------------------------ */
export function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/5 px-3.5 py-1.5 text-xs font-medium text-navy ${className}`}
    >
      {children}
    </span>
  );
}
