import { GraduationCap, Languages, Mic, ShieldCheck, Trophy } from "lucide-react";
import { certifications, education, languages, speaking } from "@/data/cv";
import { Eyebrow, SectionHeader, SectionShell, Tag } from "@/components/ui";
import { useSectionReveal, useSpotlight, TONE } from "@/lib/motion";

export default function Education() {
  const reveal = useSectionReveal<HTMLElement>(0.06);
  const spot = useSpotlight<HTMLElement>(0);

  return (
    <section
      id="education"
      ref={(node) => {
        reveal.current = node;
        spot.current = node;
      }}
      className="relative py-24 sm:py-28"
    >
      <SectionShell>
        <SectionHeader
          index="05 / 06"
          kicker="Education & certifications"
          tone="blue"
          title={
            <>
              Academics, plus an <span className="text-gblue">AI toolbelt</span> in progress.
            </>
          }
          lead="A strong academic record — including a perfect SSC GPA — alongside an ongoing government course on Artificial Intelligence tools."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {/* degrees */}
          <div className="space-y-5 lg:col-span-7">
            {education.map((e, i) => (
              <article
                key={e.degree}
                data-reveal
                className="lift spot glass group relative overflow-hidden rounded-[28px] p-6 sm:p-8"
                style={{ ["--tint" as string]: i === 0 ? "66 133 244" : "52 168 83" }}
              >
                <div className="flex items-start gap-5">
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white transition-transform duration-500 group-hover:-translate-y-1"
                    style={{ background: i === 0 ? TONE.blue : TONE.green }}
                  >
                    <GraduationCap className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-soft">
                        {e.period}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-gray-300" />
                      <span
                        className="font-mono text-[10.5px] uppercase tracking-[0.16em]"
                        style={{ color: i === 0 ? TONE.blue : TONE.green }}
                      >
                        {e.score}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-[1.3rem] leading-tight font-bold text-ink sm:text-[1.5rem]">
                      {e.degree}
                    </h3>
                    <p className="mt-1 text-[0.95rem] font-semibold text-ink-soft">{e.school}</p>
                    <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-soft">{e.detail}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {e.tags.map((t) => (
                        <Tag key={t} tone={i === 0 ? "blue" : "green"}>
                          {t}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {/* speaking */}
            <div data-reveal className="glass spot relative overflow-hidden rounded-[28px] p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <Mic className="h-4 w-4 text-gred" strokeWidth={2} />
                <Eyebrow tone="red">Strengths</Eyebrow>
              </div>
              <ul className="mt-5 divide-y divide-gray-200/70">
                {speaking.map((s) => (
                  <li key={s.title} className="group flex items-baseline gap-4 py-3.5">
                    <span className="font-mono text-[11px] text-gray-400">{s.year}</span>
                    <span className="text-[0.95rem] font-semibold text-ink transition-colors duration-300 group-hover:text-gred">
                      {s.title}
                    </span>
                    <span className="ml-auto hidden text-[0.8rem] text-ink-soft sm:block">{s.venue}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* certifications */}
          <div className="space-y-5 lg:col-span-5">
            <div data-reveal className="glass rounded-[28px] p-6 sm:p-7">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-gblue" strokeWidth={2} />
                <Eyebrow tone="blue">Proficiencies</Eyebrow>
              </div>

              <ol className="mt-5 space-y-3">
                {certifications.map((c, i) => (
                  <li
                    key={c.name}
                    className="glass-inset group relative overflow-hidden rounded-2xl px-4 py-3.5 transition-transform duration-500 hover:translate-x-1"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 transition-transform duration-500 group-hover:scale-y-100"
                      style={{ background: Object.values(TONE)[i % 4] }}
                    />
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[0.92rem] leading-snug font-semibold text-ink">{c.name}</p>
                      <span className="shrink-0 rounded-lg bg-ggreen/12 px-2 py-0.5 font-mono text-[10px] text-ggreen">
                        {c.year}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-soft">
                      {c.issuer} · <span className="normal-case">{c.id}</span>
                    </p>
                  </li>
                ))}
              </ol>

              <p className="mt-5 flex items-center gap-2 rounded-2xl bg-gyellow/12 px-4 py-3 text-[0.82rem] text-ink ring-1 ring-gyellow/30 ring-inset">
                <Trophy className="h-4 w-4 shrink-0 text-gyellow" strokeWidth={2} />
                SSC GPA 5.00 (perfect) · HSC GPA 4.75 · Rajshahi Education Board
              </p>
            </div>

            <div data-reveal className="glass rounded-[28px] p-6 sm:p-7">
              <div className="flex items-center gap-2">
                <Languages className="h-4 w-4 text-ggreen" strokeWidth={2} />
                <Eyebrow tone="green">Languages</Eyebrow>
              </div>
              <ul className="mt-4 grid grid-cols-2 gap-2">
                {languages.map((l) => (
                  <li
                    key={l.name}
                    className="rounded-2xl border border-gray-200/70 bg-white/60 px-3.5 py-3 transition-colors hover:border-gray-300"
                  >
                    <p className="text-[0.92rem] font-semibold text-ink">{l.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">{l.level}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SectionShell>
    </section>
  );
}
