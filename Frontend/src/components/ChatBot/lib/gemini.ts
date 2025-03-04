import { GoogleGenerativeAI } from '@google/generative-ai';
                        //@ts-ignore
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('Missing Gemini API Key! Verify your .env file');
}
//@ts-ignore
const genAI = new GoogleGenerativeAI(API_KEY, { apiVersion: 'v1' });

export async function chat(params: { 
  message: string; 
  context?: { type: string; data: any } 
}): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash-latest",
      generationConfig: {
        maxOutputTokens: 1500,
        temperature: 0.7
      }
    });

    const contextPrompt = params.context ? `
      Analyze this ${params.context.type} data and provide personalized insights:
      ${JSON.stringify(params.context.data)}
      Respond as a wellness coach using this data. Never mention being an AI.
      Focus on patterns, recommendations, and actionable advice.
      Keep responses conversational and empathetic.
      Current query: ${params.message}
    ` : params.message;

    const result = await model.generateContent(contextPrompt);
    const text = result.response.text();
    
    // Post-process response to ensure natural tone
    return text.replace(/As an AI language model/g, '')
              .replace(/I don't have personal experiences/g, '')
              .trim();
  } catch (error: any) {
    console.error('Gemini API Error:', {
      code: error?.code,
      status: error?.response?.status,
      message: error?.message
    });
    return "Let me check that information again...";
  }
}