# DevWorkstation website

A marketing/landing site for DevWorkstation — explains what it does and
lets people download the Windows installer. Next.js 14, TypeScript,
Tailwind, static export (no server required to host it).

## Run it locally

```bash
npm install
npm run dev
```

Opens at http://localhost:3000.

## The one thing to configure: the download button

The Download button doesn't link to a hardcoded file — it asks the GitHub
API for your repo's **latest release** and finds the `.exe` (or `.zip`)
asset in it automatically, then shows the real version number and file
size. Until you set this, it correctly shows "Windows installer not
published yet" instead of a dead link.

Open `src/lib/config.ts` and set:

```ts
export const GITHUB_REPO = "your-username/devworkstation";
```

That's it. Once you push the DevWorkstation source to that repo and its
`.github/workflows/build-windows.yml` produces a GitHub Release with an
`.exe` attached (the workflow from the desktop app project already does
this on every tag push — see that project's README), the button goes live
with no further changes.

If you'd rather point at a specific file instead of "whatever the latest
release is" (e.g. you're hosting the installer somewhere other than GitHub
Releases), leave `GITHUB_REPO` empty and set `FALLBACK_DOWNLOAD_URL` in the
same file to a direct link instead.

## Build

```bash
npm run build
```

This produces a fully static site in `out/` — no Node server needed to
serve it. Every page is prerendered HTML/CSS/JS; the only thing that
happens at runtime is the download button's one API call to GitHub.

## Deploying

**Easiest: Vercel.** Push this to a GitHub repo, go to vercel.com, import
the repo, accept the defaults. It builds and deploys on every push, gives
you a free `*.vercel.app` URL, and you can attach a custom domain later.
No configuration needed beyond what's already in this repo.

**Any static host instead** (Netlify, Cloudflare Pages, GitHub Pages, S3 +
CloudFront, your own nginx box): run `npm run build`, then upload the
contents of `out/` as-is. It's plain static files.

## Project structure

```
src/
  app/
    layout.tsx       — root layout, fonts, metadata
    page.tsx          — the landing page, composes all sections
    globals.css        — design tokens, base styles
  components/
    Nav.tsx             — header
    Hero.tsx            — headline + the console mock
    ConsoleMock.tsx     — the static illustration of the app's own UI
    Modules.tsx         — the 12-module feature grid
    HowItWorks.tsx      — the 3-step getting-started sequence
    DataSection.tsx     — "where your data actually lives"
    DownloadSection.tsx — bottom download CTA
    DownloadButton.tsx  — the button itself (used in Nav and DownloadSection)
    Footer.tsx
  lib/
    config.ts            — GITHUB_REPO / FALLBACK_DOWNLOAD_URL (edit this)
    useLatestRelease.ts  — the GitHub Releases API lookup
```

## Editing the content

The module list, the getting-started steps, and the data-trust facts are
each a plain array at the top of their component file (`MODULES` in
`Modules.tsx`, `STEPS` in `HowItWorks.tsx`, `FACTS` in `DataSection.tsx`).
Edit those arrays directly — no CMS, no data file, just the array in the
component.

## Design notes

The palette and type system deliberately match DevWorkstation's own
in-app design (dark surfaces, hairline borders, amber accent reserved for
the one primary action, monospace for data/status readouts) rather than a
generic marketing template — this is the same product's identity, not a
separate brand. The hero's "console" isn't a screenshot; it's a small
static recreation of the app's own dashboard layout, built with the same
components/tokens as the rest of the page.
