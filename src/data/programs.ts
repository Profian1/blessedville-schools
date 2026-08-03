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
    heroImage: "/kid.jpg",
    heroBadge: "Early Years",
  },
  {
    slug: "playgroup",
    label: "Playgroup / Preschool",
    shortLabel: "Playgroup",
    href: "/programmes/playgroup",
    heroTitle: "Playgroup & Preschool",
    heroSubtitle:
      "Through guided play, songs, and simple activities, toddlers begin to explore the world around them.",
    heroImage: "/kid1.jpg",
    heroBadge: "Early Years",
  },
  {
    slug: "lower-primary",
    label: "Lower Primary",
    shortLabel: "Primary",
    href: "/programmes/lower-primary",
    heroTitle: "Lower Primary",
    heroSubtitle:
      "A comprehensive CBC programme that develops strong academic foundations while nurturing each child's unique talents.",
    heroImage: "/class2.jpg",
    heroBadge: "Grades 1–4",
  },
];

export function getProgram(slug: ProgramSlug | undefined): ProgramMeta | undefined {
  return PROGRAMS_NAV.find((p) => p.slug === slug);
}
