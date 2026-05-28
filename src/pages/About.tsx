import { useRef } from "react";
import {
  ArrowRight,
  Building2,
  Eye,
  Globe,
  Handshake,
  Lock,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";
import { motion, useInView, type Variants } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import BlurText from "@/components/BlurText";
import CountUp from "@/components/CountUp";
import DecryptedText from "@/components/DecryptedText";
import ShinyText from "@/components/ShinyText";
import GradientText from "@/components/GradientText";
import ClickSpark from "@/components/ClickSpark";
import StarBorder from "@/components/StarBorder";

/* ─── Shared Framer Motion Variants ─────────────────────────────────────── */

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const container: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardFade: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Shared Glow Blobs ──────────────────────────────────────────────────── */

function GlowBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-violet-100/50 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-fuchsia-100/40 blur-3xl" />
    </div>
  );
}

/* ─── Data Interfaces ────────────────────────────────────────────────────── */

interface ValueItem  { icon: React.ElementType; title: string; description: string; color: string; gradient: string; }
interface StatItem   { value: number; suffix: string; label: string; glowColor: string; }
interface TimelineItem { year: string; title: string; description: string; }
interface TeamMember { initials: string; name: string; role: string; bio: string; }
interface Principle  { number: string; title: string; description: string; icon: React.ElementType; }

/* ─── Data ───────────────────────────────────────────────────────────────── */

const values: ValueItem[] = [
  {
    icon: ShieldCheck,
    title: "Reliability",
    description: "Mission-critical infrastructure built for nonstop operations.",
    color: "#8b5cf6",
    gradient: "from-violet-600 to-violet-500",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description: "Continuous R&D driving next-generation industrial platforms.",
    color: "#d946ef",
    gradient: "from-fuchsia-600 to-fuchsia-500",
  },
  {
    icon: Users,
    title: "Customer Success",
    description: "Long-term partnerships focused on measurable business impact.",
    color: "#06b6d4",
    gradient: "from-cyan-600 to-cyan-500",
  },
];

const stats: StatItem[] = [
  { value: 200,   suffix: "+",  label: "Global Deployments",  glowColor: "rgba(139,92,246,0.15)"  },
  { value: 50,    suffix: "+",  label: "Team Members",        glowColor: "rgba(217,70,239,0.12)"  },
  { value: 99,    suffix: ".99%",label: "Uptime SLA",         glowColor: "rgba(6,182,212,0.12)"   },
  { value: 15,    suffix: "ms", label: "Avg Latency",         glowColor: "rgba(249,115,22,0.12)"  },
];

const timeline: TimelineItem[] = [
  { year: "2021", title: "Company founded in Ahmedabad",       description: "Started building scalable industrial intelligence infrastructure." },
  { year: "2022", title: "First industrial SCADA deployment",  description: "Delivered enterprise-grade monitoring for Oil & Gas operations." },
  { year: "2023", title: "IoT platform launched, 50+ clients", description: "Expanded into realtime IoT and asset monitoring infrastructure." },
  { year: "2024", title: "AI/ML analytics module added",       description: "Introduced predictive analytics and industrial AI workflows." },
  { year: "2025", title: "Global expansion, 200+ deployments", description: "Scaled infrastructure across multiple regions and industries." },
];

const team: TeamMember[] = [
  { initials: "RA", name: "Raj Aghera",   role: "Founder / CEO",            bio: "Leading Altrex's vision for industrial intelligence platforms." },
  { initials: "DK", name: "Daniel Kim",   role: "CTO",                      bio: "Architecting scalable realtime industrial infrastructure." },
  { initials: "EC", name: "Emily Carter", role: "Head of Product",           bio: "Designing powerful industrial workflows and experiences." },
  { initials: "SP", name: "Sarah Patel",  role: "Head of Customer Success",  bio: "Helping industries modernise operations with confidence." },
];

const principles: Principle[] = [
  { number: "01", title: "Transparency", description: "Open, honest communication with every client at every stage.", icon: Eye },
  { number: "02", title: "Reliability",  description: "99.99% uptime backed by redundant global infrastructure.",   icon: ShieldCheck },
  { number: "03", title: "Innovation",   description: "Continuous R&D investment in AI, ML, and edge computing.",   icon: Sparkles },
  { number: "04", title: "Security",     description: "Enterprise-grade encryption and SOC 2 compliant practices.", icon: Lock },
  { number: "05", title: "Speed",        description: "Sub-15ms response times across all platform services.",      icon: Zap },
  { number: "06", title: "Partnership",  description: "Long-term relationships, not one-time transactions.",        icon: Handshake },
];

const trustItems = ["99.99% Uptime", "SOC2 Compliant", "GDPR Ready", "24/7 Support"];

/* ═══════════════════════════════════════════════════════════════════════════
   1. HERO SECTION
═══════════════════════════════════════════════════════════════════════════ */

function HeroSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden bg-white pb-24 pt-32"
    >
      {/* Three animated glow blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-16 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-400/15 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -right-20 top-40 h-80 w-80 rounded-full bg-fuchsia-400/15 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-10 -left-10 h-72 w-72 rounded-full bg-cyan-400/12 blur-3xl"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mx-auto max-w-5xl text-center"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <Badge
              variant="secondary"
              className="border border-violet-200 bg-violet-50 p-4 text-sm font-medium text-violet-700"
            >
              Our Story
            </Badge>
          </motion.div>

          {/* H1 — BlurText word-by-word animation */}
          <motion.div variants={fadeUp} className="mt-8">
            <BlurText
              text="We are building the future of Industrial Intelligence"
              animateBy="words"
              delay={90}
              direction="top"
              className="text-6xl font-bold tracking-tight text-gray-900 sm:text-7xl lg:text-8xl"
            />
          </motion.div>

          {/* Gradient divider line */}
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-8 h-px w-32 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 opacity-60"
          />

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-gray-500"
          >
            Altrex builds scalable industrial IoT infrastructure powering realtime
            SCADA systems, AI-driven analytics, asset intelligence, and industrial
            automation platforms globally.
          </motion.p>

          {/* Glass morphism stat chips */}
          <motion.div
            variants={fadeUp}
            className="mt-14 flex flex-wrap items-center justify-center gap-5"
          >
            {/* Founded chip */}
            <div className="flex items-center gap-3 rounded-2xl border border-violet-100/80 bg-white/60 px-6 py-4 shadow-sm backdrop-blur-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
                <Building2 className="h-5 w-5 text-violet-600" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-gray-900">2021</p>
                <p className="text-xs font-medium text-gray-500">Founded</p>
              </div>
            </div>

            {/* Location chip */}
            <div className="flex items-center gap-3 rounded-2xl border border-violet-100/80 bg-white/60 px-6 py-4 shadow-sm backdrop-blur-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-50">
                <MapPin className="h-5 w-5 text-fuchsia-600" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-gray-900">India</p>
                <p className="text-xs font-medium text-gray-500">Ahmedabad</p>
              </div>
            </div>

            {/* Deployments chip — CountUp */}
            <div className="flex items-center gap-3 rounded-2xl border border-violet-100/80 bg-white/60 px-6 py-4 shadow-sm backdrop-blur-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50">
                <Globe className="h-5 w-5 text-cyan-600" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-gray-900">
                  <CountUp to={200} from={0} duration={2} className="text-2xl font-bold text-gray-900" />
                  <span className="text-2xl font-bold text-gray-900">+</span>
                </p>
                <p className="text-xs font-medium text-gray-500">Global Deployments</p>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons in ClickSpark */}
          <motion.div variants={fadeUp} className="mt-12">
            <ClickSpark sparkColor="#8b5cf6" sparkCount={10} sparkRadius={20} sparkSize={8} duration={500}>
              <div className="flex flex-wrap items-center justify-center gap-4 py-4">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-violet-200 transition-opacity hover:opacity-90"
                >
                  Explore Our Platform
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-2xl border-2 border-violet-200 bg-white px-8 py-4 text-base font-semibold text-violet-700 transition-all hover:border-violet-400 hover:bg-violet-50"
                >
                  Meet the Team
                </motion.button>
              </div>
            </ClickSpark>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   2. MISSION SECTION
═══════════════════════════════════════════════════════════════════════════ */

function MissionSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden bg-gray-50/50 py-28">
      <GlowBlobs />

      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center lg:px-8">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Decorative giant quote mark */}
          <span
            aria-hidden
            className="pointer-events-none select-none absolute -left-4 -top-8 font-serif leading-none text-violet-100"
            style={{ fontSize: "160px", lineHeight: 1 }}
          >
            &ldquo;
          </span>

          <Badge
            variant="secondary"
            className="relative z-10 border border-violet-200 bg-violet-50 p-4 text-sm font-medium text-violet-700"
          >
            Mission
          </Badge>

          <h2 className="relative z-10 mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Empowering industries through{" "}
            <GradientText
              colors={["#7c3aed", "#d946ef", "#06b6d4", "#7c3aed"]}
              animationSpeed={5}
              direction="horizontal"
              pauseOnHover
              className="inline-block text-4xl font-bold sm:text-5xl"
            >
              realtime intelligence
            </GradientText>
          </h2>

          <p className="relative z-10 mt-8 text-lg leading-8 text-gray-500">
            We believe industrial operations should be intelligent, connected,
            secure, and data-driven. Our mission is to simplify industrial
            digital transformation through scalable realtime infrastructure and
            modern industrial software.
          </p>
        </motion.div>

        {/* RIGHT — staggered value cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid gap-5"
        >
          {values.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                variants={cardFade}
                whileHover={{ y: -6, boxShadow: `0 20px 40px -12px ${item.color}22` }}
                className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300"
                style={{ borderLeft: `3px solid ${item.color}` }}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-md`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-gray-500">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   3. STATS SECTION
═══════════════════════════════════════════════════════════════════════════ */

function StatsSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 divide-x divide-y divide-gray-100 md:grid-cols-4 md:divide-y-0"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="relative flex flex-col items-center justify-center px-8 py-16"
            >
              {/* Subtle glow behind the number */}
              <div
                className="pointer-events-none absolute inset-0 -z-10 rounded-2xl blur-2xl"
                style={{ background: stat.glowColor }}
              />

              {/* Gradient number */}
              <div className="flex items-baseline">
                <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-6xl font-bold text-transparent">
                  <CountUp
                    to={stat.value}
                    from={0}
                    duration={2}
                    delay={i * 0.2}
                    className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-6xl font-bold text-transparent"
                  />
                </span>
                <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-4xl font-bold text-transparent">
                  {stat.suffix}
                </span>
              </div>

              <p className="mt-3 text-sm font-medium uppercase tracking-widest text-gray-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   4. TIMELINE SECTION
═══════════════════════════════════════════════════════════════════════════ */

function TimelineSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative bg-gray-50/50 py-28">
      <GlowBlobs />

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <Badge
            variant="secondary"
            className="border border-violet-200 bg-violet-50 p-4 text-sm font-medium text-violet-700"
          >
            Our Journey
          </Badge>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            From idea to global platform
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-20">
          {/* Gradient center line with glow */}
          <div
            className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-violet-200 via-fuchsia-200 to-cyan-200 md:left-1/2 md:-translate-x-px"
            style={{ boxShadow: "0 0 8px rgba(139,92,246,0.4)" }}
          />

          {timeline.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                className={`relative mb-16 flex w-full md:items-center ${isLeft ? "md:justify-start" : "md:justify-end"}`}
              >
                {/* Double-ring timeline dot */}
                <div className="absolute left-4 top-8 -translate-x-1/2 md:left-1/2">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-violet-100">
                    <div className="h-4 w-4 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-md" />
                  </div>
                </div>

                {/* Card */}
                <div className="ml-12 max-w-sm rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:ml-0">
                  {/* DecryptedText year pill */}
                  <div className="inline-flex overflow-hidden rounded-full bg-violet-600 px-4 py-1.5">
                    <DecryptedText
                      text={item.year}
                      animateOn="view"
                      speed={60}
                      sequential
                      revealDirection="start"
                      className="text-sm font-bold text-white"
                      encryptedClassName="text-sm font-bold text-violet-300"
                    />
                  </div>

                  {/* Connector arrow */}
                  <div className="mt-3">
                    <ArrowRight className="h-4 w-4 text-violet-400" />
                  </div>

                  <h3 className="mt-4 text-xl font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-3 leading-7 text-gray-500">{item.description}</p>

                  {/* Bottom accent line */}
                  <div className="mt-6 h-0.5 w-12 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   5. TEAM SECTION
═══════════════════════════════════════════════════════════════════════════ */

function TeamSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden bg-white py-28">
      <GlowBlobs />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <Badge
            variant="secondary"
            className="border border-violet-200 bg-violet-50 p-4 text-sm font-medium text-violet-700"
          >
            The Team
          </Badge>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            People behind the platform
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {team.map((member, i) => (
            <motion.div
              key={i}
              variants={cardFade}
              whileHover={{
                y: -8,
                rotateX: -4,
                rotateY: 4,
                scale: 1.02,
                boxShadow: "0 24px 48px -12px rgba(124,58,237,0.12)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ transformPerspective: 800 }}
              className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
            >
              {/* Top colour strip */}
              <div className="relative h-24 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10">
                {/* Avatar — overhangs the strip */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
                >
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-violet-500 to-fuchsia-600 text-2xl font-bold text-white shadow-xl">
                    {member.initials}
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="px-8 pb-8 pt-16 text-center">
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>

                <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-violet-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  {member.role}
                </p>

                <p className="mt-4 text-sm leading-7 text-gray-500">{member.bio}</p>

                <button className="mt-6 flex h-10 w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 text-sm font-medium text-gray-500 transition-colors hover:border-violet-300 hover:text-violet-600">
                  <FaLinkedinIn className="h-4 w-4" />
                  LinkedIn
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   6. VALUES SECTION
═══════════════════════════════════════════════════════════════════════════ */

function ValuesSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative bg-gray-50/50 py-28">
      <GlowBlobs />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <Badge
            variant="secondary"
            className="border border-violet-200 bg-violet-50 p-4 text-sm font-medium text-violet-700"
          >
            What drives us
          </Badge>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Built on principles that matter
          </h2>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {principles.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={i} variants={cardFade}>
                <StarBorder
                  as="div"
                  color="#8b5cf6"
                  speed="6s"
                  thickness={1}
                  className="w-full cursor-default"
                  innerClassName="bg-white rounded-[18px] p-8"
                >
                  {/* Top row: number + decorative icon */}
                  <div className="flex items-start justify-between">
                    <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-5xl font-black text-transparent">
                      {item.number}
                    </span>
                    <Icon className="h-8 w-8 text-gray-200" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-500">{item.description}</p>

                  {/* Principle chip */}
                  <div className="mt-6 inline-flex rounded-full bg-violet-50 px-3 py-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-violet-500">
                      Principle {item.number}
                    </span>
                  </div>
                </StarBorder>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   7. CTA SECTION
═══════════════════════════════════════════════════════════════════════════ */

function CTASection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-700 via-violet-600 to-fuchsia-600 px-8 py-20 text-center shadow-2xl shadow-violet-900/20 lg:px-20"
        >
          {/* Dot grid overlay */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-fuchsia-500/20" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5" />

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-3xl">
            {/* Overline — ShinyText */}
            <ShinyText
              text="Trusted by 200+ industrial deployments"
              speed={4}
              color="#ffffff99"
              shineColor="#ffffff"
              spread={120}
              className="text-sm font-semibold uppercase tracking-widest"
            />

            <h2 className="mt-4 text-5xl font-bold text-white sm:text-6xl">
              Ready to transform your operations?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60">
              Build smarter industrial systems with realtime intelligence,
              AI-driven analytics, and scalable infrastructure built for global scale.
            </p>

            {/* Buttons in ClickSpark */}
            <div className="mt-10">
              <ClickSpark
                sparkColor="#ffffff"
                sparkCount={12}
                sparkRadius={22}
                sparkSize={8}
                duration={500}
              >
                <div className="flex flex-wrap items-center justify-center gap-4 py-4">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="rounded-2xl bg-white px-10 py-4 text-base font-semibold text-violet-700 shadow-lg transition-colors hover:bg-violet-50"
                  >
                    Get Started
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="rounded-2xl border-2 border-white/20 bg-transparent px-10 py-4 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                  >
                    Talk to Sales
                  </motion.button>
                </div>
              </ClickSpark>
            </div>

            {/* Trust chips */}
            <motion.div
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
            >
              {trustItems.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-sm"
                >
                  {item}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════════ */

const About = () => (
  <div className="overflow-hidden bg-white">
    <HeroSection />
    <MissionSection />
    <StatsSection />
    <TimelineSection />
    <TeamSection />
    <ValuesSection />
    <CTASection />
  </div>
);

export default About;