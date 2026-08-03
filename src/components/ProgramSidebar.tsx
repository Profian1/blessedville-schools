import { NavLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { PROGRAMS_NAV } from "../data/programs";

export default function ProgramSidebar({ currentSlug }: { currentSlug?: string }) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28 rounded-2xl border border-navy/10 bg-white p-6 shadow-[0_12px_40px_-20px_rgba(8,8,8,0.2)]">
        <h3 className="font-display text-lg font-semibold text-navy">Explore Our Programs</h3>
        <nav className="mt-4 flex flex-col gap-0.5">
          {PROGRAMS_NAV.map((p) => (
            <NavLink
              key={p.slug}
              to={p.href}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-navy text-white shadow-sm"
                    : "text-ink/60 hover:bg-mist hover:text-navy"
                }`
              }
            >
              {p.shortLabel}
              <ChevronRight className={`h-3.5 w-3.5 transition-transform ${
                currentSlug === p.slug ? "translate-x-0.5" : "opacity-40"
              }`} />
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
