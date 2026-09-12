import { useState } from "react";
import { Check, Clock, Copy, Heart, Loader, Mail, MapPin, Phone, Send } from "lucide-react";
import { profile, services, socials } from "@/data/cv";
import { BrandIcon, NamedIcon, SectionHeader, SectionShell, PrimaryButton, Tag } from "@/components/ui";
import { useSectionReveal, useSpotlight, TONE, TONE_RGB } from "@/lib/motion";

type Status = "idle" | "sending" | "sent" | "error";

const SUBJECTS = ["Job opportunity", "Customer support", "General inquiry", "Just saying hi"];

export default function Contact() {
  const reveal = useSectionReveal<HTMLElement>(0.05);
  const spot = useSpotlight<HTMLElement>(2);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [subject, setSubject] = useState(SUBJECTS[1]);
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const emailOk = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(form.email.trim());
  const valid = form.name.trim().length > 1 && emailOk && form.message.trim().length > 11;

  const copy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      /* clipboard blocked — still show feedback */
    }
    setCopied(label);
    window.setTimeout(() => setCopied((c) => (c === label ? null : c)), 1800);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      // FormSubmit relays the message straight to the inbox — no mail client needed.
      const res = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `[${subject}] Portfolio message from ${form.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error("relay failed");
      setStatus("sent");
    } catch {
      // Fallback: open the visitor's mail client with everything pre-filled.
      window.open(
        `mailto:${profile.email}?subject=${encodeURIComponent(`[${subject}] hi ${profile.firstName}`)}&body=${encodeURIComponent(
          `${form.message}\n\n— ${form.name} (${form.email})`,
        )}`,
        "_self",
      );
      setStatus("sent");
    }
  };

  const rows = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail, tone: "blue" },
    { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}`, icon: Phone, tone: "red" },
    { label: "Location", value: profile.location, href: null, icon: MapPin, tone: "green" },
  ] as const;

  return (
    <section
      id="contact"
      ref={(node) => {
        reveal.current = node;
        spot.current = node;
      }}
      className="relative py-24 sm:py-28"
    >
      <SectionShell>
        <SectionHeader
          index="06 / 06"
          kicker="Contact"
          tone="green"
          title={
            <>
              Let's <span className="text-ggreen">work together</span>.
            </>
          }
          lead="Reach out by email, phone or DM — support roles, community management, content work or AI workflows. References available upon request."
        />

        <div className="glass spot mt-14 overflow-hidden rounded-[34px] p-2 sm:p-3">
          <div className="grid gap-3 lg:grid-cols-12">
            {/* left: details */}
            <div data-reveal className="glass-soft rounded-[28px] p-6 sm:p-8 lg:col-span-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">Direct lines</p>

              <ul className="mt-5 space-y-2.5">
                {rows.map((r) => (
                  <li
                    key={r.label}
                    className="group flex items-center gap-3 rounded-2xl border border-gray-200/60 bg-white/60 px-3.5 py-3 transition-all duration-500 hover:-translate-y-0.5 hover:border-gray-300"
                  >
                    <span
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white"
                      style={{ background: TONE[r.tone], boxShadow: `0 12px 24px -16px ${TONE[r.tone]}` }}
                    >
                      <r.icon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-soft">
                        {r.label}
                      </span>
                      {r.href ? (
                        <a
                          href={r.href}
                          className="block truncate text-[0.95rem] font-semibold text-ink underline-grow"
                        >
                          {r.value}
                        </a>
                      ) : (
                        <span className="block truncate text-[0.95rem] font-semibold text-ink">{r.value}</span>
                      )}
                    </span>
                    <button
                      type="button"
                      onClick={() => copy(r.label, r.value)}
                      aria-label={`Copy ${r.label.toLowerCase()}`}
                      className="ml-auto grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-gray-200/80 bg-white/70 text-ink-soft transition-colors hover:border-gray-300 hover:text-ink"
                    >
                      {copied === r.label ? (
                        <Check className="h-3.5 w-3.5 text-ggreen" strokeWidth={2.6} />
                      ) : (
                        <Copy className="h-3.5 w-3.5" strokeWidth={1.9} />
                      )}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center gap-2 rounded-2xl bg-ggreen/10 px-4 py-3 text-[0.85rem] text-ink ring-1 ring-ggreen/25 ring-inset">
                <Clock className="h-4 w-4 shrink-0 text-ggreen" strokeWidth={2} />
                <span className="font-mono text-ink-soft">
                  {status === "sent" ? "message queued — talk soon" : "references available upon request"}
                </span>
              </div>

              <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">Elsewhere</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex items-center gap-2.5 rounded-2xl border border-gray-200/60 bg-white/55 px-3.5 py-3 transition-all duration-500 hover:-translate-y-0.5 hover:border-gblue/40"
                    >
                      <BrandIcon name={s.icon} className="h-4 w-4 text-ink transition-colors group-hover:text-gblue" />
                      <span className="min-w-0">
                        <span className="block text-[0.86rem] font-semibold text-ink">{s.label}</span>
                        <span className="block truncate font-mono text-[10px] text-ink-soft">{s.handle}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-gray-200/70 pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">How I can help</p>
                <ul className="mt-3 grid gap-2">
                  {services.map((sv) => (
                    <li key={sv.title} className="group flex items-start gap-3">
                      <span
                        className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg transition-transform duration-500 group-hover:scale-110"
                        style={{ background: `rgb(${TONE_RGB[sv.tone]} / .14)`, color: TONE[sv.tone] }}
                      >
                        <NamedIcon name={sv.icon} className="h-3.5 w-3.5" />
                      </span>
                      <span>
                        <span className="block text-[0.88rem] font-semibold text-ink">{sv.title}</span>
                        <span className="block text-[0.8rem] leading-snug text-ink-soft">{sv.copy}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* right: form */}
            <div data-reveal className="relative rounded-[28px] bg-white/70 p-6 sm:p-8 lg:col-span-7">
              {status === "sent" ? (
                <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
                  <span className="pulse-dot grid h-16 w-16 place-items-center rounded-full bg-ggreen text-white">
                    <Check className="h-8 w-8" strokeWidth={2.4} />
                  </span>
                  <h3 className="mt-6 font-display text-[1.8rem] font-bold text-ink">Message sent!</h3>
                  <p className="mt-2 max-w-sm text-[0.95rem] text-ink-soft">
                    Your message is on its way to my inbox — I'll get back to you soon. You can also reach me
                    directly at{" "}
                    <a href={`mailto:${profile.email}`} className="font-semibold text-gblue underline-grow">
                      {profile.email}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setForm({ name: "", email: "", message: "" });
                      setTouched(false);
                    }}
                    className="mt-7 rounded-full border border-gray-200/80 bg-white/80 px-5 py-2.5 text-[0.85rem] font-semibold text-ink transition-colors hover:border-gray-300"
                  >
                    Write another
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-[1.45rem] font-bold text-ink">Send a message</h3>
                    <Tag tone="green">
                      <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-ggreen align-middle" />
                      open for work
                    </Tag>
                  </div>

                  <fieldset className="mt-5">
                    <legend className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                      What is this about
                    </legend>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {SUBJECTS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSubject(s)}
                          className={`rounded-full px-3.5 py-2 text-[0.8rem] font-semibold transition-all duration-300 ${
                            subject === s
                              ? "bg-ink text-white shadow-lg shadow-gray-400/40"
                              : "border border-gray-200/70 bg-white/70 text-ink-soft hover:border-gray-300 hover:text-ink"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {[
                      { k: "name" as const, label: "Your name", type: "text", ph: "Your full name" },
                      { k: "email" as const, label: "Email", type: "email", ph: "you@company.com" },
                    ].map((f) => {
                      const bad = touched && (f.k === "email" ? !emailOk : form[f.k].trim().length < 2);
                      return (
                        <label key={f.k} className="block">
                          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                            {f.label}
                          </span>
                          <input
                            type={f.type}
                            value={form[f.k]}
                            placeholder={f.ph}
                            onChange={(e) => setForm((p) => ({ ...p, [f.k]: e.target.value }))}
                            className={`mt-2 w-full rounded-2xl border bg-white/80 px-4 py-3 text-[0.95rem] text-ink outline-none transition-all duration-300 placeholder:text-gray-400 focus:bg-white ${
                              bad ? "border-gred/60 focus:ring-2 focus:ring-gred/25" : "border-gray-200/80 focus:border-gblue/60 focus:ring-2 focus:ring-gblue/20"
                            }`}
                          />
                          {bad && <span className="mt-1.5 block text-[0.75rem] text-gred">Please add a valid {f.label.toLowerCase()}.</span>}
                        </label>
                      );
                    })}
                  </div>

                  <label className="mt-4 block">
                    <span className="flex items-baseline justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                        Your message
                      </span>
                      <span
                        className={`font-mono text-[10px] ${
                          form.message.trim().length > 11 ? "text-ggreen" : "text-gray-400"
                        }`}
                      >
                        {form.message.trim().length}/600
                      </span>
                    </span>
                    <textarea
                      rows={6}
                      maxLength={600}
                      value={form.message}
                      placeholder="Tell me about the role or how I can help your customers…"
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      className={`mt-2 w-full resize-none rounded-2xl border bg-white/80 px-4 py-3 text-[0.95rem] leading-relaxed text-ink outline-none transition-all duration-300 placeholder:text-gray-400 focus:bg-white ${
                        touched && form.message.trim().length < 12
                          ? "border-gred/60 focus:ring-2 focus:ring-gred/25"
                          : "border-gray-200/80 focus:border-gblue/60 focus:ring-2 focus:ring-gblue/20"
                      }`}
                    />
                  </label>

                  <div className="mt-5 flex flex-wrap items-center gap-4">
                    <PrimaryButton tone="blue" className="min-w-[190px]">
                      {status === "sending" ? (
                        <>
                          <Loader className="h-4 w-4 animate-spin" strokeWidth={2.2} /> Sending…
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" strokeWidth={2.2} /> Send message
                        </>
                      )}
                    </PrimaryButton>
                    <p className="text-[0.8rem] text-ink-soft">
                      Or just{" "}
                      <a href={`mailto:${profile.email}`} className="font-semibold text-ink underline-grow">
                        email me directly
                      </a>
                      .
                    </p>
                  </div>

                  {status === "error" && !valid && (
                    <p className="mt-4 rounded-2xl bg-gred/10 px-4 py-3 text-[0.82rem] text-gred ring-1 ring-gred/20 ring-inset">
                      Almost there — a name, a working email and a sentence or two are all I need.
                    </p>
                  )}
                </form>
              )}

              <Heart
                aria-hidden
                className="pointer-events-none absolute -right-6 -bottom-6 h-32 w-32 fill-gred/[0.06] text-gred/10"
                strokeWidth={1}
              />
            </div>
          </div>
        </div>
      </SectionShell>
    </section>
  );
}
