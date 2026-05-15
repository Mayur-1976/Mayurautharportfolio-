"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) =>
      document.querySelector(l.href) as HTMLElement | null
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Update sliding indicator position
  useEffect(() => {
    if (!navRef.current || !activeSection) return;
    const activeLink = navRef.current.querySelector(`a[href="${activeSection}"]`) as HTMLElement;
    if (activeLink) {
      const navRect = navRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setIndicatorStyle({
        left: linkRect.left - navRect.left - 10,
        width: linkRect.width + 20,
      });
    }
  }, [activeSection]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#"
          className="font-[family-name:var(--font-mono)] text-sm text-[var(--accent-light)] hover:text-white transition-colors relative group"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-[var(--muted)]">&gt;</span> mayur
          <span className="text-[var(--cyan)]">.dev</span>
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-[var(--aurora1)] to-[var(--aurora2)] group-hover:w-full transition-all duration-300" />
        </motion.a>

        {/* Desktop Links — Floating Pill */}
        <div
          className={`hidden md:flex items-center transition-all duration-500 ${
            scrolled
              ? "px-2 py-1.5 rounded-2xl bg-[var(--surface)]/60 backdrop-blur-xl border border-[var(--border)]"
              : ""
          }`}
        >
          <ul ref={navRef} className="flex items-center gap-1 relative">
            {/* Sliding active indicator */}
            {activeSection && (
              <motion.div
                className="absolute top-0 h-full rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/15"
                animate={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative z-10 px-4 py-2 rounded-xl font-[family-name:var(--font-mono)] text-sm transition-all duration-300 block ${
                    activeSection === link.href
                      ? "text-[var(--accent-light)]"
                      : "text-[var(--muted)] hover:text-[var(--text)]"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-[var(--muted)] hover:text-white transition-colors z-50"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Scrolled bottom glow line */}
      {scrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--aurora1)]/15 to-transparent" />
      )}

      {/* Mobile Menu — Aurora Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 bg-[var(--bg)]/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8"
          >
            {/* Aurora glow in mobile menu */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-[var(--aurora1)] opacity-[0.06] blur-[100px] pointer-events-none" />

            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className={`font-[family-name:var(--font-syne)] text-3xl font-bold transition-colors ${
                  activeSection === link.href
                    ? "aurora-text"
                    : "text-[var(--text)] hover:text-[var(--accent-light)]"
                }`}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 flex items-center gap-2 text-[var(--muted)] text-xs font-[family-name:var(--font-mono)]"
            >
              <Sparkles size={10} />
              navigation
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
