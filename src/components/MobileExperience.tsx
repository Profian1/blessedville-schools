import { Home, Info, BookOpen, GraduationCap, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { SCHOOL } from "../data";

const ITEMS = [
  { icon: Home, label: "Home", href: "#home" },
  { icon: Info, label: "About", href: "#about" },
  { icon: BookOpen, label: "Academics", href: "#academics" },
  { icon: GraduationCap, label: "Apply", href: "#admissions" },
  { icon: Phone, label: "Contact", href: "#contact" },
];

export default function MobileExperience() {
  return (
    <>
      {/* Floating Apply */}
      <a
        href="#admissions"
        className="fixed bottom-24 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-gold px-6 py-3.5 font-button text-sm font-semibold text-navy shadow-[0_14px_40px_-8px_rgba(212,175,55,0.7)] transition-transform active:scale-95 lg:hidden"
      >
        Apply Now <ArrowRight className="h-4 w-4" />
      </a>

      {/* Floating WhatsApp */}
      <a
        href={`https://wa.me/${SCHOOL.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="goldpulse fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg lg:hidden"
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      {/* Bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-white/95 backdrop-blur-md lg:hidden">
        <ul className="mx-auto flex max-w-md items-stretch justify-between px-2 py-1.5">
          {ITEMS.map((it) => (
            <li key={it.label} className="flex-1">
              <a
                href={it.href}
                className="flex min-h-[52px] flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5 text-[10px] font-medium text-ink/60 transition-colors active:bg-mist"
              >
                <it.icon className="h-5 w-5 text-navy" />
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
