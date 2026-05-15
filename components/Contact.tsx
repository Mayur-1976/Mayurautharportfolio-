"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Send, MessageSquare, Sparkles } from "lucide-react";
import { SVGProps } from "react";

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.width || 16} height={props.height || 16} viewBox="0 0 24 24" fill="currentColor" {...props}>
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

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [toast, setToast] = useState<{ show: boolean; exiting: boolean }>({
    show: false,
    exiting: false,
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = () => {
    setToast({ show: true, exiting: false });
    setTimeout(() => {
      setToast({ show: true, exiting: true });
      setTimeout(() => setToast({ show: false, exiting: false }), 350);
    }, 3500);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative z-10" ref={ref}>
      {/* Section divider */}
      <div className="section-divider mb-24" />

      {/* Aurora background accents */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[var(--aurora1)] opacity-[0.02] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-[var(--aurora2)] opacity-[0.02] blur-[100px] pointer-events-none" />

      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          className="text-center"
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {/* Section label */}
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-3">
            <MessageSquare size={14} className="text-[var(--cyan)]" />
            <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--cyan)] uppercase tracking-widest">
              {"//"}  contact
            </p>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="font-[family-name:var(--font-syne)] font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4"
          >
            Let&apos;s Build{" "}
            <span className="aurora-text">
              Something Together
            </span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="text-[var(--muted)] text-base mb-10 max-w-lg mx-auto"
          >
            Open to backend projects, AI collaborations, and DevOps learning
            opportunities.
          </motion.p>

          {/* Icon buttons */}
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-4 mb-14"
          >
            <motion.a
              href="mailto:mayursuthar1976@gmail.com"
              whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(124,58,237,0.25), 0 0 60px rgba(6,182,212,0.08)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold btn-glow transition-all gradient-flow"
              style={{
                background: "linear-gradient(135deg, var(--aurora1), #6c5ce7, var(--aurora2))",
                backgroundSize: "200% 200%",
              }}
            >
              <Mail size={16} /> Email Me
            </motion.a>
            <motion.a
              href="https://github.com/Mayur-1976"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, borderColor: "rgba(124,58,237,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] text-[var(--text)] text-sm font-semibold hover:text-[var(--accent-light)] transition-all backdrop-blur-sm bg-[var(--surface)]/30"
            >
              <GithubIcon width={16} height={16} /> GitHub
            </motion.a>
          </motion.div>

          {/* Contact Form — Aurora Glass Card */}
          <motion.div variants={fadeUp} className="glass-card p-6 sm:p-8 text-left relative overflow-hidden">
            {/* Subtle constellation background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-[var(--accent-light)]"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                    opacity: 0.06 + Math.random() * 0.06,
                    animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 3}s`,
                  }}
                />
              ))}
            </div>

            <form
              action="https://formsubmit.co/mayursuthar1976@gmail.com"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-5 relative z-10"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="Portfolio Contact — New Message!" />
              <input type="hidden" name="_template" value="table" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative group">
                  <label
                    className={`absolute left-4 transition-all duration-300 pointer-events-none font-[family-name:var(--font-mono)] text-xs z-10 ${focusedField === "name"
                        ? "-top-2.5 text-[var(--accent-light)] bg-[var(--bg2)] px-1.5 rounded"
                        : "top-3.5 text-[var(--muted)]"
                      }`}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className={`form-input pt-3 transition-all duration-300 ${
                      focusedField === "name" ? "border-[var(--accent)]" : ""
                    }`}
                    onFocus={() => setFocusedField("name")}
                    onBlur={(e) => { if (!e.target.value) setFocusedField(null); }}
                  />
                </div>
                <div className="relative group">
                  <label
                    className={`absolute left-4 transition-all duration-300 pointer-events-none font-[family-name:var(--font-mono)] text-xs z-10 ${focusedField === "email"
                        ? "-top-2.5 text-[var(--accent-light)] bg-[var(--bg2)] px-1.5 rounded"
                        : "top-3.5 text-[var(--muted)]"
                      }`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className={`form-input pt-3 transition-all duration-300 ${
                      focusedField === "email" ? "border-[var(--accent)]" : ""
                    }`}
                    onFocus={() => setFocusedField("email")}
                    onBlur={(e) => { if (!e.target.value) setFocusedField(null); }}
                  />
                </div>
              </div>

              <div className="relative group">
                <label
                  className={`absolute left-4 transition-all duration-300 pointer-events-none font-[family-name:var(--font-mono)] text-xs z-10 ${focusedField === "message"
                      ? "-top-2.5 text-[var(--accent-light)] bg-[var(--bg2)] px-1.5 rounded"
                      : "top-3.5 text-[var(--muted)]"
                    }`}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className={`form-input resize-none pt-5 transition-all duration-300 ${
                    focusedField === "message" ? "border-[var(--accent)]" : ""
                  }`}
                  onFocus={() => setFocusedField("message")}
                  onBlur={(e) => { if (!e.target.value) setFocusedField(null); }}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(124,58,237,0.2), 0 0 80px rgba(6,182,212,0.06)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl text-white font-semibold text-sm btn-glow transition-all inline-flex items-center justify-center gap-2 gradient-flow"
                style={{
                  background: "linear-gradient(135deg, var(--aurora1), #6c5ce7, var(--aurora2))",
                  backgroundSize: "200% 200%",
                }}
              >
                <Send size={15} /> Send Message
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Toast notification — Aurora styled */}
      {toast.show && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl glass-card border-[var(--accent)]/20 text-sm text-[var(--text)] shadow-xl shadow-[var(--accent)]/10 inline-flex items-center gap-2 ${toast.exiting ? "toast-exit" : "toast-enter"
            }`}
        >
          <Sparkles size={14} className="text-[var(--accent-light)]" />
          Message sent! I&apos;ll get back to you soon.
        </div>
      )}
    </section>
  );
}
