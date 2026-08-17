export interface CaseStudy {
  problem: string;
  solution: string;
  architecture: string[];
  implementation: string[];
  challenges: string[];
  results: string;
  futureWork: string[];
  architectureDiagram?: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  liveUrl?: string;
  apkUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status: "Live" | "Production" | "Hackathon Winner" | "R&D" | "PERSONAL PROJECT";
  technologies: string[];
  features: string[];
  caseStudy: CaseStudy;
}

export const projects: Project[] = [
  {
    id: "bunkmate",
    number: "01",
    title: "BunkMate",
    category: "AI + Local-First Full Stack",
    tagline: "AI-powered student attendance & academic assistant",
    description: "A mobile-first, privacy-focused academic companion that empowers students to manage attendance thresholds, automate timetable parsing via AI, track assignments, and coordinate schedules locally with zero server surveillance.",
    liveUrl: "https://bunkmate-lilac.vercel.app",
    apkUrl: "https://drive.google.com/file/d/14ueCD6yJ3qqg8BcQCCSpD4Y5NYj3cR24/view?usp=sharing",
    featured: true,
    status: "Live",
    technologies: [
      "React",
      "TypeScript",
      "AI Timetable Extraction",
      "PWA",
      "Web Crypto API",
      "AES-GCM",
      "PBKDF2",
      "Local-First Architecture"
    ],
    features: [
      "AI Timetable Extraction from images/PDFs",
      "Swipe-left to bunk & Swipe-right to attend interactions",
      "Local-first encrypted data persistence using AES-GCM + PBKDF2",
      "Assignment and upcoming exam reminder engine",
      "Peer attendance sync and timetable sharing",
      "Offline-first PWA with installable Android APK capability"
    ],
    caseStudy: {
      problem: "Traditional academic management tools are bloated, rely on centralized servers that harvest student data, and lack intuitive daily logging interfaces suited for mobile student workflows.",
      solution: "BunkMate reinvents student tracking by placing privacy and speed at the center. It uses client-side AI parsing to turn class schedules into actionable timelines, provides a gesture-driven logging interface, and locks all data with client-side cryptography.",
      architecture: [
        "Client Layer: React + TypeScript + Progressive Web App shell",
        "Encryption Layer: PBKDF2 key derivation & AES-GCM 256-bit payload encryption",
        "Storage Layer: IndexedDB + Web Storage with atomic offline synchronization",
        "AI Layer: Gemini/Vision API structured extraction for schedule images"
      ],
      implementation: [
        "Engineered an offline-first state machine that defers network calls and reconciles updates seamlessly when connectivity returns.",
        "Implemented high-performance touch gestures for quick swipe-based class attendance logging.",
        "Integrated Web Crypto API for zero-knowledge data backups.",
        "Built and distributed an installable Android APK build hosted on Google Drive."
      ],
      challenges: [
        "Handling diverse, unstructured schedule formats (scanned documents, photos, erratic grid layouts) reliably with AI vision APIs.",
        "Preventing UI layout jank on low-end Android WebViews while rendering real-time attendance percentage metrics."
      ],
      results: "Built a highly responsive, standalone web/PWA application deployed live on Vercel with zero latency logging, 100% data privacy guarantees, and a standalone Android APK build.",
      futureWork: [
        "Automated push notifications for low-attendance alerts before exams.",
        "Multi-university calendar import standard integration."
      ]
    }
  },
  {
    id: "cardioguard",
    number: "02",
    title: "CardioGuard AI",
    category: "Machine Learning & Healthcare",
    tagline: "AI/ML-powered cardiovascular risk analysis and analytics platform",
    description: "A clinical decision-support analytical platform designed to compute cardiovascular risk scores, validate medical dataset integrity, and deliver explainable predictive insights via backend FastAPI pipelines.",
    liveUrl: "https://cardioguard20.vercel.app/demo",
    featured: true,
    status: "Live",
    technologies: [
      "Python",
      "Machine Learning",
      "FastAPI",
      "React",
      "Data Analytics",
      "SHAP Insights"
    ],
    features: [
      "Supervised ML clinical predictive modeling",
      "Interactive risk score computation dashboard",
      "Dataset integrity and anomaly analysis",
      "SHAP-based feature importance breakdown",
      "RESTful API service built with FastAPI",
      "Responsive analytics visualization"
    ],
    caseStudy: {
      problem: "Clinical risk tools often act as 'black boxes' without offering transparent reasoning behind predictive outputs, making it difficult for users to evaluate model metrics.",
      solution: "CardioGuard AI combines trained supervised classification algorithms with transparent feature ranking (SHAP values) and dataset validation pipelines into a modern clinical dashboard interface.",
      architecture: [
        "Model Backend: FastAPI + Scikit-Learn + Pandas analytical pipeline",
        "Explainability Layer: SHAP (SHapley Additive exPlanations) interpreter engine",
        "Frontend Dashboard: React + Vite + Custom visualization charts"
      ],
      implementation: [
        "Trained high-accuracy predictive models on validated clinical cardiovascular parameters.",
        "Exposed modular REST endpoints for real-time risk assessment and benchmark generation.",
        "Designed structured clinical reporting outputs."
      ],
      challenges: [
        "Ensuring data preprocessing consistency between offline Python ML training pipelines and live JSON payload payloads.",
        "Designing intuitive UI representations for high-dimensional feature importance scores."
      ],
      results: "Successfully operationalized predictive health analytics into an accessible, high-speed clinical web interface.",
      futureWork: [
        "Expanded EHR (Electronic Health Records) FHIR protocol integration.",
        "Multi-model ensemble voting comparisons."
      ]
    }
  },
  {
    id: "atmosphere",
    number: "03",
    title: "Atmosphere AI",
    category: "AI + Weather Analytics",
    tagline: "Intelligent atmospheric weather search & weather experience",
    description: "An AI-enhanced meteorological exploration platform that translates raw weather metrics into natural language summaries, predictive alerts, and interactive spatial weather maps.",
    liveUrl: "https://atmosphere-ai-intelligent-search.vercel.app/demo",
    featured: true,
    status: "Live",
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "React Query",
      "Axios",
      "Weather APIs",
      "AI Integrations"
    ],
    features: [
      "AI-driven natural language atmospheric queries",
      "Real-time meteorological metrics & multi-day forecasts",
      "Smart query parsing for complex atmospheric conditions",
      "Fluid glassmorphic micro-animations",
      "Optimized query caching and fallback telemetry"
    ],
    caseStudy: {
      problem: "Standard weather applications display dense numeric charts without context or actionable advice tailored to everyday user activities.",
      solution: "Atmosphere AI pairs real-time weather APIs with LLM analytical summarization to generate human-readable weather guidance alongside precise technical telemetry.",
      architecture: [
        "Data Aggregator: Axios + React Query weather telemetry fetching",
        "AI Summarizer: Context-aware query processing engine",
        "UI Layer: Framer Motion fluid animations + Tailwind CSS"
      ],
      implementation: [
        "Built resilient API handling with optimistic UI caching to ensure instant query response times.",
        "Designed responsive, atmospheric dynamic background effects keyed to current weather states."
      ],
      challenges: [
        "Gracefully handling API rate-limits and regional data discrepancies.",
        "Maintaining high animation FPS during live atmospheric map transitions."
      ],
      results: "Deployed a fast, interactive weather discovery portal with AI search capabilities.",
      futureWork: [
        "Severe weather alert push notifications.",
        "Historical climate analytics overlay."
      ]
    }
  },
  {
    id: "campusbrain",
    number: "04",
    title: "CampusBrain",
    category: "AI Campus Intelligence Platform",
    tagline: "Intelligent natural-language search across campus documentation & schedules",
    description: "An intelligent campus platform enabling natural-language search across university documentation, schedules, and academic information.",
    featured: true,
    status: "PERSONAL PROJECT",
    technologies: [
      "React",
      "Python Backend",
      "Vector AI Search",
      "REST API"
    ],
    features: [
      "Contextual query system for campus documentation",
      "Student query resolution backend",
      "Dynamic campus notices database indexing",
      "RESTful API architecture"
    ],
    caseStudy: {
      problem: "University news, syllabus documents, and exam schedules are scattered across multiple static portals, creating friction for students seeking instant answers.",
      solution: "CampusBrain indexes campus documentation into an AI search system, allowing instant natural language queries for schedules, policies, and university updates.",
      architecture: [
        "Frontend: React student portal",
        "Backend: Python REST service",
        "AI & Database: Vector indexing & search engine"
      ],
      implementation: [
        "Architected and deployed a complete prototype for intelligent campus search.",
        "Designed student-friendly UI components for effortless query interactions."
      ],
      challenges: [
        "Structuring unformatted PDF campus circulars efficiently."
      ],
      results: "Built and demonstrated a fully functional campus AI assistant prototype.",
      futureWork: [
        "Integration with university LMS (Learning Management Systems).",
        "Multi-department access permissions."
      ]
    }
  }
];
