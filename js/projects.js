/**
 * SONI.CODER — Project Rendering
 * -----------------------------------
 * Reads PROJECTS from data/projects.js and renders cards, computes
 * homepage stats, and powers the filter/search toolbar on
 * projects.html and apps.html.
 */
(function () {
  "use strict";

  const CATEGORY_LABEL = {
    Android: "ANDROID",
    Web: "WEB",
    Bot: "BOT",
    Tool: "TOOLS",
    Other: "OTHER",
  };

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
  }

  function iconMarkup(project) {
    // icon field is either an emoji/character or a path to an image asset.
    if (project.icon && /\.(png|jpg|jpeg|svg|webp)$/i.test(project.icon)) {
      return `<img src="${escapeHtml(project.icon)}" alt="" width="28" height="28" loading="lazy">`;
    }
    return escapeHtml(project.icon || "◆");
  }

  function primaryActionHref(project) {
    if (project.category === "Bot") return project.demo;
    if (project.category === "Android") return project.download;
    return project.demo && project.demo !== "#" ? project.demo : project.download;
  }

  function primaryActionLabel(project) {
    if (project.status === "In Development") return "Coming Soon";
    if (project.category === "Bot") return "Open Bot";
    if (project.category === "Android") return "Download APK";
    return "Open Demo";
  }

  function renderBadges(project) {
    return (project.technologies || [])
      .slice(0, 4)
      .map((t) => `<span class="badge">${escapeHtml(t)}</span>`)
      .join("");
  }

  function renderLinkButton(label, href, variant) {
    if (!href || href === "#") return "";
    const cls = variant === "primary" ? "btn btn-primary btn-sm" : "btn btn-outline btn-sm";
    const external = /^https?:\/\//.test(href);
    return `<a class="${cls}" href="${escapeHtml(href)}"${external ? ' target="_blank" rel="noopener"' : ""}>${label}</a>`;
  }

  function cardHtml(project, { featured = false } = {}) {
    const primaryHref = primaryActionHref(project);
    const primaryLabel = primaryActionLabel(project);
    const isComingSoon = project.status === "In Development";

    return `
      <article class="card${featured ? " featured" : ""} reveal" data-id="${escapeHtml(project.id)}"
                data-category="${escapeHtml(project.category)}"
                data-name="${escapeHtml(project.name.toLowerCase())}">
        <div class="card-top">
          <div class="card-icon" aria-hidden="true">${iconMarkup(project)}</div>
          <span class="status-pill" data-status="${escapeHtml(project.status)}">${escapeHtml(project.status)}</span>
        </div>
        <h3><a href="project.html?id=${encodeURIComponent(project.id)}">${escapeHtml(project.name)}</a></h3>
        <p class="card-tagline">${escapeHtml(project.tagline)}</p>
        <div class="card-meta">
          <span>${escapeHtml(CATEGORY_LABEL[project.category] || project.category)}</span>
          ${project.version ? `<span>v${escapeHtml(project.version)}</span>` : ""}
        </div>
        <div class="badges">${renderBadges(project)}</div>
        <div class="card-actions">
          <a class="btn btn-outline btn-sm" href="project.html?id=${encodeURIComponent(project.id)}">View</a>
          ${
            isComingSoon
              ? '<span class="btn btn-outline btn-sm is-disabled">Coming Soon</span>'
              : renderLinkButton(primaryLabel, primaryHref, "primary")
          }
          ${renderLinkButton("GitHub", project.github)}
        </div>
      </article>`;
  }

  function computeStats(projects) {
    return {
      projects: projects.length,
      apps: projects.filter((p) => p.category === "Android").length,
      web: projects.filter((p) => p.category === "Web").length,
      bots: projects.filter((p) => p.category === "Bot").length,
    };
  }

  function renderInto(container, projects, opts) {
    if (!container) return;
    if (!projects.length) {
      container.innerHTML = `
        <div class="empty-state">
          <strong>${escapeHtml((opts && opts.emptyTitle) || "No projects found.")}</strong>
          <span>${escapeHtml((opts && opts.emptyHint) || "Try a different filter or search term.")}</span>
        </div>`;
      return;
    }
    container.innerHTML = projects.map((p) => cardHtml(p, opts)).join("");
  }

  /* ---------- Reusable filter/search toolbar wiring ---------- */
  function initToolbar({ container, filterRoot, searchInput, projects, categoryOrder, emptyTitle, emptyHint }) {
    if (!container) return;

    const preset = filterRoot && filterRoot.querySelector('.filter-btn[aria-pressed="true"]');
    let activeCategory = preset ? preset.dataset.filter : "ALL";
    let query = "";

    function apply() {
      let list = projects;
      if (activeCategory !== "ALL") {
        list = list.filter((p) => p.category.toUpperCase() === activeCategory);
      }
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        list = list.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.tagline.toLowerCase().includes(q) ||
            (p.technologies || []).some((t) => t.toLowerCase().includes(q))
        );
      }
      renderInto(container, list, { emptyTitle, emptyHint });
    }

    if (filterRoot) {
      filterRoot.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          filterRoot.querySelectorAll(".filter-btn").forEach((b) => b.setAttribute("aria-pressed", "false"));
          btn.setAttribute("aria-pressed", "true");
          activeCategory = btn.dataset.filter;
          apply();
        });
      });
    }

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        query = e.target.value;
        apply();
      });
    }

    apply();
  }

  window.SoniProjects = {
    all: () => (typeof PROJECTS !== "undefined" ? PROJECTS : []),
    computeStats,
    renderInto,
    cardHtml,
    initToolbar,
    escapeHtml,
  };
})();
