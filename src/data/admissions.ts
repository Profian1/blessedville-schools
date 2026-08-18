/* ------------------------------------------------------------------ */
/*  Admissions — central content & configuration                       */
/*  School staff can edit this file without touching components.       */
/* ------------------------------------------------------------------ */

import { SCHOOL } from "../data";

/** Build a WhatsApp link with a pre-filled message. */
export function whatsappHref(message: string): string {
  const digits = SCHOOL.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */
export const ADMISSIONS_NAV = [
  { label: "Admissions Process", shortLabel: "Process", href: "/admissions/process" },
  { label: "Apply Online", shortLabel: "Apply", href: "/admissions/apply" },
];

/* ------------------------------------------------------------------ */
/*  Admissions landing page header                                     */
/* ------------------------------------------------------------------ */
export const ADMISSIONS_HEADER = {
  eyebrow: "Admissions",
  title: "Your Journey to Blessedville",
  subtitle:
    "A warm, simple process designed to help your family feel at home with us from the very first step.",
  primaryCta: "Apply Online",
  primaryHref: "/admissions/apply",
  secondaryCta: "Contact Admissions",
  secondaryHref: "/contact",
};

/* ------------------------------------------------------------------ */
/*  Admissions process — four steps                                    */
/* ------------------------------------------------------------------ */
export type AdmissionsStep = {
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  cta?: string;
  ctaHref?: string;
  note?: string;
};

export const ADMISSIONS_STEPS: AdmissionsStep[] = [
  {
    number: "01",
    title: "Enquire & Apply",
    shortTitle: "Apply Online",
    description:
      "Explore our programs, speak with our admissions team, and complete the online application form with your child's details.",
    icon: "ClipboardList",
    cta: "Apply Online",
    ctaHref: "/admissions/apply",
  },
  {
    number: "02",
    title: "Application Review",
    shortTitle: "Application Review",
    description:
      "Our admissions team reviews your application and contacts you to confirm the next steps and availability for your child's program or grade.",
    icon: "SearchCheck",
  },
  {
    number: "03",
    title: "School Tour & Assessment",
    shortTitle: "Tour & Assessment",
    description:
      "Visit Blessedville Schools, meet our team, explore the learning environment, and where applicable, complete the appropriate learner assessment.",
    icon: "School",
  },
  {
    number: "04",
    title: "Admission & Enrolment",
    shortTitle: "Admission & Enrol",
    description:
      "Once your child's place is confirmed, our team will guide you through the final enrolment requirements and prepare your family for joining Blessedville Schools.",
    icon: "CheckCircle2",
  },
];

/** Configurable note explaining the assessment step — update with school policy. */
export const ADMISSIONS_ASSESSMENT_NOTE =
  "A learner assessment is arranged where the school considers it appropriate — for example, to help confirm the best grade or program placement for your child. Our admissions team will let you know if an assessment applies to your child.";

/* ------------------------------------------------------------------ */
/*  Admissions process page header                                     */
/* ------------------------------------------------------------------ */
export const PROCESS_HEADER = {
  eyebrow: "Admissions Process",
  title: "A Clear Path, Every Step of the Way",
  subtitle: "From your first enquiry to your child's first day — here is exactly what to expect at every step.",
};

/* ------------------------------------------------------------------ */
/*  School tour booking — via WhatsApp                                 */
/* ------------------------------------------------------------------ */
export const TOUR_SECTION = {
  eyebrow: "Visit Us",
  title: "Book a School Tour",
  subtitle:
    "See our learning environment, meet our teachers, and experience the warmth of the Blessedville community first-hand. Message us on WhatsApp with your preferred date and we'll confirm a time with you.",
  cta: "Book a School Tour on WhatsApp",
};

export const WHATSAPP_TOUR_MESSAGE =
  "Hello Blessedville Schools! I would like to book a school tour for my child. Could you please share the available dates and times?";

export const WHATSAPP_APPLY_MESSAGE =
  "Hello Blessedville Schools! I would like to apply for admission but I need help with the online application form. Please contact me to guide me through the process.";

/* ------------------------------------------------------------------ */
/*  SEO                                                                */
/* ------------------------------------------------------------------ */
export const ADMISSIONS_SEO = {
  title: "Admissions | Blessedville Schools",
  description:
    "Discover the admissions process at Blessedville Schools and take the first step toward providing your child with a nurturing, inclusive, and quality learning environment.",
  path: "/admissions",
};

export const APPLY_SEO = {
  title: "Apply Online | Admissions | Blessedville Schools",
  description:
    "Complete the Blessedville Schools online application form for Kindergarten & Daycare, Playgroup / Preschool, or Lower Primary.",
  path: "/admissions/apply",
  noindex: true,
};

export const PROCESS_SEO = {
  title: "Admissions Process | Blessedville Schools",
  description:
    "Understand the Blessedville Schools admissions process — from enquiry and application to school tour, assessment, and enrolment.",
  path: "/admissions/process",
};