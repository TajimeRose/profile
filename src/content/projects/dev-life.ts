import { defineProject } from "../schema";

const ownerSuppliedSource =
  "Owner-supplied DEV-LIFE product screenshot, prepared for the portfolio on 2026-07-23.";

export const devLife = defineProject({
  canonicalId: "project-dev-life",
  slug: "dev-life",
  title: "DEV-LIFE",
  oneLiner: "A shared developer workspace for projects, tasks, notes, diagrams, and GitHub activity.",
  cardCopy:
    "A Bangkok University project that brings planning, documentation, collaboration, and repository context into one developer-focused workspace.",
  caseStudyLead:
    "DEV-LIFE explores how a development team can keep project context in one place instead of switching between separate tools for tasks, notes, diagrams, activity history, and source-control updates.",
  role: "Full-Stack Developer",
  year: "2026",
  educationStage: "university",
  educationLabel: "BU Project",
  status: "active-build",
  liveStatus: "offline",
  statusLabel: "Active Build",
  domains: ["Developer Tools", "Project Collaboration", "Productivity"],
  technologies: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Supabase",
    "PostgreSQL",
    "GitHub REST API",
    "XYFlow",
  ],
  featuredOrder: 2,
  showInSelectedSystems: true,
  problem:
    "Development work is often split across task boards, documents, diagrams, repository pages, and activity feeds, making it harder to understand the current state of a project.",
  audience: [
    "Student development teams coordinating shared university projects",
    "Developers who want project context and repository activity in one workspace",
  ],
  mechanism: [
    "Authenticate users and scope workspace data through Supabase Auth and project membership.",
    "Organize tasks, boards, notes, diagrams, and project activity around the active project.",
    "Connect GitHub repositories and present commits, branches, pull requests, and reviews as project context.",
  ],
  contributions: [
    "Built the Next.js interface and responsive workspace layouts.",
    "Implemented project, task, note, board, and interactive flowchart experiences.",
    "Connected Supabase data, authentication, project membership, and GitHub repository activity.",
  ],
  teamAttribution:
    "DEV-LIFE is presented as Wongsathon's Bangkok University project. The case study is based on the owner-supplied repository, documentation, and interface screenshots; it does not claim external adoption or an independently reviewed production release.",
  decisions: [
    {
      title: "Keep project context together",
      rationale:
        "Tasks, notes, diagrams, collaborators, and repository activity are easier to understand when they share the same project boundary.",
      tradeoff:
        "A broader workspace introduces more navigation and data relationships than a single-purpose task tool.",
    },
    {
      title: "Use Supabase for shared state",
      rationale:
        "PostgreSQL, authentication, and project membership provide one foundation for collaborative workspace data.",
      tradeoff:
        "The application depends on correctly configured policies, project permissions, and external service availability.",
    },
  ],
  evidence: [
    {
      id: "dev-repo-01",
      claim: "The DEV-LIFE source repository is publicly available on GitHub.",
      scope: "product",
      state: "owner-confirmed",
      asOf: "2026-07-23",
      source: {
        label: "GitHub repository",
        href: "https://github.com/TajimeRose/DEV-LIFE",
      },
    },
  ],
  limitations: [
    "A continuously available public deployment has not been verified, so the project is presented as an active university build.",
    "Authentication, permissions, GitHub synchronization, and collaborative flows were not independently tested end to end during this portfolio update.",
  ],
  links: [
    {
      label: "View repository",
      href: "https://github.com/TajimeRose/DEV-LIFE",
      kind: "repository",
    },
  ],
  media: [
    {
      state: "published",
      src: "/media/projects/dev-life/dev-life-03.webp",
      alt: "DEV-LIFE project dashboard showing workspace progress and recent tasks.",
      width: 1920,
      height: 953,
      sourceNote: ownerSuppliedSource,
    },
    {
      state: "published",
      src: "/media/projects/dev-life/dev-life-04.webp",
      alt: "DEV-LIFE notes editor inside a selected project workspace.",
      width: 1920,
      height: 953,
      sourceNote: ownerSuppliedSource,
    },
    {
      state: "published",
      src: "/media/projects/dev-life/dev-life-05.webp",
      alt: "DEV-LIFE task board organized into workflow columns.",
      width: 1920,
      height: 953,
      sourceNote: ownerSuppliedSource,
    },
    {
      state: "published",
      src: "/media/projects/dev-life/dev-life-06.webp",
      alt: "DEV-LIFE interactive project diagram workspace.",
      width: 1920,
      height: 953,
      sourceNote: ownerSuppliedSource,
    },
    {
      state: "published",
      src: "/media/projects/dev-life/dev-life-07.webp",
      alt: "DEV-LIFE repository integration screen showing connected GitHub projects.",
      width: 1920,
      height: 953,
      sourceNote: ownerSuppliedSource,
    },
    {
      state: "published",
      src: "/media/projects/dev-life/dev-life-08.webp",
      alt: "DEV-LIFE collaboration screen for project members.",
      width: 1920,
      height: 953,
      sourceNote: ownerSuppliedSource,
    },
    {
      state: "published",
      src: "/media/projects/dev-life/dev-life-09.webp",
      alt: "DEV-LIFE account and profile settings screen.",
      width: 1920,
      height: 953,
      sourceNote: ownerSuppliedSource,
    },
    {
      state: "published",
      src: "/media/projects/dev-life/dev-life-02.webp",
      alt: "DEV-LIFE project selection screen.",
      width: 1920,
      height: 953,
      sourceNote: ownerSuppliedSource,
    },
    {
      state: "published",
      src: "/media/projects/dev-life/dev-life-01.webp",
      alt: "DEV-LIFE sign-in screen introducing the developer workspace.",
      width: 1920,
      height: 953,
      sourceNote: ownerSuppliedSource,
    },
  ],
  lastVerifiedAt: "2026-07-23",
});
