import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function chat(message: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(message);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Error in chat:', error);
    return "I apologize, but I'm having trouble processing your request at the moment. Please try again.";
  }
}
