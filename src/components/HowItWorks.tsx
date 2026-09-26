import { Download, MonitorDown, KeyRound, UserCheck, PartyPopper, type LucideIcon } from "lucide-react";

const STEPS: { title: string; copy: string; icon: LucideIcon }[] = [
  {
    title: "Download",
    copy: "Click the download button above to get the installer.",
    icon: Download,
  },
  {
    title: "Install",
    copy: "Run it. If a blue \"Windows protected your PC\" screen appears, click \"More info\", then \"Run anyway\".",
    icon: MonitorDown,
  },
  {
    title: "Get your key",
    copy: "Click Get key, fill in the short form, and pay $10 via M-Pesa.",
    icon: KeyRound,
  },
  {
    title: "Activate",
    copy: "Open the app, set a username and password, then enter the key you just bought.",
    icon: UserCheck,
  },
  {
    title: "You're set",
    copy: "Click OK and you're in. After the first run, your login stays on this PC — you're fully in control.",
    icon: PartyPopper,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-lg">
          <h2 className="font-display text-[28px] font-semibold tracking-tight text-text">Getting started</h2>
          <p className="mt-3 font-body text-[15px] leading-relaxed text-muted">
            Five short steps, about five minutes, done.
          </p>
        </div>

        <div className="number-line relative mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-5 sm:gap-x-4">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="relative z-10 flex flex-col items-start">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent bg-ink text-accent">
                  <Icon className="h-[19px] w-[19px]" strokeWidth={1.75} />
                </span>
                <span className="mt-3 font-mono text-[11px] text-muted">Step {i + 1}</span>
                <h3 className="mt-1 font-display text-[15.5px] font-semibold text-text">{s.title}</h3>
                <p className="mt-1.5 font-body text-[13px] leading-relaxed text-muted">{s.copy}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
