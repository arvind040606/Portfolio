export interface SkillItem {
  name: string;
  usedIn: string[];
  highlight?: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    description: "Core programming languages for application logic, systems, & ML",
    skills: [
      { name: "TypeScript", usedIn: ["BunkMate", "Atmosphere AI", "ARVIND.OS"], highlight: true },
      { name: "Python", usedIn: ["CardioGuard AI", "Navi Assistant", "ML Pipelines"], highlight: true },
      { name: "JavaScript", usedIn: ["Web Applications", "Node Services"] },
      { name: "C++", usedIn: ["Algorithms", "Hardware / ESP32"] },
      { name: "Java", usedIn: ["Android Development", "Object Oriented Systems"] },
      { name: "SQL", usedIn: ["Database Schemas", "Query Optimization"] },
    ],
  },
  {
    title: "Frontend",
    description: "Modern web architecture for high-performance visual applications",
    skills: [
      { name: "React", usedIn: ["BunkMate", "CardioGuard AI", "Atmosphere AI"], highlight: true },
      { name: "TypeScript", usedIn: ["Type-Safe Interfaces", "Component Libraries"] },
      { name: "Vite", usedIn: ["Build Tooling", "Hot Module Reloading"] },
      { name: "Tailwind CSS", usedIn: ["Design Systems", "Custom UI Themes"], highlight: true },
      { name: "Framer Motion", usedIn: ["Micro-Animations", "Page Transitions"] },
      { name: "PWA Capabilities", usedIn: ["BunkMate Offline Engine"] },
    ],
  },
  {
    title: "Backend",
    description: "Scalable REST APIs, real-time channels, & microservices",
    skills: [
      { name: "FastAPI", usedIn: ["CardioGuard AI", "Navi Backend"], highlight: true },
      { name: "Node.js", usedIn: ["Serverless APIs", "Backend Tooling"] },
      { name: "Flask", usedIn: ["ML API Microservices"] },
      { name: "REST APIs", usedIn: ["All Full-Stack Systems"], highlight: true },
      { name: "WebSockets", usedIn: ["Real-time Voice Pipelines"] },
    ],
  },
  {
    title: "AI / ML",
    description: "Intelligent processing models, NLP, & voice interfaces",
    skills: [
      { name: "Artificial Intelligence", usedIn: ["BunkMate", "Atmosphere AI", "Navi"], highlight: true },
      { name: "Machine Learning", usedIn: ["CardioGuard Risk Scoring"], highlight: true },
      { name: "Gemini API", usedIn: ["Schedule Parsing", "Query AI"] },
      { name: "Speech-to-Text", usedIn: ["Navi Voice Pipeline"] },
      { name: "Text-to-Speech", usedIn: ["Navi Audio Synthesis"] },
      { name: "AI Applications", usedIn: ["Contextual Query Assistants"] },
    ],
  },
  {
    title: "Databases",
    description: "Local-first storage engines, relational schemas, & cloud ORMs",
    skills: [
      { name: "SQLite", usedIn: ["Local-first Desktop/Mobile"], highlight: true },
      { name: "PostgreSQL", usedIn: ["Relational Cloud Storage"] },
      { name: "Prisma", usedIn: ["ORM & Migrations"] },
      { name: "Turso", usedIn: ["Distributed SQLite Edge Data"] },
      { name: "IndexedDB / WebCrypto", usedIn: ["BunkMate Zero-Knowledge"] },
    ],
  },
  {
    title: "Tools & Deployment",
    description: "Version control, mobile bundling, & edge deployment platforms",
    skills: [
      { name: "Git & GitHub", usedIn: ["Version Control", "CI/CD"], highlight: true },
      { name: "Vercel", usedIn: ["Frontend Production Deployments"], highlight: true },
      { name: "Render", usedIn: ["Python Backend Hosting"] },
      { name: "Railway", usedIn: ["Database & Container Deployment"] },
      { name: "Android Studio / Capacitor", usedIn: ["BunkMate Native Packaging"] },
      { name: "Google Cloud", usedIn: ["API Infrastructure & AI Models"] },
    ],
  },
];
