import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Phone, Mail, MessageCircle, Clock } from "lucide-react";
import { ADMISSIONS_FAQ, type FaqItem } from "../../data/admissions";
import { SCHOOL } from "../../data";
import { EASE } from "../../lib/ui";

function Answer({ item }: { item: FaqItem }) {
  if (!item.contactQuestion) return <p className="px-6 pb-5 text-sm leading-relaxed text-ink/60">{item.a}</p>;

  return (
    <div className="px-6 pb-5">
      <p className="text-sm leading-relaxed text-ink/60">{item.a}</p>
      <ul className="mt-4 space-y-2.5 text-sm text-ink/75">
        <li className="flex items-center gap-2.5">
          <Phone className="h-4 w-4 shrink-0 text-gold" />
          <span>
            Call or WhatsApp:{" "}
            <a href={`tel:${SCHOOL.phone.replace(/\s/g, "")}`} className="font-semibold text-navy underline-offset-2 hover:underline">
              {SCHOOL.phone}
            </a>
          </span>
        </li>
        <li className="flex items-center gap-2.5">
          <MessageCircle className="h-4 w-4 shrink-0 text-gold" />
          <span>
            WhatsApp:{" "}
            <a
              href={`https://wa.me/${SCHOOL.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-navy underline-offset-2 hover:underline"
            >
              {SCHOOL.whatsapp}
            </a>
          </span>
        </li>
        <li className="flex items-center gap-2.5">
          <Mail className="h-4 w-4 shrink-0 text-gold" />
          <span>
            Email:{" "}
            <a href={`mailto:${SCHOOL.email}`} className="font-semibold text-navy underline-offset-2 hover:underline">
              {SCHOOL.email}
            </a>
          </span>
        </li>
        <li className="flex items-center gap-2.5">
          <Clock className="h-4 w-4 shrink-0 text-gold" />
          <span>{SCHOOL.hours}</span>
        </li>
      </ul>
    </div>
  );
}

export default function AdmissionsFAQ({ items = ADMISSIONS_FAQ }: { items?: FaqItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((faq, i) => {
        const isOpen = openIdx === i;
        return (
          <div key={i} className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-[0_8px_24px_-16px_rgba(8,8,8,0.15)]">
            <button
              onClick={() => setOpenIdx(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${i}`}
              id={`faq-question-${i}`}
            >
              <span className="font-semibold text-navy">{faq.q}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/15 text-navy"
              >
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <Answer item={faq} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
