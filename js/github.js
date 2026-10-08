/**
 * SONI.CODER — GitHub Release Helper
 * -----------------------------------
 * Uses the public, unauthenticated GitHub REST API to look up the
 * latest release for a project's repo. No token is ever used here —
 * only public endpoints, so this only works for public repositories.
 *
 * Every call is wrapped so a network error or a rate limit (403/404)
 * never breaks the page — callers always get a predictable shape back:
 *   { ok: true, tag, name, publishedAt, assetUrl }
 *   { ok: false, reason: "not_configured" | "rate_limited" | "not_found" | "network_error" }
 */
(function () {
  "use strict";

  const cache = new Map();

  function parseOwnerRepo(githubUrl) {
    if (!githubUrl || githubUrl === "#") return null;
    try {
      const url = new URL(githubUrl);
      const parts = url.pathname.split("/").filter(Boolean);
      if (parts.length < 2) return null;
      return { owner: parts[0], repo: parts[1] };
    } catch (e) {
      return null;
    }
  }

  async function fetchLatestRelease(githubUrl) {
    const enabled = typeof CONFIG !== "undefined" && CONFIG.github && CONFIG.github.useApiForLatestRelease;
    if (!enabled) return { ok: false, reason: "not_configured" };

    const parsed = parseOwnerRepo(githubUrl);
    if (!parsed) return { ok: false, reason: "not_configured" };

    const cacheKey = `${parsed.owner}/${parsed.repo}`;
    if (cache.has(cacheKey)) return cache.get(cacheKey);

    const endpoint = `${CONFIG.github.apiBase}/repos/${parsed.owner}/${parsed.repo}/releases/latest`;

    try {
      const res = await fetch(endpoint, {
        headers: { Accept: "application/vnd.github+json" },
      });

      if (res.status === 404) {
        const result = { ok: false, reason: "not_found" };
        cache.set(cacheKey, result);
        return result;
      }

      if (res.status === 403) {
        const result = { ok: false, reason: "rate_limited" };
        cache.set(cacheKey, result);
        return result;
      }

      if (!res.ok) {
        const result = { ok: false, reason: "network_error" };
        cache.set(cacheKey, result);
        return result;
      }

      const data = await res.json();
      const asset = Array.isArray(data.assets) && data.assets.length ? data.assets[0] : null;

      const result = {
        ok: true,
        tag: data.tag_name || "",
        name: data.name || data.tag_name || "",
        publishedAt: data.published_at || "",
        assetUrl: asset ? asset.browser_download_url : data.html_url,
      };
      cache.set(cacheKey, result);
      return result;
    } catch (err) {
      const result = { ok: false, reason: "network_error" };
      cache.set(cacheKey, result);
      return result;
    }
  }

  function formatDate(iso) {
    if (!iso) return "";
    try {
      return new Date(iso).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return "";
    }
  }

  window.SoniGithub = { fetchLatestRelease, formatDate, parseOwnerRepo };
})();
