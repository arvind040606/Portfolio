import { GoogleGenAI } from '@google/genai';
import { retrieveContextForQuery } from '../data/arvindVerifiedKnowledge';
import { routeUserQuery, RouteResult } from '../data/arvindKnowledgeEngine';

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
    console.log('[ARVIND.AI] ROUTE: LOCAL');
    console.log('[ARVIND.AI] GEMINI: NOT REQUIRED');
    console.log('[ARVIND.AI] TOKENS SAVED: YES');
    return {
      text: route.text,
      isRealLLM: false,
      route: 'LOCAL',
    };
  }

  // 2. Gemini 2.5 Route: Invoked ONLY when deep reasoning or generative synthesis is required
  console.log('[ARVIND.AI] ROUTE: GEMINI');
  console.log('[ARVIND.AI] REASON:', route.reason || 'Complex reasoning / Deep generative response required');
  console.log('[ARVIND.AI] GEMINI REQUEST SENT');

  // Prune history to only relevant recent turns to conserve tokens
  const prunedHistory = history.slice(-4);

  // Try Vercel Serverless API (/api/arvind-ai)
  try {
    const res = await fetch('/api/arvind-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: cleanQuery, messages: prunedHistory }),
    });

    const data = await res.json();

    if (res.ok && data && data.text) {
      console.log('[ARVIND.AI] GEMINI RESPONSE RECEIVED (Length:', data.text.length, ')');
      return {
        text: data.text,
        isRealLLM: true,
        route: 'GEMINI',
        reason: route.reason,
      };
    } else if (data && data.error) {
      console.warn('[ARVIND.AI] Serverless API returned error:', data.error);
      return {
        text: "I'm having trouble processing that right now. Try asking me again.",
        isRealLLM: false,
        route: 'GEMINI',
        error: data.error,
      };
    }
  } catch (err: any) {
    console.warn('[ARVIND.AI] Serverless API fetch failed:', err?.message || err);
  }

  // Fallback to client-side direct Gemini call if VITE_GEMINI_API_KEY is available
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
        console.log('[ARVIND.AI] GEMINI RESPONSE RECEIVED via Client Key (Length:', response.text.length, ')');
        return {
          text: response.text,
          isRealLLM: true,
          route: 'GEMINI',
          reason: route.reason,
        };
      }
    } catch (clientErr: any) {
      console.error('[ARVIND.AI] Client Gemini API failed:', clientErr?.message || clientErr);
    }
  }

  return {
    text: "I'm having trouble processing that right now. Try asking me again.",
    isRealLLM: false,
    route: 'GEMINI',
    error: 'API unavailable',
  };
}
