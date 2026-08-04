import { getActivity } from "../../data/activities";
import Breadcrumbs from "../../components/Breadcrumbs";
import ProgramHero from "../../components/ProgramHero";
import ActivitySidebar from "../../components/ActivitySidebar";
import FAQSection from "../../components/FAQSection";
import ProgramCTA from "../../components/ProgramCTA";
import { ProgramSection, FeatureGrid, GalleryGrid } from "../../components/ProgramLayout";
import { Container } from "../../lib/ui";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button, EASE } from "../../lib/ui";

const program = getActivity("co-curricular")!;

const activities = [
  { title: "Swimming", image: "/swing.jpg", desc: "Develop water confidence, coordination, safety awareness, and physical fitness." },
  { title: "Skating", image: "/swing2.jpg", desc: "Improve balance, coordination, confidence, and perseverance while having fun." },
  { title: "Ballet & Dance", image: "/drawing.jpg", desc: "Build discipline, flexibility, confidence, rhythm, and graceful movement." },
  { title: "Dance & Fitness", image: "/playing.jpg", desc: "Encourage creativity, teamwork, healthy lifestyles, and self-expression through movement." },
  { title: "Gymnastics", image: "/parade.jpg", desc: "Develop strength, flexibility, balance, coordination, and determination." },
  { title: "Outdoor Learning", image: "/group.jpg", desc: "Hands-on experiences that inspire curiosity, teamwork, environmental awareness, and problem-solving." },
  { title: "Music", image: "/artclass1.jpg", desc: "Singing, drumming, and simple instruments that build listening skills, memory, and musical appreciation." },
  { title: "Creative Arts", image: "/art.jpg", desc: "Nurture creativity and self-expression through music, drawing, painting, crafts, and performance." },
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
  { src: "/art.jpg", alt: "Creative arts" },
  { src: "/art2.jpg", alt: "Art activities" },
  { src: "/swing.jpg", alt: "Swimming" },
  { src: "/playing.jpg", alt: "Play and fitness" },
  { src: "/group.jpg", alt: "Group activities" },
  { src: "/artclass1.jpg", alt: "Art class" },
];

export default function CoCurricularActivities() {
  return (
    <>
      <Breadcrumbs crumbs={[{ label: "Activities", href: "/activities" }, { label: "Co-curricular Activities" }]} />
      <ProgramHero badge={program.heroBadge} title={program.heroTitle} subtitle={program.heroSubtitle} image={program.heroImage} />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="gap-14 lg:grid lg:grid-cols-[1fr_260px]">
            <div>
              <ProgramSection title="Introduction">
                <p className="text-base leading-relaxed text-ink/65">
                  Our co-curricular programme is an essential part of every child's education at Blessedville. Beyond the classroom, children discover new interests, develop important life skills, and build confidence through a rich variety of sports, arts, and outdoor activities — all guided by caring instructors in a safe environment.
                </p>
              </ProgramSection>

              {/* Activities Grid */}
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

              <ProgramSection title="Why Parents Love Our Activities">
                <FeatureGrid items={parentFeatures} columns={2} />
              </ProgramSection>

              <ProgramSection title="Gallery">
                <GalleryGrid images={gallery} />
              </ProgramSection>

              <ProgramSection title="Frequently Asked Questions">
                <FAQSection items={FAQ} />
              </ProgramSection>
            </div>
            <ActivitySidebar currentSlug="co-curricular" />
          </div>
        </Container>
      </section>

      <ProgramCTA
        heading="Help Your Child Discover Their Talents"
        text="Enrol your child today and give them the opportunity to explore, learn, and grow through our enriching co-curricular programme."
        btnLabel="Enroll Today"
      />
    </>
  );
}
