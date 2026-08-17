export interface ArvindProfile {
  name: string;
  nickname: string;
  title: string;
  email: string;
  linkedin: string;
  github: string;
  location: string;
  bio: string;
  tagline: string;
  status: string;
  mode: string;
  focus: string;
  stats: {
    projectsCount: string;
    techCount: string;
    focusAreas: string;
  };
  education: {
    degree: string;
    institution: string;
    status: string;
  };
}

export const arvindProfile: ArvindProfile = {
  name: "Arvind Madaan",
  nickname: "Arry",
  title: "AI & Full-Stack Developer",
  email: "arvindmadaan27@gmail.com",
  linkedin: "https://www.linkedin.com/in/arvindmadaan2704",
  github: "https://github.com/arvind040606",
  location: "Punjab, India",
  bio: "Computer Science Engineering student focused on building AI-powered full-stack products and intelligent digital experiences.",
  tagline: "Building intelligent products, not just websites.",
  status: "ONLINE",
  mode: "BUILDING",
  focus: "AI + FULLSTACK",
  stats: {
    projectsCount: "04+",
    techCount: "10+",
    focusAreas: "Intelligent Products",
  },
  education: {
    degree: "B.Tech in Computer Science Engineering",
    institution: "Engineering University",
    status: "Actively Learning & Building",
  },
};

export const AI_KNOWLEDGE_BASE = [
  {
    keywords: ["who", "about", "arry", "arvind", "background", "biography"],
    answer: "Arvind Madaan (also known as Arry) is a Computer Science Engineering student based in Punjab, India. He specializes in building AI-powered full-stack products, mobile apps, and intelligent digital systems with high performance and user-centric architecture.",
  },
  {
    keywords: ["bunkmate", "bunk", "attendance"],
    answer: "BunkMate (https://bunkmate-lilac.vercel.app/) is Arvind's flagship project—an AI-powered student attendance & academic assistant. It features timetable extraction, swipe-to-attend/bunk interactions, AES-GCM encrypted local-first data, PWA/Android support, and zero server tracking.",
  },
  {
    keywords: ["cardioguard", "cardio", "health", "heart", "medical"],
    answer: "CardioGuard AI (https://cardioguard20.vercel.app/) is a clinical cardiovascular risk analysis and analytics platform built with Python, ML models, FastAPI, and React. It features dataset integrity verification and SHAP-based feature importance breakdown.",
  },
  {
    keywords: ["atmosphere", "weather", "search"],
    answer: "Atmosphere AI (https://atmosphere-ai-intelligent-search.vercel.app/) is an intelligent weather search & atmospheric analytics engine built using React, Vite, Framer Motion, Axios, and AI integrations for contextual forecast insights.",
  },
  {
    keywords: ["campusbrain", "campus", "hackathon"],
    answer: "CampusBrain is an AI-powered student assistant platform built during a hackathon. It features full-stack architecture, dynamic database indexing, AI querying, and automated campus workflow support.",
  },
  {
    keywords: ["tech", "skills", "stack", "languages", "frontend", "backend", "ai"],
    answer: "Arvind works across Python, TypeScript, JavaScript, Java, C++, and SQL. His frontend stack includes React, Vite, Tailwind CSS, and Framer Motion. Backend expertise spans FastAPI, Flask, Node.js, REST APIs, and WebSockets. For AI/ML, he utilizes Gemini API, Speech/TTS pipelines, and custom ML models.",
  },
  {
    keywords: ["navi", "voice", "assistant", "speech"],
    answer: "Navi is Arvind's experimental personal AI voice assistant concept featuring real-time speech recognition, text-to-speech synthesis, conversational context memory, and Android integration.",
  },
  {
    keywords: ["robot", "esp32", "hardware", "embedded"],
    answer: "Arvind experiments with embedded hardware including ESP32 microcontrollers, INMP441 I2S microphones, DFPlayer Mini audio modules, SSD1306 OLED displays, and HC-SR04 ultrasonic sensors for voice-controlled robotics.",
  },
  {
    keywords: ["contact", "email", "hire", "reach", "linkedin", "github"],
    answer: "You can reach Arvind via email at arvindmadaan27@gmail.com, on LinkedIn at https://www.linkedin.com/in/arvindmadaan2704, or explore his code repositories on GitHub at https://github.com/arvind040606.",
  },
  {
    keywords: ["resume", "cv"],
    answer: "You can download or view Arvind's resume directly using the 'View Resume' button in the navigation bar or top hero section.",
  }
];

export function queryArvindAI(prompt: string): string {
  const clean = prompt.toLowerCase();
  for (const item of AI_KNOWLEDGE_BASE) {
    if (item.keywords.some((k) => clean.includes(k))) {
      return item.answer;
    }
  }
  return `Arvind Madaan is a CSE student & AI Full-Stack Developer. I can tell you about his projects (BunkMate, CardioGuard AI, Atmosphere AI, CampusBrain), his AI voice assistant Navi, embedded hardware experiments, tech stack, or how to contact him. What would you like to know?`;
}
