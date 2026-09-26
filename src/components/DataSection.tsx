import { HardDrive, Lock, UserX, type LucideIcon } from "lucide-react";

const FACTS: { title: string; copy: string; icon: LucideIcon }[] = [
  {
    title: "Your project data",
    copy: "Stored in a SQLite file under your own AppData folder. It never leaves your disk unless you export it yourself.",
    icon: HardDrive,
  },
  {
    title: "Your credentials",
    copy: "Passwords, API keys, and server logins are handed to Windows Credential Manager. DevWorkstation itself never returns a stored secret to its own screen.",
    icon: Lock,
  },
  {
    title: "Your accounts",
    copy: "There is no DevWorkstation account, no login server, and nothing to sync. Sign-in is local to this one installation.",
    icon: UserX,
  },
];

export default function DataSection() {
  return (
    <section id="data" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-lg">
          <h2 className="font-display text-[28px] font-semibold tracking-tight text-text">Where your data actually lives</h2>
          <p className="mt-3 font-body text-[15px] leading-relaxed text-muted">
            Not a policy promise — this is what the app does, module by module.
          </p>
        </div>

        <div className="mt-10 space-y-px overflow-hidden border border-line bg-line">
          {FACTS.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="grid gap-3 bg-ink px-6 py-6 sm:grid-cols-[auto_200px_1fr] sm:items-center sm:gap-6">
                <span className="hidden h-9 w-9 items-center justify-center border border-line bg-raised text-ok sm:flex">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </span>
                <h3 className="font-display text-[14.5px] font-semibold text-text">{f.title}</h3>
                <p className="font-body text-[13.5px] leading-relaxed text-muted">{f.copy}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
