import { GoogleGenAI } from '@google/genai';
import { retrieveContextForQuery } from '../data/arvindVerifiedKnowledge';

export interface ChatMessageItem {
  role: 'user' | 'model';
  content: string;
}

export interface ServiceResult {
  text: string;
  isRealLLM: boolean;
  error?: string;
}

const SYSTEM_PERSONA_INSTRUCTION = `You are ARVIND.AI, a natural conversational AI representation of Arvind Madaan. You are NOT Arvind himself.

Your purpose is to have warm, natural, developer-to-developer conversation with visitors about Arvind's engineering background, verified projects (BunkMate, CardioGuard AI, Atmosphere AI, CampusBrain, Navi Voice Assistant), technical choices, skills, and portfolio.

IDENTITY & CONVERSATIONAL RULES:
- Greetings like "hlo", "hello", "hi", "hey" MUST be answered naturally and warmly like a friendly developer assistant.
- Questions like "who are you?" should naturally introduce ARVIND.AI as Arvind's virtual AI assistant.
- Use full conversation context to resolve references like "it", "that project", "the model", "the previous question".
- Speak conversationally ("Yeah", "Actually", "In BunkMate...", "The core idea is...").
- Support clean markdown formatting (bold key terms, lists, technical flows).

VERIFIED PORTFOLIO KNOWLEDGE (STRICT GROUNDING):
- Base all technical and project facts strictly on the context below.
- If information is not in the context, say naturally: "I don't have verified information about that."`;

export async function fetchArvindAIResponse(
  query: string,
  history: ChatMessageItem[] = []
): Promise<ServiceResult> {
  const cleanQuery = query.trim();
  if (!cleanQuery) return { text: "", isRealLLM: false };

  console.log('[ARVIND.AI Service] Invoking LLM response pipeline for query:', cleanQuery);

  // 1. Try Vercel Serverless API (/api/arvind-ai)
  try {
    const res = await fetch('/api/arvind-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: cleanQuery, messages: history }),
    });

    const data = await res.json();

    if (res.ok && data && data.text) {
      console.log('[ARVIND.AI Service] Gemini 2.5 response received successfully from serverless API');
      return { text: data.text, isRealLLM: true };
    } else if (data && data.error) {
      console.warn('[ARVIND.AI Service] Serverless API returned error:', data.error);
      // Return the specific error message to client for transparency
      return {
        text: `⚠️ ARVIND.AI API Error: ${data.error}`,
        isRealLLM: false,
        error: data.error,
      };
    }
  } catch (err: any) {
    console.warn('[ARVIND.AI Service] Serverless API fetch failed:', err?.message || err);
  }

  // 2. Try Client-side direct Gemini API execution if VITE_GEMINI_API_KEY is defined in client env
  const clientApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (clientApiKey) {
    try {
      console.log('[ARVIND.AI Service] Direct client Gemini API call starting...');
      const historyText = history
        .slice(-4)
        .map((m) => `${m.role}: ${m.content}`)
        .join('\n');
      const retrievedContext = retrieveContextForQuery(cleanQuery, historyText);

      const fullSystemPrompt = `${SYSTEM_PERSONA_INSTRUCTION}\n\nVERIFIED PORTFOLIO CONTEXT:\n${retrievedContext}`;

      const ai = new GoogleGenAI({ apiKey: clientApiKey });
      const formattedContents = history.slice(-10).map((m) => ({
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
        console.log('[ARVIND.AI Service] Gemini 2.5 response generated via client API key');
        return { text: response.text, isRealLLM: true };
      }
    } catch (clientErr: any) {
      console.error('[ARVIND.AI Service] Client Gemini API failed:', clientErr?.message || clientErr);
      return {
        text: `⚠️ Gemini Client API Error: ${clientErr?.message || 'Failed to generate response'}`,
        isRealLLM: false,
        error: clientErr?.message,
      };
    }
  }

  // 3. If no key is set or endpoint unconfigured, inform client directly instead of faking active LLM status
  return {
    text: "⚠️ Gemini LLM API is not configured. Please add `GEMINI_API_KEY` to Vercel project environment variables to enable real LLM responses.",
    isRealLLM: false,
    error: "API key unconfigured",
  };
}
