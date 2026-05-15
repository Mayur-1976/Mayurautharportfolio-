"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Terminal, Sparkles } from "lucide-react";
import { SVGProps } from "react";

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.width || 16} height={props.height || 16} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

/* ===== Animated Counter ===== */
function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [display, setDisplay] = useState(target);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(target);
    if (isNaN(num)) {
      // non-numeric like "∞" — do a scramble effect
      const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789";
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplay(
          target
            .split("")
            .map((char, i) => (i < iteration ? char : chars[Math.floor(Math.random() * chars.length)]))
            .join("")
        );
        iteration += 1 / 3;
        if (iteration >= target.length) {
          clearInterval(interval);
          setDisplay(target);
        }
      }, 40);
      return () => clearInterval(interval);
    } else {
      let current = 0;
      const step = Math.ceil(num / 30);
      const interval = setInterval(() => {
        current += step;
        if (current >= num) {
          current = num;
          clearInterval(interval);
        }
        setDisplay(String(current));
      }, 40);
      return () => clearInterval(interval);
    }
  }, [inView, target]);

  return <span ref={ref}>{display}{suffix}</span>;
}

/* ===== Code Editor Mockup ===== */
function CodeEditorBio() {
  const codeLines = [
    { num: 1, content: '', type: 'blank' },
    { num: 2, content: '# About Me', type: 'heading' },
    { num: 3, content: '', type: 'blank' },
    { num: 4, content: "I'm a final-year BCA student at", type: 'text' },
    { num: 5, content: 'Sardar Patel University', type: 'highlight' },
    { num: 6, content: 'passionate about backend development', type: 'text' },
    { num: 7, content: 'and AI/ML.', type: 'text' },
    { num: 8, content: '', type: 'blank' },
    { num: 9, content: 'I love building things that work', type: 'text' },
    { num: 10, content: 'behind the scenes — APIs, AI tools,', type: 'text' },
    { num: 11, content: 'and automation pipelines.', type: 'text' },
    { num: 12, content: '', type: 'blank' },
    { num: 13, content: 'Currently expanding into DevOps', type: 'highlight' },
    { num: 14, content: 'to become a well-rounded developer.', type: 'text' },
  ];

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg2)]/90 shadow-2xl shadow-[var(--accent)]/5">
      {/* Editor tab bar */}
      <div className="flex items-center border-b border-[var(--border)]">
        <div className="flex items-center gap-2 px-4 py-3">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]/70" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]/70" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]/70" />
        </div>
        <div className="flex items-center gap-0 ml-2">
          <div className="px-4 py-2.5 text-[11px] font-[family-name:var(--font-mono)] text-[var(--accent-light)] bg-[var(--bg)] border-b-2 border-[var(--accent)] border-r border-r-[var(--border)]">
            about_mayur.md
          </div>
          <div className="px-4 py-2.5 text-[11px] font-[family-name:var(--font-mono)] text-[var(--muted)] opacity-50">
            skills.json
          </div>
        </div>
      </div>

      {/* Editor content with line numbers */}
      <div className="flex">
        {/* Line numbers gutter */}
        <div className="flex flex-col py-4 px-3 bg-[var(--bg)]/50 border-r border-[var(--border)] select-none">
          {codeLines.map((line) => (
            <motion.span
              key={line.num}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.3 } : {}}
              transition={{ delay: line.num * 0.04 }}
              className="text-[10px] leading-6 text-[var(--muted)] text-right w-6 block font-[family-name:var(--font-mono)]"
            >
              {line.num}
            </motion.span>
          ))}
        </div>

        {/* Code content */}
        <div className="py-4 px-4 flex-1 min-w-0">
          {codeLines.map((line) => (
            <motion.div
              key={line.num}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: line.num * 0.05, duration: 0.3 }}
              className="text-xs sm:text-sm leading-6 font-[family-name:var(--font-mono)]"
            >
              {line.type === 'heading' ? (
                <span className="text-[var(--pink)] font-semibold">{line.content}</span>
              ) : line.type === 'highlight' ? (
                <span className="text-[var(--accent-light)] font-medium">{line.content}</span>
              ) : line.type === 'blank' ? (
                <span>&nbsp;</span>
              ) : (
                <span className="text-[var(--muted)]">{line.content}</span>
              )}
            </motion.div>
          ))}
          {/* Blinking cursor */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: [0, 1, 0] } : {}}
            transition={{ delay: 1, duration: 1, repeat: Infinity }}
            className="w-2 h-4 bg-[var(--accent)] rounded-sm mt-1"
          />
        </div>

        {/* Minimap column */}
        <div className="hidden sm:block w-12 py-4 px-2 border-l border-[var(--border)] bg-[var(--bg)]/30">
          {codeLines.map((line) => (
            <div
              key={line.num}
              className="h-1.5 mb-0.5 rounded-full"
              style={{
                width: line.type === 'blank' ? '0' : `${Math.min(100, (line.content?.length || 0) * 3)}%`,
                background: line.type === 'heading'
                  ? 'var(--pink)'
                  : line.type === 'highlight'
                  ? 'var(--accent)'
                  : 'var(--muted)',
                opacity: line.type === 'blank' ? 0 : 0.15,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const stats = [
  { value: "3", suffix: "rd Year", label: "BCA Student", icon: "🎓", color: "var(--accent-light)" },
  { value: "1", suffix: "+", label: "Live Projects", icon: "🚀", color: "var(--cyan)" },
  { value: "3", suffix: "", label: "Focus Areas", icon: "🎯", color: "var(--green)" },
  { value: "∞", suffix: "", label: "Always Learning", icon: "💡", color: "var(--gold)" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 sm:py-32 relative z-10" ref={ref}>
      {/* Section divider */}
      <div className="section-divider mb-24" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {/* Left column — Code Editor Bio */}
          <div>
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-3">
              <Terminal size={14} className="text-[var(--cyan)]" />
              <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--cyan)] uppercase tracking-widest">
                {"//"}  about_me
              </p>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-[family-name:var(--font-syne)] font-extrabold text-3xl sm:text-4xl mb-8 leading-tight"
            >
              Building the backend.
              <br />
              <span className="aurora-text">
                Learning the pipeline.
              </span>
            </motion.h2>

            {/* Code Editor */}
            <motion.div variants={fadeUp} className="mb-8">
              <CodeEditorBio />
            </motion.div>

            {/* Status + CTA */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full holo-badge border border-[var(--green)]/20 text-[var(--green)] text-[10px] font-[family-name:var(--font-mono)] font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--green)] opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--green)]" />
                </span>
                Open to Opportunities
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <motion.a
                href="https://github.com/Mayur-1976"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(124,58,237,0.2)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold btn-glow transition-all gradient-flow"
                style={{
                  background: "linear-gradient(135deg, var(--aurora1), #6c5ce7, var(--aurora2))",
                  backgroundSize: "200% 200%",
                }}
              >
                <GithubIcon width={16} height={16} /> View GitHub ↗
              </motion.a>
              <motion.a
                href="mailto:mayursuthar1976@gmail.com"
                whileHover={{ scale: 1.04, borderColor: "rgba(124,58,237,0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border)] text-[var(--text)] text-sm font-semibold hover:text-[var(--accent-light)] transition-all backdrop-blur-sm bg-[var(--surface)]/30"
              >
                <Mail size={16} /> Send Email
              </motion.a>
            </motion.div>
          </div>

          {/* Right column — Bento Grid Stats */}
          <motion.div className="grid grid-cols-2 gap-4" variants={stagger}>
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{
                  y: -8,
                  borderColor: "rgba(124,58,237,0.3)",
                }}
                className="glass-card p-6 text-center group transition-all duration-500 relative overflow-hidden card-hover-glow"
              >
                {/* Aurora corner glow */}
                <div
                  className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-[0.12] transition-opacity duration-700"
                  style={{ background: stat.color }}
                />
                {/* Bottom border accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
                  }}
                />

                <div className="relative z-10">
                  <span className="text-2xl mb-3 block">{stat.icon}</span>
                  <p
                    className="font-[family-name:var(--font-syne)] font-extrabold text-3xl sm:text-4xl mb-1 counter-glow"
                    style={{ color: stat.color }}
                  >
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-[var(--muted)] text-sm">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
