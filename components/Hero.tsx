"use client";

import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { ArrowDown } from "lucide-react";

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

/* ======= Particle System ======= */
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  hue: number;
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

    // Create particles
    const count = Math.min(80, Math.floor(window.innerWidth / 18));
    particlesRef.current = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.1,
      hue: Math.random() > 0.5 ? 256 : 190, // purple or cyan
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
        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 2;
          p.y += (dy / dist) * force * 2;
        }

        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(131, 110, 249, ${0.08 * (1 - dist / 100)})`;
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

/* ======= Animated Code Block ======= */
function FloatingCode() {
  const lines = useMemo(() => [
    'const dev = "Mayur Suthar";',
    'let passion = ["backend", "AI/ML"];',
    "async function buildAPI() {",
    '  const res = await fetch("/api");',
    "  return res.json();",
    "}",
    "// Currently learning DevOps",
    'docker.build("my-app");',
    "pipeline.deploy({ env: 'prod' });",
    "model.train(data).predict();",
  ], []);

  return (
    <div className="absolute right-[5%] top-[15%] hidden lg:block z-[2] opacity-[0.07] select-none pointer-events-none">
      <div className="font-[family-name:var(--font-mono)] text-xs leading-6">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 + i * 0.15, duration: 0.4 }}
          >
            <span className="text-[var(--muted)] mr-3">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-[var(--accent)]">{line}</span>
          </motion.div>
        ))}
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
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden dot-grid"
    >
      {/* Floating orbs */}
      <div className="absolute top-[10%] left-[10%] w-72 h-72 rounded-full bg-[var(--accent)] opacity-[0.04] blur-[100px] floating-orb-1" />
      <div className="absolute bottom-[20%] right-[15%] w-60 h-60 rounded-full bg-[var(--cyan)] opacity-[0.04] blur-[100px] floating-orb-2" />
      <div className="absolute top-[60%] left-[60%] w-48 h-48 rounded-full bg-[var(--pink)] opacity-[0.03] blur-[100px] floating-orb-3" />

      {/* Purple glow */}
      <div className="hero-glow" />

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
              className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference"
              style={{
                x: ringX,
                y: ringY,
                width: hovering ? 52 : 36,
                height: hovering ? 52 : 36,
                borderRadius: "50%",
                border: "1.5px solid rgba(255,255,255,0.5)",
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
          {"//"} hello world
        </motion.p>

        {/* Name with Glitch */}
        <motion.h1
          variants={scaleIn}
          className="font-[family-name:var(--font-syne)] font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.05] mb-2 tracking-tight glitch-text"
          data-text="Mayur Suthar"
        >
          Mayur Suthar
        </motion.h1>

        {/* Subtitle gradient line */}
        <motion.div
          variants={fadeUp}
          className="mx-auto w-32 h-1 rounded-full bg-gradient-to-r from-[var(--accent)] via-[var(--cyan)] to-[var(--pink)] mb-6 mt-4"
        />

        {/* Typing animation */}
        <motion.div
          variants={fadeUp}
          className="h-10 flex items-center justify-center mb-6"
        >
          <span className="font-[family-name:var(--font-mono)] text-lg sm:text-xl text-[var(--muted)] typing-cursor">
            {typed}
          </span>
        </motion.div>

        {/* Badge */}
        <motion.div variants={fadeUp} className="flex justify-center mb-10">
          <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[var(--cyan)]/25 bg-[var(--cyan)]/[0.06] text-[var(--cyan)] text-xs font-medium font-[family-name:var(--font-mono)] backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--cyan)] opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--cyan)]" />
            </span>
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
            whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(131,110,249,0.3)" }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[#6c5ce7] text-white font-semibold text-sm btn-glow transition-all"
          >
            See My Work
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04, borderColor: "rgba(131,110,249,0.5)" }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-xl border border-[var(--border)] text-[var(--text)] font-semibold text-sm hover:text-[var(--accent)] transition-all backdrop-blur-sm"
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
