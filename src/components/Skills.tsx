import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Sparkles } from "lucide-react";
import { skillGroups } from "@/data/cv";
import { Eyebrow, NamedIcon, SectionHeader, SectionShell, Tag } from "@/components/ui";
import { useSectionReveal, useSpotlight, TONE, TONE_RGB } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const SNAPSHOT = [
  { label: "Current study", value: "B.Sc. in Zoology — 3rd year" },
  { label: "Current role", value: "Customer Support Executive · Shikkha IT" },
  { label: "AI stack", value: "ChatGPT · Gemini · Claude · Grok" },
  { label: "Languages", value: "Bengali · English · Hindi" },
];

export default function Skills() {
  const reveal = useSectionReveal<HTMLElement>(0.1);
  const spot = useSpotlight<HTMLElement>(3);

  useLayoutEffect(() => {
    const bars = Array.from(document.querySelectorAll<HTMLElement>("[data-bar]"));
    if (!bars.length) return;
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        bars.forEach((b) => (b.style.transform = `scaleX(${Number(b.dataset.level) / 100})`));
        return;
      }
      bars.forEach((bar) => {
        const level = Number(bar.dataset.level) / 100;
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: level,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: { trigger: bar.closest("[data-card]"), start: "top 82%" },
          },
        );
        const pct = bar.querySelector("[data-pct]");
        if (pct) {
          const o = { v: 0 };
          gsap.to(o, {
            v: level * 100,
            duration: 1.5,
            ease: "power4.out",
            onUpdate: () => (pct.textContent = `${Math.round(o.v)}`),
            scrollTrigger: { trigger: bar.closest("[data-card]"), start: "top 82%" },
          });
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={(node) => {
        reveal.current = node;
        spot.current = node;
      }}
      className="relative py-24 sm:py-28"
    >
      <SectionShell>
        <SectionHeader
          index="02 / 06"
          kicker="Skills & tool stack"
          tone="red"
          title={
            <>
              A stack that blends <span className="text-gred">AI, design</span>
              <br className="hidden md:block" /> and human support.
            </>
          }
          lead="AI & prompt engineering · design & visual branding · developer tools · client care — the four groups I work in every day, honestly rated."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {skillGroups.map((g, gi) => (
            <article
              key={g.name}
              data-card
              data-reveal
              style={{ ["--tint" as string]: TONE_RGB[g.tone] }}
              className="lift spot glass group relative overflow-hidden rounded-[30px] p-6 sm:p-8"
            >
              <span
                aria-hidden
                className="absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-60"
                style={{ background: TONE[g.tone] }}
              />
              <header className="relative flex items-start gap-4">
                <span
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white transition-transform duration-500 group-hover:rotate-[8deg]"
                  style={{ background: TONE[g.tone], boxShadow: `0 16px 30px -18px ${TONE[g.tone]}` }}
                >
                  <NamedIcon name={g.icon} className="h-[22px] w-[22px]" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-[1.35rem] leading-none font-bold text-ink">{g.name}</h3>
                    <span className="font-mono text-[10px] text-gray-400">0{gi + 1}</span>
                  </div>
                  <p className="mt-2 text-[0.85rem] text-ink-soft">{g.blurb}</p>
                </div>
              </header>

              <ul className="relative mt-7 space-y-4">
                {g.skills.map((s) => (
                  <li key={s.name} className="group/row">
                    <div className="flex items-baseline gap-3">
                      <span className="text-[0.95rem] font-semibold text-ink transition-all duration-300 group-hover/row:translate-x-1 group-hover/row:text-[rgb(var(--tint))]">
                        {s.name}
                      </span>
                      {s.badge && (
                        <span className="rounded-full border border-gray-200/80 bg-white/70 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-soft">
                          {s.badge}
                        </span>
                      )}
                      <span className="ml-auto font-mono text-[11px] text-ink-soft">
                        <span data-pct>{s.level}</span>%
                      </span>
                    </div>
                    <div className="mt-2 h-[6px] overflow-hidden rounded-full bg-gray-200/80">
                      <div
                        data-bar
                        data-level={s.level}
                        className="h-full origin-left rounded-full"
                        style={{
                          background: `linear-gradient(90deg, rgb(${TONE_RGB[g.tone]} / .55), ${TONE[g.tone]})`,
                          boxShadow: `0 0 12px rgb(${TONE_RGB[g.tone]} / .5)`,
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* stack snapshot + tools strip */}
        <div className="mt-8 grid gap-4 lg:grid-cols-12">
          <div data-reveal className="glass rounded-[26px] p-6 lg:col-span-7">
            <Eyebrow tone="yellow">At a glance</Eyebrow>
            <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {SNAPSHOT.map((s) => (
                <div key={s.label} className="border-l-2 border-gyellow/60 pl-4">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">{s.label}</dt>
                  <dd className="mt-1 text-[0.92rem] leading-snug font-medium text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div data-reveal className="glass relative overflow-hidden rounded-[26px] p-6 lg:col-span-5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-ggreen" strokeWidth={2} />
              <Eyebrow tone="green">Strengths</Eyebrow>
            </div>
            <ul className="mt-4 grid gap-2.5">
              {[
                "Supporting 400+ active students with high satisfaction rates.",
                "Built a 2.2k+ organic X audience through visual content strategy.",
                "Super OG distinctions in leading global Web3 communities.",
                "Combines AI platforms with dev tools to automate workflows.",
              ].map((l) => (
                <li key={l} className="flex items-start gap-2.5 text-[0.88rem] leading-snug text-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-ggreen" strokeWidth={2.4} />
                  {l}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {["Prompt Design", "Remote Work", "Fast Learner", "Client Care"].map((t) => (
                <Tag key={t} tone="blue">
                  {t}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </SectionShell>
    </section>
  );
}
