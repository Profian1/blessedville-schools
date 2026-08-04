import { NavLink } from "react-router-dom";
import { ACTIVITIES_NAV } from "../data/activities";

export default function ActivityNav() {
  return (
    <div className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-center gap-1 overflow-x-auto px-5 py-3 sm:px-8 lg:px-10">
        {ACTIVITIES_NAV.map((a) => (
          <NavLink
            key={a.slug}
            to={a.href}
            className={({ isActive }) =>
              `shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-navy text-white"
                  : "text-ink/60 hover:bg-mist hover:text-navy"
              }`
            }
          >
            {a.shortLabel}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
