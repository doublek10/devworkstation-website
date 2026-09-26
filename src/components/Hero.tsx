import { ShieldCheck } from "lucide-react";
import DownloadButton from "./DownloadButton";
import GetKeyButton from "./GetKeyButton";
import ConsoleMock from "./ConsoleMock";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-line">
      <div className="absolute inset-0 bg-grid bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
      <div
        aria-hidden
        className="glow-blob pointer-events-none absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full bg-accent/20"
      />
      <div
        aria-hidden
        className="glow-blob pointer-events-none absolute -right-32 top-40 h-[380px] w-[380px] rounded-full bg-ok/10"
        style={{ animationDelay: "3s" }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-20 lg:grid-cols-[1fr_1fr] lg:items-center lg:py-28">
        <div className="min-w-0">
          <span className="boot-in inline-flex items-center gap-2 border border-line bg-raised px-3 py-1.5 font-mono text-[11.5px] text-muted">
            <ShieldCheck className="h-3.5 w-3.5 text-ok" />
            Offline-first · your data never leaves this PC
          </span>

          <h1
            className="boot-in mt-5 font-display text-[38px] font-semibold leading-[1.08] tracking-tight text-text sm:text-[46px]"
            style={{ animationDelay: "60ms" }}
          >
            Twelve tools. One process list. Nothing leaves your machine.
          </h1>
          <p
            className="boot-in mt-5 max-w-md font-body text-[16px] leading-relaxed text-muted"
            style={{ animationDelay: "140ms" }}
          >
            DevWorkstation bundles the tools you reach for during a normal
            week of building software — a CV builder, a PDF editor, a code
            editor, a database repair kit, a test runner — into one Windows
            app that runs offline and keeps every file, credential, and log
            on your own disk.
          </p>
          <div className="boot-in mt-8 flex flex-wrap items-center gap-4" style={{ animationDelay: "220ms" }}>
            <DownloadButton />
            <GetKeyButton />
            <a
              href="#modules"
              className="px-7 py-3.5 font-display text-[15px] text-text transition-colors hover:text-accent"
            >
              See what&apos;s inside
            </a>
          </div>
          <p className="boot-in mt-6 font-mono text-[12px] text-muted" style={{ animationDelay: "280ms" }}>
            Windows 10/11 · single installer · nothing extra to set up first
          </p>
        </div>
        <ConsoleMock />
      </div>
    </section>
  );
}
