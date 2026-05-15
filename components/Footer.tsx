"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { SVGProps } from "react";

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.width || 18} height={props.height || 18} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

// Deterministic positions for twinkling stars
const starPositions = [
  { left: '8%', top: '20%', size: 1, delay: 0, duration: 3 },
  { left: '15%', top: '60%', size: 1.5, delay: 1.2, duration: 4 },
  { left: '25%', top: '35%', size: 1, delay: 0.5, duration: 2.5 },
  { left: '35%', top: '75%', size: 1, delay: 2, duration: 3.5 },
  { left: '45%', top: '15%', size: 1.5, delay: 0.8, duration: 3 },
  { left: '55%', top: '55%', size: 1, delay: 1.5, duration: 4 },
  { left: '65%', top: '30%', size: 1, delay: 0.3, duration: 2.8 },
  { left: '75%', top: '70%', size: 1.5, delay: 1.8, duration: 3.2 },
  { left: '85%', top: '40%', size: 1, delay: 0.7, duration: 3.8 },
  { left: '92%', top: '80%', size: 1, delay: 2.5, duration: 2.5 },
  { left: '20%', top: '85%', size: 1, delay: 1, duration: 3 },
  { left: '70%', top: '10%', size: 1, delay: 1.4, duration: 3.5 },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-[var(--border)] py-12 overflow-hidden">
      {/* Animated aurora top separator */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--aurora1)]/20 to-transparent" />
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, var(--aurora1), var(--aurora2), var(--aurora3), transparent)",
        }}
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Twinkling stars background */}
      <div className="absolute inset-0 pointer-events-none">
        {starPositions.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[var(--accent-light)]"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animation: `twinkle ${star.duration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center gap-5">
          {/* Logo */}
          <motion.a
            href="#"
            className="font-[family-name:var(--font-mono)] text-sm text-[var(--accent-light)] hover:text-white transition-colors group"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-[var(--muted)]">&gt;</span> mayur
            <span className="text-[var(--cyan)]">.dev</span>
          </motion.a>

          {/* Attribution */}
          <p className="text-sm text-[var(--muted)] inline-flex items-center gap-1.5 flex-wrap justify-center">
            Designed &amp; Built with
            <motion.span
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart size={13} className="text-[var(--pink)] fill-[var(--pink)]" />
            </motion.span>
            by
            <span className="text-shimmer font-medium">Mayur Suthar</span>
          </p>

          {/* Links */}
          <div className="flex items-center gap-6">
            <motion.a
              href="https://github.com/Mayur-1976"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--muted)] hover:text-[var(--accent-light)] transition-colors"
              aria-label="GitHub"
              whileHover={{ scale: 1.1, y: -2 }}
            >
              <GithubIcon width={18} height={18} />
            </motion.a>
            <span className="text-[var(--muted)]/30">|</span>
            <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--muted)] inline-flex items-center gap-1.5">
              <Sparkles size={8} className="text-[var(--accent)] opacity-50" />
              © {year}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
