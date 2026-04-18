"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Send, MessageSquare } from "lucide-react";
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

      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[var(--accent)] opacity-[0.02] blur-[120px] pointer-events-none" />

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
              {"//"} contact
            </p>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="font-[family-name:var(--font-syne)] font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4"
          >
            Let&apos;s Build{" "}
            <span className="bg-gradient-to-r from-[var(--accent)] via-[var(--cyan)] to-[var(--pink)] bg-clip-text text-transparent">
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
              whileHover={{ scale: 1.04, boxShadow: "0 0 25px rgba(131,110,249,0.25)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[#6c5ce7] text-white text-sm font-semibold btn-glow transition-all"
            >
              <Mail size={16} /> Email Me
            </motion.a>
            <motion.a
              href="https://github.com/Mayur-1976"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, borderColor: "rgba(131,110,249,0.5)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] text-[var(--text)] text-sm font-semibold hover:text-[var(--accent)] transition-all"
            >
              <GithubIcon width={16} height={16} /> GitHub
            </motion.a>
          </motion.div>

          {/* Contact Form — Glass Card */}
          <motion.div variants={fadeUp} className="glass-card p-6 sm:p-8 text-left">
            <form
              action="https://formsubmit.co/mayursuthar1976@gmail.com"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="Portfolio Contact — New Message!" />
              <input type="hidden" name="_template" value="table" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <label
                    className={`absolute left-4 transition-all duration-200 pointer-events-none font-[family-name:var(--font-mono)] text-xs ${focusedField === "name"
                        ? "-top-2.5 text-[var(--accent)] bg-[var(--bg2)] px-1"
                        : "top-3.5 text-[var(--muted)]"
                      }`}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="form-input pt-3"
                    onFocus={() => setFocusedField("name")}
                    onBlur={(e) => { if (!e.target.value) setFocusedField(null); }}
                  />
                </div>
                <div className="relative">
                  <label
                    className={`absolute left-4 transition-all duration-200 pointer-events-none font-[family-name:var(--font-mono)] text-xs ${focusedField === "email"
                        ? "-top-2.5 text-[var(--accent)] bg-[var(--bg2)] px-1"
                        : "top-3.5 text-[var(--muted)]"
                      }`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="form-input pt-3"
                    onFocus={() => setFocusedField("email")}
                    onBlur={(e) => { if (!e.target.value) setFocusedField(null); }}
                  />
                </div>
              </div>

              <div className="relative">
                <label
                  className={`absolute left-4 transition-all duration-200 pointer-events-none font-[family-name:var(--font-mono)] text-xs ${focusedField === "message"
                      ? "-top-2.5 text-[var(--accent)] bg-[var(--bg2)] px-1 z-10"
                      : "top-3.5 text-[var(--muted)]"
                    }`}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="form-input resize-none pt-5"
                  onFocus={() => setFocusedField("message")}
                  onBlur={(e) => { if (!e.target.value) setFocusedField(null); }}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(131,110,249,0.2)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[#6c5ce7] text-white font-semibold text-sm btn-glow transition-all inline-flex items-center justify-center gap-2"
              >
                <Send size={15} /> Send Message
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Toast notification */}
      {toast.show && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl glass-card border-[var(--accent)]/30 text-sm text-[var(--text)] shadow-xl shadow-[var(--accent)]/10 inline-flex items-center gap-2 ${toast.exiting ? "toast-exit" : "toast-enter"
            }`}
        >
          <span className="text-lg">✨</span> Message sent! I&apos;ll get back to you soon.
        </div>
      )}
    </section>
  );
}
