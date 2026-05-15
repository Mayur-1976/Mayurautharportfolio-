"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code, Brain, Server, Zap } from "lucide-react";
import { skillGroups, softSkills, softSkillsColor } from "@/data/skills";
import type { SkillGroup } from "@/data/skills";

const iconMap: Record<string, React.ReactNode> = {
  code: <Code size={20} />,
  brain: <Brain size={20} />,
  server: <Server size={20} />,
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

function SkillCard({ group, index }: { group: SkillGroup; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{
        y: -8,
        borderColor: `${group.color}40`,
      }}
      className="glass-card overflow-hidden transition-all duration-500 relative group card-hover-glow"
    >
      {/* Animated aurora top border */}
      <div className="h-[2px] w-full relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ background: `linear-gradient(90deg, transparent, ${group.color}, transparent)` }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.5, ease: "linear" }}
        />
        <div className="absolute inset-0" style={{ background: group.color, opacity: 0.3 }} />
      </div>

      {/* Corner aurora glow */}
      <div
        className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-[0.08] transition-opacity duration-700"
        style={{ background: group.color }}
      />

      <div className="p-6 relative z-10">
        {/* Header with orbit ring */}
        <div className="flex items-center gap-3 mb-5">
          <div className="relative">
            {/* Orbit ring */}
            <div
              className="absolute inset-[-6px] rounded-full border orbit-ring"
              style={{ borderColor: `${group.color}15` }}
            />
            <div
              className="absolute inset-[-6px] rounded-full orbit-ring"
              style={{ animationDuration: "12s" }}
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                style={{ background: group.color, boxShadow: `0 0 6px ${group.color}` }}
              />
            </div>

            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${group.color}10`, border: `1px solid ${group.color}20` }}
            >
              <span style={{ color: group.color }}>{iconMap[group.icon]}</span>
            </div>
          </div>
          <h3
            className="font-[family-name:var(--font-syne)] font-bold text-base"
            style={{ color: group.color }}
          >
            {group.title}
          </h3>
        </div>

        {/* Skill tags */}
        <div className="flex flex-wrap gap-2">
          {group.skills.map((skill, si) => (
            <motion.span
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: si * 0.05 }}
              whileHover={{
                scale: 1.08,
                boxShadow: `0 0 25px ${group.color}20`,
                borderColor: `${group.color}40`,
              }}
              className={`relative px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-300 ${
                skill.learning ? "learning-breathe" : ""
              }`}
              style={{
                borderColor: `${group.color}18`,
                color: group.color,
                background: `${group.color}06`,
              }}
            >
              {skill.name}
              {skill.learning && (
                <span className="ml-1.5 inline-flex items-center gap-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full pulse-dot"
                    style={{ backgroundColor: group.color }}
                  />
                  <span className="text-[9px] opacity-50">learning</span>
                </span>
              )}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 sm:py-32 relative z-10" ref={ref}>
      {/* Section divider */}
      <div className="section-divider mb-24" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {/* Section heading */}
          <motion.div variants={fadeUp} className="flex items-center gap-2 mb-3">
            <Zap size={14} className="text-[var(--cyan)]" />
            <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--cyan)] uppercase tracking-widest">
              {"//"}  skills
            </p>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-[family-name:var(--font-syne)] font-extrabold text-3xl sm:text-4xl mb-4"
          >
            What I{" "}
            <span className="aurora-text">Work With</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-[var(--muted)] text-base mb-12 max-w-lg"
          >
            Technologies and tools I use to bring ideas to life. Constantly expanding my toolkit.
          </motion.p>

          {/* Skill group cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
            variants={stagger}
          >
            {skillGroups.map((group, i) => (
              <SkillCard key={group.title} group={group} index={i} />
            ))}
          </motion.div>

          {/* Soft Skills — Aurora Marquee */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full" style={{ background: softSkillsColor }} />
              <h3
                className="font-[family-name:var(--font-syne)] font-bold text-base"
                style={{ color: softSkillsColor }}
              >
                Soft Skills
              </h3>
            </div>

            {/* Scrolling marquee with gradient fade edges */}
            <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg2)]/50 py-4">
              {/* Gradient fade edges */}
              <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-[var(--bg2)] to-transparent z-10 pointer-events-none" />
              <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-[var(--bg2)] to-transparent z-10 pointer-events-none" />

              <div className="marquee-track">
                {[...softSkills, ...softSkills].map((skill, i) => (
                  <span
                    key={`${skill.name}-${i}`}
                    className="mx-3 px-4 py-2 rounded-lg text-xs font-medium border transition-all duration-200 whitespace-nowrap inline-flex items-center gap-2 hover:scale-105"
                    style={{
                      borderColor: `${softSkillsColor}18`,
                      color: softSkillsColor,
                      background: `${softSkillsColor}06`,
                    }}
                  >
                    <span className="w-1 h-1 rounded-full" style={{ background: softSkillsColor }} />
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
