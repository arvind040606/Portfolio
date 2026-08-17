import { GoogleGenAI } from '@google/genai';
import { retrieveContextForQuery } from '../data/arvindVerifiedKnowledge';
import { routeUserQuery, RouteResult } from '../data/arvindKnowledgeEngine';
import { processInteractionForLearning, getLearnedKnowledgeForQuery } from './arvindLearningEngine';

export interface ChatMessageItem {
  role: 'user' | 'model';
  content: string;
}

export interface ServiceResult {
  text: string;
  isRealLLM: boolean;
  route: 'LOCAL' | 'GEMINI';
  reason?: string;
  error?: string;
}

const SYSTEM_PERSONA_INSTRUCTION = `You are ARVIND.AI, the virtual AI representation of Arvind Madaan.

Answer naturally and conversationally.

Use only the verified context provided to you for facts about Arvind.

Never invent personal or professional information.

Understand conversational references such as he, his, it, that project, and the other one using the supplied conversation context.

You are not Arvind himself. You are an AI representation of him.

For simple facts, answer directly and concisely.

For complex questions, reason using the supplied verified context.

Do not repeatedly say that information is unavailable when it is present in the supplied context.`;

export async function fetchArvindAIResponse(
  query: string,
  history: ChatMessageItem[] = []
): Promise<ServiceResult> {
  const cleanQuery = query.trim();
  if (!cleanQuery) {
    return { text: "", isRealLLM: false, route: "LOCAL" };
  }

  // 1. Local Intent Check & Router Classification (Zero LLM overhead for local queries)
  const route: RouteResult = routeUserQuery(cleanQuery, history);

  if (route.type === 'LOCAL' && route.text) {
    // Process local interaction for anonymous telemetry & learning
    try {
      processInteractionForLearning(cleanQuery, route.text, 'USER_EXPLANATION');
    } catch (err) {
      // Ignore client side learning errors
    }

    return {
      text: route.text,
      isRealLLM: false,
      route: 'LOCAL',
    };
  }

  // Check learned knowledge base first before making external LLM call if high confidence
  try {
    const learnedMatches = getLearnedKnowledgeForQuery(cleanQuery);
    const verifiedLearned = learnedMatches.find((item) => item.confidence >= 0.95);
    if (verifiedLearned) {
      return {
        text: verifiedLearned.content,
        isRealLLM: false,
        route: 'LOCAL',
      };
    }
  } catch (err) {
    // Fall back to Gemini if learned memory check fails
  }

  // 2. Gemini 2.5 Route: Invoked ONLY when deep reasoning or generative synthesis is required
  // Prune history to only relevant recent turns to conserve tokens
  const prunedHistory = history.slice(-4);

  let finalResponseText = '';
  let isSuccessfulLLM = false;

  // Try Vercel Serverless API (/api/arvind-ai)
  try {
    const res = await fetch('/api/arvind-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: cleanQuery, messages: prunedHistory }),
    });

    const data = await res.json();

    if (res.ok && data && data.text) {
      finalResponseText = data.text;
      isSuccessfulLLM = true;
    } else if (data && data.error) {
      console.warn('[ARVIND.AI] Serverless API returned error:', data.error);
    }
  } catch (err: any) {
    console.warn('[ARVIND.AI] Serverless API fetch failed:', err?.message || err);
  }

  // Fallback to client-side direct Gemini call if VITE_GEMINI_API_KEY is available
  if (!isSuccessfulLLM) {
    const clientApiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (clientApiKey) {
      try {
        const historyText = prunedHistory
          .map((m) => `${m.role}: ${m.content}`)
          .join('\n');
        const retrievedContext = retrieveContextForQuery(cleanQuery, historyText);

        const fullSystemPrompt = `${SYSTEM_PERSONA_INSTRUCTION}\n\nVERIFIED PORTFOLIO CONTEXT:\n${retrievedContext}`;

        const ai = new GoogleGenAI({ apiKey: clientApiKey });
        const formattedContents = prunedHistory.map((m) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }],
        }));
        formattedContents.push({
          role: 'user',
          parts: [{ text: cleanQuery }],
        });

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: formattedContents,
          config: {
            systemInstruction: fullSystemPrompt,
            temperature: 0.7,
            maxOutputTokens: 800,
          },
        });

        if (response && response.text) {
          finalResponseText = response.text;
          isSuccessfulLLM = true;
        }
      } catch (clientErr: any) {
        console.error('[ARVIND.AI] Client Gemini API failed:', clientErr?.message || clientErr);
      }
    }
  }

  if (isSuccessfulLLM && finalResponseText) {
    // Process Gemini response through Safe & Progressive Learning Engine
    try {
      processInteractionForLearning(cleanQuery, finalResponseText, 'GEMINI_REASONING');
    } catch (err) {
      // Ignore client side learning errors
    }

    return {
      text: finalResponseText,
      isRealLLM: true,
      route: 'GEMINI',
      reason: route.reason,
    };
  }

  return {
    text: "I'm having trouble processing that right now. Try asking me again.",
    isRealLLM: false,
    route: 'GEMINI',
    error: 'API unavailable',
  };
}
