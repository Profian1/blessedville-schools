import { motion } from "framer-motion";
import { ArrowRight, Info, Compass, Gamepad2, BookOpen, Palette, Users, Lightbulb, MessageCircle, Heart, Star } from "lucide-react";
import { getActivity } from "../../data/activities";
import Breadcrumbs from "../../components/Breadcrumbs";
import ProgramHero from "../../components/ProgramHero";
import ActivitySidebar from "../../components/ActivitySidebar";
import FAQSection from "../../components/FAQSection";
import ProgramCTA from "../../components/ProgramCTA";
import { ProgramSection, FeatureGrid, GalleryGrid } from "../../components/ProgramLayout";
import { Container, EASE } from "../../lib/ui";
import { Button } from "../../lib/ui";

const program = getActivity("clubs")!;

const clubs = [
  {
    title: "Scouting",
    icon: Compass,
    desc: "Develop leadership, teamwork, responsibility, outdoor survival skills, and community service values through hands-on scouting activities and camps.",
    color: "bg-green-500",
  },
  {
    title: "Games & Sports",
    icon: Gamepad2,
    desc: "Promote teamwork, discipline, physical fitness, resilience, and sportsmanship through football, netball, and a variety of indoor and outdoor games.",
    activities: ["Football", "Netball"],
    color: "bg-blue-500",
  },
  {
    title: "Literacy Club",
    icon: BookOpen,
    desc: "Strengthen communication, confidence, critical thinking, creativity, and presentation skills through poetry, public speaking, and debate.",
    activities: ["Poetry", "Public Speaking", "Debate"],
    color: "bg-amber-500",
  },
  {
    title: "Arts Club",
    icon: Palette,
    desc: "Encourage imagination, artistic expression, creativity, confidence, and performance skills through fine arts and performing arts.",
    activities: ["Fine Arts", "Performing Arts"],
    color: "bg-rose-500",
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
  { src: "/scouts.jpg", alt: "Scouting activities" },
  { src: "/group.jpg", alt: "Club activities" },
  { src: "/students.jpg", alt: "Student clubs" },
  { src: "/students2.jpg", alt: "Group work" },
  { src: "/parade.jpg", alt: "School events" },
  { src: "/artclass1.jpg", alt: "Club activities" },
];

export default function Clubs() {
  return (
    <>
      <Breadcrumbs crumbs={[{ label: "Activities", href: "/activities" }, { label: "Clubs & Social Activities" }]} />
      <ProgramHero badge={program.heroBadge} title={program.heroTitle} subtitle={program.heroSubtitle} image={program.heroImage} />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="gap-14 lg:grid lg:grid-cols-[1fr_260px]">
            <div>
              <ProgramSection title="Introduction">
                <p className="text-base leading-relaxed text-ink/65">
                  Our clubs programme gives every learner at Blessedville the opportunity to explore their passions beyond the classroom. From scouting adventures to creative arts, literacy debates to sports teams — there is something for every child. And the best part? Every club is part of school life with no additional costs for families.
                </p>
              </ProgramSection>

              {/* Free banner */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE }}
                className="mb-10 flex items-start gap-4 rounded-2xl border border-gold/30 bg-gold/5 p-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/20 text-gold">
                  <Info className="h-5 w-5" />
                </span>
                <p className="text-sm font-medium leading-relaxed text-navy">
                  All student clubs are included in school life and are offered at no extra cost.
                </p>
              </motion.div>

              {/* Clubs Grid */}
              <div className="grid gap-6 sm:grid-cols-2">
                {clubs.map((c, i) => (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
                    className="group flex flex-col overflow-hidden rounded-2xl bg-mist shadow-[0_10px_30px_-16px_rgba(8,8,8,0.25)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-20px_rgba(8,8,8,0.4)]"
                  >
                    <div className="flex items-center gap-4 p-6 pb-3">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-gold transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-navy">
                        <c.icon className="h-6 w-6" />
                      </span>
                      <h3 className="font-display text-lg font-semibold text-navy">{c.title}</h3>
                    </div>
                    <div className="px-6 pb-2">
                      <p className="text-sm leading-relaxed text-ink/60">{c.desc}</p>
                      {c.activities && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {c.activities.map((a) => (
                            <span key={a} className="rounded-full border border-navy/15 bg-white px-2.5 py-0.5 text-xs font-medium text-navy">
                              {a}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <ProgramSection title="Benefits of Joining Clubs" subtitle="Our clubs help children develop skills that last a lifetime.">
                <FeatureGrid items={benefits} columns={3} />
              </ProgramSection>

              <ProgramSection title="Gallery">
                <GalleryGrid images={gallery} />
              </ProgramSection>

              <ProgramSection title="Frequently Asked Questions">
                <FAQSection items={FAQ} />
              </ProgramSection>
            </div>
            <ActivitySidebar currentSlug="clubs" />
          </div>
        </Container>
      </section>

      <ProgramCTA
        heading="Every Child Has a Talent Waiting to Shine"
        text="Join Blessedville Schools and give your child the opportunity to discover their passions, build lifelong skills, and make wonderful friends."
        btnLabel="Join Blessedville Schools"
      />
    </>
  );
}
