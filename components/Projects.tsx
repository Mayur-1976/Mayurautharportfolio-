"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Sparkles, Layers } from "lucide-react";
import { SVGProps } from "react";

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.width || 15} height={props.height || 15} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
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

const techStack = ["JavaScript", "AI APIs", "Vercel"];

/* ===== 3D Tilt Card ===== */
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`transition-shadow duration-500 ${isHovered ? "shadow-2xl shadow-[var(--accent)]/10" : ""}`}
    >
      {children}
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 sm:py-32 relative z-10" ref={ref}>
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
            <Layers size={14} className="text-[var(--cyan)]" />
            <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--cyan)] uppercase tracking-widest">
              {"//"} projects
            </p>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-[family-name:var(--font-syne)] font-extrabold text-3xl sm:text-4xl mb-4"
          >
            Things I&apos;ve Built
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-[var(--muted)] text-base mb-12 max-w-lg"
          >
            Real projects, real code, real deployments. Here&apos;s what I&apos;ve been working on.
          </motion.p>

          {/* Featured project card — 3D Tilt */}
          <motion.div variants={fadeUp} style={{ perspective: 1000 }}>
            <TiltCard>
              <div className="gradient-border">
                <div className="glass-card overflow-hidden relative">
                  {/* Subtle grid lines on card */}
                  <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative z-10">
                    {/* Left — Info */}
                    <div className="p-8 sm:p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase border border-[var(--accent)]/30 text-[var(--accent)] bg-[var(--accent)]/5">
                          <Sparkles size={10} />
                          Featured Project
                        </span>
                      </div>

                      <h3 className="font-[family-name:var(--font-syne)] font-extrabold text-2xl sm:text-3xl mb-2">
                        PixelMind AI
                      </h3>

                      <div className="w-16 h-[2px] bg-gradient-to-r from-[var(--accent)] to-[var(--pink)] mb-4 rounded-full" />

                      <p className="text-[var(--muted)] text-sm leading-relaxed mb-6 max-w-md">
                        An AI-powered Text-to-Image web app that generates images
                        from text prompts using modern AI APIs. Built with a clean
                        interface and deployed on Vercel for instant access.
                      </p>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {techStack.map((tech) => (
                          <motion.span
                            key={tech}
                            whileHover={{ scale: 1.08, boxShadow: "0 0 15px rgba(131,110,249,0.2)" }}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-[var(--accent)]/20 text-[var(--accent)] bg-[var(--accent)]/5 transition-all"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      {/* Buttons */}
                      <div className="flex flex-wrap gap-3">
                        <motion.a
                          href="https://pixel-mind-ai-rouge.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.04, boxShadow: "0 0 25px rgba(131,110,249,0.25)" }}
                          whileTap={{ scale: 0.97 }}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[#6c5ce7] text-white text-sm font-semibold btn-glow transition-all"
                        >
                          <ExternalLink size={15} /> Live Demo ↗
                        </motion.a>
                        <motion.a
                          href="https://github.com/Mayur-1976/PixelMind-AI"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.04, borderColor: "rgba(131,110,249,0.5)" }}
                          whileTap={{ scale: 0.97 }}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border)] text-[var(--text)] text-sm font-semibold hover:text-[var(--accent)] transition-all"
                        >
                          <GithubIcon width={15} height={15} /> View Code →
                        </motion.a>
                      </div>
                    </div>

                    {/* Right — Browser mockup */}
                    <div className="p-8 sm:p-10 flex items-center justify-center">
                      <div className="w-full max-w-sm rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--bg2)] shadow-2xl shadow-[var(--accent)]/5">
                        {/* Browser chrome */}
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[var(--surface)]">
                          <span className="w-3 h-3 rounded-full bg-[#ff5f57]/70" />
                          <span className="w-3 h-3 rounded-full bg-[#febc2e]/70" />
                          <span className="w-3 h-3 rounded-full bg-[#28c840]/70" />
                          <div className="ml-3 flex-1 flex items-center gap-2 px-3 py-1 rounded-md bg-[var(--bg)] text-[10px] font-[family-name:var(--font-mono)] text-[var(--muted)] truncate">
                            <span className="w-3 h-3 rounded-full border border-[var(--green)]/40 flex items-center justify-center">
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)]/60" />
                            </span>
                            pixel-mind-ai-rouge.vercel.app
                          </div>
                        </div>

                        {/* Preview */}
                        <div className="aspect-[4/3] relative overflow-hidden">
                          {/* Animated gradient background */}
                          <motion.div
                            className="absolute inset-0"
                            animate={{
                              background: [
                                "linear-gradient(135deg, rgba(131,110,249,0.15) 0%, rgba(244,114,182,0.1) 50%, rgba(34,211,238,0.15) 100%)",
                                "linear-gradient(135deg, rgba(34,211,238,0.15) 0%, rgba(131,110,249,0.15) 50%, rgba(244,114,182,0.1) 100%)",
                                "linear-gradient(135deg, rgba(244,114,182,0.1) 0%, rgba(34,211,238,0.15) 50%, rgba(131,110,249,0.15) 100%)",
                              ],
                            }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                          />
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                              className="w-12 h-12 rounded-xl bg-[var(--accent)]/15 border border-[var(--accent)]/25 flex items-center justify-center"
                            >
                              <Sparkles size={20} className="text-[var(--accent)]" />
                            </motion.div>
                            <p className="font-[family-name:var(--font-syne)] font-bold text-sm text-center">
                              PixelMind AI
                            </p>
                            <p className="text-[var(--muted)] text-[10px] text-center">
                              Text → Image Generation
                            </p>
                            {/* Fake UI elements */}
                            <div className="w-full max-w-[160px] space-y-2 mt-2">
                              <div className="h-2 rounded-full bg-[var(--accent)]/10 w-full" />
                              <div className="h-2 rounded-full bg-[var(--accent)]/10 w-3/4" />
                              <div className="h-6 rounded-md bg-[var(--accent)]/15 w-full mt-3 flex items-center justify-center">
                                <span className="text-[8px] text-[var(--accent)] font-medium">Generate ✦</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* More projects */}
          <motion.div
            variants={fadeUp}
            className="text-center mt-12"
          >
            <span className="text-[var(--muted)] text-sm font-[family-name:var(--font-mono)] inline-flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[var(--muted)]/30" />
              More projects coming soon
              <span className="w-8 h-[1px] bg-[var(--muted)]/30" />
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
