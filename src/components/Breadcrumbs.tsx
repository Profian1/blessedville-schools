import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { Container, EASE } from "../lib/ui";

type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <div className="bg-mist py-3">
      <Container>
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex items-center gap-1.5 text-sm"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="flex items-center gap-1 text-ink/50 transition-colors hover:text-navy">
            <Home className="h-3.5 w-3.5" />
            Home
          </Link>
          {crumbs.map((c, i) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 text-ink/30" />
              {c.href ? (
                <Link to={c.href} className="text-ink/50 transition-colors hover:text-navy">
                  {c.label}
                </Link>
              ) : (
                <span className="font-medium text-navy">{c.label}</span>
              )}
            </span>
          ))}
        </motion.nav>
      </Container>
    </div>
  );
}
