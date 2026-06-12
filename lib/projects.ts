export type Project = {
  slug: string
  title: string
  tagline: string
  description: string
  tags: string[]
  category: "professional" | "client" | "personal"
  featured: boolean
  liveUrl?: string
  githubUrl?: string
  highlights: string[]
}

export const projects: Project[] = [
  {
    slug: "phoenix-lei-portal",
    title: "Phoenix – LEI Portal",
    tagline: "Production-grade Go backend for Legal Entity Identifier management",
    description:
      "Built a full-stack platform for LEI lifecycle management at Vayana Network. Handles LEI submissions, renewals, LOU transfers, and payment flows for enterprise clients.",
    tags: ["Go", "Gin", "MySQL", "GORM", "AWS", "Razorpay", "Docker"],
    category: "professional",
    featured: true,
    highlights: [
      "Integrated GLEIF, Felix, and Rubix APIs for LEI data",
      "Actor-model background workers for async LEI lifecycle management",
      "Razorpay payment flow with audit logs and RBAC",
      "AWS S3 document storage with PDF/Excel report generation",
      "Internationalization (i18n) support",
    ],
  },
  {
    slug: "meeko-go",
    title: "Meeko.go – Org Management Microservice",
    tagline: "Enterprise-grade Go microservice for organization and user management",
    description:
      "Production Go microservice with clean architecture for managing organizations and users at scale. Implements enterprise-level security with Keycloak and ClamAV.",
    tags: ["Go", "Gin", "JWT", "Keycloak", "AWS SNS", "Docker", "ClamAV"],
    category: "professional",
    featured: true,
    highlights: [
      "Clean architecture: controllers → services → repositories",
      "JWT + Keycloak auth with RBAC and custom middleware",
      "Bulk user upload via Excel with ClamAV virus scanning",
      "AWS SNS notifications with Docker-based deployments",
    ],
  },
  {
    slug: "ar-13",
    title: "AR-13 – Team Management Platform",
    tagline: "Jira-like internal platform for engineering and construction firms",
    description:
      "Full-featured project management platform tailored for engineering and construction teams, with task tracking, drawing registry, and calendar built from scratch.",
    tags: ["Next.js", "PostgreSQL", "Prisma", "Supabase", "TypeScript"],
    category: "client",
    featured: true,
    highlights: [
      "Jira-inspired task tracking with custom workflows",
      "Drawing registry for construction document management",
      "Team calendar and scheduling",
      "Real-time updates with Supabase",
    ],
  },
  {
    slug: "ssit-equitywala",
    title: "SSIT / Equitywala",
    tagline: "Stock advisory platform for retail investors",
    description:
      "Stock advisory web platform built for equitywala.com, providing market insights and advisory services to retail investors.",
    tags: ["React", "TypeScript", "Node.js"],
    category: "client",
    featured: false,
    liveUrl: "https://ssit.equitywala.com",
    highlights: [
      "Stock market advisory dashboard",
      "Real-time data integration",
      "Responsive design for mobile investors",
    ],
  },
  {
    slug: "womb-atlas",
    title: "Womb Atlas – Voice AI Platform",
    tagline: "Multilingual AI-powered uterine health symptom tracker",
    description:
      "Client project via Intellysis Digital. A Voice AI platform for tracking and analyzing uterine health symptoms across multiple languages.",
    tags: ["Voice AI", "Next.js", "TypeScript", "Node.js"],
    category: "client",
    featured: false,
    highlights: [
      "Multilingual voice input and symptom tracking",
      "AI-powered health data analysis",
      "Accessible design for diverse user base",
    ],
  },
  {
    slug: "crm-hub",
    title: "CRM Hub – Real-Time Project Management",
    tagline: "Real-time job card system for team collaboration",
    description:
      "WebSocket-powered project management tool with real-time updates. Reduced task completion time by 90% through instant sync across team members.",
    tags: ["Next.js", "PostgreSQL", "Socket.io", "TypeScript"],
    category: "personal",
    featured: false,
    highlights: [
      "Real-time Socket.io event system for instant updates",
      "90% reduction in task completion time",
      "30% improvement in team productivity",
      "CRUD operations with live collaboration",
    ],
  },
  {
    slug: "artificium",
    title: "Artificium – AI Application Platform",
    tagline: "ChatGPT-like AI platform with text and image support",
    description:
      "Personal AI prompt system supporting text and image inputs via OpenAI APIs, with real-time communication between users and AI agents.",
    tags: ["React", "OpenAI API", "Socket.io", "Vite"],
    category: "personal",
    featured: false,
    highlights: [
      "OpenAI API integration for text and image input",
      "66% improvement in user interaction quality",
      "Socket.io real-time AI agent communication",
      "Vite-optimized frontend build",
    ],
  },
  {
    slug: "heckto",
    title: "Heckto – Furniture E-Commerce",
    tagline: "Scalable furniture store with SSR and SEO optimization",
    description:
      "Full-stack Next.js e-commerce platform for furniture, leveraging SSR, SSG, and dynamic routing for maximum SEO performance.",
    tags: ["Next.js", "TypeScript", "CSS"],
    category: "personal",
    featured: false,
    highlights: [
      "46% increase in organic traffic via SSR/SSG",
      "32% reduction in page load times",
      "Dynamic routing and API routes",
    ],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}
