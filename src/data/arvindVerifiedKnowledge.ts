// =========================================================================
// ARVIND VERIFIED KNOWLEDGE BASE & LIGHTWEIGHT RETRIEVAL LAYER
// =========================================================================

export interface ProjectKnowledge {
  name: string;
  tagline: string;
  purpose: string;
  architecture: string;
  technologies: string[];
  features: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
}

export interface ProfileKnowledge {
  name: string;
  nickname: string;
  education: string;
  college: string;
  location: string;
  dob: string;
  bio: string;
  tagline: string;
  focus: string;
  contact: {
    email: string;
    linkedin: string;
    github: string;
  };
  skills: {
    languages: string[];
    frontend: string[];
    backend: string[];
    databases: string[];
    ai_ml: string[];
    security: string[];
    tools: string[];
  };
}

// Calculate dynamic age from DOB (June 6, 2004)
export function getArvindAge(): number {
  const dob = new Date(2004, 5, 6); // Month index 5 is June
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

export const ARVIND_PROFILE_KNOWLEDGE: ProfileKnowledge = {
  name: "Arvind Madaan",
  nickname: "Arry",
  education: "B.Tech in Computer Science Engineering",
  college: "Amritsar Group of Colleges (AGC), Amritsar, Punjab",
  location: "Punjab, India",
  dob: "2004-06-06",
  bio: "Computer Science Engineering student focused on building AI-powered full-stack products, privacy-first architectures, and intelligent web applications.",
  tagline: "Building intelligent products, not just websites.",
  focus: "AI + Full-Stack Product Development",
  contact: {
    email: "arvindmadaan27@gmail.com",
    linkedin: "https://www.linkedin.com/in/arvindmadaan2704",
    github: "https://github.com/arvind040606",
  },
  skills: {
    languages: ["Python", "TypeScript", "JavaScript", "Java", "C++", "SQL"],
    frontend: ["React", "Vite", "Tailwind CSS", "Framer Motion", "HTML5", "Vanilla CSS"],
    backend: ["Python", "FastAPI", "Flask", "Node.js", "REST APIs", "WebSockets"],
    databases: ["PostgreSQL", "Supabase", "IndexedDB"],
    ai_ml: ["XGBoost", "SHAP TreeExplainer", "Scikit-Learn", "Gemini 1.5 Flash Vision OCR", "SpeechRecognition (STT)", "SpeechSynthesis (TTS)", "OpenMeteo APIs"],
    security: ["Web Crypto API", "256-bit AES-GCM", "PBKDF2 Key Derivation", "Local-first Zero-Knowledge Storage"],
    tools: ["Vite", "Git", "GitHub", "Vercel", "Postman", "VS Code"],
  },
};

export const ARVIND_PROJECTS_KNOWLEDGE: Record<string, ProjectKnowledge> = {
  bunkmate: {
    name: "BunkMate",
    tagline: "Offline-first AI student attendance & academic companion",
    purpose: "Provides students with an effortless, privacy-preserving mobile assistant to log attendance, calculate safe-bunk thresholds, and parse schedule timetables.",
    architecture: "Mobile-first Progressive Web App (PWA) with client-side IndexedDB persistence, Web Crypto encryption, and Gemini Vision OCR integration.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Web Crypto API (AES-GCM, PBKDF2)", "Gemini 1.5 Flash Vision OCR", "IndexedDB", "PWA"],
    features: [
      "AI Timetable Extraction: Scans image or PDF timetables using Gemini 1.5 Flash Vision OCR to automatically parse course codes, grid periods, and schedule times.",
      "Swipe Attendance Interactions: Swipe right to log attendance, swipe left to bunk.",
      "Zero-Knowledge Local Security: All timetable and attendance data is encrypted with 256-bit AES-GCM (PBKDF2 key derivation) before writing to client IndexedDB.",
      "Offline PWA Support: Functions smoothly without an internet connection.",
    ],
    liveDemoUrl: "https://bunkmate-lilac.vercel.app/",
    githubUrl: "https://github.com/arvind040606",
  },
  cardioguard: {
    name: "CardioGuard AI",
    tagline: "Clinical cardiovascular risk prediction & explainable AI platform",
    purpose: "Delivers real-time cardiovascular risk probability scoring and feature contribution explainability for clinical decision support.",
    architecture: "Microservice ML inference pipeline with a Python/FastAPI backend and dynamic React analytical dashboard.",
    technologies: ["Python", "FastAPI", "XGBoost", "SHAP TreeExplainer", "Scikit-Learn", "React", "TypeScript", "Vite", "Tailwind CSS"],
    features: [
      "XGBoost Risk Classifier: Evaluates normalized clinical metrics (Age, Blood Pressure, Cholesterol, Max Heart Rate) through trained decision trees to output sigmoid risk probability.",
      "SHAP TreeExplainer Matrix: Computes exact additive feature contributions (phi_i) to show clinicians why a patient was classified as low or elevated risk.",
      "Sub-Millisecond Inference: Measures real-time inference latency using performance.now() across normalization and probability scoring.",
      "Dataset Integrity Verification: Preprocessing layer ensures zero input missingness or out-of-range clinical anomalies.",
    ],
    liveDemoUrl: "https://cardioguard20.vercel.app/",
    githubUrl: "https://github.com/arvind040606",
  },
  atmosphere: {
    name: "Atmosphere AI",
    tagline: "Intelligent natural-language weather search & atmospheric telemetry platform",
    purpose: "Translates conversational weather queries into real-time meteorological forecasts and spatial coordinates telemetry.",
    architecture: "React + Vite frontend integrated with OpenMeteo Geocoding & Forecast APIs and an NLP intent parser.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Axios", "OpenMeteo Geocoding API", "OpenMeteo Forecast API"],
    features: [
      "Natural-Language Intent Parser: Extracts intent (Precipitation vs Temperature vs Wind), timeframe (Tonight, Tomorrow, Weekend), and target location from raw query strings.",
      "OpenMeteo Telemetry: Fetches live WMO weather codes, hourly precipitation probabilities, wind speeds, and temperatures.",
      "Measured API Latency: Displays actual round-trip HTTP request times and geocoding confidence scores.",
    ],
    liveDemoUrl: "https://atmosphere-ai-intelligent-search.vercel.app/",
    githubUrl: "https://github.com/arvind040606",
  },
  campusbrain: {
    name: "CampusBrain",
    tagline: "Hackathon AI student assistant for campus workflows",
    purpose: "Automates student campus administrative queries, course index lookups, and schedule resolution using natural language.",
    architecture: "Python REST API backend connected to PostgreSQL database and vector search indices.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "REST API", "AI Vector Search"],
    features: [
      "Campus natural language querying",
      "Dynamic index resolution for university workflows",
    ],
    githubUrl: "https://github.com/arvind040606",
  },
  navi: {
    name: "Navi Voice Assistant",
    tagline: "Hands-free continuous AI voice assistant",
    purpose: "Provides continuous, hands-free voice interactions across web and Android environments.",
    architecture: "Browser SpeechRecognition (STT) and SpeechSynthesis (TTS) paired with FastAPI WebSocket streaming backend.",
    technologies: ["JavaScript", "SpeechRecognition API", "SpeechSynthesis API", "FastAPI", "WebSockets"],
    features: [
      "Continuous hands-free voice loop",
      "Real-time WebSocket streaming",
    ],
    githubUrl: "https://github.com/arvind040606",
  },
};

/**
 * Pruned Context Retriever for Gemini Calls
 * Extracts only relevant facts for the query to optimize tokens.
 */
export function retrieveContextForQuery(query: string, historySummary: string = ""): string {
  const text = (query + " " + historySummary).toLowerCase();
  const chunks: string[] = [];

  // Profile basics
  chunks.push(
    `ARVIND PROFILE: ${ARVIND_PROFILE_KNOWLEDGE.name} (${ARVIND_PROFILE_KNOWLEDGE.nickname}), ${getArvindAge()} years old. Education: ${ARVIND_PROFILE_KNOWLEDGE.education} at ${ARVIND_PROFILE_KNOWLEDGE.college}. Location: ${ARVIND_PROFILE_KNOWLEDGE.location}. Focus: ${ARVIND_PROFILE_KNOWLEDGE.focus}. Contact: Email=${ARVIND_PROFILE_KNOWLEDGE.contact.email}, LinkedIn=${ARVIND_PROFILE_KNOWLEDGE.contact.linkedin}, GitHub=${ARVIND_PROFILE_KNOWLEDGE.contact.github}.`
  );

  // Check BunkMate
  if (
    text.includes("bunkmate") ||
    text.includes("bunk") ||
    text.includes("attendance") ||
    text.includes("timetable") ||
    text.includes("encrypt") ||
    text.includes("aes") ||
    text.includes("ocr")
  ) {
    const p = ARVIND_PROJECTS_KNOWLEDGE.bunkmate;
    chunks.push(
      `PROJECT - ${p.name}: ${p.tagline}. Purpose: ${p.purpose}. Architecture: ${p.architecture}. Tech: ${p.technologies.join(", ")}. Features: ${p.features.join(" | ")}.`
    );
  }

  // Check CardioGuard
  if (
    text.includes("cardio") ||
    text.includes("cardioguard") ||
    text.includes("heart") ||
    text.includes("xgboost") ||
    text.includes("shap") ||
    text.includes("medical") ||
    text.includes("clinical")
  ) {
    const p = ARVIND_PROJECTS_KNOWLEDGE.cardioguard;
    chunks.push(
      `PROJECT - ${p.name}: ${p.tagline}. Purpose: ${p.purpose}. Architecture: ${p.architecture}. Tech: ${p.technologies.join(", ")}. Features: ${p.features.join(" | ")}.`
    );
  }

  // Check Atmosphere AI
  if (
    text.includes("atmosphere") ||
    text.includes("weather") ||
    text.includes("openmeteo") ||
    text.includes("forecast")
  ) {
    const p = ARVIND_PROJECTS_KNOWLEDGE.atmosphere;
    chunks.push(
      `PROJECT - ${p.name}: ${p.tagline}. Purpose: ${p.purpose}. Architecture: ${p.architecture}. Tech: ${p.technologies.join(", ")}. Features: ${p.features.join(" | ")}.`
    );
  }

  // Check CampusBrain & Navi
  if (text.includes("campusbrain") || text.includes("campus")) {
    const p = ARVIND_PROJECTS_KNOWLEDGE.campusbrain;
    chunks.push(`PROJECT - ${p.name}: ${p.tagline}. Tech: ${p.technologies.join(", ")}. Purpose: ${p.purpose}`);
  }
  if (text.includes("navi") || text.includes("voice")) {
    const p = ARVIND_PROJECTS_KNOWLEDGE.navi;
    chunks.push(`PROJECT - ${p.name}: ${p.tagline}. Tech: ${p.technologies.join(", ")}. Purpose: ${p.purpose}`);
  }

  // Check Skills
  if (
    text.includes("skill") ||
    text.includes("stack") ||
    text.includes("technology") ||
    text.includes("language") ||
    text.includes("python") ||
    text.includes("react")
  ) {
    const s = ARVIND_PROFILE_KNOWLEDGE.skills;
    chunks.push(
      `VERIFIED SKILLS: Languages: ${s.languages.join(", ")}. Frontend: ${s.frontend.join(", ")}. Backend: ${s.backend.join(", ")}. Databases: ${s.databases.join(", ")}. AI/ML: ${s.ai_ml.join(", ")}. Security: ${s.security.join(", ")}.`
    );
  }

  return chunks.join("\n\n");
}
