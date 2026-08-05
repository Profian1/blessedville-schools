import { getActivity } from "../../data/activities";
import ProgramHero from "../../components/ProgramHero";
import ActivityNav from "../../components/ActivityNav";
import FAQSection from "../../components/FAQSection";
import ProgramCTA from "../../components/ProgramCTA";
import { ProgramSection, FeatureGrid, GalleryGrid } from "../../components/ProgramLayout";
import { Container } from "../../lib/ui";
import { motion } from "framer-motion";
import { EASE } from "../../lib/ui";

const program = getActivity("co-curricular")!;

const activities = [
  { title: "Swimming", image: "/co-curricular/swimming1.jpeg", desc: "Develop water confidence, coordination, safety awareness, and physical fitness." },
  { title: "Ball Games", image: "/co-curricular/football.jpeg", desc: "Build teamwork, coordination, and a love for sports through football and other games." },
  { title: "Dance & Fitness", image: "/co-curricular/dance1.jpg", desc: "Encourage creativity, teamwork, healthy lifestyles, and self-expression through movement." },
  { title: "Outdoor Learning", image: "/outdoorlaerning.jpeg", desc: "Hands-on experiences that inspire curiosity, teamwork, environmental awareness, and problem-solving." },
  { title: "Music", image: "/co-curricular/music.jpeg", desc: "Singing, drumming, and simple instruments that build listening skills, memory, and musical appreciation." },
  { title: "Creative Arts", image: "/co-curricular/arts.jpg", desc: "Nurture creativity and self-expression through music, drawing, painting, crafts, and performance." },
];

const parentFeatures = [
  { title: "Experienced Instructors", desc: "Every activity is led by qualified, passionate staff who bring out the best in children." },
  { title: "Safe Learning Environment", desc: "All activities take place in secure, supervised spaces with age-appropriate equipment." },
  { title: "Builds Confidence", desc: "Whether in the pool or on stage, every child gains confidence to try new things." },
  { title: "Encourages Teamwork", desc: "Children learn to collaborate, lead, and support each other through shared goals." },
];

const FAQ = [
  { q: "Do all learners participate in activities?", a: "Yes, all learners participate in co-curricular activities as part of our holistic approach to education. Activities are integrated into the school timetable." },
  { q: "Are activities age appropriate?", a: "Absolutely. Every activity is carefully designed and supervised to match the age, ability, and developmental stage of each group of children." },
  { q: "How often are activities held?", a: "Co-curricular activities run throughout the school week, with dedicated time built into the daily timetable. Some activities also take place during special events and sports days." },
  { q: "What should my child wear for activities?", a: "Learners should wear comfortable PE kit on activity days. Specific requirements for swimming, skating, or other activities will be communicated at the start of each term." },
];

const gallery = [
  { src: "/co-curricular/dance.jpg", alt: "Dance activities" },
  { src: "/co-curricular/fut.jpeg", alt: "Football" },
  { src: "/co-curricular/playingfacility.jpeg", alt: "Play facilities" },
  { src: "/co-curricular/swimming.jpeg", alt: "Swimming" },
];

export default function CoCurricularActivities() {
  return (
    <>
      <ProgramHero
        badge={program.heroBadge}
        title={program.heroTitle}
        image={program.heroImage}
        crumbs={[{ label: "Activities", href: "/activities" }, { label: "Co-curricular Activities" }]}
      />
      <ActivityNav />

      {/* Introduction — centered heading, paragraph, image below */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="text-center">
            <h2 className="font-display text-3xl font-semibold text-navy sm:text-4xl">Introduction</h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-ink/65">
              Our co-curricular programme is an essential part of every child's education at Blessedville. Beyond the classroom, children discover new interests, develop important life skills, and build confidence through a rich variety of sports, arts, and outdoor activities — all guided by caring instructors in a safe environment.
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
              src="/co-curricular/play.jpeg"
              alt="Children playing"
              className="aspect-[16/9] w-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </Container>
      </section>

      {/* Activities Grid */}
      <section className="bg-white pb-16 sm:pb-20">
        <Container>
          <ProgramSection title="Our Activities">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {activities.map((a, i) => (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
                  className="group overflow-hidden rounded-2xl bg-mist shadow-[0_10px_30px_-16px_rgba(8,8,8,0.25)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-20px_rgba(8,8,8,0.4)]"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={a.image}
                      alt={a.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-navy">{a.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/60">{a.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </ProgramSection>
        </Container>
      </section>

      <ProgramSection title="Why Parents Love Our Activities">
        <FeatureGrid items={parentFeatures} columns={2} />
      </ProgramSection>

      <ProgramSection title="Gallery">
        <GalleryGrid images={gallery} />
      </ProgramSection>

      <ProgramSection title="Frequently Asked Questions">
        <FAQSection items={FAQ} />
      </ProgramSection>

      <ProgramCTA
        heading="Help Your Child Discover Their Talents"
        text="Enrol your child today and give them the opportunity to explore, learn, and grow through our enriching co-curricular programme."
        btnLabel="Enroll Today"
      />
    </>
  );
}
