import { ArrowUp, Download } from "lucide-react";
import Lenis from "lenis";
import { navLinks, profile, socials } from "@/data/cv";
import { BrandIcon } from "@/components/ui";

export default function Footer({ lenis }: { lenis: React.RefObject<Lenis | null> }) {
  const toTop = () => {
    if (lenis.current) lenis.current.scrollTo(0, { duration: 1.5 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-10 pb-10">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="glass relative overflow-hidden rounded-[32px] p-7 sm:p-10">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg,#4285f4,#ea4335,#fbbc05,#34a853)" }}
          />
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-display text-[2.2rem] leading-none font-extrabold tracking-tight text-ink sm:text-[3.2rem]">
                {profile.firstName} {profile.lastName}
                <span className="text-gblue">.</span>
              </p>
              <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-ink-soft">
                {profile.title} · {profile.location} — support, community and content, powered by modern AI tools
                and an audience built the organic way.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <a
                  href={profile.resumeUrl}
                  download="Tushar_Sheikh_CV.pdf"
                  className="lift inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[0.85rem] font-semibold text-white transition-colors hover:bg-gblue"
                >
                  <Download className="h-4 w-4" strokeWidth={2.2} /> Download CV
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="lift glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-[0.85rem] font-semibold text-ink"
                >
                  {profile.email}
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
              <nav>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">Sections</p>
                <ul className="mt-3 space-y-1.5">
                  {navLinks.map((l) => (
                    <li key={l.id}>
                      <a
                        href={`#${l.id}`}
                        data-scroll-to={l.id}
                        className="text-[0.9rem] font-medium text-ink-soft underline-grow transition-colors hover:text-ink"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">Elsewhere</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={s.label}
                        className="lift glass grid h-9 w-9 place-items-center rounded-xl text-ink transition-colors hover:text-gblue"
                      >
                        <BrandIcon name={s.icon} className="h-4 w-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">Stack of this page</p>
                <p className="mt-3 text-[0.85rem] leading-relaxed text-ink-soft">
                  React 19 · Vite · Tailwind v4 · GSAP ScrollTrigger · Lenis smooth scroll. Type: Bricolage Grotesque +
                  Plus Jakarta Sans.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4 border-t border-gray-200/70 pt-5">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-soft">
              © {new Date().getFullYear()} {profile.firstName} {profile.lastName} — all rights reserved
            </p>
            <span className="hidden items-center gap-1.5 sm:flex">
              {["#4285f4", "#ea4335", "#fbbc05", "#34a853"].map((c) => (
                <span key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />
              ))}
            </span>
            <button
              type="button"
              onClick={toTop}
              className="lift glass ml-auto inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[0.82rem] font-semibold text-ink transition-colors hover:text-gblue"
            >
              Back to top
              <ArrowUp className="h-3.5 w-3.5" strokeWidth={2.2} />
            </button>
          </div>
        </div>

        <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-gray-400">
          Portrait: cottonbro studio / Pexels · built as a single-page React app
        </p>
      </div>
    </footer>
  );
}
