import { getProgram } from "../../data/programs";
import ProgramHero from "../../components/ProgramHero";
import ProgramNav from "../../components/ProgramNav";
import FAQSection from "../../components/FAQSection";
import ProgramCTA from "../../components/ProgramCTA";
import { ProgramSection, FeatureGrid, GalleryGrid } from "../../components/ProgramLayout";
import { Container } from "../../lib/ui";

const program = getProgram("lower-primary")!;

const FAQ = [
  { q: "What grades does Lower Primary cover?", a: "Our Lower Primary programme covers Grades 1 through 4, following the Competency-Based Curriculum (CBC)." },
  { q: "What subjects are taught?", a: "Students learn English, Kiswahili, Mathematics, Science & Environment, Social Studies, Creative Arts, and Physical Education." },
  { q: "How is CBC different from the old system?", a: "CBC focuses on developing practical skills, critical thinking, and creativity rather than memorising facts. Children learn through projects, discussions, and real-world connections." },
  { q: "What is your class size?", a: "We keep class sizes small — typically 20–25 learners per class — to ensure every child gets individual attention." },
  { q: "How do you support children who need extra help?", a: "Our teachers identify learning gaps early and provide targeted support through small-group sessions and personalised learning plans. We also keep parents closely involved." },
];

const gallery = [
  { src: "/academic.jpeg", alt: "Primary classroom" },
  { src: "/learning.jpeg", alt: "Students learning" },
  { src: "/class.jpeg", alt: "Student activities" },
  { src: "/drive.jpg", alt: "Lower primary students" },
];

export default function LowerPrimary() {
  return (
    <>
      <ProgramHero
        badge={program.heroBadge}
        title={program.heroTitle}
        image={program.heroImage}
        crumbs={[{ label: "Programmes", href: "/programmes" }, { label: "Lower Primary" }]}
      />
      <ProgramNav />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <ProgramSection title="Introduction">
            <p className="text-base leading-relaxed text-ink/65">
              Our Lower Primary programme (Grades 1–4) builds on the strong foundation laid in our early years. Following Kenya's Competency-Based Curriculum, we deliver an engaging, well-rounded education that develops not just academic knowledge but also character, creativity, and critical thinking — preparing children for success in upper primary and beyond.
            </p>
          </ProgramSection>

          <ProgramSection title="CBC Learning Approach" subtitle="Putting every child at the centre of their own learning journey.">
            <FeatureGrid items={[
              { title: "Competency-Based", desc: "Children master skills at their own pace, moving forward when they demonstrate understanding — not when the calendar says so." },
              { title: "Project-Driven", desc: "Hands-on projects that connect learning across subjects, making education relevant, engaging, and memorable." },
              { title: "Continuous Assessment", desc: "Regular observation and feedback instead of high-pressure exams, giving a true picture of each child's progress." },
              { title: "Parent Partnership", desc: "Detailed termly reports and regular parent-teacher meetings keep families actively involved in their child's learning." },
            ]} columns={2} />
          </ProgramSection>

          <ProgramSection title="Subjects Offered">
            <FeatureGrid items={[
              { title: "English", desc: "Reading, writing, grammar, and oral communication skills developed through literature, creative writing, and discussion." },
              { title: "Kiswahili", desc: "Building fluency in Kenya's national language through songs, stories, conversations, and written expression." },
              { title: "Mathematics", desc: "Number sense, operations, measurement, geometry, and problem-solving using concrete materials and real-life contexts." },
              { title: "Science & Environment", desc: "Hands-on exploration of living things, materials, energy, and the environment — sparking curiosity about the natural world." },
              { title: "Social Studies", desc: "Understanding our community, country, and continent through maps, stories, and projects that build citizenship." },
              { title: "Creative Arts & Sports", desc: "Drawing, painting, music, drama, and physical education that nurture creativity, teamwork, and healthy living." },
            ]} />
          </ProgramSection>

          <ProgramSection title="Learning Resources">
            <p className="text-base leading-relaxed text-ink/65">
              Our classrooms are equipped with age-appropriate textbooks, learning charts, and hands-on materials. We integrate digital tools — including educational tablets and interactive whiteboards — to enhance lessons and give children early exposure to technology in a guided, purposeful way. Our well-stocked classroom libraries encourage a love of reading from an early age.
            </p>
          </ProgramSection>

          <ProgramSection title="Character Development">
            <p className="text-base leading-relaxed text-ink/65">
              Academic excellence alone is not enough. Our Christian values programme weaves kindness, honesty, responsibility, and respect into daily school life. Morning devotion, values lessons, and our student leadership programme help children grow into compassionate, confident, and principled young people who care about others and their community.
            </p>
          </ProgramSection>

          <ProgramSection title="Gallery">
            <GalleryGrid images={gallery} />
          </ProgramSection>

          <ProgramSection title="Frequently Asked Questions">
            <FAQSection items={FAQ} />
          </ProgramSection>
        </Container>
      </section>

      <ProgramCTA
        heading="Give Your Child a Strong Academic Foundation"
        text="Join our Lower Primary programme and watch your child grow in knowledge, character, and confidence."
        btnLabel="Enroll Your Child"
      />
    </>
  );
}
