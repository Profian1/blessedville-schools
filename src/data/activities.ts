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
  seo: { title: string; description: string };
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
    heroImage: "/co-curricular/heroplaying.jpg",
    heroBadge: "Co-curricular",
    seo: {
      title: "Co-curricular Activities | Blessedville Schools",
      description:
        "Swimming, skating, ballet, dance, gymnastics, music, art, and outdoor learning at Blessedville Schools — building confidence, creativity, and teamwork.",
    },
  },
  {
    slug: "clubs",
    label: "Clubs & Social Activities",
    shortLabel: "Clubs",
    href: "/activities/clubs",
    heroTitle: "Clubs & Social Activities",
    heroSubtitle:
      "Our clubs give learners opportunities to develop leadership, teamwork, communication, creativity, and social skills while exploring their passions.",
    heroImage: "/clubs/clubs hero.jpg",
    heroBadge: "Student Clubs",
    seo: {
      title: "Clubs & Social Activities | Blessedville Schools",
      description:
        "Scouting, sports, literacy, and arts clubs at Blessedville Schools — developing leadership, teamwork, creativity, and social skills beyond the classroom.",
    },
  },
];

export function getActivity(slug: ActivitySlug | undefined): ActivityMeta | undefined {
  return ACTIVITIES_NAV.find((a) => a.slug === slug);
}
