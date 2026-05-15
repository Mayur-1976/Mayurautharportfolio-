"use client";

import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";

const roles = [
  "Backend Developer",
  "AI/ML Enthusiast",
  "DevOps Learner",
  "BCA Student",
];

/* ======= Typing Hook ======= */
function useTypingAnimation(texts: string[], speed = 80, pause = 2200) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    const timer = setTimeout(
      () => {
        if (!deleting) {
          setDisplay(current.slice(0, display.length + 1));
          if (display.length + 1 === current.length)
            setTimeout(() => setDeleting(true), pause);
        } else {
          setDisplay(current.slice(0, display.length - 1));
          if (display.length === 0) {
            setDeleting(false);
            setIdx((p) => (p + 1) % texts.length);
          }
        }
      },
      deleting ? speed / 2 : speed
    );
    return () => clearTimeout(timer);
  }, [display, deleting, idx, texts, speed, pause]);

  return display;
}

/* ======= Enhanced Particle System — Aurora Colors ======= */
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  hue: number;
  saturation: number;
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Aurora-colored particles
    const auroraHues = [263, 187, 160, 350]; // violet, cyan, emerald, rose
    const count = Math.min(90, Math.floor(window.innerWidth / 16));
    particlesRef.current = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.15,
      hue: auroraHues[Math.floor(Math.random() * auroraHues.length)],
      saturation: 70 + Math.random() * 20,
    }));

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouse);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const particles = particlesRef.current;

      particles.forEach((p) => {
        // Mouse repulsion with soft falloff
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }

        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle with soft glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, ${p.saturation}%, 70%, ${p.opacity})`;
        ctx.fill();

        // Subtle glow around larger particles
        if (p.size > 1.5) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, ${p.saturation}%, 70%, ${p.opacity * 0.08})`;
          ctx.fill();
        }
      });

      // Draw aurora-colored connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            const alpha = 0.06 * (1 - dist / 110);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(${particles[i].hue}, 70%, 60%, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] pointer-events-none"
    />
  );
}

/* ======= Animated Code Block — Syntax Highlighted ======= */
function FloatingCode() {
  const lines = useMemo(() => [
    { code: 'const ', kw: true, rest: 'dev = ', str: '"Mayur Suthar"', semi: ';' },
    { code: 'let ', kw: true, rest: 'passion = ', str: '["backend", "AI/ML"]', semi: ';' },
    { code: 'async function ', kw: true, rest: 'buildAPI', str: '() {', semi: '' },
    { code: '  const ', kw: true, rest: 'res = await fetch(', str: '"/api"', semi: ');' },
    { code: '  return ', kw: true, rest: 'res.json', str: '()', semi: ';' },
    { code: '}', kw: false, rest: '', str: '', semi: '' },
    { code: '// ', kw: false, rest: '', str: 'Currently learning DevOps', semi: '', comment: true },
    { code: 'docker', kw: false, rest: '.build(', str: '"my-app"', semi: ');' },
    { code: 'pipeline', kw: false, rest: '.deploy({ env: ', str: "'prod'", semi: ' });' },
    { code: 'model', kw: false, rest: '.train(data).predict', str: '()', semi: ';' },
  ], []);

  return (
    <div className="absolute right-[5%] top-[15%] hidden lg:block z-[2] opacity-[0.08] select-none pointer-events-none">
      <div className="font-[family-name:var(--font-mono)] text-xs leading-7">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 + i * 0.15, duration: 0.5 }}
          >
            <span className="text-[var(--muted)] mr-3 opacity-50">{String(i + 1).padStart(2, "0")}</span>
            {line.comment ? (
              <span className="text-[var(--green)] italic">{line.code}{line.str}</span>
            ) : (
              <>
                <span className="text-[var(--pink)]">{line.code}</span>
                <span className="text-[var(--text)]">{line.rest}</span>
                <span className="text-[var(--green)]">{line.str}</span>
                <span className="text-[var(--text)]">{line.semi}</span>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ======= Floating Geometric Shapes ======= */
function FloatingShapes() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Triangle */}
      <div className="absolute top-[15%] left-[8%] geo-float-1">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <polygon points="20,5 35,35 5,35" stroke="rgba(124,58,237,0.15)" strokeWidth="1" fill="none" />
        </svg>
      </div>
      {/* Hexagon */}
      <div className="absolute top-[70%] right-[12%] geo-float-2">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <polygon points="25,3 45,15 45,35 25,47 5,35 5,15" stroke="rgba(6,182,212,0.12)" strokeWidth="1" fill="none" />
        </svg>
      </div>
      {/* Circle */}
      <div className="absolute top-[40%] left-[85%] geo-float-3">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <circle cx="15" cy="15" r="12" stroke="rgba(52,211,153,0.1)" strokeWidth="1" fill="none" />
        </svg>
      </div>
      {/* Diamond */}
      <div className="absolute top-[80%] left-[20%] geo-float-2" style={{ animationDelay: "-8s" }}>
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
          <rect x="12.5" y="1" width="16" height="16" transform="rotate(45 12.5 12.5)" stroke="rgba(251,113,133,0.1)" strokeWidth="1" fill="none" />
        </svg>
      </div>
      {/* Small triangle */}
      <div className="absolute top-[25%] right-[25%] geo-float-1" style={{ animationDelay: "-5s" }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <polygon points="10,2 18,18 2,18" stroke="rgba(251,191,36,0.1)" strokeWidth="1" fill="none" />
        </svg>
      </div>
    </div>
  );
}

/* ======= Animation Variants ======= */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

/* ======= Main Hero ======= */
export default function Hero() {
  const typed = useTypingAnimation(roles, 80, 2200);

  // Custom cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 30 });
  const ringX = useSpring(cursorX, { stiffness: 180, damping: 22 });
  const ringY = useSpring(cursorY, { stiffness: 180, damping: 22 });
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    },
    [cursorX, cursorY]
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    const hoverEls = document.querySelectorAll("a, button, [data-hover]");
    const enter = () => setHovering(true);
    const leave = () => setHovering(false);
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, [handleMouseMove]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Aurora mesh background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[-10%] left-[5%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -30, 40, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-5%] right-[0%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)" }}
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 40, -20, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[50%] left-[50%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #34d399 0%, transparent 70%)" }}
          animate={{
            x: [-200, -150, -250, -200],
            y: [-200, -250, -150, -200],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Hero glow */}
      <div className="hero-glow" />

      {/* Geometric shapes */}
      <FloatingShapes />

      {/* Particle constellation */}
      <ParticleField />

      {/* Floating code snippet */}
      <FloatingCode />

      {/* Custom cursor — desktop only */}
      <AnimatePresence>
        {!isMobile && (
          <>
            <motion.div
              className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
              style={{
                x: springX,
                y: springY,
                width: hovering ? 14 : 8,
                height: hovering ? 14 : 8,
                borderRadius: "50%",
                backgroundColor: "#fff",
                translateX: "-50%",
                translateY: "-50%",
              }}
              transition={{ duration: 0.15 }}
            />
            <motion.div
              className="fixed top-0 left-0 z-[9998] pointer-events-none"
              style={{
                x: ringX,
                y: ringY,
                width: hovering ? 52 : 36,
                height: hovering ? 52 : 36,
                borderRadius: "50%",
                border: "1.5px solid rgba(167,139,250,0.4)",
                translateX: "-50%",
                translateY: "-50%",
              }}
              transition={{ duration: 0.2 }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Comment line */}
        <motion.p
          variants={fadeUp}
          className="font-[family-name:var(--font-mono)] text-sm text-[var(--cyan)] mb-6 tracking-wider"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--cyan)] mr-2 pulse-dot" />
          {">"}_  hello world
        </motion.p>

        {/* Name with Glitch + Aurora gradient */}
        <motion.h1
          variants={scaleIn}
          className="font-[family-name:var(--font-syne)] font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.05] mb-2 tracking-tight glitch-text text-shimmer"
          data-text="Mayur Suthar"
        >
          Mayur Suthar
        </motion.h1>

        {/* Subtitle gradient line */}
        <motion.div
          variants={fadeUp}
          className="mx-auto w-36 h-1 rounded-full mb-6 mt-4 gradient-flow"
          style={{
            background: "linear-gradient(90deg, var(--aurora1), var(--aurora2), var(--aurora3), var(--aurora4), var(--aurora1))",
            backgroundSize: "200% auto",
          }}
        />

        {/* Typing animation */}
        <motion.div
          variants={fadeUp}
          className="h-10 flex items-center justify-center mb-6"
        >
          <span className="font-[family-name:var(--font-mono)] text-lg sm:text-xl text-[var(--muted)] typing-cursor">
            <span className="text-[var(--accent-light)] mr-1">{">"}</span>
            {typed}
          </span>
        </motion.div>

        {/* Holographic Badge */}
        <motion.div variants={fadeUp} className="flex justify-center mb-10">
          <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[var(--cyan)]/20 holo-badge text-[var(--cyan)] text-xs font-medium font-[family-name:var(--font-mono)] backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--cyan)] opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--cyan)]" />
            </span>
            <Sparkles size={12} className="opacity-60" />
            Currently Learning DevOps
          </span>
        </motion.div>

        {/* Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(124,58,237,0.3), 0 0 80px rgba(6,182,212,0.1)" }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-2xl text-white font-semibold text-sm btn-glow transition-all gradient-flow"
            style={{
              background: "linear-gradient(135deg, var(--aurora1), #6c5ce7, var(--aurora2))",
              backgroundSize: "200% 200%",
            }}
          >
            <span className="flex items-center gap-2">
              <Sparkles size={14} />
              See My Work
            </span>
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04, borderColor: "rgba(124,58,237,0.4)" }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-2xl border border-[var(--border)] text-[var(--text)] font-semibold text-sm hover:text-[var(--accent-light)] transition-all backdrop-blur-md bg-[var(--surface)]/30"
          >
            Contact Me
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a href="#about" aria-label="Scroll to about">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <ArrowDown size={20} className="text-[var(--muted)] bounce-arrow" />
          </motion.div>
        </a>
      </div>
    </section>
  );
}
