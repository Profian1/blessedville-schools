import { motion } from "framer-motion";
import { Info, Compass, Gamepad2, BookOpen, Palette, Users, Lightbulb, MessageCircle, Heart, Star } from "lucide-react";
import { getActivity } from "../../data/activities";
import ProgramHero from "../../components/ProgramHero";
import ActivityNav from "../../components/ActivityNav";
import FAQSection from "../../components/FAQSection";
import ProgramCTA from "../../components/ProgramCTA";
import { ProgramSection, FeatureGrid, GalleryGrid } from "../../components/ProgramLayout";
import { Container, EASE } from "../../lib/ui";

const program = getActivity("clubs")!;

const clubs = [
  {
    title: "Scouting",
    icon: Compass,
    desc: "Develop leadership, teamwork, responsibility, outdoor survival skills, and community service values through hands-on scouting activities and camps.",
    image: "/clubs/scouts.jpg",
  },
  {
    title: "Games & Sports",
    icon: Gamepad2,
    desc: "Promote teamwork, discipline, physical fitness, resilience, and sportsmanship through football, netball, and a variety of indoor and outdoor games.",
    activities: ["Football", "Netball"],
    image: "/clubs/games and sports.jpg",
  },
  {
    title: "Arts Club",
    icon: Palette,
    desc: "Encourage imagination, artistic expression, creativity, confidence, and performance skills through fine arts and performing arts.",
    activities: ["Fine Arts", "Performing Arts"],
    image: "/clubs/arts club.jpg",
  },
  {
    title: "Literacy Club",
    icon: BookOpen,
    desc: "Strengthen communication, confidence, critical thinking, creativity, and presentation skills through poetry, public speaking, and debate.",
    activities: ["Poetry", "Public Speaking", "Debate"],
    image: "/clubs/art6.jpg",
  },
];

const benefits = [
  { icon: Users, title: "Leadership", desc: "Taking charge, inspiring others, and making decisions with confidence." },
  { icon: Star, title: "Confidence", desc: "Standing up, speaking out, and believing in one's own abilities." },
  { icon: MessageCircle, title: "Communication", desc: "Expressing ideas clearly and listening to others with empathy." },
  { icon: Palette, title: "Creativity", desc: "Thinking outside the box and solving problems in new ways." },
  { icon: Heart, title: "Friendships", desc: "Building meaningful connections and learning to work with others." },
  { icon: Lightbulb, title: "Character", desc: "Developing integrity, responsibility, and a strong moral compass." },
];

const FAQ = [
  { q: "How do learners join clubs?", a: "Club sign-ups happen at the beginning of each term. Learners can choose the clubs that interest them, and our teachers help guide them to the right fit based on their age and interests." },
  { q: "Can learners join more than one club?", a: "Yes! Learners are encouraged to explore different interests. Many children participate in two or more clubs throughout the week, balancing their time between various activities." },
  { q: "When are club meetings held?", a: "Club meetings are integrated into the school timetable and take place during dedicated activity periods. Some clubs also meet during lunch breaks or after school, depending on the activity." },
  { q: "Are there any additional costs?", a: "No. All student clubs are included in school life and are offered at no extra cost to families — part of our commitment to a holistic education." },
];

const gallery = [
  { src: "/clubs/art5.jpg", alt: "Club activities" },
  { src: "/clubs/art7.jpg", alt: "Student creativity" },
  { src: "/clubs/artclass1.jpg", alt: "Arts class" },
];

export default function Clubs() {
  return (
    <>
      <ProgramHero
        badge={program.heroBadge}
        title={program.heroTitle}
        image={program.heroImage}
        crumbs={[{ label: "Activities", href: "/activities" }, { label: "Clubs & Social Activities" }]}
      />
      <ActivityNav />

      {/* Introduction — centered heading, paragraph, image below */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="text-center">
            <h2 className="font-display text-3xl font-semibold text-navy sm:text-4xl">Introduction</h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-ink/65">
              Our clubs programme gives every learner at Blessedville the opportunity to explore their passions beyond the classroom. From scouting adventures to creative arts, literacy debates to sports teams — there is something for every child. And the best part? Every club is part of school life with no additional costs for families.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-10 overflow-hidden rounded-2xl shadow-[0_20px_50px_-18px_rgba(8,8,8,0.3)]"
          >
            <img
              src="/clubs/social.jpg"
              alt="Social activities at Blessedville"
              className="aspect-[16/9] w-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </Container>
      </section>

      {/* Free banner */}
      <section className="bg-white pb-8">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex items-start gap-4 rounded-2xl border border-gold/30 bg-gold/5 p-5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/20 text-gold">
              <Info className="h-5 w-5" />
            </span>
            <p className="text-sm font-medium leading-relaxed text-navy">
              All student clubs are included in school life and are offered at no extra cost.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Individual Club Sections */}
      {clubs.map((club, index) => {
        const isEven = index % 2 === 0;
        return (
          <section key={club.title} className={isEven ? "bg-white py-16 sm:py-20" : "bg-mist py-16 sm:py-20"}>
            <Container>
              <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${isEven ? "" : "lg:[direction:rtl]"}`}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="overflow-hidden rounded-2xl shadow-[0_20px_50px_-18px_rgba(8,8,8,0.3)]"
                  dir="ltr"
                >
                  <img
                    src={club.image}
                    alt={club.title}
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: EASE }}
                  dir="ltr"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-gold">
                      <club.icon className="h-6 w-6" />
                    </span>
                    <h3 className="font-display text-2xl font-semibold text-navy sm:text-3xl">{club.title}</h3>
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-ink/65">{club.desc}</p>
                  {club.activities && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {club.activities.map((a) => (
                        <span key={a} className="rounded-full border border-navy/15 bg-white px-3 py-1 text-sm font-medium text-navy">
                          {a}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            </Container>
          </section>
        );
      })}

      <ProgramSection title="Benefits of Joining Clubs" subtitle="Our clubs help children develop skills that last a lifetime.">
        <FeatureGrid items={benefits} columns={3} />
      </ProgramSection>

      <ProgramSection title="Gallery">
        <GalleryGrid images={gallery} />
      </ProgramSection>

      <ProgramSection title="Frequently Asked Questions">
        <FAQSection items={FAQ} />
      </ProgramSection>

      <ProgramCTA
        heading="Every Child Has a Talent Waiting to Shine"
        text="Join Blessedville Schools and give your child the opportunity to discover their passions, build lifelong skills, and make wonderful friends."
        btnLabel="Join Blessedville Schools"
      />
    </>
  );
}
