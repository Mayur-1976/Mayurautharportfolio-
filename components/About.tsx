"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Terminal } from "lucide-react";
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

/* ===== Terminal-style Output ===== */
function TerminalBio() {
  const bioLines = [
    { prompt: true, text: 'cat about_mayur.md' },
    { prompt: false, text: '' },
    { prompt: false, text: '# About Me' },
    { prompt: false, text: '' },
    { prompt: false, text: "I'm a final-year BCA student at" },
    { prompt: false, text: '**Sardar Patel University** passionate' },
    { prompt: false, text: 'about backend development and AI/ML.' },
    { prompt: false, text: '' },
    { prompt: false, text: 'I love building things that work behind' },
    { prompt: false, text: 'the scenes — APIs, AI tools, and' },
    { prompt: false, text: 'automation pipelines.' },
    { prompt: false, text: '' },
    { prompt: false, text: 'Currently expanding into **DevOps** to' },
    { prompt: false, text: 'become a well-rounded developer.' },
    { prompt: true, text: '█' },
  ];

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="terminal-window">
      <div className="terminal-header">
        <div className="terminal-dot bg-[#ff5f57]" />
        <div className="terminal-dot bg-[#febc2e]" />
        <div className="terminal-dot bg-[#28c840]" />
        <span className="ml-3 text-[10px] text-[var(--muted)] font-[family-name:var(--font-mono)]">
          mayur@dev:~/portfolio
        </span>
      </div>
      <div className="p-4 sm:p-5 text-xs sm:text-sm leading-6 font-[family-name:var(--font-mono)]">
        {bioLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.06, duration: 0.3 }}
          >
            {line.prompt ? (
              <span>
                <span className="text-[var(--green)]">mayur</span>
                <span className="text-[var(--muted)]">@</span>
                <span className="text-[var(--cyan)]">dev</span>
                <span className="text-[var(--muted)]">:~$ </span>
                <span className="text-[var(--text)]">{line.text}</span>
              </span>
            ) : (
              <span className="text-[var(--muted)]">
                {line.text.split('**').map((part, j) =>
                  j % 2 === 1 ? (
                    <span key={j} className="text-[var(--accent)] font-semibold">{part}</span>
                  ) : (
                    <span key={j}>{part}</span>
                  )
                )}
              </span>
            )}
          </motion.div>
        ))}
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
  { value: "3", suffix: "rd Year", label: "BCA Student", icon: "🎓" },
  { value: "1", suffix: "+", label: "Live Projects", icon: "🚀" },
  { value: "3", suffix: "", label: "Focus Areas", icon: "🎯" },
  { value: "∞", suffix: "", label: "Always Learning", icon: "💡" },
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
          {/* Left column — Terminal Bio */}
          <div>
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-3">
              <Terminal size={14} className="text-[var(--cyan)]" />
              <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--cyan)] uppercase tracking-widest">
                {"//"} about_me
              </p>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-[family-name:var(--font-syne)] font-extrabold text-3xl sm:text-4xl mb-8 leading-tight"
            >
              Building the backend.
              <br />
              <span className="bg-gradient-to-r from-[var(--accent)] via-[var(--cyan)] to-[var(--pink)] bg-clip-text text-transparent">
                Learning the pipeline.
              </span>
            </motion.h2>

            {/* Terminal */}
            <motion.div variants={fadeUp} className="mb-8">
              <TerminalBio />
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <motion.a
                href="https://github.com/Mayur-1976"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: "0 0 25px rgba(131,110,249,0.25)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[#6c5ce7] text-white text-sm font-semibold btn-glow transition-all"
              >
                <GithubIcon width={16} height={16} /> View GitHub ↗
              </motion.a>
              <motion.a
                href="mailto:mayursuthar1976@gmail.com"
                whileHover={{ scale: 1.04, borderColor: "rgba(131,110,249,0.5)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border)] text-[var(--text)] text-sm font-semibold hover:text-[var(--accent)] transition-all"
              >
                <Mail size={16} /> Send Email
              </motion.a>
            </motion.div>
          </div>

          {/* Right column — Stat cards */}
          <motion.div className="grid grid-cols-2 gap-4" variants={stagger}>
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{
                  y: -8,
                  borderColor: "rgba(131,110,249,0.4)",
                  boxShadow: "0 20px 40px rgba(131,110,249,0.08)",
                }}
                className="glass-card p-6 text-center group transition-all duration-300 relative overflow-hidden"
              >
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <span className="text-2xl mb-2 block">{stat.icon}</span>
                  <p className="font-[family-name:var(--font-syne)] font-extrabold text-3xl sm:text-4xl text-[var(--accent)] mb-1 counter-glow">
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
