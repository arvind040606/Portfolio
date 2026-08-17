import { GoogleGenAI } from '@google/genai';
import { retrieveContextForQuery } from '../data/arvindVerifiedKnowledge';

export interface ChatMessageItem {
  role: 'user' | 'model';
  content: string;
}

const SYSTEM_PERSONA_INSTRUCTION = `You are ARVIND.AI, a virtual AI representation of Arvind Madaan. You are NOT Arvind himself.

Your purpose is to have natural, conversational interactions with visitors about Arvind's professional background, verified projects (BunkMate, CardioGuard AI, Atmosphere AI, CampusBrain, Navi Voice Assistant), technical decisions, skills, architecture, and portfolio.

IDENTITY & CONVERSATIONAL BEHAVIOR:
- Speak naturally and conversationally like a knowledgeable full-stack developer talking to another developer.
- Do NOT sound like a database, FAQ lookup, or documentation generator.
- Use conversational openings naturally ("Yeah", "Actually", "The interesting part is...", "In that project...") when appropriate.
- Maintain full conversation context (understand references like "he", "it", "that project", "the model", "the other one", "why did he choose it?").
- Give concise answers for simple questions and rich architectural depth for technical questions.
- Support clean markdown formatting (bolding key terms, bullet points, technical flows, code blocks when requested).

VERIFIED KNOWLEDGE GROUNDING & HALLUCINATION PROTECTION:
- Ground all facts strictly in the verified context provided below.
- NEVER invent jobs, companies, awards, certifications, salaries, personal relationships, statistics, or features that are not in the verified context.
- If information is unavailable in the verified context, say naturally: "I don't have verified information about that."
- If the visitor asks to contact Arvind, see his GitHub, or try live projects, include direct guidance in your response.`;

export async function fetchArvindAIResponse(
  query: string,
  history: ChatMessageItem[] = []
): Promise<string> {
  const cleanQuery = query.trim();
  if (!cleanQuery) return "";

  // 1. Try Vercel Serverless API first (/api/arvind-ai)
  try {
    const res = await fetch('/api/arvind-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: cleanQuery, messages: history }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.text) {
        return data.text;
      }
    }
  } catch (_e) {
    // API endpoint unavailable, fall through to client-side Gemini or error fallback
  }

  // 2. Client-side direct Gemini API execution if VITE_GEMINI_API_KEY is defined
  const clientApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (clientApiKey) {
    try {
      const historyText = history
        .slice(-4)
        .map((m) => `${m.role}: ${m.content}`)
        .join('\n');
      const retrievedContext = retrieveContextForQuery(cleanQuery, historyText);

      const fullSystemPrompt = `${SYSTEM_PERSONA_INSTRUCTION}\n\nVERIFIED PORTFOLIO CONTEXT:\n${retrievedContext}`;

      const ai = new GoogleGenAI({ apiKey: clientApiKey });
      const formattedContents = history.slice(-8).map((m) => ({
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
        return response.text;
      }
    } catch (clientErr) {
      console.error('Client Gemini API Error:', clientErr);
    }
  }

  // 3. Mandatory Requirement 15 Fallback:
  // If LLM API is unavailable, show clear friendly error instead of hardcoded fake chatbot fallback
  return "ARVIND.AI is temporarily offline. Please try again in a moment.";
}
