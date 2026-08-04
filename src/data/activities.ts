/* ------------------------------------------------------------------ */
/*  Activities — shared navigation data & metadata                    */
/* ------------------------------------------------------------------ */

export type ActivitySlug = "co-curricular" | "clubs";

export type ActivityMeta = {
  slug: ActivitySlug;
  label: string;
  shortLabel: string;
  href: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroBadge: string;
};

export const ACTIVITIES_NAV: ActivityMeta[] = [
  {
    slug: "co-curricular",
    label: "Co-curricular Activities",
    shortLabel: "Co-curricular",
    href: "/activities/co-curricular",
    heroTitle: "Learning Beyond the Classroom",
    heroSubtitle:
      "Our co-curricular activities encourage learners to explore their interests, stay active, build confidence, and develop lifelong skills in a fun and supportive environment.",
    heroImage: "/football.jpeg",
    heroBadge: "Co-curricular",
  },
  {
    slug: "clubs",
    label: "Clubs & Social Activities",
    shortLabel: "Clubs",
    href: "/activities/clubs",
    heroTitle: "Clubs & Social Activities",
    heroSubtitle:
      "Our clubs give learners opportunities to develop leadership, teamwork, communication, creativity, and social skills while exploring their passions.",
    heroImage: "/scouts.jpg",
    heroBadge: "Student Clubs",
  },
];

export function getActivity(slug: ActivitySlug | undefined): ActivityMeta | undefined {
  return ACTIVITIES_NAV.find((a) => a.slug === slug);
}
