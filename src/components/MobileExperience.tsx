import { Link } from "react-router-dom";
import { Home, Info, BookOpen, Image, Activity, ArrowRight } from "lucide-react";
import { SCHOOL } from "../data";

const ITEMS = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Info, label: "About", href: "/about" },
  { icon: BookOpen, label: "Programmes", href: "/programmes" },
  { icon: Image, label: "Gallery", href: "/gallery" },
  { icon: Activity, label: "Activities", href: "/activities" },
];

export default function MobileExperience() {
  return (
    <>
      {/* Floating Apply */}
      <Link
        to="/admissions"
        className="fixed bottom-24 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gold px-4 py-2.5 font-button text-xs font-semibold text-navy shadow-[0_14px_40px_-8px_rgba(245,184,19,0.7)] transition-transform active:scale-95 lg:hidden"
      >
        Apply Now <ArrowRight className="h-3.5 w-3.5" />
      </Link>

      {/* Floating WhatsApp */}
      <a
        href={`https://wa.me/${SCHOOL.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="goldpulse fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg lg:hidden"
      >
        <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </a>

      {/* Bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-white/95 backdrop-blur-md lg:hidden">
        <ul className="mx-auto flex max-w-md items-stretch justify-between px-2 py-1.5">
          {ITEMS.map((it) => (
            <li key={it.label} className="flex-1">
              <Link
                to={it.href}
                className="flex min-h-[52px] flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5 text-[10px] font-medium text-ink/60 transition-colors active:bg-mist"
              >
                <it.icon className="h-5 w-5 text-navy" />
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
