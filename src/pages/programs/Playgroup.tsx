import { getProgram } from "../../data/programs";
import Breadcrumbs from "../../components/Breadcrumbs";
import ProgramHero from "../../components/ProgramHero";
import ProgramSidebar from "../../components/ProgramSidebar";
import FAQSection from "../../components/FAQSection";
import ProgramCTA from "../../components/ProgramCTA";
import { ProgramSection, FeatureGrid, GalleryGrid } from "../../components/ProgramLayout";
import { Container } from "../../lib/ui";

const program = getProgram("playgroup")!;

const FAQ = [
  { q: "What ages are in Playgroup & Preschool?", a: "Playgroup serves children aged 2–3, while Preschool serves children aged 3–5. Both programmes work together to build a seamless early learning journey." },
  { q: "What curriculum do you follow?", a: "We follow Kenya's Competency-Based Curriculum (CBC), adapted for early years with a strong emphasis on learning through play and creative exploration." },
  { q: "How do you prepare children for primary school?", a: "Our preschool programme builds reading readiness, basic numeracy, social skills, and independence — giving children the confidence to transition smoothly into primary school." },
  { q: "What is a typical day like?", a: "A typical day includes circle time, creative arts, outdoor play, story time, music and movement, and guided learning activities — all balanced with rest and snack breaks." },
  { q: "Do children go on trips?", a: "Yes, we organise age-appropriate educational trips to places like farms, nature parks, and community helpers to extend learning beyond the classroom." },
];

const gallery = [
  { src: "/kid1.jpg", alt: "Playgroup children playing" },
  { src: "/drawing.jpg", alt: "Children drawing" },
  { src: "/group.jpg", alt: "Group learning" },
  { src: "/artclass1.jpg", alt: "Art class activities" },
];

export default function Playgroup() {
  return (
    <>
      <Breadcrumbs crumbs={[{ label: "Programs", href: "/programmes" }, { label: "Playgroup & Preschool" }]} />
      <ProgramHero badge={program.heroBadge} title={program.heroTitle} subtitle={program.heroSubtitle} image={program.heroImage} />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="gap-14 lg:grid lg:grid-cols-[1fr_260px]">
            <div>
              <ProgramSection title="Introduction">
                <p className="text-base leading-relaxed text-ink/65">
                  Our Playgroup and Preschool programmes offer a joyful bridge between home and school. Through guided play, songs, stories, and hands-on activities, children develop the language, social, and thinking skills that form the bedrock of lifelong learning. Every day is filled with discovery, laughter, and gentle encouragement.
                </p>
              </ProgramSection>

              <ProgramSection title="Curriculum Overview" subtitle="A balanced approach that blends structured learning with creative freedom.">
                <FeatureGrid items={[
                  { title: "Language & Literacy", desc: "Stories, songs, phonics, and conversation that build vocabulary, listening, and early reading skills." },
                  { title: "Numeracy", desc: "Counting, sorting, patterns, and simple problem-solving through games and everyday activities." },
                  { title: "Creative Arts", desc: "Drawing, painting, crafts, and music that encourage self-expression and fine motor development." },
                  { title: "Physical Development", desc: "Outdoor play, movement, and coordination activities that build gross motor skills and healthy habits." },
                ]} columns={2} />
              </ProgramSection>

              <ProgramSection title="Learning Areas">
                <FeatureGrid items={[
                  { title: "Communication", desc: "Building confident speakers and attentive listeners through circle time, show-and-tell, and storytelling." },
                  { title: "Social Skills", desc: "Learning to share, take turns, cooperate, and resolve conflicts — essential skills for life and learning." },
                  { title: "Independence", desc: "Dressing, tidying up, making simple choices, and caring for the classroom to nurture self-reliance." },
                  { title: "Cultural Awareness", desc: "Celebrating Kenya's rich diversity through music, dance, food, and stories from different communities." },
                ]} columns={2} />
              </ProgramSection>

              <ProgramSection title="Classroom Activities">
                <p className="text-base leading-relaxed text-ink/65">
                  Our classrooms are vibrant, welcoming spaces filled with learning corners — a reading nook, a construction zone, an art station, and a pretend-play area. Children move freely between activities, guided by teachers who observe, encourage, and extend each child's learning at their own pace. This child-centred approach ensures engagement, curiosity, and deep learning.
                </p>
              </ProgramSection>

              <ProgramSection title="Preparing for Primary School">
                <p className="text-base leading-relaxed text-ink/65">
                  By the time children complete our preschool programme, they are ready — not just academically, but socially and emotionally — for the next big step. They recognise letters and numbers, can write their own name, follow classroom routines, and approach challenges with a growth mindset. Our strong partnership with our lower primary team ensures a seamless transition.
                </p>
              </ProgramSection>

              <ProgramSection title="Gallery">
                <GalleryGrid images={gallery} />
              </ProgramSection>

              <ProgramSection title="Frequently Asked Questions">
                <FAQSection items={FAQ} />
              </ProgramSection>
            </div>
            <ProgramSidebar currentSlug="playgroup" />
          </div>
        </Container>
      </section>

      <ProgramCTA
        heading="Start Your Child's Learning Journey"
        text="Give your child the gift of joyful, purposeful early learning in a safe and nurturing environment."
        btnLabel="Enroll Your Child"
      />
    </>
  );
}
