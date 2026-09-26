/**
 * Fill this in once the DevWorkstation source is pushed to GitHub and the
 * "Build Windows installer" workflow has produced at least one release —
 * that's the only change needed to make the Download section live.
 *
 * "owner/repo", e.g. "derrick-kosh/devworkstation". Leave empty and the
 * Download button shows a clear "not published yet" state instead of a
 * broken link.
 */
export const GITHUB_REPO = "doublek10/developer-tool";

/**
 * Optional: a direct URL to a specific installer file, used only if
 * GITHUB_REPO is empty or the GitHub API lookup fails. Leave empty to just
 * show the "not published yet" state in that case.
 */
export const FALLBACK_DOWNLOAD_URL = "";

export const REPO_URL = GITHUB_REPO ? `https://github.com/${GITHUB_REPO}` : "";

/**
 * Base URL of the PHP backend on cPanel that powers the /activationkey page,
 * e.g. "https://yourdomain.com/cpanel-backend". No trailing slash.
 * process.php and status.php are called at `${ACTIVATION_API_BASE}/process.php`
 * etc.
 *
 * Set via the NEXT_PUBLIC_ACTIVATION_API_BASE env var (see .env.example) —
 * it must be NEXT_PUBLIC_-prefixed because the form calls it from the
 * browser. Set it in .env.local for local dev, and in Vercel's Project
 * Settings → Environment Variables for the deployed site. Leave it unset
 * and the form will show a "not configured yet" message instead of
 * failing silently.
 */
export const ACTIVATION_API_BASE = process.env.NEXT_PUBLIC_ACTIVATION_API_BASE ?? "";
