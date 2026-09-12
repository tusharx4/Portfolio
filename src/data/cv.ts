/**
 * ─────────────────────────────────────────────────────────────
 *  CV DATA SOURCE  —  every section of the site reads from here.
 *  Tushar Sheikh — Customer Support Specialist · Content Creator
 * ─────────────────────────────────────────────────────────────
 */

export const profile = {
  firstName: "Tushar",
  lastName: "Sheikh",
  title: "Customer Support Specialist",
  kicker: "Digital Content Creator · AI & Developer Tools",
  tagline:
    "Adaptable, fast-learning tech professional — supporting 400+ students, managing Web3 communities, and building a 2.2k+ audience with AI-powered content.",
  location: "Sirajganj, Bangladesh",
  email: "ariyantushar37@gmail.com",
  phone: "+880186159908",
  website: "github.com/tusharx3",
  availability: "Open to support, community & content roles — remote friendly",
  resumeUrl: "Tushar_Sheikh_CV.pdf",
  photoCaption: "Support · community · content — powered by modern AI tools",
};

export const socials = [
  { label: "GitHub", handle: "tusharx3", url: "https://github.com/tusharx3", icon: "github" },
  { label: "X / Twitter", handle: "@tushar_087 · 2.2k+", url: "https://x.com/tushar_087", icon: "x" },
  { label: "Instagram", handle: "ariyan_tushar_007", url: "https://instagram.com/ariyan_tushar_007", icon: "instagram" },
  { label: "Facebook", handle: "Tushar Sheikh", url: "https://facebook.com", icon: "facebook" },
] as const;

export const heroStats = [
  { value: 400, suffix: "+", label: "Students supported" },
  { value: 2.2, suffix: "k+", label: "Organic X audience" },
  { value: 4, suffix: "+", label: "AI platforms mastered" },
  { value: 3, suffix: "", label: "Languages spoken" },
];

export const marquee = [
  "ChatGPT",
  "Gemini",
  "Claude",
  "Grok",
  "Prompt Engineering",
  "Canva",
  "VS Code",
  "Flutter",
  "Discord Communities",
  "Web3",
  "Content Strategy",
  "MS Office",
];

export const about = {
  bio: [
    "I'm an adaptable and fast-learning tech professional with hands-on experience in high-volume customer support, remote team collaboration, and digital content creation. Currently pursuing a B.Sc. in Zoology while maintaining a strong presence in digital communities and tech platforms — with a proven track record of supporting 400+ active students, managing large Discord communities, and building a 2.2k+ organic audience on X.",
    "My edge is combining modern AI platforms — ChatGPT, Gemini, Claude and Grok — with developer tools and graphics software to optimize operations and deliver impactful visual campaigns. I've contributed to promotional work for leading global Web3 projects and earned elite community distinctions like Super OG roles through strategic engagement and quality contribution.",
  ],
  achievements: [
    {
      icon: "headset",
      title: "400+ students supported",
      copy: "Technical support and onboarding operations at Shikkha IT with high satisfaction rates — the key liaison between users and dev teams.",
      metric: "400+",
      tone: "blue",
    },
    {
      icon: "zap",
      title: "2.2k+ organic X audience",
      copy: "Built through visual content strategy, custom graphics and technical copy — no paid growth, just consistent quality.",
      metric: "2.2k",
      tone: "red",
    },
    {
      icon: "layers",
      title: "Web3 campaign contributor",
      copy: "Visual assets and promotional campaigns for Zama, Base, Bitget Wallet and Billions Network — with Super OG community distinctions.",
      metric: "4+",
      tone: "yellow",
    },
    {
      icon: "users",
      title: "Discord communities led",
      copy: "Daily server operations, role management, onboarding, moderation, conflict resolution and interactive virtual events.",
      metric: "24/7",
      tone: "green",
    },
  ],
  principles: [
    "Answer fast, document faster — users feel the difference.",
    "AI is a multiplier: prompt well, automate the repetitive.",
    "Communities grow on consistency, not campaigns.",
    "Learn the tool before the deadline needs it.",
  ],
};

export type SkillGroup = {
  name: string;
  blurb: string;
  icon: string;
  tone: "blue" | "red" | "yellow" | "green";
  skills: { name: string; level: number; badge?: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    name: "AI & Prompt Engineering",
    blurb: "Modern AI platforms, driven with intent.",
    icon: "zap",
    tone: "blue",
    skills: [
      { name: "ChatGPT", level: 94, badge: "daily" },
      { name: "Gemini", level: 90 },
      { name: "Claude", level: 90 },
      { name: "Grok", level: 86 },
      { name: "Advanced Prompt Design", level: 91, badge: "strength" },
      { name: "Workflow Automation", level: 84 },
    ],
  },
  {
    name: "Design & Visual Branding",
    blurb: "Graphics that get shared, banners that convert.",
    icon: "layout",
    tone: "red",
    skills: [
      { name: "Canva", level: 93, badge: "expert" },
      { name: "Graphic Design", level: 88 },
      { name: "Social Media Banners", level: 90 },
      { name: "Custom Memes & Visual Assets", level: 92 },
    ],
  },
  {
    name: "Developer & Core Tools",
    blurb: "The technical stack behind the operations.",
    icon: "code",
    tone: "yellow",
    skills: [
      { name: "VS Code", level: 85 },
      { name: "Flutter (Basic UI / App Setup)", level: 62, badge: "learning" },
      { name: "MS Word · Excel · PowerPoint", level: 92 },
      { name: "Technical Documentation", level: 88 },
      { name: "Data Management", level: 85 },
    ],
  },
  {
    name: "Support & Soft Skills",
    blurb: "The human layer that makes it all work.",
    icon: "users",
    tone: "green",
    skills: [
      { name: "Client Care", level: 95, badge: "core" },
      { name: "Remote Collaboration", level: 92 },
      { name: "Community Moderation", level: 91 },
      { name: "Multilingual Communication", level: 90 },
      { name: "Fast Learning & Adaptability", level: 94 },
    ],
  },
];

export type Job = {
  company: string;
  role: string;
  location: string;
  period: string;
  start: string;
  current?: boolean;
  type: string;
  summary: string;
  bullets: string[];
  stack: string[];
  highlight: string;
  tone: "blue" | "red" | "yellow" | "green";
};

export const experience: Job[] = [
  {
    company: "Shikkha IT Limited",
    role: "Customer Support Executive",
    location: "Bangladesh",
    period: "Present",
    start: "now",
    current: true,
    type: "Full-time",
    summary:
      "Front-line technical support and onboarding for an educational IT platform serving hundreds of active students.",
    bullets: [
      "Managing technical support and onboarding operations for 400+ active students with high satisfaction rates.",
      "Resolving platform inquiries efficiently and serving as a key liaison between users and internal development teams.",
    ],
    stack: ["Technical Support", "Onboarding", "Documentation", "MS Office"],
    highlight: "400+ active students supported with high satisfaction rates",
    tone: "blue",
  },
  {
    company: "Web3 & Gaming Communities",
    role: "Discord Community Manager & Lead Moderator",
    location: "Remote",
    period: "Ongoing",
    start: "remote",
    current: true,
    type: "Remote",
    summary:
      "Running the day-to-day of large Discord servers — operations, people and events, all in distributed teams.",
    bullets: [
      "Overseeing daily server operations, managing role assignments, and maintaining high team productivity in remote environments.",
      "Handling user onboarding, community moderation, conflict resolution, and interactive virtual events.",
    ],
    stack: ["Discord", "Moderation", "Events", "Remote Teams"],
    highlight: "Lead moderator across Web3 & gaming communities",
    tone: "red",
  },
  {
    company: "X (formerly Twitter) / Freelance",
    role: "Digital Content Creator & Web3 Ecosystem Contributor",
    location: "Remote",
    period: "Ongoing",
    start: "remote",
    current: true,
    type: "Freelance",
    summary:
      "Building an audience and contributing content to some of the biggest names in the Web3 ecosystem.",
    bullets: [
      "Built an organic audience of 2.2k+ followers through visual content strategy, custom graphics, and technical copy.",
      "Contributed to promotional campaigns and visual asset creation for leading global Web3 projects, including Zama, Base, Bitget Wallet, and Billions Network.",
      "Secured elite community distinctions (such as Super OG roles) through strategic engagement and quality contribution.",
    ],
    stack: ["Content Strategy", "Canva", "Web3", "Technical Copy"],
    highlight: "Super OG distinctions in leading global Web3 communities",
    tone: "yellow",
  },
];

export type Project = {
  name: string;
  kind: string;
  year: string;
  blurb: string;
  detail: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  live: string;
  code: string;
  accent: "blue" | "red" | "yellow" | "green";
  featured?: boolean;
};

/** Highlights & impact — the measurable wins from the CV. */
export const projects: Project[] = [
  {
    name: "2.2k+ on X, fully organic",
    kind: "Highlight · Content strategy",
    year: "ongoing",
    blurb:
      "Grew an audience of 2.2k+ followers with zero paid promotion — visual content strategy, custom graphics and technical copy.",
    detail:
      "Every post designed in Canva, sharpened with AI drafting workflows, and timed for the Web3 community conversation.",
    tech: ["Content Strategy", "Canva", "AI Drafting", "Analytics"],
    metrics: [
      { label: "Followers", value: "2.2k+" },
      { label: "Growth", value: "Organic" },
      { label: "Handle", value: "@tushar_087" },
    ],
    live: "https://x.com/tushar_087",
    code: "https://x.com/tushar_087",
    accent: "blue",
    featured: true,
  },
  {
    name: "Web3 campaign contributions",
    kind: "Highlight · Ecosystem work",
    year: "ongoing",
    blurb:
      "Promotional campaigns and visual asset creation for leading global Web3 projects — Zama, Base, Bitget Wallet and Billions Network.",
    detail:
      "Custom banners, memes and campaign visuals that earned elite community distinctions, including Super OG roles.",
    tech: ["Zama", "Base", "Bitget Wallet", "Billions Network"],
    metrics: [
      { label: "Projects", value: "4+" },
      { label: "Distinction", value: "Super OG" },
      { label: "Assets", value: "Visual" },
    ],
    live: "https://x.com/tushar_087",
    code: "https://x.com/tushar_087",
    accent: "red",
    featured: true,
  },
  {
    name: "400+ students onboarded",
    kind: "Highlight · Customer support",
    year: "present",
    blurb:
      "Technical support and onboarding operations at Shikkha IT — resolving inquiries fast and keeping satisfaction high.",
    detail: "The key liaison between users and internal development teams, turning feedback into fixes.",
    tech: ["Support Ops", "Onboarding", "Documentation"],
    metrics: [
      { label: "Students", value: "400+" },
      { label: "Satisfaction", value: "High" },
      { label: "Role", value: "Liaison" },
    ],
    live: "#/highlight/support",
    code: "#/highlight/support",
    accent: "green",
  },
  {
    name: "Discord communities, managed",
    kind: "Highlight · Community ops",
    year: "ongoing",
    blurb:
      "Daily operations for Web3 & gaming servers — roles, onboarding, moderation, conflict resolution and live virtual events.",
    detail: "High team productivity in fully remote environments, around the clock.",
    tech: ["Discord", "Moderation", "Virtual Events"],
    metrics: [
      { label: "Coverage", value: "24/7" },
      { label: "Role", value: "Lead Mod" },
      { label: "Setting", value: "Remote" },
    ],
    live: "#/highlight/discord",
    code: "#/highlight/discord",
    accent: "yellow",
  },
];

export const education = [
  {
    degree: "B.Sc. in Zoology — 3rd Year (Ongoing)",
    school: "Sirajganj Govt. College",
    period: "Ongoing",
    score: "3rd Year",
    detail:
      "Pursuing an undergraduate science degree while running support, community and content work in parallel — proof of the time management on this page.",
    tags: ["In Progress", "3rd Year", "Science"],
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    school: "Islamia Govt. College · Rajshahi Board",
    period: "2022",
    score: "GPA 4.75 / 5.00",
    detail: "Completed Higher Secondary education with strong academic results under the Rajshahi Education Board.",
    tags: ["Rajshahi Board", "GPA 4.75"],
  },
  {
    degree: "Secondary School Certificate (SSC)",
    school: "B. L. Govt. High School · Rajshahi Board",
    period: "2020",
    score: "GPA 5.00 / 5.00",
    detail: "Achieved a perfect GPA at the secondary level under the Rajshahi Education Board.",
    tags: ["Rajshahi Board", "GPA 5.00", "Perfect Score"],
  },
];

export const certifications = [
  {
    name: "Course on Artificial Intelligence (AI) Tools",
    issuer: "Department of Youth Development (যুব উন্নয়ন অধিদপ্তর)",
    year: "Ongoing",
    id: "in progress",
  },
  { name: "AI Platforms — ChatGPT · Gemini · Claude · Grok", issuer: "Applied daily", year: "Now", id: "advanced" },
  { name: "MS Word · Excel · PowerPoint", issuer: "Applied on the job", year: "Now", id: "proficient" },
  { name: "Flutter — Basic UI & App Setup", issuer: "Self-taught", year: "Now", id: "foundation" },
];

export const speaking = [
  { title: "Supporting 400+ students with high satisfaction rates", venue: "Shikkha IT", year: "•" },
  { title: "2.2k+ organic X audience via visual content strategy", venue: "X / Freelance", year: "•" },
  { title: "Super OG distinctions in global Web3 communities", venue: "Web3", year: "•" },
];

export const languages = [
  { name: "Bengali", level: "Native / Bilingual" },
  { name: "English", level: "Professional Working" },
  { name: "Hindi", level: "Conversational / Spoken" },
];

export const services = [
  {
    title: "Customer support & onboarding",
    copy: "High-volume technical support with clean documentation — 400+ students supported at high satisfaction.",
    icon: "headset",
    tone: "blue" as const,
  },
  {
    title: "Community management",
    copy: "Discord operations, moderation, role management and virtual events for Web3 & gaming communities.",
    icon: "users",
    tone: "red" as const,
  },
  {
    title: "Content & visual branding",
    copy: "Social banners, custom graphics and technical copy that grew a 2.2k+ organic audience on X.",
    icon: "layout",
    tone: "yellow" as const,
  },
  {
    title: "AI workflow automation",
    copy: "ChatGPT, Gemini, Claude and Grok combined with advanced prompt design to speed up any operation.",
    icon: "zap",
    tone: "green" as const,
  },
];

export const testimonials = [
  {
    quote:
      "Proven track record of supporting 400+ active students, managing large Discord communities, and building a 2.2k+ audience on X.",
    name: "The record",
    role: "What the numbers say",
  },
  {
    quote:
      "Secured elite community distinctions — such as Super OG roles — through strategic engagement and quality contribution.",
    name: "Web3 ecosystem",
    role: "Community standing",
  },
];

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Highlights" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
