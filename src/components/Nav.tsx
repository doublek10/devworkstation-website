import { TerminalSquare } from "lucide-react";
import DownloadButton from "./DownloadButton";
import GetKeyButton from "./GetKeyButton";

const LINKS = [
  { href: "#modules", label: "What's inside" },
  { href: "#how-it-works", label: "Getting started" },
  { href: "#data", label: "Your data" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-8 px-6 py-4">
        <a href="#top" className="flex items-center gap-2 font-display text-[15px] font-semibold tracking-tight text-text">
          <TerminalSquare className="h-[18px] w-[18px] text-accent" />
          DevWorkstation
        </a>
        <nav className="hidden gap-6 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="font-body text-[13.5px] text-muted transition-colors hover:text-text">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <GetKeyButton variant="nav" />
          <DownloadButton variant="nav" />
        </div>
      </div>
    </header>
  );
}
