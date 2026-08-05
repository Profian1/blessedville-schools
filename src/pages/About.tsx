import { useState } from "react";
import { motion } from "framer-motion";
import {
  Target,
  Lightbulb,
  Heart,
  PlayCircle,
  GraduationCap,
  Users,
  Shield,
  MonitorSmartphone,
  Sparkles,
  BookOpen,
  Award,
} from "lucide-react";
import { ABOUT } from "../data/about";
import ProgramHero from "../components/ProgramHero";
import { Container, Reveal, SectionHeading, EASE } from "../lib/ui";

const ICONS: Record<string, React.ElementType> = {
  Target,
  Lightbulb,
  Heart,
  GraduationCap,
  Users,
  Shield,
  MonitorSmartphone,
  Sparkles,
  BookOpen,
  Award,
  PlayCircle,
};

/* ------------------------------------------------------------------ */
/* 1. Welcome                                                          */
/* ------------------------------------------------------------------ */
function Welcome() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl shadow-[0_24px_60px_-20px_rgba(8,8,8,0.35)]">
              <img
                src={ABOUT.welcome.image}
                alt="Welcome to Blessedville Schools"
                className="aspect-[4/5] w-full object-cover object-[center_20%] lg:aspect-[5/4]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/25 via-transparent to-transparent" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-navy">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              About Us
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-navy sm:text-4xl">
              {ABOUT.welcome.heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink/65">{ABOUT.welcome.p1}</p>
            <p className="mt-4 text-base leading-relaxed text-ink/65">{ABOUT.welcome.p2}</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Our Story                                                        */
/* ------------------------------------------------------------------ */
function Story() {
  return (
    <section className="bg-mist py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our Journey"
          title={<>A story of <span className="text-gold-gradient">love and purpose</span>.</>}
          subtitle="From a small beginning in Kahawa West to a trusted name in early childhood education — our journey reflects a deep commitment to every child's growth."
        />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Timeline */}
          <Reveal className="space-y-6">
            {[
              { year: "2015", title: "A Vision is Born", text: "Blessedville Schools opens its doors in Kahawa West with a handful of children and a big dream." },
              { year: "2017", title: "Full CBC Rollout", text: "We fully embrace the Competency Based Curriculum, putting every child at the centre of learning." },
              { year: "2019", title: "Growing Community", text: "Enrolment doubles as families across Nairobi discover our nurturing approach to education." },
              { year: "2021", title: "New Programmes Launch", text: "Daycare and playgroup programmes open, giving the youngest learners a gentle, loving start." },
              { year: "2025", title: "A Decade of Impact", text: "Ten years of shaping confident, curious children — and we are only just beginning." },
            ].map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                className="flex gap-5"
              >
                <div className="flex flex-col items-center">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gold shadow-[0_0_0_5px_rgba(245,184,19,0.15)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-navy" />
                  </span>
                  {i < 4 && <div className="mt-2 h-full w-px bg-gold/25" />}
                </div>
                <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gold">{m.year}</span>
                  <h4 className="mt-1 font-semibold text-navy">{m.title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{m.text}</p>
                </div>
              </motion.div>
            ))}
          </Reveal>

          {/* Image + text */}
          <Reveal delay={0.15} className="space-y-5">
            <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_50px_-18px_rgba(8,8,8,0.3)]">
              <img
                src={ABOUT.story.image}
                alt="Our story"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent" />
            </div>
            <p className="text-base leading-relaxed text-ink/65">{ABOUT.story.p1}</p>
            <p className="text-base leading-relaxed text-ink/65">{ABOUT.story.p2}</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Mission, Vision & Values                                         */
/* ------------------------------------------------------------------ */
function MissionVisionValues() {
  const { missionVision } = ABOUT;
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="What Guides Us"
          title={<>Built on <span className="text-gold-gradient">purpose</span> and principles.</>}
        />

        {/* Mission & Vision cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {[
            { ...missionVision.mission, Icon: ICONS[missionVision.mission.icon] ?? Target },
            { ...missionVision.vision, Icon: ICONS[missionVision.vision.icon] ?? Lightbulb },
          ].map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
              className="group rounded-2xl border border-navy/10 bg-mist p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-18px_rgba(8,8,8,0.35)]"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-gold transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-navy">
                <m.Icon className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold text-navy">{m.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-ink/65">{m.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Our Promise — centered */}
        <div className="mt-6 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="group max-w-xl rounded-2xl border border-navy/10 bg-mist p-8 text-center transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-18px_rgba(8,8,8,0.35)]"
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-gold transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-navy">
              <Heart className="h-7 w-7" />
            </span>
            <h3 className="mt-5 font-display text-2xl font-semibold text-navy">Our Promise</h3>
            <p className="mt-3 text-base leading-relaxed text-ink/65">
              At Blessedville Schools, we are committed to inspiring a lifelong love for learning while nurturing every child's gifts, character, and confidence.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <Reveal className="mt-12">
          <div className="relative overflow-hidden rounded-2xl p-8 sm:p-10">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(/about/corevalues.jpeg)" }}
            />
            <div className="absolute inset-0 bg-navy/80" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,184,19,0.10),transparent_45%)]" />
            <div className="relative z-10">
              <h3 className="text-center font-display text-2xl font-semibold text-white">Our Core Values</h3>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                {missionVision.values.map((v) => (
                  <div
                    key={v.label}
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10 sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
                  >
                    <h4 className="font-semibold text-gold-light">{v.label}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/60">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Why Choose Us                                                    */
/* ------------------------------------------------------------------ */
function WhyChooseUs() {
  return (
    <section className="bg-mist py-20 sm:py-28">
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />
      <Container className="relative">
        <SectionHeading
          eyebrow="Why Families Trust Us"
          title={<>An education built <span className="text-gold-gradient">around your child</span>.</>}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ABOUT.whyChooseUs.items.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Sparkles;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
                className="group flex gap-5 rounded-2xl border border-white bg-white p-6 shadow-[0_10px_30px_-16px_rgba(8,8,8,0.2)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-20px_rgba(8,8,8,0.35)]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-gold transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-navy">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h4 className="font-semibold text-navy">{item.title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Learning Environment                                             */
/* ------------------------------------------------------------------ */
function LearningEnvironment() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-navy">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Our Campus
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-navy sm:text-4xl">
              {ABOUT.learningEnv.heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink/65">{ABOUT.learningEnv.p1}</p>
            <p className="mt-4 text-base leading-relaxed text-ink/65">{ABOUT.learningEnv.p2}</p>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-2xl shadow-[0_24px_60px_-20px_rgba(8,8,8,0.35)]">
              <img
                src={ABOUT.learningEnv.image}
                alt="Learning environment at Blessedville"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-transparent" />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 7. School Community                                                 */
/* ------------------------------------------------------------------ */
function SchoolCommunity() {
  const { community } = ABOUT;
  const [tab, setTab] = useState(community.tabs[0]);
  const images = tab === community.tabs[0] ? community.images.teachers
    : tab === community.tabs[1] ? community.images.spaces
      : community.images.facilities;

  return (
    <section className="bg-mist py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our Community"
          title={<>Meet the heart of <span className="text-gold-gradient">Blessedville</span>.</>}
        />

        {/* Tabs */}
        <Reveal className="mt-10 flex flex-wrap justify-center gap-2.5">
          {community.tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${tab === t
                ? "bg-gold text-navy"
                : "border border-navy/15 text-navy/60 hover:border-navy hover:text-navy"
                }`}
            >
              {t}
            </button>
          ))}
        </Reveal>

        {/* Image grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {images.map((img, i) => (
            <motion.div
              key={img.caption}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
              className="group overflow-hidden rounded-2xl shadow-[0_12px_35px_-16px_rgba(8,8,8,0.25)]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={img.src}
                  alt={img.caption}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 text-sm font-semibold text-white">{img.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 8. School at a Glance                                               */
/* ------------------------------------------------------------------ */
function SchoolStats() {
  return (
    <section className="relative bg-navy py-20 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(245,184,19,0.10),transparent_50%)]" />
      <Container className="relative">
        <SectionHeading
          light
          eyebrow="At a Glance"
          title={<>Blessedville <span className="text-gold-gradient">by the numbers</span>.</>}
        />

        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {ABOUT.stats.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Sparkles;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur transition-all duration-500 hover:bg-white/10"
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-gold transition-all duration-500 group-hover:scale-110 group-hover:bg-gold/25">
                  <Icon className="h-6 w-6" />
                </span>
                <div className="mt-4 font-display text-4xl font-semibold text-white">
                  {s.value}{s.suffix}
                </div>
                <p className="mt-2 text-sm font-medium text-white/55">{s.label}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */
export default function About() {
  return (
    <>
      <ProgramHero
        badge={ABOUT.hero.badge}
        title={ABOUT.hero.heading}
        image={ABOUT.hero.image}
        crumbs={[{ label: "About" }]}
      />
      <Welcome />
      <Story />
      <MissionVisionValues />
      <WhyChooseUs />
      <LearningEnvironment />
      <SchoolCommunity />
      <SchoolStats />
    </>
  );
}
