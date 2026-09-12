import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowDown, BadgeCheck, Download, Mail, MapPin } from "lucide-react";
import { heroStats, profile, socials } from "@/data/cv";
import { GhostButton, PrimaryButton, BrandIcon } from "@/components/ui";
import { useCountUp } from "@/lib/motion";

/** Tushar's exact photo, hosted on his Google Drive (public). */
const PHOTO = "https://lh3.googleusercontent.com/d/1BR-AMzTjilloYpqcJL7rneJuJVaDNr0W=w1200";
const PHOTO_FALLBACKS = [
  "https://drive.google.com/thumbnail?id=1BR-AMzTjilloYpqcJL7rneJuJVaDNr0W&sz=w1200",
  "images/portrait.jpg",
];

/* ── scramble-decode text ── */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ/\\<>{}[]#*+—";
function ScrambleText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const [out, setOut] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let frame = 0;
    const total = 46;
    const start = performance.now() + delay * 1000;

    const tick = (now: number) => {
      if (now < start) {
        raf = requestAnimationFrame(tick);
        return;
      }
      frame++;
      const p = Math.min(1, frame / total);
      setOut(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            const reveal = i / text.length < p * 1.25 - 0.15;
            return reveal ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join(""),
      );
      if (p < 1) raf = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, delay]);

  return (
    <span ref={ref} className={className}>
      {out}
    </span>
  );
}

function Stat({ value, suffix, label, decimals }: { value: number; suffix: string; label: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useCountUp(ref, value, decimals ?? 0);
  return (
    <div data-reveal className="group px-4 py-4 sm:px-5">
      <p className="font-display text-[1.75rem] leading-none font-extrabold text-ink transition-colors duration-300 group-hover:text-gblue sm:text-[2.1rem]">
        <span ref={ref}>0</span>
        <span className="text-gyellow">{suffix}</span>
      </p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">{label}</p>
    </div>
  );
}

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-mask", { yPercent: 118, opacity: 0, duration: 1.15, stagger: 0.1, ease: "expo.out" }, 0.1)
        .from(".hero-fade", { y: 18, opacity: 0, duration: 0.9, stagger: 0.09 }, 0.45)
        .from(".hero-card", { y: 60, opacity: 0, rotate: -2.5, filter: "blur(10px)", duration: 1.2 }, 0.35)
        .from(".hero-chip", { scale: 0.6, opacity: 0, duration: 0.7, stagger: 0.12, ease: "back.out(1.8)" }, 1)
        .from(".hero-cue", { opacity: 0, y: 12, duration: 0.7 }, 1.4);

      gsap.to(".hero-card", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} id="top" className="relative pt-28 pb-10 sm:pt-36 lg:pt-40">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-end gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        {/* ── left: typographic lockup ── */}
        <div className="lg:col-span-7">
          <div className="hero-fade glass inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-2.5">
            <span className="pulse-dot h-2 w-2 rounded-full bg-ggreen" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-soft">
              {profile.availability}
            </span>
          </div>

          <h1 className="mt-6 text-[3.3rem] leading-[0.86] font-extrabold text-ink sm:text-[5.5rem] lg:text-[6.6rem]">
            <span className="block overflow-hidden">
              <span className="hero-mask block">{profile.firstName}</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-mask block">
                <span className="text-ink">{profile.lastName}</span>
                <span className="text-gblue">.</span>
              </span>
            </span>
          </h1>

          <div className="hero-fade mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <ScrambleText
              text={profile.title.toUpperCase()}
              className="font-mono text-[0.82rem] font-bold uppercase tracking-[0.28em] text-ink sm:text-sm"
            />
            <span className="h-4 w-px bg-gray-300" />
            <p className="font-mono text-[0.78rem] uppercase tracking-[0.16em] text-gred">{profile.kicker}</p>
          </div>

          <p className="hero-fade mt-7 max-w-xl text-[1.12rem] leading-relaxed text-ink-soft sm:text-[1.22rem]">
            {profile.tagline}
          </p>

          <div className="hero-fade mt-9 flex flex-wrap items-center gap-3">
            <PrimaryButton href={profile.resumeUrl} tone="blue" download>
              <Download className="h-4 w-4" strokeWidth={2.2} />
              Download CV
            </PrimaryButton>
            <GhostButton dataScrollTo="contact">
              <Mail className="h-4 w-4 text-gblue" strokeWidth={2} />
              Contact me
              <ArrowDown className="h-3.5 w-3.5 text-gray-400 transition-transform duration-500 group-hover:translate-y-0.5" />
            </GhostButton>
            <span className="ml-1 inline-flex items-center gap-1.5 font-mono text-[11px] text-ink-soft">
              <MapPin className="h-3.5 w-3.5 text-ggreen" strokeWidth={2} />
              {profile.location}
            </span>
          </div>

          <div className="hero-fade glass mt-10 grid grid-cols-2 divide-x divide-y divide-gray-200/70 rounded-[22px] sm:grid-cols-4 sm:divide-y-0">
            {heroStats.map((s) => (
              <Stat key={s.label} {...s} decimals={s.suffix === "%" ? 1 : 0} />
            ))}
            <span className="sr-only">Stat {heroStats.length}</span>
          </div>
        </div>

        {/* ── right: portrait card ── */}
        <div className="relative lg:col-span-5">
          <div className="hero-card relative mx-auto max-w-[380px] lg:mr-0 lg:ml-auto">
            <div className="spot glass lift overflow-hidden rounded-[32px] p-2.5">
              <div className="relative overflow-hidden rounded-[24px] bg-gray-100">
                <img
                  src={PHOTO}
                  onError={(e) => {
                    const img = e.currentTarget;
                    const step = Number(img.dataset.fallback ?? "0");
                    if (step < PHOTO_FALLBACKS.length) {
                      img.dataset.fallback = String(step + 1);
                      img.src = PHOTO_FALLBACKS[step];
                    }
                  }}
                  alt={`${profile.firstName} ${profile.lastName}, ${profile.title}`}
                  loading="eager"
                  referrerPolicy="no-referrer"
                  style={{ objectPosition: "50% 20%" }}
                  className="h-[380px] w-full object-cover transition-transform duration-[6000ms] ease-out hover:scale-[1.06] sm:h-[440px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/5 to-transparent" />
                <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3 text-white">
                  <div>
                    <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-white/70">based in</p>
                    <p className="font-display text-[1.05rem] font-bold">{profile.location}</p>
                  </div>
                  <div className="flex gap-1">
                    {[10, 16, 7, 20, 12].map((h, i) => (
                      <span
                        key={i}
                        className="w-[3px] rounded-full bg-ggreen/90"
                        style={{ height: h, animation: `bob ${1.1 + i * 0.22}s ease-in-out ${i * 0.1}s infinite` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 px-3 py-3">
                <p className="text-[0.78rem] leading-snug text-ink-soft">{profile.photoCaption}</p>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-ggreen/10 px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ggreen">
                  <BadgeCheck className="h-3 w-3" strokeWidth={2.2} /> verified
                </span>
              </div>
            </div>

            {/* floating chips */}
            <span className="hero-chip absolute -left-4 top-16 hidden rounded-2xl border border-gray-200/70 bg-white/75 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink shadow-lg shadow-gray-200/60 backdrop-blur-md sm:block">
              AI Tools
            </span>
            <span className="hero-chip absolute -right-3 top-40 rounded-2xl border border-gray-200/70 bg-white/75 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-gblue shadow-lg shadow-gray-200/60 backdrop-blur-md sm:block">
              2.2k on X
            </span>
            <span className="hero-chip absolute -left-8 bottom-28 rounded-2xl border border-gray-200/70 bg-white/75 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-gred shadow-lg shadow-gray-200/60 backdrop-blur-md sm:block">
              Web3 OG
            </span>

            {/* terminal card */}
            <div className="hero-card glass mt-4 rounded-[22px] p-4 font-mono text-[11.5px] leading-relaxed text-ink-soft">
              <p>
                <span className="text-ggreen">$</span> role --support --create --moderate
              </p>
              <p className="mt-1 text-ink">
                → 400+ students · 2.2k audience <span className="text-gray-400">/</span> AI-powered workflows
              </p>
              <p className="mt-1">
                <span className="text-ggreen">$</span> status
              </p>
              <p className="mt-1 flex items-center gap-2 text-ink">
                online <span className="h-px flex-1 bg-gray-300" /> ready to help
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* socials + scroll cue */}
      <div className="mx-auto mt-14 flex max-w-[1200px] flex-wrap items-center gap-4 px-5 sm:px-8">
        <div className="hero-fade flex items-center gap-1.5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={s.label}
              className="lift glass grid h-10 w-10 place-items-center rounded-xl text-ink transition-colors hover:text-gblue"
            >
              <BrandIcon name={s.icon} className="h-4 w-4" />
            </a>
          ))}
        </div>
        <a
          href="#about"
          data-scroll-to="about"
          className="hero-cue group ml-auto inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-ink"
        >
          scroll to explore
          <span className="grid h-8 w-8 place-items-center rounded-full border border-gray-300 transition-all duration-500 group-hover:border-gblue group-hover:bg-gblue">
            <ArrowDown className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-y-0.5 group-hover:text-white" />
          </span>
        </a>
      </div>

      <a
        href={`https://${profile.website}`}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm"
      >
        {profile.website}
      </a>
    </div>
  );
}
