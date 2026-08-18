/* ------------------------------------------------------------------ */
/*  Programs — shared navigation data & metadata                       */
/* ------------------------------------------------------------------ */

export type ProgramSlug = "daycare" | "playgroup" | "lower-primary";

export type ProgramMeta = {
  slug: ProgramSlug;
  label: string;
  shortLabel: string;
  href: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroBadge: string;
  seo: { title: string; description: string };
};

export const PROGRAMS_NAV: ProgramMeta[] = [
  {
    slug: "daycare",
    label: "Daycare",
    shortLabel: "Daycare",
    href: "/programmes/daycare",
    heroTitle: "Daycare",
    heroSubtitle:
      "A warm, loving environment where our youngest children feel safe and cherished — gentle routines, sensory play, and lots of cuddles.",
    heroImage: "/daycare/day hero.jpeg",
    heroBadge: "Early Years",
    seo: {
      title: "Daycare (Ages 1–2) | Blessedville Schools",
      description:
        "Warm, loving daycare in Kahawa West for ages 1–2. Gentle routines, sensory play, and trained caregivers at Blessedville Schools, Northern Bypass.",
    },
  },
  {
    slug: "playgroup",
    label: "Playgroup / Preschool",
    shortLabel: "Playgroup",
    href: "/programmes/playgroup",
    heroTitle: "Playgroup & Preschool",
    heroSubtitle:
      "Through guided play, songs, and simple activities, toddlers begin to explore the world around them.",
    heroImage: "/playgroup/parade.jpeg",
    heroBadge: "Early Years",
    seo: {
      title: "Playgroup & Preschool (Ages 2–5) | Blessedville Schools",
      description:
        "Play-based playgroup and preschool in Kahawa West — building language, early literacy, numeracy, and school readiness in a joyful CBC environment.",
    },
  },
  {
    slug: "lower-primary",
    label: "Lower Primary",
    shortLabel: "Primary",
    href: "/programmes/lower-primary",
    heroTitle: "Lower Primary",
    heroSubtitle:
      "A comprehensive CBC programme that develops strong academic foundations while nurturing each child's unique talents.",
    heroImage: "/gallery/students.jpg",
    heroBadge: "Grades 1–4",
    seo: {
      title: "Lower Primary (Grade 1–4) | Blessedville Schools",
      description:
        "CBC lower primary education in Kahawa West — strong foundations in literacy, numeracy, science, and values with small classes and caring teachers.",
    },
  },
];

export function getProgram(slug: ProgramSlug | undefined): ProgramMeta | undefined {
  return PROGRAMS_NAV.find((p) => p.slug === slug);
}
