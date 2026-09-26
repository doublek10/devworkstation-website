import {
  FileText,
  FileStack,
  Code2,
  ScanSearch,
  FlaskConical,
  Database,
  Globe,
  ServerCog,
  TerminalSquare,
  FolderKanban,
  KeyRound,
  ListChecks,
  type LucideIcon,
} from "lucide-react";

const MODULES: { code: string; name: string; copy: string; icon: LucideIcon }[] = [
  { code: "§01", name: "CV builder", copy: "Write, style, and export a resume as a finished PDF — typeset locally, no template site required.", icon: FileText },
  { code: "§02", name: "PDF studio", copy: "Inspect, split, merge, rotate, and pull text out of PDFs without uploading them anywhere.", icon: FileStack },
  { code: "§03", name: "Code editor", copy: "A syntax-highlighted editor with a file tree and tabs. Hit Run and it executes right there.", icon: Code2 },
  { code: "§04", name: "Code analyzer", copy: "Point it at a folder and see the stack, routes, API calls, and import map in minutes.", icon: ScanSearch },
  { code: "§05", name: "Test lab", copy: "Detects how a project is tested and runs it in a contained process — no surprise install scripts.", icon: FlaskConical },
  { code: "§06", name: "Database lab", copy: "Inspect a SQLite file, get plain diagnoses, and back it up automatically before anything changes.", icon: Database },
  { code: "§07", name: "Website lab", copy: "Check a site's headers, cookies, redirects, and DNS from one place.", icon: Globe },
  { code: "§08", name: "Server center", copy: "Keep server profiles and credentials together, with reachability at a glance.", icon: ServerCog },
  { code: "§09", name: "Terminal", copy: "A built-in shell that remembers your working directory and history between sessions.", icon: TerminalSquare },
  { code: "§10", name: "Files", copy: "Browse, edit, zip, and search a project's files without leaving the app.", icon: FolderKanban },
  { code: "§11", name: "Vault", copy: "Credentials live in Windows Credential Manager — the app never stores them in plain text.", icon: KeyRound },
  { code: "§12", name: "Projects & logs", copy: "Every project registered once, every action logged and searchable afterward.", icon: ListChecks },
];

export default function Modules() {
  return (
    <section id="modules" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-lg">
          <h2 className="font-display text-[28px] font-semibold tracking-tight text-text">What&apos;s inside</h2>
          <p className="mt-3 font-body text-[15px] leading-relaxed text-muted">
            Every module below ships in the same install and reads from the
            same local database. Open the ones you need this week; the rest
            stay out of the way.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.code} className="card-lift relative border border-transparent bg-ink p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center border border-line bg-raised text-accent">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </span>
                  <p className="font-mono text-[11px] text-muted">{m.code}</p>
                </div>
                <h3 className="mt-4 font-display text-[16.5px] font-semibold text-text">{m.name}</h3>
                <p className="mt-2 font-body text-[13.5px] leading-relaxed text-muted">{m.copy}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
