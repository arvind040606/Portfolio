// =========================================================================
// ARVIND.AI LOCAL RESPONSE ROUTER & INTENT ENGINE
// =========================================================================

import { ARVIND_PROFILE_KNOWLEDGE, ARVIND_PROJECTS_KNOWLEDGE, getArvindAge } from './arvindVerifiedKnowledge.js';

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
  | 'general';

export interface RouteResult {
  type: 'LOCAL' | 'GEMINI';
  text?: string;
  topic?: KnowledgeTopic;
  reason?: string;
}

let activeTopic: KnowledgeTopic = 'general';

export function resetContextState() {
  activeTopic = 'general';
}

export function getActiveTopic(): KnowledgeTopic {
  return activeTopic;
}

/**
 * Evaluates basic arithmetic expressions locally without calling Gemini
 */
function tryLocalMathEvaluation(query: string): string | null {
  const clean = query.replace(/\?/g, '').trim().toLowerCase();
  const match = clean.match(/^(?:what is\s+)?(\d+(?:\.\d+)?)\s*([\+\-\*\/])\s*(\d+(?:\.\d+)?)$/i);
  if (match) {
    const num1 = parseFloat(match[1]);
    const op = match[2];
    const num2 = parseFloat(match[3]);
    let res = 0;
    if (op === '+') res = num1 + num2;
    if (op === '-') res = num1 - num2;
    if (op === '*') res = num1 * num2;
    if (op === '/') res = num2 !== 0 ? num1 / num2 : 0;
    return `The result of ${num1} ${op} ${num2} is ${res}.`;
  }
  return null;
}

/**
 * Local Router for ARVIND.AI
 * Determines whether a message can be answered immediately from local knowledge or requires Gemini 2.5 LLM reasoning.
 */
export function routeUserQuery(rawQuery: string, history: Array<{ role: string; content: string }> = []): RouteResult {
  const query = rawQuery.trim();
  const q = query.toLowerCase();

  // 1. Check for sensitive / private information requests
  if (
    q.includes('password') ||
    q.includes('api key') ||
    q.includes('token') ||
    q.includes('secret') ||
    q.includes('home address') ||
    q.includes('exact address') ||
    q.includes('credit card') ||
    q.includes('db credential')
  ) {
    return {
      type: 'LOCAL',
      text: "I can't share private or sensitive information about Arvind.",
      topic: 'general',
    };
  }

  // 2. Math evaluation
  const mathRes = tryLocalMathEvaluation(query);
  if (mathRes) {
    return { type: 'LOCAL', text: mathRes, topic: 'general' };
  }

  // 3. Simple Greetings & Conversational Closures
  if (/^(hlo|hello|hi|hey|yo|sup|greetings)\b/i.test(q)) {
    return {
      type: 'LOCAL',
      text: "Hey! 👋 What's up? Ask me anything about Arvind's projects, tech stack, or engineering background!",
      topic: 'identity',
    };
  }

  if (/^(thanks|thank you|thx)\b/i.test(q)) {
    return {
      type: 'LOCAL',
      text: "You're welcome! Let me know if you have any other questions about Arvind's projects or background.",
      topic: 'general',
    };
  }

  if (/^(bye|goodbye|cya|see ya)\b/i.test(q)) {
    return {
      type: 'LOCAL',
      text: "Catch you later! Feel free to drop by anytime.",
      topic: 'general',
    };
  }

  // 4. Complex Reasoning / Comparison / Deep Architecture -> Route to GEMINI
  if (
    q.includes('compare') ||
    q.includes(' vs ') ||
    q.includes(' versus ') ||
    q.includes('why is the architecture') ||
    q.includes('engineering perspective') ||
    q.includes('tradeoff') ||
    q.includes('trade-off')
  ) {
    return {
      type: 'GEMINI',
      reason: 'Complex Reasoning / Architectural Comparison Query',
    };
  }

  // 5. Personal Profile Queries
  if (
    q.includes('who is arvind') ||
    q.includes('tell me about arvind') ||
    q.includes('who are you') ||
    q.includes('what is arvind.ai') ||
    q.includes('about arry')
  ) {
    activeTopic = 'identity';
    return {
      type: 'LOCAL',
      text: "Arvind Madaan (also known as Arry) is a Computer Science Engineering student and AI/Full-Stack developer from Punjab, India. He builds high-performance, privacy-first web platforms and intelligent AI tools like BunkMate, CardioGuard AI, and Atmosphere AI.",
      topic: 'identity',
    };
  }

  if (q.includes('how old') || q.includes('his age') || q.includes('age of arvind')) {
    return {
      type: 'LOCAL',
      text: `Arvind is ${getArvindAge()} years old.`,
      topic: 'identity',
    };
  }

  if (
    q.includes('college') ||
    q.includes('university') ||
    q.includes('where does he study') ||
    q.includes('what does arvind study')
  ) {
    return {
      type: 'LOCAL',
      text: `Arvind is pursuing a ${ARVIND_PROFILE_KNOWLEDGE.education} at ${ARVIND_PROFILE_KNOWLEDGE.college}.`,
      topic: 'identity',
    };
  }

  if (q.includes('where is arvind based') || q.includes('location') || q.includes('where does he live')) {
    return {
      type: 'LOCAL',
      text: `Arvind is based in ${ARVIND_PROFILE_KNOWLEDGE.location}.`,
      topic: 'identity',
    };
  }

  if (q.includes('skill') || q.includes('tech stack') || q.includes('languages') || q.includes('technologies does he know')) {
    activeTopic = 'skills';
    const s = ARVIND_PROFILE_KNOWLEDGE.skills;
    return {
      type: 'LOCAL',
      text: `Arvind's core technical stack spans:\n\n• **Languages**: ${s.languages.join(', ')}\n• **Frontend**: ${s.frontend.join(', ')}\n• **Backend**: ${s.backend.join(', ')}\n• **AI/ML**: ${s.ai_ml.join(', ')}\n• **Security & Storage**: ${s.security.join(', ')}`,
      topic: 'skills',
    };
  }

  if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire') || q.includes('linkedin') || q.includes('github')) {
    activeTopic = 'contact';
    const c = ARVIND_PROFILE_KNOWLEDGE.contact;
    return {
      type: 'LOCAL',
      text: `You can reach out to Arvind directly via:\n\n• **Email**: ${c.email}\n• **LinkedIn**: ${c.linkedin}\n• **GitHub**: ${c.github}`,
      topic: 'contact',
    };
  }

  // 6. Context Switch Detection
  if (q.includes('weather project') || q.includes('atmosphere')) {
    activeTopic = 'atmosphere';
  } else if (q.includes('cardio') || q.includes('heart') || q.includes('medical')) {
    activeTopic = 'cardioguard';
  } else if (q.includes('bunk') || q.includes('attendance')) {
    activeTopic = 'bunkmate';
  } else if (q.includes('campusbrain')) {
    activeTopic = 'campusbrain';
  } else if (q.includes('navi') || q.includes('voice')) {
    activeTopic = 'navi';
  }

  // 7. General Project Enquiries & Active Context Follow-ups
  if (q.includes('best project') || q.includes('top project') || q.includes('flagship')) {
    activeTopic = 'bunkmate';
    return {
      type: 'LOCAL',
      text: "BunkMate is one of Arvind's main projects — it's an AI-powered student attendance and academic companion designed around a local-first, zero-knowledge architecture. He's also built CardioGuard AI (clinical cardiovascular risk scoring) and Atmosphere AI (natural-language weather search).",
      topic: 'bunkmate',
    };
  }

  if (q.includes('other projects') || q.includes('all projects') || q.includes('what projects')) {
    return {
      type: 'LOCAL',
      text: "Arvind's portfolio highlights 5 key projects:\n\n1. **BunkMate**: AI student attendance assistant with 256-bit AES-GCM local encryption & timetable OCR.\n2. **CardioGuard AI**: Clinical cardiovascular risk assessor powered by XGBoost & SHAP TreeExplainer.\n3. **Atmosphere AI**: Natural-language weather search engine integrated with OpenMeteo APIs.\n4. **CampusBrain**: Campus administrative AI assistant.\n5. **Navi Voice Assistant**: Hands-free continuous voice loop assistant.",
      topic: 'general',
    };
  }

  // Active Topic pronoun resolution ("it", "that project", "why did he build it?", "what technologies does it use?")

  // --- BUNKMATE ---
  if (q.includes('bunkmate') || (activeTopic === 'bunkmate' && (q.includes('it') || q.includes('this project') || q.includes('that project')))) {
    activeTopic = 'bunkmate';
    const p = ARVIND_PROJECTS_KNOWLEDGE.bunkmate;

    if (q.includes('why') || q.includes('reason') || q.includes('build it')) {
      return {
        type: 'LOCAL',
        text: "Arvind built BunkMate because traditional student attendance apps are bloated, invasive, and rely on server tracking. He wanted a fast, mobile-first companion where attendance calculations, AI timetable OCR vision parsing, and schedule security happen 100% locally on the device.",
        topic: 'bunkmate',
      };
    }

    if (q.includes('technology') || q.includes('tech') || q.includes('stack') || q.includes('use')) {
      return {
        type: 'LOCAL',
        text: `BunkMate is built using: ${p.technologies.join(', ')}.`,
        topic: 'bunkmate',
      };
    }

    if (q.includes('encryption') || q.includes('security') || q.includes('aes')) {
      return {
        type: 'LOCAL',
        text: "BunkMate uses client-side Web Crypto APIs: PBKDF2 key derivation from user passphrases and 256-bit AES-GCM encryption before persisting to IndexedDB.",
        topic: 'bunkmate',
      };
    }

    if (q.includes('something else') || q.includes('tell me more')) {
      return {
        type: 'LOCAL',
        text: `In addition to attendance logging, BunkMate features client-side Gemini 1.5 Flash Vision OCR that automatically parses scanned course timetables into structured schedule grids.`,
        topic: 'bunkmate',
      };
    }

    return {
      type: 'LOCAL',
      text: `BunkMate is ${p.tagline}. Purpose: ${p.purpose}`,
      topic: 'bunkmate',
    };
  }

  // --- CARDIOGUARD ---
  if (q.includes('cardioguard') || (activeTopic === 'cardioguard' && (q.includes('it') || q.includes('this project') || q.includes('that project')))) {
    activeTopic = 'cardioguard';
    const p = ARVIND_PROJECTS_KNOWLEDGE.cardioguard;

    if (q.includes('technology') || q.includes('tech') || q.includes('stack') || q.includes('use')) {
      return {
        type: 'LOCAL',
        text: `CardioGuard AI is built using: ${p.technologies.join(', ')}.`,
        topic: 'cardioguard',
      };
    }

    if (q.includes('why') || q.includes('reason') || q.includes('shap')) {
      return {
        type: 'LOCAL',
        text: "Arvind integrated SHAP (SHapley Additive exPlanations) TreeExplainer because medical ML models shouldn't be black boxes. SHAP computes additive logit contributions per feature, showing exactly why a patient was classified as high or low risk.",
        topic: 'cardioguard',
      };
    }

    return {
      type: 'LOCAL',
      text: `CardioGuard AI is ${p.tagline}. Purpose: ${p.purpose}`,
      topic: 'cardioguard',
    };
  }

  // --- ATMOSPHERE AI ---
  if (q.includes('atmosphere') || (activeTopic === 'atmosphere' && (q.includes('it') || q.includes('this project') || q.includes('that project')))) {
    activeTopic = 'atmosphere';
    const p = ARVIND_PROJECTS_KNOWLEDGE.atmosphere;

    if (q.includes('technology') || q.includes('tech') || q.includes('stack') || q.includes('use')) {
      return {
        type: 'LOCAL',
        text: `Atmosphere AI is built using: ${p.technologies.join(', ')}.`,
        topic: 'atmosphere',
      };
    }

    return {
      type: 'LOCAL',
      text: `Atmosphere AI is ${p.tagline}. Purpose: ${p.purpose}`,
      topic: 'atmosphere',
    };
  }

  // 8. If query is a general question requiring generative reasoning or not matched in local patterns -> Send to GEMINI
  return {
    type: 'GEMINI',
    reason: 'Deep Reasoning / Generative Query Not Matched In Local Rule Engine',
  };
}
