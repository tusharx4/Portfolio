import type { ReactNode } from "react";
import {
  Atom,
  Braces,
  Clipboard,
  Compass,
  Database,
  Gauge,
  Headset,
  LayoutDashboard,
  Layers,
  Mail,
  MapPin,
  ShieldCheck,
  Sprout,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { SiFacebook, SiGithub, SiInstagram, SiWhatsapp, SiX } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import { TONE, TONE_RGB } from "@/lib/motion";
import { cn } from "@/utils/cn";

/* ─────────────── icons ─────────────── */
const NAMED = {
  gauge: Gauge,
  layers: Layers,
  shield: ShieldCheck,
  sprout: Sprout,
  code: Braces,
  atom: Atom,
  wrench: Wrench,
  compass: Compass,
  layout: LayoutDashboard,
  zap: Zap,
  database: Database,
  users: Users,
  headset: Headset,
  clipboard: Clipboard,
} as const;

export function NamedIcon({ name, className }: { name: string; className?: string }) {
  const Cmp = NAMED[name as keyof typeof NAMED] ?? Spark;
  return <Cmp className={className} strokeWidth={1.6} aria-hidden />;
}

function Spark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 3l1.9 5.4L19 10l-5.1 1.6L12 17l-1.9-5.4L5 10l5.1-1.6L12 3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const BRAND = {
  linkedin: FaLinkedinIn,
  whatsapp: SiWhatsapp,
  github: SiGithub,
  x: SiX,
  instagram: SiInstagram,
  facebook: SiFacebook,
  mail: Mail,
  pin: MapPin,
} as const;
export function BrandIcon({ name, className }: { name: string; className?: string }) {
  const Cmp = BRAND[name as keyof typeof BRAND] ?? Spark;
  return <Cmp className={className} aria-hidden />;
}

/* ─────────────── tone helpers ─────────────── */
export const toneColor = (t: string) => TONE[t] ?? TONE.blue;
export const toneRgb = (t: string) => TONE_RGB[t] ?? TONE_RGB.blue;

/* ─────────────── layout bits ─────────────── */
export function Eyebrow({ children, tone = "blue" }: { children: ReactNode; tone?: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
      <span
        className="h-2 w-2 rounded-[3px] rotate-45"
        style={{ background: toneColor(tone), boxShadow: `0 0 14px ${toneColor(tone)}` }}
      />
      {children}
    </span>
  );
}

export function SectionShell({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative mx-auto w-full max-w-[1200px] px-5 sm:px-8", className)}>
      {children}
    </section>
  );
}

export function SectionHeader({
  index,
  kicker,
  title,
  lead,
  tone = "blue",
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  lead?: string;
  tone?: string;
}) {
  return (
    <div className="max-w-3xl">
      <div data-reveal>
        <Eyebrow tone={tone}>{kicker}</Eyebrow>
      </div>
      <div data-reveal className="mt-4 flex items-start gap-4">
        <span
          aria-hidden
          className="mt-2 hidden h-10 w-[3px] rounded-full sm:block"
          style={{ background: `linear-gradient(${toneColor(tone)}, transparent)` }}
        />
        <h2 className="text-balance text-[2rem] leading-[1.05] font-bold text-ink sm:text-5xl lg:text-[3.4rem]">
          {title}
        </h2>
        <span className="ml-auto hidden font-mono text-xs text-gray-400 lg:block">{index}</span>
      </div>
      {lead && (
        <p data-reveal className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-ink-soft">
          {lead}
        </p>
      )}
    </div>
  );
}

export function Tag({ children, tone = "blue", solid }: { children: ReactNode; tone?: string; solid?: boolean }) {
  const c = toneColor(tone);
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em]",
        solid ? "text-white" : "text-ink-soft",
      )}
      style={
        solid
          ? { background: c, boxShadow: `0 6px 18px -8px ${c}` }
          : { background: `rgb(${toneRgb(tone)} / 0.09)`, border: `1px solid rgb(${toneRgb(tone)} / 0.25)` }
      }
    >
      {children}
    </span>
  );
}

export function PrimaryButton({
  children,
  href,
  onClick,
  className,
  tone = "blue",
  download,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  tone?: string;
  download?: boolean;
}) {
  const c = toneColor(tone);
  const inner = (
    <>
      <span className="sheen-bar" aria-hidden />
      <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
    </>
  );
  const cls = cn(
    "sheen group relative inline-flex items-center justify-center rounded-full px-6 py-3.5 text-[0.94rem] font-semibold text-white",
    "transition-[transform,box-shadow] duration-500 hover:-translate-y-0.5 active:translate-y-0",
    className,
  ) + "";
  const style = {
    background: `linear-gradient(135deg, ${c}, color-mix(in oklab, ${c} 68%, #0b1220))`,
    boxShadow: `0 16px 34px -18px ${c}, 0 2px 0 0 rgb(255 255 255 / 0.28) inset`,
  };

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        download={download}
        className={cls}
        style={style}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type="submit" onClick={onClick} className={cls} style={style}>
      {inner}
    </button>
  );
}

export function GhostButton({
  children,
  href,
  onClick,
  dataScrollTo,
  className,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  dataScrollTo?: string;
  className?: string;
}) {
  const cls = cn(
    "lift glass inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[0.94rem] font-semibold text-ink",
    "hover:border-gray-300",
    className,
  );
  if (href || dataScrollTo) {
    return (
      <a
        href={href ?? (dataScrollTo ? `#${dataScrollTo}` : undefined)}
        data-scroll-to={dataScrollTo}
        onClick={onClick}
        className={cls}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noreferrer noopener" : undefined}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
