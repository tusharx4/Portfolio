import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { profile } from "@/data/cv";

gsap.registerPlugin(ScrollTrigger);

export const TONE: Record<string, string> = {
  blue: "#4285f4",
  red: "#ea4335",
  yellow: "#fbbc05",
  green: "#34a853",
};
export const TONE_RGB: Record<string, string> = {
  blue: "66 133 244",
  red: "234 67 53",
  yellow: "251 188 5",
  green: "52 168 83",
};

const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Single shared Lenis instance driving the GSAP ticker. */
export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReduced()) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // anchor links -> lenis easing
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.<HTMLAnchorElement>("a[data-scroll-to]");
      if (!target) return;
      const id = target.getAttribute("data-scroll-to");
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -92, duration: 1.5 });
    };
    document.addEventListener("click", onClick);

    const images = document.querySelectorAll("img");
    images.forEach((img) => img.addEventListener("load", () => ScrollTrigger.refresh(), { once: true }));
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 700);

    return () => {
      window.clearTimeout(refreshTimer);
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}

/**
 * Staggered, scroll-triggered reveal for every [data-reveal] child of a section.
 * Elements float up with a soft "liquid" opacity curve, one after another.
 */
export function useSectionReveal<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!items.length) return;

    if (prefersReduced()) {
      gsap.set(items, { opacity: 1, y: 0, clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y: 30, filter: "blur(6px)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: `top ${100 - threshold * 100}%`,
          end: "bottom 60%",
          toggleActions: "play none none none",
        },
      });

      tl.to(items, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.05,
        ease: "power3.out",
        stagger: { each: 0.085, from: "start" },
        overwrite: true,
        // drop inline transform/opacity so CSS :hover lift keeps working
        clearProps: "transform,opacity,filter,will-change",
      });
    }, root);

    return () => ctx.revert();
  }, [threshold]);

  return ref;
}

/**
 * Cursor-tracked liquid reflection (+ optional 3D tilt) for .spot glass cards.
 * When tilt is on, GSAP also owns the hover elevation so inline transforms
 * never fight the CSS `.lift` rule.
 */
export function useSpotlight<T extends HTMLElement>(tilt = 4) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReduced()) return;

    const cards = Array.from(root.querySelectorAll<HTMLElement>(".spot"));
    const clean: Array<() => void> = [];

    cards.forEach((card) => {
      let frame = 0;
      const active = () => tilt > 0 && card.dataset.tilt !== "off";

      const onMove = (e: PointerEvent) => {
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const r = card.getBoundingClientRect();
          const x = e.clientX - r.left;
          const y = e.clientY - r.top;
          card.style.setProperty("--mx", `${x}px`);
          card.style.setProperty("--my", `${y}px`);
          if (active()) {
            gsap.to(card, {
              rotateY: (x / r.width - 0.5) * tilt * 2,
              rotateX: (y / r.height - 0.5) * -tilt * 2,
              y: -6,
              transformPerspective: 1000,
              transformOrigin: "center",
              duration: 0.6,
              ease: "power3.out",
              overwrite: "auto",
            });
          }
        });
      };

      const onLeave = () => {
        card.style.setProperty("--mx", "50%");
        card.style.setProperty("--my", "50%");
        if (active()) {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            y: 0,
            duration: 0.9,
            ease: "elastic.out(1,0.55)",
            overwrite: "auto",
          });
        }
      };

      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
      clean.push(() => {
        if (frame) cancelAnimationFrame(frame);
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
      });
    });

    return () => clean.forEach((fn) => fn());
  }, [tilt]);

  return ref;
}

/** Animate numbers from 0 → value when they scroll into view. */
export function useCountUp(el: RefObject<HTMLElement | null>, to: number, decimals = 0) {
  useLayoutEffect(() => {
    const node = el.current;
    if (!node) return;
    if (prefersReduced()) {
      node.textContent = to.toFixed(decimals);
      return;
    }
    const obj = { v: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        v: to,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: node, start: "top 88%" },
        onUpdate: () => {
          node.textContent = obj.v.toFixed(decimals);
        },
      });
    });
    return () => ctx.revert();
  }, [el, to, decimals]);
}

export const scrollToTop = (lenis: Lenis | null) => {
  if (lenis) lenis.scrollTo(0, { duration: 1.4 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
};

export const cvMeta = { name: `${profile.firstName} ${profile.lastName}`, title: profile.title };
