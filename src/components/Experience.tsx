import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Briefcase, CalendarDays, MapPin, Plus } from "lucide-react";
import { experience } from "@/data/cv";
import { SectionHeader, SectionShell, Tag } from "@/components/ui";
import { useSectionReveal, useSpotlight, TONE, TONE_RGB } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const reveal = useSectionReveal<HTMLElement>(0.06);
  const spot = useSpotlight<HTMLElement>(0);
  const rail = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number>(0);

  useLayoutEffect(() => {
    const fill = rail.current;
    if (!fill) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: fill.closest("section")!,
            start: "top 60%",
            end: "bottom 75%",
            scrub: 0.5,
          },
        },
      );
      // ignite each timeline dot as its card enters
      experience.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: `[data-job="${i}"]`,
          start: "top 70%",
          onEnter: () =>
            gsap.fromTo(
              `[data-dot="${i}"]`,
              { scale: 0.4 },
              { scale: 1, duration: 0.7, ease: "back.out(2.4)" },
            ),
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={(node) => {
        reveal.current = node;
        spot.current = node;
      }}
      className="relative py-24 sm:py-28"
    >
      <SectionShell>
        <SectionHeader
          index="03 / 06"
          kicker="Work experience"
          tone="yellow"
          title={
            <>
              Three tracks, running <span className="text-gyellow">in parallel</span>.
            </>
          }
          lead="Customer support at Shikkha IT, community leadership across Discord, and content creation in the Web3 ecosystem. Click a card to expand the details."
        />

        <div className="relative mt-16">
          {/* rail — desktop: left of cards, mobile: edge */}
          <div className="pointer-events-none absolute top-2 bottom-2 left-[7px] w-[3px] rounded-full bg-gray-200/80 sm:left-[19px]">
            <div
              ref={rail}
              className="h-full w-full origin-top rounded-full"
              style={{
                background: `linear-gradient(${TONE.blue}, ${TONE.red}, ${TONE.yellow}, ${TONE.green})`,
                boxShadow: "0 0 22px rgba(66,133,244,.35)",
              }}
            />
          </div>

          <ol className="space-y-6">
            {experience.map((job, i) => {
              const isOpen = open === i;
              return (
                <li key={job.company} data-job={i} className="relative pl-8 sm:pl-14">
                  {/* dot */}
                  <span
                    data-dot={i}
                    aria-hidden
                    className="absolute top-8 left-0 grid h-[17px] w-[17px] place-items-center rounded-full border-[3px] bg-white sm:left-[11px]"
                    style={{ borderColor: TONE[job.tone], boxShadow: `0 0 0 5px rgb(${TONE_RGB[job.tone]} / .12)` }}
                  />

                  <article
                    data-reveal
                    style={{ ["--tint" as string]: TONE_RGB[job.tone] }}
                    className="lift spot glass group relative overflow-hidden rounded-[28px]"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(isOpen ? -1 : i);
                        window.setTimeout(() => ScrollTrigger.refresh(), 760);
                      }}
                      aria-expanded={isOpen}
                      aria-controls={`role-log-${i}`}
                      data-tilt="off"
                      className="w-full cursor-pointer px-6 py-6 text-left sm:px-8"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white"
                              style={{ background: TONE[job.tone] }}
                            >
                              <Briefcase className="h-3 w-3" strokeWidth={2.4} />
                              {job.type}
                            </span>
                            {job.current && (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-ggreen/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ggreen">
                                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-ggreen" />
                                current
                              </span>
                            )}
                          </div>
                          <h3 className="mt-3 font-display text-[1.5rem] leading-tight font-bold text-ink sm:text-[1.8rem]">
                            {job.role}
                          </h3>
                          <p className="mt-1.5 text-[1rem] font-semibold">
                            <span className="text-ink">{job.company}</span>
                            <span className="mx-2 text-gray-300">/</span>
                            <span className="inline-flex items-center gap-1 font-mono text-[0.78rem] font-normal text-ink-soft">
                              <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
                              {job.location}
                            </span>
                          </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-3">
                          <span className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200/80 bg-white/70 px-3 py-1.5 font-mono text-[11px] text-ink">
                            <CalendarDays className="h-3.5 w-3.5 text-gblue" strokeWidth={2} />
                            {job.period}
                          </span>
                          <span
                            className={`grid h-9 w-9 place-items-center rounded-full border border-gray-200/80 text-ink transition-all duration-500 ${
                              isOpen ? "rotate-45 bg-gblue text-white" : "bg-white/70 group-hover:border-gray-300"
                            }`}
                          >
                            <Plus className="h-4 w-4" strokeWidth={2.2} />
                          </span>
                        </div>
                      </div>

                      <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-ink-soft">{job.summary}</p>
                    </button>

                    {/* expandable detail */}
                    <div
                      id={`role-log-${i}`}
                      inert={!isOpen}
                      className="grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <div className="border-t border-gray-200/70 px-6 py-6 sm:px-8">
                          <ul className="space-y-3.5">
                            {job.bullets.map((b) => (
                              <li key={b} className="flex gap-3.5">
                                <span
                                  className="mt-[9px] h-1.5 w-1.5 shrink-0 rotate-45"
                                  style={{ background: TONE[job.tone] }}
                                />
                                <p className="text-[0.94rem] leading-relaxed text-ink">{b}</p>
                              </li>
                            ))}
                          </ul>

                          <div className="mt-6 flex flex-wrap items-center gap-2">
                            {job.stack.map((s) => (
                              <Tag key={s} tone={job.tone}>
                                {s}
                              </Tag>
                            ))}
                          </div>

                          <p className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gyellow/12 px-4 py-2.5 text-[0.85rem] font-medium text-ink ring-1 ring-gyellow/30 ring-inset">
                            <Award className="h-4 w-4 text-gyellow" strokeWidth={2.2} />
                            {job.highlight}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>

        <p data-reveal className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
          Currently at {experience[0].company} · click a card to expand the details
        </p>
      </SectionShell>
    </section>
  );
}
