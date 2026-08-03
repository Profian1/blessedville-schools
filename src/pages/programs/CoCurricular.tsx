import { getProgram } from "../../data/programs";
import Breadcrumbs from "../../components/Breadcrumbs";
import ProgramHero from "../../components/ProgramHero";
import ProgramSidebar from "../../components/ProgramSidebar";
import ProgramCTA from "../../components/ProgramCTA";
import { ProgramSection, FeatureGrid, GalleryGrid } from "../../components/ProgramLayout";
import { Container } from "../../lib/ui";

const program = getProgram("co-curricular")!;

const gallery = [
  { src: "/art.jpg", alt: "Creative arts" },
  { src: "/art2.jpg", alt: "Art activities" },
  { src: "/art3.jpg", alt: "Student artwork" },
  { src: "/drawing.jpg", alt: "Drawing class" },
  { src: "/swing.jpg", alt: "Outdoor play" },
  { src: "/parade.jpg", alt: "School events" },
  { src: "/scouts.jpg", alt: "Clubs and activities" },
  { src: "/playing.jpg", alt: "Sports activities" },
];

export default function CoCurricular() {
  return (
    <>
      <Breadcrumbs crumbs={[{ label: "Programs", href: "/programmes" }, { label: "Co-curricular Activities" }]} />
      <ProgramHero badge={program.heroBadge} title={program.heroTitle} subtitle={program.heroSubtitle} image={program.heroImage} />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="gap-14 lg:grid lg:grid-cols-[1fr_260px]">
            <div>
              <ProgramSection title="Introduction">
                <p className="text-base leading-relaxed text-ink/65">
                  At Blessedville Schools, we believe education extends far beyond the classroom. Our co-curricular programme is designed to help every child discover their unique talents, build confidence, and develop teamwork and leadership — all while having fun and making friends.
                </p>
              </ProgramSection>

              <ProgramSection title="Sports" subtitle="Building healthy bodies, team spirit, and a love for physical activity.">
                <FeatureGrid items={[
                  { title: "Football", desc: "Weekly football sessions that teach teamwork, coordination, and good sportsmanship on our safe playing field." },
                  { title: "Athletics", desc: "Running, jumping, and throwing activities that build fitness, discipline, and a healthy competitive spirit." },
                  { title: "Volleyball", desc: "An inclusive sport that develops hand-eye coordination, communication, and strategic thinking." },
                  { title: "Indoor Games", desc: "Board games, table tennis, and chess that sharpen the mind and teach patience and planning." },
                ]} columns={2} />
              </ProgramSection>

              <ProgramSection title="Clubs" subtitle="Where interests become passions and friendships are formed.">
                <FeatureGrid items={[
                  { title: "Music Club", desc: "Singing, drumming, and simple instruments introduce children to the joy of making music together." },
                  { title: "Drama Club", desc: "Role-play, skits, and mini productions that build confidence, public speaking, and creative expression." },
                  { title: "Debate Club", desc: "Structured discussions that develop critical thinking, respectful argument, and clear communication." },
                  { title: "Environmental Club", desc: "Tree planting, recycling, and nature activities that nurture environmental stewardship from a young age." },
                  { title: "Christian Union", desc: "Fellowship, Bible stories, and community service that deepen faith and character." },
                ]} columns={2} />
              </ProgramSection>

              <ProgramSection title="Creative Arts" subtitle="Unleashing imagination through colour, movement, and self-expression.">
                <FeatureGrid items={[
                  { title: "Drawing & Painting", desc: "Learning techniques with pencils, crayons, watercolours, and acrylics to bring imagination to life on paper and canvas." },
                  { title: "Dance", desc: "Traditional Kenyan dances, modern routines, and creative movement that build grace, rhythm, and confidence." },
                  { title: "Music", desc: "Choir, instrumental introduction, and music appreciation that develop listening skills and a lifelong love for the arts." },
                  { title: "Cultural Activities", desc: "Celebrating Kenya's rich heritage through storytelling, traditional crafts, and cultural performances." },
                ]} columns={2} />
              </ProgramSection>

              <ProgramSection title="Educational Trips">
                <p className="text-base leading-relaxed text-ink/65">
                  Learning comes alive when children step outside the classroom. Our carefully planned educational trips take children to farms, nature reserves, museums, and community landmarks — turning lessons into real-world experiences. These trips spark curiosity, deepen understanding, and create wonderful memories that last a lifetime.
                </p>
              </ProgramSection>

              <ProgramSection title="School Events" subtitle="Celebrating achievements, building community, and creating lasting memories.">
                <FeatureGrid items={[
                  { title: "Sports Day", desc: "A highlight of the school year — a full day of friendly competition, team relays, and family fun on our playing field." },
                  { title: "Talent Shows", desc: "A stage for every child to shine — singing, dancing, comedy, magic, and more in front of a cheering audience." },
                  { title: "Academic Competitions", desc: "Spelling bees, maths challenges, and quiz competitions that make learning exciting and rewarding." },
                  { title: "Graduation", desc: "A proud celebration marking the completion of preschool with caps, gowns, certificates, and joyful families." },
                  { title: "Prize Giving", desc: "An annual ceremony honouring academic achievement, character, sportsmanship, and consistent effort." },
                ]} columns={2} />
              </ProgramSection>

              <ProgramSection title="Gallery">
                <GalleryGrid images={gallery} />
              </ProgramSection>
            </div>
            <ProgramSidebar currentSlug="co-curricular" />
          </div>
        </Container>
      </section>

      <ProgramCTA
        heading="Join Our School Family"
        text="Give your child the opportunity to discover their talents, build lifelong skills, and make wonderful memories."
        btnLabel="Enroll Your Child"
      />
    </>
  );
}
