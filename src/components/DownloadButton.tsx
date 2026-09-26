"use client";

import { Download, Loader2 } from "lucide-react";
import { useLatestRelease } from "@/lib/useLatestRelease";
import { REPO_URL } from "@/lib/config";

export default function DownloadButton({ variant = "primary" }: { variant?: "primary" | "nav" }) {
  const { status, release } = useLatestRelease();

  const base =
    variant === "nav"
      ? "px-4 py-2 font-mono text-[12.5px]"
      : "px-7 py-3.5 font-display text-[15px]";

  if (status === "loading") {
    return (
      <span className={`${base} inline-flex items-center gap-2 border border-line text-muted`}>
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
        Checking latest release…
      </span>
    );
  }

  if (status === "ready" && release) {
    return (
      <a
        href={release.url}
        className={`${base} inline-flex items-center gap-2 border border-accent bg-accent text-ink shadow-glow transition-all hover:-translate-y-0.5 hover:bg-transparent hover:text-accent`}
      >
        <Download className="h-4 w-4" strokeWidth={2} />
        Download for Windows
        {release.version && <span className="font-mono text-[11px] opacity-80">{release.version}</span>}
        {release.sizeMb && <span className="font-mono text-[11px] opacity-80">{release.sizeMb} MB</span>}
      </a>
    );
  }

  return (
    <div className={variant === "nav" ? "" : "space-y-2"}>
      <span className={`${base} inline-block border border-line text-muted`}>
        Windows installer not published yet
      </span>
      {variant !== "nav" && REPO_URL && (
        <p className="font-mono text-[11.5px] text-muted">
          Building —{" "}
          <a href={REPO_URL} className="underline decoration-line underline-offset-2 hover:text-text">
            follow progress on GitHub
          </a>
        </p>
      )}
    </div>
  );
}
