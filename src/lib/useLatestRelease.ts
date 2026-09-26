"use client";

import { useEffect, useState } from "react";
import { FALLBACK_DOWNLOAD_URL, GITHUB_REPO } from "./config";

export interface ReleaseInfo {
  version: string;
  url: string;
  sizeMb: number | null;
  publishedAt: string | null;
}

type Status = "loading" | "ready" | "unpublished" | "error";

export function useLatestRelease() {
  const [status, setStatus] = useState<Status>(GITHUB_REPO ? "loading" : "unpublished");
  const [release, setRelease] = useState<ReleaseInfo | null>(null);

  useEffect(() => {
    if (!GITHUB_REPO) {
      if (FALLBACK_DOWNLOAD_URL) {
        setRelease({ version: "", url: FALLBACK_DOWNLOAD_URL, sizeMb: null, publishedAt: null });
        setStatus("ready");
      }
      return;
    }

    let cancelled = false;
    fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`, {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((res) => {
        if (res.status === 404) throw new Error("no-release");
        if (!res.ok) throw new Error(`github-${res.status}`);
        return res.json();
      })
      .then((data: { tag_name: string; published_at: string; assets: { name: string; browser_download_url: string; size: number }[] }) => {
        if (cancelled) return;
        const exe = data.assets?.find((a) => a.name.toLowerCase().endsWith(".exe"))
          ?? data.assets?.find((a) => a.name.toLowerCase().endsWith(".zip"));
        if (!exe) {
          if (FALLBACK_DOWNLOAD_URL) {
            setRelease({ version: data.tag_name, url: FALLBACK_DOWNLOAD_URL, sizeMb: null, publishedAt: data.published_at });
            setStatus("ready");
          } else {
            setStatus("unpublished");
          }
          return;
        }
        setRelease({
          version: data.tag_name,
          url: exe.browser_download_url,
          sizeMb: Math.round((exe.size / (1024 * 1024)) * 10) / 10,
          publishedAt: data.published_at,
        });
        setStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        if (FALLBACK_DOWNLOAD_URL) {
          setRelease({ version: "", url: FALLBACK_DOWNLOAD_URL, sizeMb: null, publishedAt: null });
          setStatus("ready");
        } else {
          setStatus("unpublished");
        }
      });

    return () => { cancelled = true; };
  }, []);

  return { status, release };
}
