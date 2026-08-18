/* ------------------------------------------------------------------ */
/*  Admissions — central content & configuration                       */
/*  School staff can edit this file without touching components.       */
/* ------------------------------------------------------------------ */

import type { ProgramKey } from "./applicationOptions";

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */
export const ADMISSIONS_NAV = [
  { label: "Admissions Overview", shortLabel: "Overview", href: "/admissions" },
  { label: "Admissions Process", shortLabel: "Process", href: "/admissions/process" },
  { label: "Apply Online", shortLabel: "Apply", href: "/admissions/apply" },
  { label: "Book a School Tour", shortLabel: "Book a Tour", href: "/admissions/book-tour" },
  { label: "FAQs", shortLabel: "FAQs", href: "/admissions/faqs" },
];

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
export const ADMISSIONS_HERO = {
  badge: "Admissions",
  heading: "Start Your Child's Journey at Blessedville",
  text: "We're here to make choosing the right school simple. Explore our programs, understand the admissions process, and take the first step toward joining the Blessedville Schools community.",
  primaryCta: "Apply Online",
  primaryHref: "/admissions/apply",
  secondaryCta: "Book a School Tour",
  secondaryHref: "/admissions/book-tour",
  image: "/gallery/group.jpg",
  imageAlt: "Blessedville Schools learners together",
};

/* ------------------------------------------------------------------ */
/*  Quick introduction                                                 */
/* ------------------------------------------------------------------ */
export const ADMISSIONS_INTRO = {
  heading: "A Simple Path to Joining Blessedville",
  text: "We believe choosing a school should be a clear and welcoming experience. Our admissions process is designed to help families understand our school, meet our team, and find the right learning environment for their child.",
};

/* ------------------------------------------------------------------ */
/*  Who can apply — program cards                                      */
/* ------------------------------------------------------------------ */
export const ADMISSIONS_PROGRAMS: {
  key: ProgramKey;
  title: string;
  description: string;
  cta: string;
  href: string;
  image: string;
  imageAlt: string;
}[] = [
  {
    key: "daycare",
    title: "Kindergarten & Daycare",
    description:
      "A caring and playful environment where our youngest learners begin developing confidence, independence, communication, and foundational skills.",
    cta: "Explore Daycare",
    href: "/programmes/daycare",
    image: "/home/daycare.jpeg",
    imageAlt: "Young learners enjoying daycare at Blessedville Schools",
  },
  {
    key: "playgroup",
    title: "Playgroup / Preschool",
    description:
      "Engaging experiences that develop early literacy, numeracy, creativity, communication, and school readiness.",
    cta: "Explore Playgroup",
    href: "/programmes/playgroup",
    image: "/home/playgroup class.jpeg",
    imageAlt: "Playgroup learners at Blessedville Schools",
  },
  {
    key: "lower-primary",
    title: "Lower Primary",
    description:
      "A strong academic foundation supported by hands-on learning, character development, creativity, and the Competency-Based Curriculum.",
    cta: "Explore Lower Primary",
    href: "/programmes/lower-primary",
    image: "/home/lowerprimary.jpg",
    imageAlt: "Lower primary learners in class at Blessedville Schools",
  },
];

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
/*  Why choose us                                                      */
/* ------------------------------------------------------------------ */
export const WHY_CHOOSE_US = [
  {
    icon: "Heart",
    title: "Caring Environment",
    text: "A safe and nurturing environment where every learner is valued.",
  },
  {
    icon: "BookOpen",
    title: "Quality Education",
    text: "A strong academic foundation guided by the Competency-Based Curriculum.",
  },
  {
    icon: "Sparkles",
    title: "Holistic Development",
    text: "We support academic, social, emotional, physical, creative, and character development.",
  },
  {
    icon: "Trophy",
    title: "Engaging Activities",
    text: "Sports, creative arts, clubs, and activities that help learners discover their strengths.",
  },
  {
    icon: "GraduationCap",
    title: "Supportive Teachers",
    text: "Dedicated educators who guide and encourage every learner.",
  },
  {
    icon: "Users",
    title: "Inclusive Community",
    text: "A welcoming school community that respects and values families from different backgrounds.",
  },
];

/* ------------------------------------------------------------------ */
/*  Before you apply — checklist                                       */
/* ------------------------------------------------------------------ */
export const BEFORE_YOU_APPLY = {
  heading: "Before You Apply",
  description: "Having the following information ready will make your application quicker and easier.",
  items: [
    "Child's full name",
    "Child's date of birth",
    "Current school, if applicable",
    "Grade or program being considered",
    "Parent / guardian contact details (phone and email)",
    "Parent / guardian identification details where required",
    "Previous school information where applicable",
    "Relevant learner information (for example, learning or health support needs)",
    "Preferred admission year",
    "Preferred term of entry",
  ],
  footnote: "Not sure what you need? Contact our admissions team before starting your application.",
  cta: "Contact Admissions",
  ctaHref: "/contact",
};

/* ------------------------------------------------------------------ */
/*  CTA blocks                                                         */
/* ------------------------------------------------------------------ */
export const READY_TO_APPLY = {
  heading: "Ready to Apply?",
  text: "Complete our online application and our admissions team will get in touch to guide you through the next steps.",
  primaryCta: "Start Online Application",
  primaryHref: "/admissions/apply",
  secondaryCta: "Talk to Admissions",
  secondaryHref: "/contact",
};

export const SCHOOL_TOUR_CTA = {
  heading: "Come and See Blessedville for Yourself",
  text: "The best way to experience our school is to see it in person. Book a visit, explore our learning environment, and speak with our team.",
  cta: "Book a School Tour",
  href: "/admissions/book-tour",
  image: "/contact/school.jpg",
  imageAlt: "Blessedville Schools campus and learning environment",
};

export const FINAL_CTA = {
  heading: "Take the First Step",
  text: "We're ready to help you find the right learning journey for your child.",
  primaryCta: "Apply Online",
  primaryHref: "/admissions/apply",
  secondaryCta: "Contact Admissions",
  secondaryHref: "/contact",
};

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

/** Configurable — update admission periods without touching components. */
export const APPLICATION_WINDOW_NOTE =
  "Blessedville Schools welcomes applications throughout the year. For the latest information on intakes, availability, and admission periods for your child's program or grade, please contact our admissions team.";

/** Built from the central school contact configuration (see src/data.ts). */
export const CONTACT_DETAILS_NOTE =
  "You can reach the admissions team on weekdays from 7:00 AM to 5:00 PM by phone or WhatsApp, or by email at any time. Visit our Contact page for full details.";

export type FaqItem = {
  q: string;
  a: string;
  contactQuestion?: boolean;
};

export const ADMISSIONS_FAQ: FaqItem[] = [
  {
    q: "What programs can I apply for?",
    a: "Blessedville Schools currently welcomes applications for Kindergarten & Daycare, Playgroup / Preschool, and Lower Primary. Visit our Programs section to learn more about each learning stage.",
  },
  {
    q: "When can I apply?",
    a: APPLICATION_WINDOW_NOTE,
  },
  {
    q: "Is there an assessment?",
    a: ADMISSIONS_ASSESSMENT_NOTE,
  },
  {
    q: "Can I visit the school before applying?",
    a: "Yes. Families are encouraged to contact the school to arrange a school visit or tour. You can book a visit online through our Book a School Tour page.",
  },
  {
    q: "What happens after I submit my application?",
    a: "Our admissions team will review your application and contact you regarding availability and the next steps.",
  },
  {
    q: "How can I contact the admissions team?",
    a: CONTACT_DETAILS_NOTE,
    contactQuestion: true,
  },
];

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

export const BOOK_TOUR_SEO = {
  title: "Book a School Tour | Blessedville Schools",
  description:
    "Book a school tour at Blessedville Schools and see our learning environment, meet our team, and experience our warm community first-hand.",
  path: "/admissions/book-tour",
};

export const FAQS_SEO = {
  title: "Admissions FAQs | Blessedville Schools",
  description:
    "Frequently asked questions about admissions at Blessedville Schools — programs, application periods, assessments, school visits, and more.",
  path: "/admissions/faqs",
};
