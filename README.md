# SONI.CODER — Developer Portfolio & Project Download Hub

A static, backend-free developer portfolio that lists every project in one
place: browse it, read about it, open its GitHub source, and download its
latest APK/release — all from a single `data/projects.js` file.

Live structure: pure HTML/CSS/JavaScript. No server, no database, no build
step. Deployable to **GitHub Pages** or **Netlify** as-is.

---

## 1. Project structure

```
/
├── index.html          Homepage (hero, stats, featured projects)
├── projects.html        Full project list with filters + search
├── apps.html             Download Center (Android apps & tools)
├── about.html            About / focus areas / tech stack
├── project.html          Project detail page (reads ?id=<project-id>)
│
├── css/
│   ├── style.css         Design tokens, layout, components
│   └── responsive.css    Breakpoints (mobile → desktop)
│
├── js/
│   ├── app.js             Navbar, theme toggle, reveal animation
│   ├── projects.js        Card rendering, filtering, search
│   ├── project-details.js Renders the single-project detail page
│   └── github.js          Public GitHub API helper (latest release)
│
├── data/
│   └── projects.js        ⭐ Your project data — edit this to add projects
│
├── assets/
│   ├── logo/               Favicon / logo
│   ├── icons/               Per-project icons (optional)
│   └── screenshots/         Per-project screenshots (optional)
│
├── config.js              Your name, GitHub username, social links
├── robots.txt / sitemap.xml
└── .github/workflows/deploy.yml   Auto-deploy to GitHub Pages on push
```

---

## 2. How to add a new project

Open `data/projects.js` and add an object to the `PROJECTS` array:

```js
{
  id: "my-new-app",
  name: "My New App",
  tagline: "One short line describing it.",
  description: "A longer paragraph for the detail page.",
  category: "Android",        // "Android" | "Web" | "Bot" | "Tool" | "Other"
  version: "1.0.0",
  status: "Released",         // "Released" | "In Development" | "Archived"
  icon: "🚀",                 // emoji, or a path like "assets/icons/app.png"
  technologies: ["Kotlin", "Android"],
  github: "https://github.com/mahmadsoni7m/my-new-app",
  release: "https://github.com/mahmadsoni7m/my-new-app/releases",
  download: "https://github.com/mahmadsoni7m/my-new-app/releases/latest/download/app.apk",
  demo: "#",
  screenshots: [],
  features: ["Feature one", "Feature two"],
  featured: true
}
```

Save the file, commit, push — the homepage stats, project grid, filters,
search, download center and detail page all update automatically. No other
file needs to change.

Any field left as `"#"` is treated as "not available yet" and its button is
simply hidden — it will never show a broken link.

---

## 3. How to add a GitHub Release (APK)

The site never stores APK files itself — GitHub Releases is the storage:

1. Push your project's code to its own GitHub repository.
2. On GitHub, go to **Releases → Draft a new release**.
3. Tag it (e.g. `v1.0.0`), upload the built `.apk` as a release asset, and
   publish it.
4. Copy the release page URL and the direct asset download URL.
5. Paste them into that project's `release` and `download` fields in
   `data/projects.js`.

If a project's repository is **public**, the site will also try to fetch the
*latest* release tag and date directly from the public GitHub API
(`js/github.js`) and display it on the detail page — with the values from
`data/projects.js` used as a fallback if the API is rate-limited or
unavailable, so the page never breaks.

---

## 4. How to change your GitHub username / links

Everything identity-related lives in `config.js`:

```js
const CONFIG = {
  brand: "SONI.CODER",
  githubUsername: "mahmadsoni7m",
  githubUrl: "https://github.com/mahmadsoni7m",
  instagram: "https://instagram.com/soni.coder",
  telegram: "#",
  ...
};
```

Change any value once here — the navbar, footer and "Build in Public"
section update everywhere automatically.

---

## 5. Deploying to GitHub Pages

This repo includes `.github/workflows/deploy.yml`, which deploys
automatically on every push to `main`:

1. Push this project to a GitHub repository.
2. In the repo, go to **Settings → Pages → Build and deployment → Source**
   and select **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab).
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`
   (or `https://<your-username>.github.io/` if the repo is named
   `<your-username>.github.io`).

No build tools, Node, or server are required — it's all static files.

---

## 6. Deploying to Netlify

1. Create a free Netlify account and choose **Add new site → Import an
   existing project**.
2. Connect your GitHub repository.
3. Build command: leave empty. Publish directory: `/` (repo root).
4. Deploy — Netlify will give you a live URL immediately, and redeploy on
   every push.

---

## 7. How GitHub Releases connect to downloads (summary)

```
New Project
  → add an object to data/projects.js
  → create a GitHub repository for it
  → create a GitHub Release
  → upload the APK as a release asset
  → paste the release/download URL into projects.js
  → the website shows it automatically — Download Center, project card,
    and project detail page all update
```

---

## Notes

- No API keys, tokens, passwords or secrets are ever stored in this
  codebase — only the public, unauthenticated GitHub REST API is used.
- Everything is static: safe for GitHub Pages, Netlify, or any static host.
- Dark mode is the default; a light mode toggle is available and the choice
  is remembered in the browser (`localStorage`).
