import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { navLinks, profile } from "@/data/cv";
import { cn } from "@/utils/cn";

const ACCENTS = ["#4285f4", "#ea4335", "#fbbc05", "#34a853"];

export default function Nav() {
  const [progress, setProgress] = useState(0);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("about");

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      setSolid(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers = navLinks.map((l) => {
      const el = document.getElementById(l.id);
      if (!el) return null;
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && setActive(l.id)),
        { rootMargin: "-45% 0px -50% 0px" },
      );
      io.observe(el);
      return io;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* scroll progress */}
      <div className="fixed inset-x-0 top-0 z-[70] h-[3px] bg-transparent" aria-hidden>
        <div
          className="h-full origin-left transition-[width] duration-150"
          style={{
            width: `${progress * 100}%`,
            background: `linear-gradient(90deg, ${ACCENTS.join(", ")})`,
            boxShadow: "0 0 16px rgba(66,133,244,.5)",
          }}
        />
      </div>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[60] transition-all duration-500",
          solid ? "py-2 sm:py-3" : "py-4 sm:py-6",
        )}
      >
        <nav
          className={cn(
            "mx-auto flex max-w-[1200px] items-center gap-4 px-5 transition-all duration-500 sm:px-8",
          )}
        >
          <a
            href="#top"
            data-scroll-to="top"
            className={cn(
              "lift glass group flex items-center gap-3 rounded-2xl py-2 pr-4 pl-2",
              !solid && "border-transparent bg-transparent shadow-none backdrop-blur-0",
            )}
          >
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-ink text-[13px] font-bold text-white">
              <span className="relative z-10 font-display">TS</span>
              <span className="absolute inset-0 grid grid-cols-2 opacity-80 mix-blend-screen">
                {ACCENTS.map((c) => (
                  <span key={c} style={{ background: c }} className="transition-transform duration-500 group-hover:translate-y-[-100%]" />
                ))}
              </span>
            </span>
            <span className="hidden text-left leading-tight sm:block">
              <span className="block font-display text-[0.95rem] font-bold text-ink">
                {profile.firstName} {profile.lastName}
              </span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                {profile.title}
              </span>
            </span>
          </a>

          <ul className="glass mx-auto hidden items-center gap-1 rounded-full p-1.5 lg:flex">
            {navLinks.map((l, i) => {
              const isActive = active === l.id;
              return (
                <li key={l.id} className="relative">
                  <a
                    href={`#${l.id}`}
                    data-scroll-to={l.id}
                    className={cn(
                      "relative block rounded-full px-3.5 py-2 text-[0.83rem] font-semibold transition-colors duration-300",
                      isActive ? "text-white" : "text-ink-soft hover:text-ink",
                    )}
                  >
                    {isActive && (
                      <span
                        className="absolute inset-0 -z-10 rounded-full"
                        style={{
                          background: ACCENTS[i % ACCENTS.length],
                          boxShadow: `0 10px 24px -12px ${ACCENTS[i % ACCENTS.length]}`,
                        }}
                      />
                    )}
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href={profile.resumeUrl}
            download="Tushar_Sheikh_CV.pdf"
            className="lift hidden rounded-full bg-ink px-5 py-2.5 text-[0.83rem] font-semibold text-white transition-colors hover:bg-gblue sm:inline-flex sm:items-center sm:gap-2"
          >
            <Download className="h-4 w-4" strokeWidth={2} />
            Download CV
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="lift glass ml-auto grid h-11 w-11 place-items-center rounded-2xl lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      {/* mobile sheet */}
      <div
        className={cn(
          "fixed inset-0 z-[55] transition-all duration-500 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-white/40 backdrop-blur-md"
        />
        <div
          className={cn(
            "glass absolute inset-x-4 top-24 rounded-[28px] p-5 transition-transform duration-500",
            open ? "translate-y-0" : "-translate-y-6",
          )}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">Navigate</p>
          <ul className="mt-3 grid gap-1.5">
            {navLinks.map((l, i) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  data-scroll-to={l.id}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-2xl px-3 py-3 text-[1.05rem] font-semibold text-ink transition-colors hover:bg-white/70"
                >
                  <span className="h-2 w-2 rounded-full" style={{ background: ACCENTS[i % ACCENTS.length] }} />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex gap-2">
            <a
              href={profile.resumeUrl}
              download="Tushar_Sheikh_CV.pdf"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-2xl bg-gblue px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Download CV
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="glass-soft flex-1 rounded-2xl px-4 py-3 text-center text-sm font-semibold text-ink"
            >
              Email me
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
