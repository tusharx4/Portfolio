import { useEffect, useRef } from "react";
import Background from "@/components/Background";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useSmoothScroll } from "@/lib/motion";

/** Soft light that follows the pointer — desktop only, low cost. */
function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.08;
      pos.y += (target.y - pos.y) * 0.08;
      el.style.transform = `translate3d(${pos.x - 260}px, ${pos.y - 260}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[5] hidden h-[520px] w-[520px] rounded-full opacity-60 blur-[90px] lg:block"
      style={{
        background:
          "radial-gradient(circle, rgba(66,133,244,.16), rgba(251,188,5,.10) 45%, transparent 68%)",
      }}
    />
  );
}

export default function App() {
  const lenis = useSmoothScroll();

  return (
    <div className="relative min-h-screen">
      <Background />
      <CursorGlow />
      <Nav />

      <main className="relative">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer lenis={lenis} />
    </div>
  );
}
