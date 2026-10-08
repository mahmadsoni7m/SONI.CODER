/**
 * SONI.CODER — Shared App Behavior
 * Runs on every page: navbar, theme toggle, reveal-in animation,
 * footer year, and populating config-driven links.
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initNav();
    initReveal();
    initFooterYear();
    initConfigLinks();
    markActiveNavLink();
  });

  /* ---------- Theme (dark default, optional light toggle) ---------- */
  function initTheme() {
    const root = document.documentElement;
    const stored = safeGet("soni-coder-theme");
    if (stored === "light") root.setAttribute("data-theme", "light");

    const toggle = document.querySelector("[data-theme-toggle]");
    if (!toggle) return;

    updateThemeIcon(toggle, root.getAttribute("data-theme") === "light");

    toggle.addEventListener("click", () => {
      const isLight = root.getAttribute("data-theme") === "light";
      if (isLight) {
        root.removeAttribute("data-theme");
        safeSet("soni-coder-theme", "dark");
      } else {
        root.setAttribute("data-theme", "light");
        safeSet("soni-coder-theme", "light");
      }
      updateThemeIcon(toggle, !isLight);
    });
  }

  function updateThemeIcon(toggle, isLight) {
    toggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
    toggle.innerHTML = isLight
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4l1.4-1.4M18 6l1.4-1.4"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z"/></svg>';
  }

  /* ---------- Mobile navbar ---------- */
  function initNav() {
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function markActiveNavLink() {
    const path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a[href]").forEach((link) => {
      const href = link.getAttribute("href");
      if (href === path || (path === "" && href === "index.html")) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /* ---------- Reveal-on-scroll (single subtle entrance per element) --- */
  let revealObserver = null;

  function getRevealObserver() {
    if (revealObserver || !("IntersectionObserver" in window)) return revealObserver;
    revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    return revealObserver;
  }

  function initReveal() {
    refreshReveal();
  }

  // Call again after injecting dynamic content (e.g. rendered project cards)
  // so newly added .reveal elements also get observed.
  function refreshReveal() {
    const items = document.querySelectorAll(".reveal:not([data-reveal-bound])");
    if (!items.length) return;

    const observer = getRevealObserver();
    items.forEach((el) => {
      el.setAttribute("data-reveal-bound", "");
      if (!observer) {
        el.classList.add("is-visible");
      } else {
        observer.observe(el);
      }
    });
  }

  /* ---------- Footer year ---------- */
  function initFooterYear() {
    const el = document.querySelector("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Wire up config-driven links/text across pages ---------- */
  function initConfigLinks() {
    if (typeof CONFIG === "undefined") return;

    document.querySelectorAll("[data-config-href]").forEach((el) => {
      const key = el.getAttribute("data-config-href");
      const value = resolveConfigPath(key);
      if (value) el.setAttribute("href", value);
    });

    document.querySelectorAll("[data-config-text]").forEach((el) => {
      const key = el.getAttribute("data-config-text");
      const value = resolveConfigPath(key);
      if (value) el.textContent = value;
    });
  }

  function resolveConfigPath(path) {
    return path.split(".").reduce((obj, key) => (obj ? obj[key] : undefined), CONFIG);
  }

  /* ---------- Safe localStorage helpers (private-browsing safe) ------- */
  function safeGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function safeSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* ignore */ }
  }

  // Expose small helpers other scripts reuse.
  window.SoniApp = { safeGet, safeSet, refreshReveal };
})();
