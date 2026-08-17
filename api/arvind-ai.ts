import { GoogleGenAI } from '@google/genai';
import { retrieveContextForQuery } from '../src/data/arvindVerifiedKnowledge.js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('[ARVIND.AI API] REQUEST RECEIVED:', req.body?.query);

  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error('[ARVIND.AI API] ERROR: GEMINI_API_KEY missing from environment variables');
      return res.status(503).json({
        error: 'GEMINI_API_KEY is not configured in Vercel/environment variables.',
      });
    }

    const { messages = [], query = '' } = req.body || {};
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    // 1. Context Retrieval from verified portfolio data
    const historyText = messages
      .slice(-6)
      .map((m: any) => `${m.role}: ${m.content}`)
      .join('\n');
    const retrievedContext = retrieveContextForQuery(query, historyText);

    // 2. Strong System Persona System Instruction
    const systemInstruction = `You are ARVIND.AI, a natural conversational AI representation of Arvind Madaan. You are NOT Arvind himself.

Your purpose is to have warm, natural, developer-to-developer conversation with visitors about Arvind's engineering background, verified projects (BunkMate, CardioGuard AI, Atmosphere AI, CampusBrain, Navi Voice Assistant), technical choices, skills, and portfolio.

IDENTITY & CONVERSATIONAL RULES:
- Greetings like "hlo", "hello", "hi", "hey" MUST be answered naturally and warmly like a friendly developer assistant.
- Questions like "who are you?" should naturally introduce ARVIND.AI as Arvind's virtual AI assistant.
- Use full conversation context to resolve references like "it", "that project", "the model", "the previous question".
- Speak conversationally ("Yeah", "Actually", "In BunkMate...", "The core idea is...").
- Support clean markdown formatting (bold key terms, lists, technical flows).

VERIFIED PORTFOLIO KNOWLEDGE (STRICT GROUNDING):
- Base all technical and project facts strictly on the context below.
- If information is not in the context, say naturally: "I don't have verified information about that."

VERIFIED PORTFOLIO CONTEXT:
${retrievedContext}`;

    console.log('[ARVIND.AI API] GEMINI REQUEST SENT for model: gemini-2.5-flash');

    const ai = new GoogleGenAI({ apiKey });

    // Format full chat history for Gemini multi-turn session memory
    const formattedContents: Array<{ role: string; parts: Array<{ text: string }> }> = [];
    for (const msg of messages.slice(-10)) {
      formattedContents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      });
    }
    formattedContents.push({
      role: 'user',
      parts: [{ text: query }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 800,
      },
    });

    const text = response.text;
    console.log('[ARVIND.AI API] GEMINI RESPONSE RECEIVED (length: ' + (text?.length || 0) + ')');

    if (!text) {
      return res.status(500).json({ error: 'Gemini API returned an empty response.' });
    }

    console.log('[ARVIND.AI API] RESPONSE RETURNED TO CLIENT');
    return res.status(200).json({ text });
  } catch (err: any) {
    console.error('[ARVIND.AI API] GEMINI ERROR:', err?.message || err);
    return res.status(500).json({
      error: `Gemini API Error: ${err?.message || 'Failed to generate response'}`,
    });
  }
}
