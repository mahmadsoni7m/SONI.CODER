/**
 * SONI.CODER — Global Configuration
 * ----------------------------------
 * Change everything about your identity/links from this one file.
 * Every page and script reads from window.CONFIG.
 */

const CONFIG = {
  // Brand
  brand: "SONI.CODER",
  tagline: "Building ideas into real products.",
  role: "Developer / Builder",

  // GitHub
  githubUsername: "mahmadsoni7m",
  githubUrl: "https://github.com/mahmadsoni7m",

  // Social
  instagram: "https://instagram.com/soni.coder",
  telegram: "#",

  // GitHub API behavior
  github: {
    // Use the public GitHub API to fetch the latest release for each
    // project's repo (only works for public repositories).
    useApiForLatestRelease: true,
    // Base API endpoint — never put a token here, this must stay public-only.
    apiBase: "https://api.github.com",
    // If the API call fails or rate-limits, fall back to the static
    // `release` / `download` fields defined in data/projects.js.
  },

  // SEO
  seo: {
    title: "SONI.CODER — Developer Portfolio & Projects",
    description:
      "SONI.CODER — Web Apps, Android Apps, Telegram Bots, Tools and Open Source Projects.",
    url: "https://mahmadsoni7m.github.io/SONI.CODER/",
    image: "assets/logo/og-image.png",
  },
};

// Freeze so pages can't accidentally mutate shared config at runtime.
Object.freeze(CONFIG);
Object.freeze(CONFIG.github);
Object.freeze(CONFIG.seo);
