const RAIL = [
  { label: "Dashboard", active: true },
  { label: "CV builder" },
  { label: "Code editor" },
  { label: "Code analyzer" },
  { label: "Database lab" },
  { label: "Test lab" },
  { label: "Servers" },
  { label: "Vault" },
];

const READOUTS = [
  { label: "CPU", value: "18%" },
  { label: "Memory", value: "2.4 GB" },
  { label: "Projects", value: "6" },
];

const LOG_LINES = [
  "12:04:02  CODEANALYZER  scan finished — 214 files, 3 findings",
  "12:03:41  TESTLAB       npm test passed — 4.2s",
  "12:02:58  VAULT         reference api:stripe-live read",
];

export default function ConsoleMock() {
  return (
    <div
      aria-hidden
      className="boot-in w-full min-w-0 rounded-none border border-line bg-surface shadow-card"
    >
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="ml-2 font-mono text-[11px] text-muted">DevWorkstation</span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-muted">
          <span className="status-dot h-1.5 w-1.5 rounded-full bg-accent" />
          runs locally
        </span>
      </div>

      <div className="flex h-[300px] sm:h-[340px]">
        {/* nav rail */}
        <div className="hidden w-[168px] shrink-0 border-r border-line py-2 sm:block">
          {RAIL.map((item) => (
            <div
              key={item.label}
              className={`px-4 py-2 font-mono text-[11.5px] ${
                item.active ? "border-l-2 border-accent bg-raised text-text" : "border-l-2 border-transparent text-muted"
              }`}
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* main pane */}
        <div className="flex-1 overflow-hidden p-4">
          <div className="grid grid-cols-3 gap-3">
            {READOUTS.map((r) => (
              <div key={r.label} className="border border-line px-3 py-2.5">
                <p className="font-mono text-[10px] uppercase text-muted">{r.label}</p>
                <p className="mt-1 font-display text-lg text-text">{r.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 border border-line">
            <p className="border-b border-line px-3 py-2 font-mono text-[10px] uppercase text-muted">
              Activity
            </p>
            <div className="px-3 py-2.5">
              {LOG_LINES.map((line) => (
                <p key={line} className="truncate font-mono text-[11px] leading-6 text-muted">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
