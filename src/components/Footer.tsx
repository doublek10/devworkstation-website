import { TerminalSquare } from "lucide-react";

const LINKS = [
  { href: "#modules", label: "What's inside" },
  { href: "#how-it-works", label: "Getting started" },
  { href: "#data", label: "Your data" },
  { href: "/activationkey", label: "Get key" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:justify-between">
        <div className="max-w-xs">
          <a href="#top" className="flex items-center gap-2 font-display text-[15px] font-semibold tracking-tight text-text">
            <TerminalSquare className="h-[18px] w-[18px] text-accent" />
            DevWorkstation
          </a>
          <p className="mt-3 font-body text-[13px] leading-relaxed text-muted">
            One console for the whole build — offline, local, and entirely
            under your control.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="font-body text-[13px] text-muted transition-colors hover:text-text">
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-line pt-6">
        <p className="font-mono text-[11.5px] text-muted">© {year} DevWorkstation. All rights reserved by Wonder Wallet.</p>
      </div>
    </footer>
  );
}
