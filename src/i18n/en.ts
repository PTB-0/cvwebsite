import type { Dict } from "./dict";

export const en: Dict = {
  lang: "en",
  name: "Ege Yıldız",
  title: "Ege Yıldız, cloud and platform engineering",
  description:
    "High-school student learning cloud and platform engineering. Selected projects, each with how it was built and how AI took part.",
  switchLabel: "TR",
  nav: {
    label: "Sections",
    home: "Home",
    work: "Work",
    method: "Method",
    skills: "Skills",
    education: "Education",
    contact: "Contact",
  },
  hero: {
    title: "Systems I can measure, break, and roll back.",
    lede: "I’m a high-school student in Türkiye, class of 2029. I design the system, direct AI tools to build it, and check the result with measurements instead of trust.",
    primary: "See selected work",
    github: "GitHub: PTB-0",
    githubHref: "https://github.com/PTB-0",
    nowTitle: "Right now",
    nowDate: "Oct 2026",
    now: [
      { label: "Building", value: "A self-hosted game-server platform", note: "Pre-beta, not launched" },
      { label: "Shipping", value: "prompt-router and SecretFix", note: "Two npm packages" },
      { label: "Learning", value: "Cloud and platform engineering", note: "" },
    ],
    facts: [
      { label: "Exams", value: "AP Computer Science A and Principles: 4 and 4" },
      { label: "Certificates", value: "CS50x, CS50P, CS50AI" },
      { label: "Open source", value: "Published on npm, MIT licensed" },
      { label: "Method", value: "Specify, build, review, measure, gate" },
    ],
  },
  work: {
    title: "Selected work",
    intro: "Three projects. Each entry says what it does, what I did, and how AI took part.",
    role: "My role",
    stack: "Stack",
    built: "How it was built",
    links: "Links",
    fig: "Fig.",
  },
  method: {
    title: "How I work with AI",
    intro: "Four rules I apply to every change, each with the place I learned it.",
    seenIn: "Seen in",
    rules: [
      {
        title: "Measure before trusting",
        body: "A claim from an agent, or from me, is a hypothesis until a measurement agrees with it.",
        project: "Dloudos",
        evidence:
          "Agents expected the page heading to be the slowest element to paint. Lighthouse showed it was the cookie banner, in 12 of 12 runs.",
      },
      {
        title: "Give agents narrow authority",
        body: "Agents work inside guardrails I can audit, not inside my trust.",
        project: "Dloudos",
        evidence:
          "A hook on every agent command blocks reading secrets, destructive git commands, commits to the main branch, and server access.",
      },
      {
        title: "Review with fresh eyes",
        body: "The author’s tests only cover what the author thought of. A reviewer who has not seen the work reads it cold.",
        project: "prompt-router",
        evidence:
          "The final whole-branch review found a critical regression that all sixteen earlier task reviews had passed.",
      },
      {
        title: "Build the way back first",
        body: "Every change ships with a tested path back. A backup that was never restored is not a backup.",
        project: "Dloudos",
        evidence:
          "Offsite backups are encrypted and judged by a restore rehearsal, not by an upload that finished.",
      },
    ],
  },
  skills: {
    title: "Skills",
    intro: "Only what I have used in the projects above or in public repositories.",
    groups: [
      { title: "Languages", items: "TypeScript, Python, Rust, Java, Go, C" },
      { title: "Web", items: "Next.js, React, Tailwind CSS, Node.js, Prisma, SQLite, PostgreSQL" },
      {
        title: "Infrastructure",
        items: "Linux, Docker, Cloudflare Zero Trust and Workers, PM2, Pterodactyl, WireGuard, MinIO, Forgejo",
      },
      { title: "Testing and measuring", items: "Vitest, Playwright, Lighthouse, fuzzing with fast-check, mutation checks" },
      { title: "Working with AI", items: "Claude Code, subagent workflows, MCP servers, independent review passes" },
    ],
  },
  education: {
    title: "Education",
    intro: "Results I have received. Goals are not listed here.",
    rows: [
      { kind: "School", title: "High school", detail: "Class of 2029." },
      { kind: "Exam", title: "AP Computer Science A", detail: "Score 4 on the 1 to 5 scale, 2026." },
      { kind: "Exam", title: "AP Computer Science Principles", detail: "Score 4 on the 1 to 5 scale, 2026." },
      { kind: "Certificates", title: "CS50x, CS50P, CS50AI", detail: "Harvard CS50 courses. Verification links are available." },
      { kind: "Program", title: "MEF summer school", detail: "Recognised as “Outstanding Success”." },
    ],
  },
  contact: {
    title: "Contact",
    intro: "For internships, projects, or questions about anything on this page.",
    github: "PTB-0",
    githubHref: "https://github.com/PTB-0",
    email: null,
    emailLabel: "Email",
    cv: "CV (PDF)",
    cvWork: "Work",
    cvAcademic: "Academic",
  },
  footer: "Every claim on this site can be checked in a repository, the npm registry, or a certificate.",
  cv: {
    tagline: "High-school student, class of 2029. Building toward cloud and platform engineering.",
    summary:
      "I design systems, direct AI tools to build them, and check the result with measurements instead of trust. Each project below says what I did and how AI took part.",
    projects: "Projects",
    skills: "Skills",
    education: "Education",
    contact: "Contact",
    work: "CV, work",
    academic: "CV, academic",
    backToSite: "Back to the site",
  },
};
