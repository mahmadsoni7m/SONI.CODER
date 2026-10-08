/**
 * SONI.CODER — Project Detail Page
 * -----------------------------------
 * Reads ?id=<project-id> from the URL, finds it in PROJECTS, and
 * renders the full detail view. Falls back to a clear "not found"
 * state instead of a blank or broken page.
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", init);

  function getIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
  }

  function linkBtn(label, href, variant) {
    if (!href || href === "#") return "";
    const cls = variant === "primary" ? "btn btn-primary" : "btn btn-outline";
    return `<a class="${cls}" href="${href}" target="_blank" rel="noopener">${label}</a>`;
  }

  async function init() {
    const root = document.getElementById("project-detail");
    if (!root) return;

    const id = getIdFromUrl();
    const projects = window.SoniProjects ? window.SoniProjects.all() : [];
    const project = projects.find((p) => p.id === id);

    if (!project) {
      root.innerHTML = `
        <div class="empty-state">
          <strong>Project not found.</strong>
          <span>It may have been renamed or removed. <a class="mono" href="projects.html">Back to all projects →</a></span>
        </div>`;
      document.title = "Project not found — SONI.CODER";
      return;
    }

    document.title = `${project.name} — SONI.CODER`;
    const esc = window.SoniProjects.escapeHtml;

    root.innerHTML = `
      <div class="detail-head reveal">
        <div class="detail-icon" aria-hidden="true">${
          /\.(png|jpg|jpeg|svg|webp)$/i.test(project.icon || "")
            ? `<img src="${esc(project.icon)}" alt="" width="40" height="40">`
            : esc(project.icon || "◆")
        }</div>
        <div class="detail-info">
          <span class="status-pill" data-status="${esc(project.status)}">${esc(project.status)}</span>
          <h1>${esc(project.name)}</h1>
          <p class="card-tagline">${esc(project.tagline)}</p>
        </div>
      </div>

      <div class="detail-actions reveal">
        ${linkBtn("Download APK", project.download, "primary")}
        ${linkBtn("View Demo", project.demo)}
        ${linkBtn("GitHub Source", project.github)}
        ${linkBtn("Releases", project.release)}
      </div>

      <div class="detail-body">
        <div>
          <section class="reveal">
            <h2>About this project</h2>
            <p>${esc(project.description)}</p>
          </section>

          ${
            project.features && project.features.length
              ? `<section class="reveal">
                  <h2>Features</h2>
                  <ul class="feature-list">
                    ${project.features.map((f) => `<li>${esc(f)}</li>`).join("")}
                  </ul>
                </section>`
              : ""
          }

          ${
            project.screenshots && project.screenshots.length
              ? `<section class="reveal">
                  <h2>Screenshots</h2>
                  <div class="screens-grid">
                    ${project.screenshots
                      .map((src) => `<img src="${esc(src)}" alt="${esc(project.name)} screenshot" loading="lazy">`)
                      .join("")}
                  </div>
                </section>`
              : ""
          }
        </div>

        <aside class="reveal">
          <section>
            <h2>Details</h2>
            <div class="spec-list">
              <div class="spec-row"><span>Category</span><span>${esc(project.category)}</span></div>
              <div class="spec-row"><span>Version</span><span>${esc(project.version || "—")}</span></div>
              <div class="spec-row"><span>Status</span><span>${esc(project.status)}</span></div>
              <div class="spec-row" id="latest-release-row" hidden><span>Latest Release</span><span id="latest-release-value"></span></div>
            </div>
            <div class="badges" style="margin-top:16px;">
              ${(project.technologies || []).map((t) => `<span class="badge">${esc(t)}</span>`).join("")}
            </div>
            <p class="github-note" id="github-note"></p>
          </section>
        </aside>
      </div>
    `;

    if (window.SoniApp) window.SoniApp.refreshReveal();

    loadLatestRelease(project);
  }

  async function loadLatestRelease(project) {
    if (!window.SoniGithub || !project.github || project.github === "#") return;

    const note = document.getElementById("github-note");
    const row = document.getElementById("latest-release-row");
    const valueEl = document.getElementById("latest-release-value");

    const result = await window.SoniGithub.fetchLatestRelease(project.github);

    if (result.ok) {
      if (row && valueEl) {
        valueEl.textContent = `${result.tag}${result.publishedAt ? " · " + window.SoniGithub.formatDate(result.publishedAt) : ""}`;
        row.hidden = false;
      }
      return;
    }

    if (!note) return;
    if (result.reason === "rate_limited" || result.reason === "network_error") {
      note.dataset.state = "error";
      note.textContent = "GitHub releases are temporarily unavailable — showing saved links instead.";
    }
    // "not_found" / "not_configured": stay silent, static fields already cover it.
  }
})();
