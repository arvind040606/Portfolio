export interface JourneyMilestone {
  id: string;
  step: string;
  title: string;
  period: string;
  description: string;
  keyLearnings: string[];
  relatedProjects: string[];
  technologies: string[];
}

export const journeyMilestones: JourneyMilestone[] = [
  {
    id: "cs",
    step: "01",
    title: "Computer Science",
    period: "Foundation Phase",
    description: "Enrolled in Computer Science Engineering. Built strong theoretical foundations in data structures, algorithms, discrete mathematics, and computer architecture.",
    keyLearnings: ["Data Structures & Algorithms", "Operating Systems", "Object-Oriented Design"],
    relatedProjects: ["Academic Systems"],
    technologies: ["C++", "Java", "Data Structures"],
  },
  {
    id: "programming",
    step: "02",
    title: "Programming Mastery",
    period: "Problem Solving",
    description: "Focused on problem-solving with C++ and Python. Mastered core algorithmic efficiency, modular code design, and structured system building.",
    keyLearnings: ["Algorithmic Logic", "Memory Optimization", "Problem Solving"],
    relatedProjects: ["Algorithm Benchmarks"],
    technologies: ["C++", "Python", "Git"],
  },
  {
    id: "web-dev",
    step: "03",
    title: "Web Development",
    period: "Frontend Exploration",
    description: "Shifted into client-side engineering. Deep-dived into modern HTML5, CSS layout engines, JavaScript ES6+, and component-driven UIs.",
    keyLearnings: ["DOM Manipulation", "Responsive Design", "Client-Side State"],
    relatedProjects: ["Interactive Web Widgets"],
    technologies: ["JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    id: "full-stack",
    step: "04",
    title: "Full-Stack Development",
    period: "System Architecture",
    description: "Expanded into end-to-end full-stack architectures. Built REST APIs using Python (FastAPI/Flask) and Node.js connected to SQL databases.",
    keyLearnings: ["RESTful API Design", "Relational Database Schemas", "Type Safety"],
    relatedProjects: ["CampusBrain", "Cloud Dashboards"],
    technologies: ["React", "TypeScript", "FastAPI", "PostgreSQL", "SQLite"],
  },
  {
    id: "ai-ml",
    step: "05",
    title: "AI / Machine Learning",
    period: "Intelligent Systems",
    description: "Explored predictive data science and supervised machine learning algorithms. Applied feature engineering and explainability to healthcare datasets.",
    keyLearnings: ["Supervised Learning", "SHAP Feature Ranking", "Model Evaluation"],
    relatedProjects: ["CardioGuard AI"],
    technologies: ["Python", "Scikit-Learn", "FastAPI", "Data Analytics"],
  },
  {
    id: "ai-products",
    step: "06",
    title: "AI-Powered Products",
    period: "LLMs & Voice",
    description: "Integrated generative AI APIs, vision parsing models, and real-time speech processing pipelines into usable web and voice user interfaces.",
    keyLearnings: ["Gemini API", "Speech-to-Text / TTS", "Multimodal Extraction"],
    relatedProjects: ["Atmosphere AI", "Navi Voice Assistant"],
    technologies: ["Gemini API", "WebSockets", "Speech APIs", "React"],
  },
  {
    id: "product-building",
    step: "07",
    title: "Product Building",
    period: "Production Deployment",
    description: "Combining AI, mobile-first design, zero-knowledge encryption, and local-first architecture to craft complete production software that solves real user pain points.",
    keyLearnings: ["Local-First Architecture", "AES Encryption", "Product UX Strategy"],
    relatedProjects: ["BunkMate", "ARVIND.OS"],
    technologies: ["PWA", "Web Crypto API", "Vercel", "Local Storage"],
  },
];
