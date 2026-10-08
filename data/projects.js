/**
 * SONI.CODER — Project Data
 * ----------------------------------
 * To add a new project, copy an object below, fill it in, and save.
 * The site picks it up automatically — no other file needs to change.
 *
 * Fields:
 *   id           unique slug, used in project.html?id=...
 *   name         display name
 *   tagline      one short line shown on the card
 *   description  longer description shown on the detail page
 *   category     "Android" | "Web" | "Bot" | "Tool" | "Other"
 *   version      e.g. "1.0.0" (leave "" if not released yet)
 *   status       "Released" | "In Development" | "Archived"
 *   icon         path under assets/icons/, or an emoji fallback
 *   technologies array of strings
 *   github       repo URL, or "#" if not public yet
 *   release      GitHub Releases page URL, or "#"
 *   download     direct APK / asset download URL, or "#"
 *   demo         live demo / bot URL, or "#"
 *   screenshots  array of image paths under assets/screenshots/ (optional)
 *   features     array of short feature strings (optional)
 *   featured     true to highlight on the homepage
 */

const PROJECTS = [
  {
    id: "vocably",
    name: "Vocably",
    tagline: "Vocabulary builder for daily language practice.",
    description:
      "Vocably helps you build vocabulary through short daily practice sessions, spaced repetition and quick review sets designed for mobile use.",
    category: "Android",
    version: "1.0.0",
    status: "Released",
    icon: "🗣️",
    technologies: ["Kotlin", "Android"],
    github: "#",
    release: "#",
    download: "#",
    demo: "#",
    screenshots: [],
    features: [
      "Daily vocabulary sets",
      "Spaced-repetition review",
      "Offline-friendly",
    ],
    featured: true,
  },
  {
    id: "pythontaj",
    name: "PythonТоҷ",
    tagline: "Python learning resource in Tajik.",
    description:
      "PythonТоҷ is a learning resource that introduces core Python programming concepts with explanations and examples in Tajik.",
    category: "Tool",
    version: "1.0.0",
    status: "In Development",
    icon: "🐍",
    technologies: ["Python", "HTML", "CSS"],
    github: "#",
    release: "#",
    download: "#",
    demo: "#",
    screenshots: [],
    features: ["Lessons in Tajik", "Beginner-friendly examples"],
    featured: true,
  },
  {
    id: "fixview",
    name: "FixView",
    tagline: "Utility tool for quick screen/display fixes.",
    description:
      "FixView is a lightweight utility focused on solving common display and view-rendering issues quickly, without unnecessary configuration.",
    category: "Tool",
    version: "",
    status: "In Development",
    icon: "🛠️",
    technologies: ["JavaScript"],
    github: "#",
    release: "#",
    download: "#",
    demo: "#",
    screenshots: [],
    features: [],
    featured: false,
  },
  {
    id: "appro",
    name: "APPRO",
    tagline: "Android app project — details coming soon.",
    description:
      "APPRO is an Android application currently in development. Full details, screenshots and release notes will be added once the first version ships.",
    category: "Android",
    version: "",
    status: "In Development",
    icon: "📱",
    technologies: ["Kotlin"],
    github: "#",
    release: "#",
    download: "#",
    demo: "#",
    screenshots: [],
    features: [],
    featured: false,
  },
  {
    id: "sensipro",
    name: "SensiPro",
    tagline: "Sensitivity configuration tool.",
    description:
      "SensiPro helps generate and manage sensitivity configuration profiles, aimed at quick import/export and easy sharing.",
    category: "Tool",
    version: "1.0.0",
    status: "Released",
    icon: "🎯",
    technologies: ["JavaScript"],
    github: "#",
    release: "#",
    download: "#",
    demo: "#",
    screenshots: [],
    features: ["Profile presets", "Import / export configs"],
    featured: false,
  },
  {
    id: "qr-vault",
    name: "QR Vault",
    tagline: "Generate and store QR codes locally.",
    description:
      "QR Vault lets you generate QR codes for links, text and contact info, and keeps a local history so you can find and reuse them later.",
    category: "Android",
    version: "",
    status: "In Development",
    icon: "🔒",
    technologies: ["Kotlin", "Android"],
    github: "#",
    release: "#",
    download: "#",
    demo: "#",
    screenshots: [],
    features: ["QR generation", "Local history"],
    featured: false,
  },
  {
    id: "soni-bot",
    name: "Soni Bot",
    tagline: "Telegram bot for everyday automation.",
    description:
      "Soni Bot is a Telegram bot built to automate small everyday tasks and answer common commands directly inside Telegram.",
    category: "Bot",
    version: "1.0.0",
    status: "Released",
    icon: "🤖",
    technologies: ["Python", "Telegram Bot API"],
    github: "#",
    release: "#",
    download: "#",
    demo: "#",
    screenshots: [],
    features: ["Command-based automation", "Runs on Telegram"],
    featured: true,
  },
  {
    id: "ff-sensipro",
    name: "FF SensiPro",
    tagline: "Game-focused sensitivity companion.",
    description:
      "FF SensiPro is a companion tool for managing and sharing in-game sensitivity settings, built as a focused variant of SensiPro.",
    category: "Tool",
    version: "",
    status: "In Development",
    icon: "🎮",
    technologies: ["JavaScript"],
    github: "#",
    release: "#",
    download: "#",
    demo: "#",
    screenshots: [],
    features: [],
    featured: false,
  },
];

// Node/Jest-friendly export while remaining a plain <script> global in the browser.
if (typeof module !== "undefined" && module.exports) {
  module.exports = PROJECTS;
}
