import { ArrowUpRight, Quote } from "lucide-react";
import { about, profile, testimonials } from "@/data/cv";
import { Eyebrow, NamedIcon, SectionHeader, SectionShell, Tag } from "@/components/ui";
import { useSectionReveal, useSpotlight, TONE_RGB } from "@/lib/motion";

const SPAN = ["sm:col-span-4", "sm:col-span-2", "sm:col-span-2", "sm:col-span-4"];

export default function About() {
  const reveal = useSectionReveal<HTMLElement>(0.12);
  const spot = useSpotlight<HTMLElement>(0);

  return (
    <section ref={(node) => { reveal.current = node; spot.current = node; }} id="about" className="relative py-24 sm:py-32">
      <SectionShell>
        <SectionHeader
          index="01 / 06"
          kicker="Profile & record"
          tone="blue"
          title={
            <>
              Support by day, <span className="text-gblue">communities and content</span>
              <br className="hidden sm:block" /> around the clock.
            </>
          }
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          {/* bio */}
          <div className="lg:col-span-7">
            <div data-reveal className="glass spot relative overflow-hidden rounded-[28px] p-7 sm:p-10">
              <Quote className="absolute -top-2 right-4 h-20 w-20 text-gblue/[0.07]" strokeWidth={1.2} />
              {about.bio.map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-[1.05rem] leading-[1.75] text-ink first-letter:float-left first-letter:mt-1 first-letter:mr-3 first-letter:font-display first-letter:text-[3.6rem] first-letter:leading-[0.8] first-letter:font-extrabold first-letter:text-gblue"
                      : "mt-5 text-[1rem] leading-[1.8] text-ink-soft"
                  }
                >
                  {p}
                </p>
              ))}
              <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-gray-200/80 pt-6">
                <Tag tone="green">
                  <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-ggreen align-middle" />
                  open to opportunities
                </Tag>
                <Tag tone="blue">{profile.location}</Tag>
                <Tag tone="red">Bengali · English · Hindi</Tag>
                <a
                  href="#contact"
                  data-scroll-to="contact"
                  className="group ml-auto inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-ink"
                >
                  Start a conversation
                  <ArrowUpRight className="h-4 w-4 text-gblue transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            {/* principles */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {about.principles.map((p, i) => (
                <div
                  key={p}
                  data-reveal
                  className="glass-soft flex items-start gap-3 rounded-2xl px-4 py-3.5 transition-colors duration-500 hover:border-gray-300"
                >
                  <span
                    className="mt-0.5 font-mono text-[10px] tracking-tight text-gray-400"
                    style={{ color: `rgb(${Object.values(TONE_RGB)[i % 4]})` }}
                  >
                    0{i + 1}
                  </span>
                  <p className="text-[0.9rem] leading-snug font-medium text-ink">{p}</p>
                </div>
              ))}
            </div>
          </div>

          {/* side facts */}
          <aside className="lg:col-span-5">
            <div data-reveal className="glass rounded-[26px] p-6">
              <Eyebrow tone="red">What teams call me for</Eyebrow>
              <ul className="mt-5 space-y-4">
                {[
                  ["Customer support", "400+ students · onboarding"],
                  ["Community management", "Discord · Web3 · events"],
                  ["Content & graphics", "X · Canva · banners"],
                  ["AI workflows", "ChatGPT · Gemini · Claude · Grok"],
                ].map(([h, s]) => (
                  <li key={h} className="group flex items-center gap-3">
                    <span className="h-2 w-2 shrink-0 rounded-[3px] rotate-45 bg-gyellow transition-transform duration-500 group-hover:rotate-[135deg]" />
                    <span className="text-[0.95rem] font-semibold text-ink">{h}</span>
                    <span className="ml-auto hidden text-[0.78rem] text-ink-soft sm:block">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div data-reveal className="glass spot mt-5 overflow-hidden rounded-[26px] p-6">
              <Eyebrow tone="green">Strengths in my own words</Eyebrow>
              <div className="mt-4 space-y-5">
                {testimonials.slice(0, 2).map((t) => (
                  <figure key={t.name} className="border-l-2 border-ggreen/40 pl-4">
                    <blockquote className="text-[0.92rem] leading-relaxed text-ink">“{t.quote}”</blockquote>
                    <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                      {t.name} — {t.role}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* achievements bento */}
        <div className="mt-16">
          <div data-reveal className="flex items-baseline gap-4">
            <h3 className="font-display text-[1.5rem] font-bold text-ink sm:text-[1.9rem]">Key highlights</h3>
            <span className="h-px flex-1 bg-gray-200" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">numbers that matter</span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-6">
            {about.achievements.map((a, i) => (
              <article
                key={a.title}
                data-reveal
                style={{ ["--tint" as string]: TONE_RGB[a.tone] }}
                className={`lift spot glass group ${SPAN[i]} relative overflow-hidden rounded-[26px] p-6`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-2xl text-white transition-transform duration-500 group-hover:-rotate-6"
                    style={{ background: `rgb(${TONE_RGB[a.tone]})`, boxShadow: `0 12px 26px -14px rgb(${TONE_RGB[a.tone]})` }}
                  >
                    <NamedIcon name={a.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-display text-[2.4rem] leading-none font-extrabold text-ink/85 sm:text-[3rem]">
                    {a.metric}
                  </span>
                </div>
                <h4 className="mt-5 font-display text-[1.15rem] font-bold text-ink">{a.title}</h4>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-soft">{a.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </SectionShell>
    </section>
  );
}
