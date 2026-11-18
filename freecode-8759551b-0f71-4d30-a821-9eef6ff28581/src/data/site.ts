export const SITE = {
  name: "Albert Simel",
  handle: "~/albert",
  email: "albertsimel360@gmail.com",
  phone: "+254716034770",
  whatsapp: "https://wa.me/+254716034770",
  github: "https://github.com/simel554",
  linkedin: "https://linkedin.com/in/albertsimel",
  x: "https://x.com/albertsimel",
  americanSpaces: "https://ke.usembassy.gov/education/am-spaces/",
  liveSite: "https://simel-coral.vercel.app/",
  location: "Nairobi, Kenya",
  coords: "1.2921° S / 36.8219° E",
  timezone: "Africa/Nairobi",
  tagline:
    "I build web platforms and Android apps that solve real problems for Kenyan communities — house-hunting, food redistribution, and coding education, shipped end to end.",
  availability: "open to freelance & contract work",
};

export type Project = {
  id: string;
  index: string;
  title: string;
  path: string;
  role: string;
  tags: string[];
  year: string;
  status: string;
  summary: string;
  detail: string;
  stack: string[];
  live: string;
  accent: "stone" | "coral" | "obsidian";
};

export const PROJECTS: Project[] = [
  {
    id: "nyumbake",
    index: "01",
    title: "Nyumbake",
    path: "./nyumbake",
    role: "Solo dev · Product & build",
    tags: ["marketplace", "mpesa"],
    year: "2026",
    status: "in-progress",
    summary:
      "Nairobi house-hunting platform with dual seeker/landlord modes and KES-native pricing.",
    detail:
      "Nyumbake pairs two very different users in one product: renters hunting through Nairobi neighbourhoods and landlords listing units. It ships with KES-native pricing, saved searches, and a seeker/landlord mode switch that reshapes the whole interface. Payments integrate through M-Pesa Daraja once a listing is agreed.",
    stack: ["javascript", "node.js", "mpesa daraja", "git"],
    live: SITE.liveSite,
    accent: "coral",
  },
  {
    id: "devarena",
    index: "02",
    title: "DevArena",
    path: "./devarena",
    role: "Solo dev · Full prototype",
    tags: ["education", "gamified"],
    year: "2026",
    status: "prototype",
    summary:
      "Gamified, browser-based coding platform for kids and older learners — streaks, role-based auth, dark/light theming.",
    detail:
      "A learning arena where progress is the reward. Students work through coding challenges with streaks and points, while parents get their own role-based view of progress. Authentication is role-aware (student / parent), and the whole interface switches between dark and light themes. Delivered as a full working prototype.",
    stack: ["node.js", "express", "sqlite", "oauth"],
    live: SITE.liveSite,
    accent: "stone",
  },
  {
    id: "njiacode",
    index: "03",
    title: "NjiaCode",
    path: "./njiacode",
    role: "Solo dev · Education",
    tags: ["learning", "certificates"],
    year: "2026",
    status: "in-progress",
    summary:
      "Coding education app, being extended with free course-completion certificates for learners who finish lessons.",
    detail:
      "NjiaCode is a coding education app built for learners who need a clear path rather than endless tabs. Courses are broken into lessons with completion tracking, and the next release adds free verifiable certificates for every learner who finishes a track — no paywall between a student and proof of their work.",
    stack: ["javascript", "education", "certificates"],
    live: SITE.liveSite,
    accent: "coral",
  },
  {
    id: "farm-input",
    index: "04",
    title: "Farm Input",
    path: "./farm-input",
    role: "Academic project · Data",
    tags: ["supply", "records"],
    year: "2025",
    status: "academic",
    summary:
      "Academic project: a farm input management application for tracking supplies and stock.",
    detail:
      "Built as an academic project: a farm input management application for tracking supplies and stock. Records inputs as they arrive and leave the store, keeps a running stock position, and makes the paper ledger unnecessary for smallholders and co-operatives.",
    stack: ["javascript", "data management"],
    live: SITE.liveSite,
    accent: "stone",
  },
];

export const SKILLS = [
  "javascript",
  "node.js",
  "HTML/CSS",
  "sqlite",
  "python",
  "git/github",
  "ui engineering",
  "troubleshooting",
];

export const MARQUEE_WORDS = [
  "web platforms",
  "android apps",
  "node.js",
  "ui engineering",
  "mpesa daraja",
  "sqlite",
  "product thinking",
  "kenyan communities",
];

export type Capability = {
  id: string;
  index: string;
  title: string;
  kicker: string;
  body: string;
  items: string[];
};

export const CAPABILITIES: Capability[] = [
  {
    id: "product",
    index: "01",
    title: "Product engineering",
    kicker: "idea → shipped platform",
    body: "End-to-end builds where the product decisions and the code live in the same head. I map the flow, model the data, then build the thing that gets used.",
    items: ["dual-role flows", "KES-native payments", "offline-first thinking", "auth & permissions"],
  },
  {
    id: "frontend",
    index: "02",
    title: "UI engineering",
    kicker: "interfaces with weight",
    body: "Interfaces built for real devices on real networks in Nairobi — fast, legible, and tactile. Layout systems, state, motion, and accessibility handled as one craft.",
    items: ["responsive layout", "design systems", "motion & interaction", "performance budgets"],
  },
  {
    id: "android",
    index: "03",
    title: "Android & web apps",
    kicker: "two surfaces, one product",
    body: "Web platforms and Android builds that share a data model, so a listing or a lesson looks the same wherever a learner or landlord opens it.",
    items: ["mobile-friendly APIs", "app store readiness", "localisation", "low-bandwidth use"],
  },
  {
    id: "education",
    index: "04",
    title: "Education & community",
    kicker: "teaching what I build",
    body: "Volunteer at the American Corner Moi as part of the American Spaces programme, and build learning tools like DevArena and NjiaCode for the next wave of Kenyan developers.",
    items: ["coding education", "certificates", "mentoring", "american spaces"],
  },
];

export const STATS = [
  { value: "4", label: "independent projects" },
  { value: "8+", label: "languages & tools" },
  { value: "nairobi, ke", label: "based in" },
  { value: "yes", label: "open to work" },
];
