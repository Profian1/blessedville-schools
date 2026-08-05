import { motion } from "framer-motion";
import { getProgram } from "../../data/programs";
import ProgramHero from "../../components/ProgramHero";
import ProgramNav from "../../components/ProgramNav";
import FAQSection from "../../components/FAQSection";
import ProgramCTA from "../../components/ProgramCTA";
import { ProgramSection, FeatureGrid, GalleryGrid } from "../../components/ProgramLayout";
import { Container, EASE } from "../../lib/ui";

const program = getProgram("daycare")!;

const FAQ = [
  { q: "What ages does your daycare accept?", a: "We welcome children from 1 to 2 years old in a warm, nurturing environment with trained caregivers." },
  { q: "What are your daycare hours?", a: "Our daycare operates Monday through Friday, 7:00 AM to 5:00 PM, with flexible drop-off and pick-up windows." },
  { q: "What should I pack for my child?", a: "Please pack a change of clothes, nappies or diapers, a comfort item, and any bottles or food your child needs. We provide healthy snacks." },
  { q: "How do you handle separation anxiety?", a: "Our caregivers are trained in gentle settling techniques. We work closely with parents to make the transition smooth and comforting for every child." },
  { q: "Is your daycare licensed and safe?", a: "Yes, our daycare meets all health, safety, and child protection standards. We maintain secure premises and a low child-to-caregiver ratio." },
];

const gallery = [
  { src: "/daycare/sleeping.jpeg", alt: "Nap time" },
  { src: "/daycare/learning.jpeg", alt: "Learning activities" },
  { src: "/daycare/learning5 day.jpeg", alt: "Daycare activities" },
  { src: "/daycare/playgroup.jpeg", alt: "Playgroup fun" },
];

export default function Daycare() {
  return (
    <>
      <ProgramHero
        badge={program.heroBadge}
        title={program.heroTitle}
        image={program.heroImage}
        crumbs={[{ label: "Programmes", href: "/programmes" }, { label: "Daycare" }]}
      />
      <ProgramNav />

      {/* Introduction — centered heading, paragraph, image below */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="text-center">
            <h2 className="font-display text-3xl font-semibold text-navy sm:text-4xl">Introduction</h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-ink/65">
              Our daycare programme provides a warm, loving environment where our youngest children feel safe and cherished. From the moment your child arrives, they are welcomed into a space designed for comfort — soft colours, cosy corners, and toys that spark curiosity while building essential early skills.
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
              src="/daycare/daycare class.jpeg"
              alt="Daycare classroom"
              className="aspect-[16/9] w-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </Container>
      </section>

      <ProgramSection title="Why Choose Our Daycare" subtitle="A home away from home where your child is loved, nurtured, and encouraged to explore.">
        <FeatureGrid items={[
          { title: "Trained Caregivers", desc: "Every staff member is trained in early childhood care, first aid, and child development." },
          { title: "Low Ratios", desc: "Small caregiver-to-child ratios ensure every child gets the individual attention and cuddles they need." },
          { title: "Safe Environment", desc: "Secure, child-proofed spaces with age-appropriate furniture, toys, and outdoor play areas." },
          { title: "Parent Communication", desc: "Daily updates on feeding, naps, and milestones keep you connected to your child's day." },
        ]} columns={2} />
      </ProgramSection>

      <ProgramSection title="Daily Activities">
        <FeatureGrid items={[
          { title: "Sensory Play", desc: "Textures, sounds, and colours that stimulate developing senses and encourage exploration." },
          { title: "Gentle Routines", desc: "Predictable daily patterns for feeding, napping, and play that help children feel secure." },
          { title: "Music & Movement", desc: "Songs, rhymes, and gentle movement activities that build language and motor coordination." },
          { title: "Outdoor Discovery", desc: "Supervised time in our safe outdoor area exploring nature, fresh air, and sunshine." },
        ]} columns={2} />
      </ProgramSection>

      {/* Learning Through Play — text left, image right */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <h2 className="font-display text-3xl font-semibold text-navy sm:text-4xl text-center">Learning Through Play</h2>
              <p className="mt-5 text-base leading-relaxed text-ink/65">
                At this stage, play is the most powerful form of learning. Our caregivers guide children through activities that build early motor skills, social bonding, and language development — all through playful, joyful interaction. Every stack of blocks, every song sung together, and every cuddle builds your child's confidence and sense of security.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="overflow-hidden rounded-2xl shadow-[0_20px_50px_-18px_rgba(8,8,8,0.3)]"
            >
              <img
                src="/daycare/playing2.jpeg"
                alt="Children learning through play"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Safe & Caring Environment — image left, text right */}
      <section className="bg-mist py-16 sm:py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="overflow-hidden rounded-2xl shadow-[0_20px_50px_-18px_rgba(8,8,8,0.3)]"
            >
              <img
                src="/daycare/heroday.jpeg"
                alt="Safe and caring environment"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <h2 className="font-display text-3xl font-semibold text-navy sm:text-4xl text-center">Safe & Caring Environment</h2>
              <p className="mt-5 text-base leading-relaxed text-ink/65">
                Safety is our highest priority. Our daycare rooms are bright, clean, and designed with your child's wellbeing in mind. We maintain secure entry systems, regular sanitisation routines, and child-friendly furniture. Every caregiver is background-checked and trained in paediatric first aid, giving you complete peace of mind while you are at work.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      <ProgramSection title="Gallery">
        <GalleryGrid images={gallery} />
      </ProgramSection>

      <ProgramSection title="Frequently Asked Questions">
        <FAQSection items={FAQ} />
      </ProgramSection>

      <ProgramCTA
        heading="Give Your Child the Best Start"
        text="Enrol your child in our loving daycare programme and give them a foundation of warmth, safety, and joyful learning."
        btnLabel="Enroll Your Child"
      />
    </>
  );
}
