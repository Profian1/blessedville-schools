import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Copy, Check, ArrowLeft, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { EASE } from "../../lib/ui";

export default function ApplicationSuccess({ reference }: { reference: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="mx-auto max-w-xl text-center"
    >
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold/15"
      >
        <CheckCircle2 className="h-11 w-11 text-gold" />
      </motion.span>

      <h2 className="mt-6 font-display text-3xl font-semibold text-navy sm:text-4xl">Application Received!</h2>
      <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink/65">
        Thank you for choosing Blessedville Schools. We have received your application and our admissions team will
        review the information and contact you regarding the next steps.
      </p>

      <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-gold/30 bg-gold/5 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">Application Reference</p>
        <p className="mt-2 font-button text-2xl font-bold tracking-wider text-navy">{reference}</p>
        <button
          onClick={handleCopy}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-5 py-2.5 text-xs font-semibold text-navy transition-all hover:border-navy"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-gold" /> Copied!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> Copy Reference
            </>
          )}
        </button>
        <p className="mt-3 text-xs leading-relaxed text-ink/50">
          Please keep this reference number — you may need it when contacting the school about your application.
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          to="/admissions"
          className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-navy/90"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to Admissions
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-navy/20 px-7 py-3.5 text-sm font-semibold text-navy transition-all hover:border-navy hover:bg-navy hover:text-white"
        >
          <MessageCircle className="h-4 w-4" />
          Contact Admissions
        </Link>
      </div>
    </motion.div>
  );
}
