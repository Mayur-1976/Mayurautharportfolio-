"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { SVGProps } from "react";

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.width || 18} height={props.height || 18} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-[var(--border)] py-10">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center gap-4">
          {/* Logo */}
          <a
            href="#"
            className="font-[family-name:var(--font-mono)] text-sm text-[var(--accent)] hover:text-white transition-colors"
          >
            <span className="text-[var(--muted)]">&gt;</span> mayur.dev
          </a>

          {/* Attribution */}
          <p className="text-sm text-[var(--muted)] inline-flex items-center gap-1.5 flex-wrap justify-center">
            Designed &amp; Built with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart size={13} className="text-[var(--pink)] fill-[var(--pink)]" />
            </motion.span>
            by
            <span className="text-[var(--text)] font-medium">Mayur Suthar</span>
          </p>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/Mayur-1976"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon width={18} height={18} />
            </a>
            <span className="text-[var(--muted)]/40">|</span>
            <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--muted)]">
              © {year}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
