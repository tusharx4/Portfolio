import { ArrowUpRight, ExternalLink, Star } from "lucide-react";
import { projects } from "@/data/cv";
import { SectionHeader, SectionShell, Tag } from "@/components/ui";
import { useSectionReveal, useSpotlight, TONE, TONE_RGB } from "@/lib/motion";



/** Faux product preview drawn with divs — no screenshots, no image payload. */
function Preview({ accent, label }: { accent: string; label: string }) {
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-gray-200/80 bg-white/70">
      <div className="flex items-center gap-1.5 border-b border-gray-200/70 bg-gray-50/80 px-3 py-2">
        {["#ea4335", "#fbbc05", "#34a853"].map((c) => (
          <span key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />
        ))}
        <span className="ml-2 truncate font-mono text-[9.5px] text-gray-400">{label}</span>
      </div>
      <div className="grid grid-cols-3 gap-3 p-3.5">
        <div className="col-span-1 space-y-2">
          {[64, 42, 52, 34, 48].map((w, i) => (
            <div
              key={i}
              className="h-2 rounded-full transition-all duration-700 group-hover:w-[85%]"
              style={{ width: `${w}%`, background: i === 1 ? TONE[accent] : "rgb(203 213 225 / .8)" }}
            />
          ))}
        </div>
        <div className="col-span-2 space-y-2">
          <div className="h-10 rounded-lg" style={{ background: `rgb(${TONE_RGB[accent]} / .18)` }} />
          <div className="flex h-16 items-end gap-1.5">
            {[38, 62, 48, 84, 58, 92, 70, 100].map((h, i) => (
              <span
                key={i}
                className="flex-1 origin-bottom rounded-t-[3px] transition-transform duration-700 group-hover:scale-y-100"
                style={{
                  height: `${h}%`,
                  transform: "scaleY(.72)",
                  background: `linear-gradient(${TONE[accent]}, rgb(${TONE_RGB[accent]} / .35))`,
                  transitionDelay: `${i * 45}ms`,
                }}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-5 rounded-md bg-gray-100" />
            ))}
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: `radial-gradient(120% 80% at 100% 0%, rgb(${TONE_RGB[accent]} / .16), transparent 60%)` }}
      />
    </div>
  );
}

export default function Projects() {
  const reveal = useSectionReveal<HTMLElement>(0.05);
  const spot = useSpotlight<HTMLElement>(2);

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      ref={(node) => {
        reveal.current = node;
        spot.current = node;
      }}
      className="relative py-24 sm:py-28"
    >
      <SectionShell>
        <SectionHeader
          index="04 / 06"
          kicker="Highlights & impact"
          tone="green"
          title={
            <>
              Work that left a <span className="text-ggreen">measurable mark</span>.
            </>
          }
          lead="An organic 2.2k+ audience, campaigns for global Web3 projects, 400+ students supported, and communities that run around the clock."
        />

        {/* featured */}
        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          {featured.map((p) => (
            <article
              key={p.name}
              data-reveal
              style={{ ["--tint" as string]: TONE_RGB[p.accent] }}
              className="lift spot glass group relative overflow-hidden rounded-[30px] p-6 sm:p-8 lg:col-span-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">{p.kind}</span>
                  <h3 className="mt-2 font-display text-[2rem] leading-none font-extrabold text-ink sm:text-[2.4rem]">
                    {p.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-gray-200/80 bg-white/70 px-2.5 py-1 font-mono text-[10px] text-ink-soft">
                    {p.year}
                  </span>
                  <span
                    className="grid h-9 w-9 place-items-center rounded-full text-white transition-transform duration-500 group-hover:rotate-12"
                    style={{ background: TONE[p.accent] }}
                  >
                    <Star className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                </div>
              </div>

              <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-ink-soft">{p.blurb}</p>
              <p className="mt-3 max-w-xl text-[0.88rem] leading-relaxed text-gray-500">{p.detail}</p>

              <div className="mt-6">
                <Preview accent={p.accent} label={`${p.name.toLowerCase()}.app / dashboard`} />
              </div>

              <dl className="mt-6 grid grid-cols-3 divide-x divide-gray-200/70 rounded-2xl border border-gray-200/60 bg-white/55">
                {p.metrics.map((m) => (
                  <div key={m.label} className="px-3 py-3 text-center">
                    <dt className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-soft">{m.label}</dt>
                    <dd className="mt-1 font-display text-[1.15rem] font-bold" style={{ color: TONE[p.accent] }}>
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                {p.tech.map((t) => (
                  <Tag key={t} tone={p.accent}>
                    {t}
                  </Tag>
                ))}
                <span className="ml-auto flex items-center gap-2">
                  <a
                    href="#contact"
                    data-scroll-to="contact"
                    className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-2 text-[0.78rem] font-semibold text-white transition-colors duration-300 hover:bg-gblue"
                  >
                    <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.2} /> Get in touch
                  </a>
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* the rest */}
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <article
              key={p.name}
              data-reveal
              style={{ ["--tint" as string]: TONE_RGB[p.accent] }}
              className="lift spot glass group relative flex flex-col overflow-hidden rounded-[26px] p-6"
            >
              <span
                aria-hidden
                className="absolute inset-x-6 -top-px h-px opacity-60"
                style={{ background: `linear-gradient(90deg, transparent, ${TONE[p.accent]}, transparent)` }}
              />
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-soft">{p.kind}</span>
                <span className="font-mono text-[10px] text-gray-400">{p.year}</span>
              </div>
              <h3 className="mt-3 font-display text-[1.45rem] leading-none font-bold text-ink">{p.name}</h3>
              <p className="mt-3 text-[0.88rem] leading-relaxed text-ink-soft">{p.blurb}</p>

              <ul className="mt-4 space-y-1.5">
                {p.metrics.map((m) => (
                  <li key={m.label} className="flex items-center gap-2 font-mono text-[10.5px] text-ink-soft">
                    <span className="h-1 w-1 rounded-full" style={{ background: TONE[p.accent] }} />
                    {m.label}
                    <span className="ml-auto font-semibold text-ink">{m.value}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.tech.slice(0, 4).map((t) => (
                  <Tag key={t} tone={p.accent}>
                    {t}
                  </Tag>
                ))}
              </div>

              <div className="mt-auto flex items-center gap-3 pt-5">
                <a
                  href={p.live}
                  className="group/l inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-ink"
                >
                  <span className="underline-grow">Learn more</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover/l:translate-x-0.5 group-hover/l:-translate-y-0.5" />
                </a>
              </div>
            </article>
          ))}
        </div>

      </SectionShell>
    </section>
  );
}
