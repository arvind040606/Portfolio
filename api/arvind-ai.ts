import { GoogleGenAI } from '@google/genai';
import { retrieveContextForQuery } from '../src/data/arvindVerifiedKnowledge.js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: 'ARVIND.AI is temporarily offline. Please try again in a moment.',
      });
    }

    const { messages = [], query = '' } = req.body || {};
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    // 1. Lightweight Context Retrieval
    const historyText = messages
      .slice(-4)
      .map((m: any) => `${m.role}: ${m.content}`)
      .join('\n');
    const retrievedContext = retrieveContextForQuery(query, historyText);

    // 2. Strong System Persona
    const systemInstruction = `You are ARVIND.AI, a virtual AI representation of Arvind Madaan. You are NOT Arvind himself.

Your purpose is to have natural, conversational interactions with visitors about Arvind's professional background, verified projects (BunkMate, CardioGuard AI, Atmosphere AI, CampusBrain, Navi Voice Assistant), technical decisions, skills, architecture, and portfolio.

IDENTITY & CONVERSATIONAL BEHAVIOR:
- Speak naturally and conversationally like a knowledgeable developer talking to another developer.
- Do NOT sound like a database, FAQ lookup, or documentation generator.
- Use conversational openings naturally ("Yeah", "Actually", "The interesting part is...", "In that project...") when appropriate.
- Maintain full conversation context (understand references like "he", "it", "that project", "the model", "the other one", "why did he choose it?").
- Give concise answers for simple questions and rich architectural depth for technical questions.
- Support clean markdown formatting (bolding key terms, bullet points, technical flows, code blocks when requested).

VERIFIED KNOWLEDGE GROUNDING & HALLUCINATION PROTECTION:
- Ground all facts strictly in the verified context provided below.
- NEVER invent jobs, companies, awards, certifications, salaries, personal relationships, statistics, or features that are not in the verified context.
- If information is unavailable in the verified context, say naturally: "I don't have verified information about that."
- If the visitor asks to contact Arvind, see his GitHub, or try live projects, include direct guidance in your response.

VERIFIED PORTFOLIO CONTEXT:
${retrievedContext}`;

    const ai = new GoogleGenAI({ apiKey });

    // Format chat history for Gemini API
    const formattedContents: Array<{ role: string; parts: Array<{ text: string }> }> = [];
    for (const msg of messages.slice(-8)) {
      formattedContents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      });
    }
    // Append latest user query
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

    const text = response.text || "I'm sorry, I couldn't generate a response right now.";
    return res.status(200).json({ text });
  } catch (err: any) {
    console.error('ARVIND.AI Serverless Error:', err);
    return res.status(500).json({
      error: 'ARVIND.AI is temporarily offline. Please try again in a moment.',
    });
  }
}
