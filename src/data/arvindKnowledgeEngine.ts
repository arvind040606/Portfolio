// =========================================================================
// ARVIND.AI GROUNDED PERSONA & CONTEXT KNOWLEDGE ENGINE
// =========================================================================

export type KnowledgeTopic =
  | 'bunkmate'
  | 'cardioguard'
  | 'atmosphere'
  | 'campusbrain'
  | 'navi'
  | 'skills'
  | 'identity'
  | 'contact'
  | 'hire'
  | 'interview'
  | 'general';

export interface ContextState {
  activeTopic: KnowledgeTopic;
  lastUserQuery: string;
  turns: number;
}

let globalContext: ContextState = {
  activeTopic: 'general',
  lastUserQuery: '',
  turns: 0,
};

export function resetContextState() {
  globalContext = {
    activeTopic: 'general',
    lastUserQuery: '',
    turns: 0,
  };
}

export function getActiveTopic(): KnowledgeTopic {
  return globalContext.activeTopic;
}

export function getContextualSuggestions(topic: KnowledgeTopic = globalContext.activeTopic): string[] {
  switch (topic) {
    case 'bunkmate':
      return [
        "Why did Arvind choose offline-first?",
        "How does timetable AI OCR work?",
        "How is attendance data encrypted?",
        "Tell me about CardioGuard AI",
      ];
    case 'cardioguard':
      return [
        "Why use XGBoost for cardiac risk?",
        "How does SHAP explain predictions?",
        "What's the inference latency?",
        "Tell me about BunkMate",
      ];
    case 'atmosphere':
      return [
        "How does the weather NLP engine work?",
        "Which APIs does Atmosphere use?",
        "How does location resolution work?",
        "Tell me about BunkMate",
      ];
    case 'campusbrain':
    case 'navi':
      return [
        "Tell me about BunkMate",
        "Tell me about CardioGuard AI",
        "What is Arvind's primary tech stack?",
        "Is Arvind open for engineering roles?",
      ];
    case 'hire':
    case 'contact':
      return [
        "What are Arvind's primary skills?",
        "What's his GitHub link?",
        "What is Arvind's best project?",
        "Tell me about BunkMate",
      ];
    default:
      return [
        "What's Arvind's best project?",
        "Why did he build BunkMate?",
        "How does CardioGuard AI use SHAP?",
        "Is Arvind open for engineering roles?",
      ];
  }
}

export function processArvindAIQuery(userPrompt: string): { response: string; topic: KnowledgeTopic; suggestions: string[] } {
  const raw = userPrompt.trim();
  const q = raw.toLowerCase();
  globalContext.turns += 1;
  globalContext.lastUserQuery = raw;

  // 1. Identity & Clarification Questions
  if (
    q.includes('are you arvind') ||
    q.includes('are you actually arvind') ||
    q.includes('are you real') ||
    q.includes('are you human')
  ) {
    globalContext.activeTopic = 'identity';
    return {
      response:
        "No — I'm ARVIND.AI, a virtual AI representation of Arvind Madaan. I'm trained on his verified portfolio, technical architectures, and development philosophy. I can explain his projects like BunkMate or CardioGuard, discuss his full-stack stack, or help you connect with him!",
      topic: 'identity',
      suggestions: getContextualSuggestions('identity'),
    };
  }

  if (
    q.startsWith('who are you') ||
    q.startsWith('what is this') ||
    q.includes('what are you') ||
    q.includes('tell me about yourself') ||
    q.includes('who is arvind') ||
    q.includes('about arry') ||
    q.includes('about arvind')
  ) {
    globalContext.activeTopic = 'identity';
    return {
      response:
        "Hey! Arvind Madaan (also known as Arry) is a Computer Science Engineering student and AI/Full-Stack developer from Punjab, India. He builds high-performance, privacy-first web platforms and intelligent AI tools like BunkMate, CardioGuard AI, and Atmosphere AI.",
      topic: 'identity',
      suggestions: getContextualSuggestions('identity'),
    };
  }

  // 2. Natural Interview Questions
  if (
    q.includes('best project') ||
    q.includes('top project') ||
    q.includes('favorite project') ||
    q.includes('most proud')
  ) {
    globalContext.activeTopic = 'bunkmate';
    return {
      response:
        "Yeah — Arvind considers BunkMate his flagship full-stack project because of its offline-first privacy architecture and direct daily impact for students. That said, CardioGuard AI is his most technical ML project given its trained XGBoost classification model and SHAP TreeExplainer explainability engine.",
      topic: 'bunkmate',
      suggestions: getContextualSuggestions('bunkmate'),
    };
  }

  if (
    q.includes('why did you build bunkmate') ||
    q.includes('why bunkmate') ||
    q.includes('reason for bunkmate')
  ) {
    globalContext.activeTopic = 'bunkmate';
    return {
      response:
        "Actually, Arvind built BunkMate because traditional student attendance apps are bloated, invasive, and rely on server tracking. He wanted a fast, mobile-first companion where attendance calculations, AI timetable vision parsing, and schedule security happen 100% locally on the device.",
      topic: 'bunkmate',
      suggestions: getContextualSuggestions('bunkmate'),
    };
  }

  if (
    q.includes('hardest part') ||
    q.includes('biggest challenge') ||
    q.includes('difficult challenge')
  ) {
    globalContext.activeTopic = 'bunkmate';
    return {
      response:
        "One of the toughest challenges Arvind solved in BunkMate was handling messy, unstructured scanned timetables ( erratic grid layouts, mobile photos) reliably with AI vision APIs while keeping the UI butter-smooth on low-end Android WebViews.",
      topic: 'bunkmate',
      suggestions: getContextualSuggestions('bunkmate'),
    };
  }

  if (
    q.includes('hire') ||
    q.includes('job') ||
    q.includes('open for roles') ||
    q.includes('available for work') ||
    q.includes('work together')
  ) {
    globalContext.activeTopic = 'hire';
    return {
      response:
        "Yeah! Arvind is actively looking for AI and Full-Stack Engineering roles where he can build high-impact digital products. You can reach out directly via email at arvindmadaan27@gmail.com or connect on LinkedIn (linkedin.com/in/arvindmadaan2704).",
      topic: 'hire',
      suggestions: getContextualSuggestions('hire'),
    };
  }

  if (
    q.includes('github') ||
    q.includes('code repository') ||
    q.includes('source code')
  ) {
    globalContext.activeTopic = 'contact';
    return {
      response:
        "You can check out all of Arvind's open-source repositories and project code on GitHub at https://github.com/arvind040606.",
      topic: 'contact',
      suggestions: getContextualSuggestions('contact'),
    };
  }

  if (
    q.includes('contact') ||
    q.includes('email') ||
    q.includes('reach') ||
    q.includes('linkedin')
  ) {
    globalContext.activeTopic = 'contact';
    return {
      response:
        "You can connect with Arvind via Gmail at arvindmadaan27@gmail.com or on LinkedIn at https://www.linkedin.com/in/arvindmadaan2704.",
      topic: 'contact',
      suggestions: getContextualSuggestions('contact'),
    };
  }

  // 3. Technical Stack Questions
  if (
    q.includes('stack') ||
    q.includes('technology') ||
    q.includes('technologies') ||
    q.includes('languages') ||
    q.includes('skills')
  ) {
    globalContext.activeTopic = 'skills';
    return {
      response:
        "Arvind's primary stack spans React, TypeScript, Vite, Tailwind CSS, and Framer Motion on the frontend. On the backend and ML side, he uses Python, FastAPI, XGBoost, Scikit-Learn, Web Crypto APIs (AES-GCM, PBKDF2), REST APIs, and WebSockets.",
      topic: 'skills',
      suggestions: getContextualSuggestions('skills'),
    };
  }

  // 4. Topic-Based & Context Follow-Up Resolution

  // --- BUNKMATE DOMAIN ---
  const isBunkmateQuery =
    q.includes('bunkmate') ||
    q.includes('bunk') ||
    q.includes('timetable') ||
    (globalContext.activeTopic === 'bunkmate' &&
      (q.includes('it') || q.includes('encrypt') || q.includes('ocr') || q.includes('swipe') || q.includes('offline') || q.includes('security')));

  if (isBunkmateQuery) {
    globalContext.activeTopic = 'bunkmate';

    if (q.includes('encrypt') || q.includes('security') || q.includes('aes') || q.includes('pbkdf2') || (globalContext.activeTopic === 'bunkmate' && q.includes('encrypt'))) {
      return {
        response:
          "Actually, BunkMate relies on client-side Web Crypto APIs. It uses PBKDF2 for key derivation from user passphrases and 256-bit AES-GCM for payload encryption before persisting to IndexedDB. No unencrypted student data ever leaves the device.",
        topic: 'bunkmate',
        suggestions: getContextualSuggestions('bunkmate'),
      };
    }

    if (q.includes('offline') || q.includes('local') || q.includes('why offline')) {
      return {
        response:
          "Yeah — Arvind chose an offline-first architecture so students can log attendance instantly even with zero network coverage on campus. All reads and writes hit IndexedDB locally and sync seamlessly when online.",
        topic: 'bunkmate',
        suggestions: getContextualSuggestions('bunkmate'),
      };
    }

    if (q.includes('ocr') || q.includes('vision') || q.includes('parsing')) {
      return {
        response:
          "In BunkMate's AI timetable parser, uploaded schedule images or PDFs pass through Gemini 1.5 Flash Vision OCR. It extracts raw text, detects table grids, normalizes course codes, resolves period times, and returns a clean structured schedule JSON.",
        topic: 'bunkmate',
        suggestions: getContextualSuggestions('bunkmate'),
      };
    }

    return {
      response:
        "Yeah — BunkMate is Arvind's flagship AI-powered student attendance companion. It features client-side Gemini vision timetable extraction, swipe-left to bunk & swipe-right to attend interactions, 256-bit AES-GCM local-first encryption, and offline PWA capability.",
      topic: 'bunkmate',
      suggestions: getContextualSuggestions('bunkmate'),
    };
  }

  // --- CARDIOGUARD DOMAIN ---
  const isCardioQuery =
    q.includes('cardioguard') ||
    q.includes('cardio') ||
    q.includes('heart') ||
    (globalContext.activeTopic === 'cardioguard' &&
      (q.includes('it') || q.includes('model') || q.includes('shap') || q.includes('xgboost') || q.includes('latency') || q.includes('predict')));

  if (isCardioQuery) {
    globalContext.activeTopic = 'cardioguard';

    if (q.includes('model') || q.includes('xgboost') || q.includes('algorithm')) {
      return {
        response:
          "CardioGuard AI uses a trained XGBoost binary classification model. Patient clinical vectors (Age, BP, Cholesterol, Max Heart Rate) are normalized and evaluated across decision trees to compute an exact logistic sigmoid risk probability.",
        topic: 'cardioguard',
        suggestions: getContextualSuggestions('cardioguard'),
      };
    }

    if (q.includes('shap') || q.includes('explain') || q.includes('why shap')) {
      return {
        response:
          "Arvind integrated SHAP (SHapley Additive exPlanations) TreeExplainer because medical ML models shouldn't be black boxes. SHAP computes additive logit contributions per feature, showing exactly why a patient was classified as high or low risk.",
        topic: 'cardioguard',
        suggestions: getContextualSuggestions('cardioguard'),
      };
    }

    if (q.includes('latency') || q.includes('speed') || q.includes('ms')) {
      return {
        response:
          "Inference latency is measured in real-time using performance.now(). Feature normalization, XGBoost logit evaluation, sigmoid probability calculation, and SHAP matrix ranking complete in under 1ms.",
        topic: 'cardioguard',
        suggestions: getContextualSuggestions('cardioguard'),
      };
    }

    return {
      response:
        "CardioGuard AI is Arvind's clinical decision-support analytical platform. It computes cardiovascular risk probabilities using a trained XGBoost model and delivers explainable feature rankings using SHAP TreeExplainer matrices via a FastAPI backend.",
      topic: 'cardioguard',
      suggestions: getContextualSuggestions('cardioguard'),
    };
  }

  // --- ATMOSPHERE AI DOMAIN ---
  const isAtmosphereQuery =
    q.includes('atmosphere') ||
    q.includes('weather') ||
    (globalContext.activeTopic === 'atmosphere' &&
      (q.includes('api') || q.includes('nlp') || q.includes('openmeteo') || q.includes('query')));

  if (isAtmosphereQuery) {
    globalContext.activeTopic = 'atmosphere';

    if (q.includes('nlp') || q.includes('natural language') || q.includes('intent')) {
      return {
        response:
          "The NLP weather engine parses raw text to extract intent (Precipitation vs Temperature vs Wind), time target (Tonight, Tomorrow, Weekend), and target location. It then computes a parse accuracy score based on token confidence.",
        topic: 'atmosphere',
        suggestions: getContextualSuggestions('atmosphere'),
      };
    }

    if (q.includes('api') || q.includes('openmeteo') || q.includes('endpoint')) {
      return {
        response:
          "Atmosphere AI uses OpenMeteo's Geocoding API for spatial coordinates resolution and OpenMeteo's Forecast API for real-time WMO weather codes, hourly precipitation probabilities, wind speeds, and temperatures.",
        topic: 'atmosphere',
        suggestions: getContextualSuggestions('atmosphere'),
      };
    }

    return {
      response:
        "Atmosphere AI is an intelligent atmospheric search platform. It translates natural-language weather queries into live geocoded API requests and delivers real-time meteorological metrics with measured HTTP latency.",
      topic: 'atmosphere',
      suggestions: getContextualSuggestions('atmosphere'),
    };
  }

  // --- CAMPUSBRAIN / NAVI DOMAIN ---
  if (q.includes('campusbrain') || q.includes('campus')) {
    globalContext.activeTopic = 'campusbrain';
    return {
      response:
        "CampusBrain is an AI student assistant platform built during a hackathon. It features full-stack architecture, dynamic database indexing, AI querying, and automated campus workflow support.",
      topic: 'campusbrain',
      suggestions: getContextualSuggestions('campusbrain'),
    };
  }

  if (q.includes('navi') || q.includes('voice')) {
    globalContext.activeTopic = 'navi';
    return {
      response:
        "Navi is Arvind's experimental hands-free AI voice assistant built with continuous SpeechRecognition, SpeechSynthesis, and FastAPI WebSocket backends for real-time conversational loops.",
      topic: 'navi',
      suggestions: getContextualSuggestions('navi'),
    };
  }

  // 5. Unknown / Out-of-bounds Query Handling (Strict non-hallucination)
  globalContext.activeTopic = 'general';
  return {
    response:
      "I don't have that verified information about Arvind yet. You can ask me about his projects (BunkMate, CardioGuard, Atmosphere AI), his tech stack, development architecture, or how to connect with him!",
    topic: 'general',
    suggestions: getContextualSuggestions('general'),
  };
}
