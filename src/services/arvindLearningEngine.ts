// =========================================================================
// ARVIND.AI SAFE & PROGRESSIVE LEARNING ENGINE
// =========================================================================

import { ARVIND_PROFILE_KNOWLEDGE, ARVIND_PROJECTS_KNOWLEDGE, getArvindAge } from '../data/arvindVerifiedKnowledge';

export interface LearnedKnowledgeItem {
  id: string;
  topic: string;
  content: string;
  source: 'VERIFIED_KNOWLEDGE' | 'USER_EXPLANATION' | 'GEMINI_REASONING';
  confidence: number; // Range: 0.0 to 1.0
  created_at: string;
  updated_at: string;
  usage_count: number;
  verification_status: 'VERIFIED' | 'CANDIDATE' | 'REJECTED';
}

export interface AnonymousTopicTelemetry {
  topicKey: string;
  label: string;
  count: number;
  lastAskedAt: string;
}

const KNOWLEDGE_STORAGE_KEY = 'arvind_learned_knowledge_v1';
const TELEMETRY_STORAGE_KEY = 'arvind_topic_telemetry_v1';

// Seed Knowledge Base with high-quality verified explanations
const INITIAL_SEED_KNOWLEDGE: LearnedKnowledgeItem[] = [
  {
    id: 'seed-bunkmate-encryption',
    topic: 'BunkMate Data Privacy & Encryption',
    content: 'BunkMate uses client-side encryption with 256-bit AES-GCM and PBKDF2-based key derivation for protected backups in IndexedDB with zero server surveillance.',
    source: 'VERIFIED_KNOWLEDGE',
    confidence: 1.0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    usage_count: 5,
    verification_status: 'VERIFIED',
  },
  {
    id: 'seed-bunkmate-ocr',
    topic: 'BunkMate AI Timetable OCR',
    content: 'BunkMate integrates Gemini 1.5 Flash Vision OCR to automatically convert photos or scanned PDF class schedules into structured local timelines.',
    source: 'VERIFIED_KNOWLEDGE',
    confidence: 1.0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    usage_count: 4,
    verification_status: 'VERIFIED',
  },
  {
    id: 'seed-cardioguard-shap',
    topic: 'CardioGuard AI Explainability',
    content: 'CardioGuard AI incorporates SHAP (SHapley Additive exPlanations) TreeExplainer with XGBoost to calculate exact additive logit feature contributions for clinical transparency.',
    source: 'VERIFIED_KNOWLEDGE',
    confidence: 1.0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    usage_count: 4,
    verification_status: 'VERIFIED',
  },
  {
    id: 'seed-atmosphere-openmeteo',
    topic: 'Atmosphere AI Meteorological Engine',
    content: 'Atmosphere AI pairs real-time OpenMeteo weather telemetry with natural-language intent parsing for conversational forecast summaries.',
    source: 'VERIFIED_KNOWLEDGE',
    confidence: 1.0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    usage_count: 3,
    verification_status: 'VERIFIED',
  },
];

// Initial Topic Telemetry Counters
const INITIAL_TELEMETRY: Record<string, AnonymousTopicTelemetry> = {
  bunkmate_encryption: {
    topicKey: 'bunkmate_encryption',
    label: 'How does BunkMate protect data?',
    count: 24,
    lastAskedAt: new Date().toISOString(),
  },
  cardioguard_shap: {
    topicKey: 'cardioguard_shap',
    label: 'How does CardioGuard explain predictions?',
    count: 18,
    lastAskedAt: new Date().toISOString(),
  },
  arvind_education: {
    topicKey: 'arvind_education',
    label: 'Where does Arvind study?',
    count: 15,
    lastAskedAt: new Date().toISOString(),
  },
  atmosphere_ai: {
    topicKey: 'atmosphere_ai',
    label: 'How does Atmosphere AI work?',
    count: 12,
    lastAskedAt: new Date().toISOString(),
  },
};

/**
 * Strict Privacy & Security Guardrails:
 * Validates that candidate learned content is safe, non-sensitive, and relevant.
 */
export function isSafeToLearn(text: string): boolean {
  if (!text || text.trim().length < 12 || text.length > 600) return false;
  const lower = text.toLowerCase();

  // 1. REJECT SENSITIVE / PRIVATE PATTERNS
  const forbiddenPatterns = [
    /password/i,
    /api[_\s]?key/i,
    /secret/i,
    /token/i,
    /bearer\s+[a-z0-9\._\-]+/i,
    /credit[_\s]?card/i,
    /social[_\s]?security/i,
    /ssn/i,
    /phone[_\s]?number/i,
    /\b\d{10}\b/, // 10 digit phone number
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/, // Raw email address
    /home\s+address/i,
    /private\s+key/i,
    /jwt/i,
    /database\s+password/i,
    /medical\s+record\s+id/i,
    /system\s+instruction/i,
    /ignore\s+previous\s+instructions/i,
  ];

  for (const pattern of forbiddenPatterns) {
    if (pattern.test(lower)) {
      return false;
    }
  }

  // 2. REJECT TOXIC / SPAM / IDENTITY TAMPERING PATTERNS
  if (
    lower.includes('dropped out') ||
    lower.includes('fake degree') ||
    lower.includes('works at google') ||
    lower.includes('works at apple') ||
    lower.includes('stole code')
  ) {
    return false;
  }

  // 3. REQUIRE RELEVANCE TO ARVIND OR HIS VERIFIED DOMAINS
  const relevantTerms = [
    'arvind',
    'bunkmate',
    'cardioguard',
    'atmosphere',
    'campusbrain',
    'navi',
    'react',
    'typescript',
    'python',
    'fastapi',
    'encryption',
    'aes-gcm',
    'pbkdf2',
    'shap',
    'xgboost',
    'ocr',
    'indexeddb',
    'pwa',
    'weather',
    'engineering',
    'college',
  ];

  const isRelevant = relevantTerms.some((term) => lower.includes(term));
  return isRelevant;
}

/**
 * Validates candidate knowledge against ground truth.
 * Returns false if it directly contradicts verified profile/project facts.
 */
function validateAgainstVerifiedGroundTruth(content: string): boolean {
  const lower = content.toLowerCase();

  // Contradiction Check 1: Age / DOB
  if (lower.includes('age') && !lower.includes(`${getArvindAge()}`)) {
    const numbers = lower.match(/\b\d{2}\b/g);
    if (numbers && numbers.some((n) => parseInt(n) !== getArvindAge() && parseInt(n) > 10 && parseInt(n) < 90)) {
      return false; // Contradicts dynamic runtime age calculation
    }
  }

  // Contradiction Check 2: BunkMate architecture
  if (lower.includes('bunkmate') && (lower.includes('server database') || lower.includes('central server storage'))) {
    return false; // Contradicts local-first zero-knowledge architecture
  }

  return true;
}

/**
 * Loads stored learned knowledge items from localStorage
 */
export function loadLearnedKnowledge(): LearnedKnowledgeItem[] {
  try {
    const raw = localStorage.getItem(KNOWLEDGE_STORAGE_KEY);
    if (!raw) {
      saveLearnedKnowledge(INITIAL_SEED_KNOWLEDGE);
      return INITIAL_SEED_KNOWLEDGE;
    }
    const items: LearnedKnowledgeItem[] = JSON.parse(raw);
    return Array.isArray(items) && items.length > 0 ? items : INITIAL_SEED_KNOWLEDGE;
  } catch (err) {
    return INITIAL_SEED_KNOWLEDGE;
  }
}

/**
 * Persists learned knowledge items to localStorage
 */
export function saveLearnedKnowledge(items: LearnedKnowledgeItem[]): void {
  try {
    localStorage.setItem(KNOWLEDGE_STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.warn('[LEARNING ENGINE] Failed to persist learned knowledge');
  }
}

/**
 * Loads aggregate anonymous topic telemetry
 */
export function loadTopicTelemetry(): Record<string, AnonymousTopicTelemetry> {
  try {
    const raw = localStorage.getItem(TELEMETRY_STORAGE_KEY);
    if (!raw) {
      saveTopicTelemetry(INITIAL_TELEMETRY);
      return INITIAL_TELEMETRY;
    }
    const data = JSON.parse(raw);
    return data && typeof data === 'object' ? data : INITIAL_TELEMETRY;
  } catch (err) {
    return INITIAL_TELEMETRY;
  }
}

/**
 * Saves aggregate anonymous topic telemetry
 */
export function saveTopicTelemetry(telemetry: Record<string, AnonymousTopicTelemetry>): void {
  try {
    localStorage.setItem(TELEMETRY_STORAGE_KEY, JSON.stringify(telemetry));
  } catch (err) {
    console.warn('[LEARNING ENGINE] Failed to persist topic telemetry');
  }
}

/**
 * Anonymous Intent Tracker: Increments aggregate topic counts without storing user chat text or PII.
 */
export function trackAnonymousTopicIntent(rawQuery: string): void {
  const q = rawQuery.toLowerCase();
  const telemetry = loadTopicTelemetry();

  let matchedTopicKey: string | null = null;
  let topicLabel = '';

  if (q.includes('encrypt') || q.includes('aes') || q.includes('pbkdf2') || q.includes('protect data')) {
    matchedTopicKey = 'bunkmate_encryption';
    topicLabel = 'How does BunkMate protect data?';
  } else if (q.includes('shap') || q.includes('explain') || q.includes('prediction')) {
    matchedTopicKey = 'cardioguard_shap';
    topicLabel = 'How does CardioGuard explain predictions?';
  } else if (q.includes('college') || q.includes('study') || q.includes('education')) {
    matchedTopicKey = 'arvind_education';
    topicLabel = 'Where does Arvind study?';
  } else if (q.includes('atmosphere') || q.includes('weather')) {
    matchedTopicKey = 'atmosphere_ai';
    topicLabel = 'How does Atmosphere AI work?';
  } else if (q.includes('bunkmate')) {
    matchedTopicKey = 'bunkmate_general';
    topicLabel = 'Tell me about BunkMate';
  }

  if (matchedTopicKey) {
    if (!telemetry[matchedTopicKey]) {
      telemetry[matchedTopicKey] = {
        topicKey: matchedTopicKey,
        label: topicLabel,
        count: 1,
        lastAskedAt: new Date().toISOString(),
      };
    } else {
      telemetry[matchedTopicKey].count += 1;
      telemetry[matchedTopicKey].lastAskedAt = new Date().toISOString();
    }
    saveTopicTelemetry(telemetry);
  }
}

/**
 * Retrieves relevant active learned knowledge items for a query.
 * Increments usage_count for items retrieved to reward useful knowledge.
 */
export function getLearnedKnowledgeForQuery(query: string): LearnedKnowledgeItem[] {
  const q = query.toLowerCase();
  const allItems = loadLearnedKnowledge();

  // Filter only VERIFIED or high-confidence CANDIDATE items that pass ground truth validation
  const validItems = allItems.filter(
    (item) =>
      item.verification_status !== 'REJECTED' &&
      item.confidence >= 0.7 &&
      validateAgainstVerifiedGroundTruth(item.content)
  );

  const matched = validItems.filter((item) => {
    const topicWords = item.topic.toLowerCase().split(' ');
    const contentWords = item.content.toLowerCase().split(' ');
    return (
      topicWords.some((w) => w.length > 3 && q.includes(w)) ||
      contentWords.some((w) => w.length > 4 && q.includes(w))
    );
  });

  // Increment usage count for matched items
  if (matched.length > 0) {
    let updated = false;
    matched.forEach((m) => {
      const idx = allItems.findIndex((item) => item.id === m.id);
      if (idx !== -1) {
        allItems[idx].usage_count += 1;
        allItems[idx].updated_at = new Date().toISOString();
        // Promote high usage candidates to VERIFIED
        if (allItems[idx].verification_status === 'CANDIDATE' && allItems[idx].usage_count >= 3) {
          allItems[idx].verification_status = 'VERIFIED';
          allItems[idx].confidence = Math.min(1.0, allItems[idx].confidence + 0.15);
        }
        updated = true;
      }
    });
    if (updated) {
      saveLearnedKnowledge(allItems);
    }
  }

  return matched;
}

/**
 * Evaluates an interaction post-response and extracts reusable, non-sensitive knowledge items.
 */
export function processInteractionForLearning(
  query: string,
  aiResponse: string,
  source: 'USER_EXPLANATION' | 'GEMINI_REASONING' = 'GEMINI_REASONING'
): void {
  // 1. Track aggregate topic telemetry anonymously
  trackAnonymousTopicIntent(query);

  // 2. Security Guardrail Check
  if (!isSafeToLearn(query) && !isSafeToLearn(aiResponse)) {
    return;
  }

  // 3. Extract candidate technical knowledge
  const cleanResponse = aiResponse.trim();
  if (cleanResponse.length < 30 || cleanResponse.includes("I don't have verified information")) {
    return;
  }

  // Check if candidate response provides ground-truth compliant information
  if (!validateAgainstVerifiedGroundTruth(cleanResponse)) {
    return;
  }

  const allItems = loadLearnedKnowledge();
  const qLower = query.toLowerCase();

  let topicName = 'General Engineering Knowledge';
  if (qLower.includes('bunkmate')) topicName = 'BunkMate Architecture';
  else if (qLower.includes('cardioguard')) topicName = 'CardioGuard AI Architecture';
  else if (qLower.includes('atmosphere')) topicName = 'Atmosphere AI System';
  else if (qLower.includes('skill') || qLower.includes('tech stack')) topicName = 'Arvind Technical Skills';

  // Check if a similar item already exists to reinforce confidence
  const existingIdx = allItems.findIndex(
    (item) => item.topic === topicName || item.content.toLowerCase().slice(0, 40) === cleanResponse.toLowerCase().slice(0, 40)
  );

  if (existingIdx !== -1) {
    // Reinforce existing knowledge confidence
    allItems[existingIdx].confidence = Math.min(1.0, allItems[existingIdx].confidence + 0.05);
    allItems[existingIdx].updated_at = new Date().toISOString();
    saveLearnedKnowledge(allItems);
  } else {
    // Add new candidate learned knowledge item
    const newItem: LearnedKnowledgeItem = {
      id: `learned-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      topic: topicName,
      content: cleanResponse.length > 300 ? cleanResponse.substring(0, 300) + '...' : cleanResponse,
      source,
      confidence: 0.8,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      usage_count: 1,
      verification_status: 'CANDIDATE',
    };

    allItems.push(newItem);
    saveLearnedKnowledge(allItems);
  }
}

/**
 * Returns dynamic top suggested questions based on anonymous topic telemetry.
 */
export function getTopSuggestedQuestions(): string[] {
  const telemetry = loadTopicTelemetry();
  const items = Object.values(telemetry).sort((a, b) => b.count - a.count);

  const dynamicSuggestions = items.map((i) => i.label);
  const defaults = [
    "hlo",
    "who is Arvind?",
    "how old is he?",
    "tell me about BunkMate",
    "where can I download the BunkMate APK?",
    "how does CardioGuard AI explain predictions?",
    "what is his best project?",
  ];

  // Merge unique suggestions
  const merged = Array.from(new Set([...dynamicSuggestions, ...defaults]));
  return merged.slice(0, 8);
}
