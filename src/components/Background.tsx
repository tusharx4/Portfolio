import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Ambient light layer: crisp paper base, faint blueprint grid,
 * four floating blurred Google-coloured spheres + film grain,
 * all gently parallaxed by scroll.
 */
export default function Background() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.to(".sphere", {
        y: (i) => [140, -120, 180, -160][i] ?? 100,
        ease: "none",
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 1.4 },
      });
    }, layer);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={layer} aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#ffffff_0%,#f8f9fa_45%,#eef1f5_100%)]" />

      <div className="sphere drift-a -left-24 -top-32 h-[34rem] w-[34rem] bg-[#4285f4]/35" />
      <div className="sphere drift-b -right-28 top-[18vh] h-[30rem] w-[30rem] bg-[#ea4335]/25" />
      <div className="sphere drift-c left-[22vw] top-[58vh] h-[26rem] w-[26rem] bg-[#fbbc05]/28" />
      <div className="sphere drift-d -right-16 bottom-[-8rem] h-[32rem] w-[32rem] bg-[#34a853]/22" />

      <div className="grid-lines absolute inset-0" />
      <div className="grain absolute inset-0 opacity-[0.045] mix-blend-multiply" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-300/80 to-transparent" />
    </div>
  );
}
