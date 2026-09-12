import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { marquee } from "@/data/cv";

gsap.registerPlugin(ScrollTrigger);
const ACCENTS = ["#4285f4", "#ea4335", "#fbbc05", "#34a853"];

export default function Marquee() {
  const row = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = track.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: row.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = gsap.utils.clamp(-1600, 1600, self.getVelocity());
          gsap.to(el, { skewX: v / 170, duration: 0.5, ease: "power3.out", overwrite: true });
          gsap.to(el, {
            skewX: 0,
            duration: 0.9,
            ease: "elastic.out(1,0.5)",
            delay: 0.12,
            overwrite: false,
          });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const items = [...marquee, ...marquee];

  return (
    <div
      ref={row}
      className="marquee relative isolate my-8 overflow-hidden border-y border-gray-200/70 bg-white/50 py-4 backdrop-blur-md"
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-paper to-transparent" />
      <div ref={track} className="marquee-track flex w-max items-center gap-8 will-change-transform">
        {items.map((t, i) => (
          <span key={`${t}-${i}`} className="flex items-center gap-8">
            <span className="font-display text-[1.05rem] font-semibold whitespace-nowrap text-ink/80 sm:text-[1.3rem]">
              {t}
            </span>
            <span className="h-1.5 w-1.5 rotate-45" style={{ background: ACCENTS[i % ACCENTS.length] }} />
          </span>
        ))}
      </div>
    </div>
  );
}
