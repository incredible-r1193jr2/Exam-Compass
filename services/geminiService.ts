
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = "AIzaSyB7hHAq0WlJa4FAg6y0M28bei1sblNBdrk";

const getAI = () => new GoogleGenAI({ apiKey: API_KEY });

export interface AIResponse<T> {
  data: T | null;
  error: string | null;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: number;
}

export const geminiService = {
  async getSmartPlan(targetExam: string, remainingDays: number, weakTopics: string[]): Promise<AIResponse<any>> {
    const ai = getAI();
    const prompt = `Create a daily study plan for ${targetExam} with ${remainingDays} days remaining. Focus on improving these weak topics: ${weakTopics.join(', ')}. Provide detailed study schedule and tips.`;
    
    try {
      const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const response = await model.generateContent(prompt);

      const text = response.response.text();
      if (!text) throw new Error("Empty response from AI");
      return { data: text, error: null };
    } catch (e: any) {
      console.error('Gemini error:', e);
      let message = "Failed to generate study plan. Please try again later.";
      if (e.message?.includes("429")) message = "API Quota exceeded. Please wait a moment.";
      if (e.message?.includes("fetch")) message = "Network error. Check your connection.";
      return { data: null, error: message };
    }
  },

  async getBurnoutAnalysis(studyHours: number[], sleepHours: number[], accuracyTrend: number[]): Promise<AIResponse<any>> {
    const ai = getAI();
    const prompt = `Analyze this student data for burnout: Study hours per day: [${studyHours.join(', ')}], Sleep hours: [${sleepHours.join(', ')}], Accuracy trend: [${accuracyTrend.join(', ')}]. Provide status (Healthy/Overloaded/Warning) and suggestions.`;
    
    try {
      const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const response = await model.generateContent(prompt);
      
      const text = response.response.text();
      if (!text) throw new Error("Empty response from AI");
      return { data: text, error: null };
    } catch (e: any) {
      console.error('Gemini error:', e);
      return { data: null, error: "Burnout analysis failed. Our AI is resting." };
    }
  },

  async predictCareer(expectedScore: number, examName: string): Promise<AIResponse<any>> {
    const ai = getAI();
    const prompt = `Based on a score of ${expectedScore} in ${examName}, predict 3 potential colleges and career paths. Be specific with recommendations.`;
    
    try {
      const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const response = await model.generateContent(prompt);
      
      const text = response.response.text();
      if (!text) throw new Error("Empty response from AI");
      return { data: text, error: null };
    } catch (e: any) {
      console.error('Gemini error:', e);
      return { data: null, error: "Career prediction unavailable at this moment." };
    }
  },

  // New AI Chat function for general questions
  async chat(message: string, context?: string): Promise<AIResponse<string>> {
    const ai = getAI();
    const fullPrompt = context 
      ? `${context}\n\nUser Question: ${message}` 
      : message;
    
    try {
      console.log('Sending to Gemini API:', { model: 'gemini-1.5-flash', prompt: fullPrompt });
      
      const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const response = await model.generateContent(fullPrompt);

      console.log('Gemini response:', response);
      
      const text = response.response.text();
      if (!text) throw new Error("Empty response from AI");
      return { data: text, error: null };
    } catch (e: any) {
      console.error('Gemini chat error:', e);
      console.error('Error details:', {
        message: e.message,
        stack: e.stack,
        response: e.response?.status
      });
      
      let errorMessage = "Failed to get response. Check API key and try again.";
      if (e.message?.includes("429")) errorMessage = "API rate limit reached. Wait a moment.";
      if (e.message?.includes("401") || e.message?.includes("403")) errorMessage = "API authentication failed.";
      if (e.message?.includes("fetch")) errorMessage = "Network error. Check connection.";
      if (e.message?.includes("INVALID_ARGUMENT")) errorMessage = "API configuration error.";
      
      return { data: null, error: errorMessage };
    }
  },

  // AI doubt clearing - specific for exam prep
  async doubtClearing(doubt: string, subject: string, topic: string): Promise<AIResponse<string>> {
    const ai = getAI();
    const prompt = `You are an expert ${subject} tutor. A student has a doubt about ${topic}:\n\n"${doubt}"\n\nProvide a clear, detailed explanation suitable for competitive exam preparation. Include relevant formulas, concepts, and examples.`;
    
    try {
      const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const response = await model.generateContent(prompt);

      const text = response.response.text();
      if (!text) throw new Error("Empty response from AI");
      return { data: text, error: null };
    } catch (e: any) {
      console.error('Gemini doubt clearing error:', e);
      return { data: null, error: "Could not clarify doubt. Please try rephrasing your question." };
    }
  },

  // AI explanation for concepts
  async explainConcept(concept: string, subject: string, level: string): Promise<AIResponse<string>> {
    const ai = getAI();
    const prompt = `Explain the concept of "${concept}" in ${subject} at ${level} level. Make it beginner-friendly but comprehensive. Include:\n1. Definition\n2. Key Points\n3. Real-world Applications\n4. Common Mistakes to Avoid`;
    
    try {
      const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const response = await model.generateContent(prompt);

      const text = response.response.text();
      if (!text) throw new Error("Empty response from AI");
      return { data: text, error: null };
    } catch (e: any) {
      console.error('Gemini concept error:', e);
      return { data: null, error: "Could not explain concept. Try again later." };
    }
  },

  // AI question generation
  async generateQuestions(topic: string, subject: string, difficulty: string, count: number): Promise<AIResponse<string[]>> {
    const ai = getAI();
    const prompt = `Generate ${count} ${difficulty} level ${subject} questions about "${topic}" suitable for competitive exams. Return as a plain text list, one question per line.`;
    
    try {
      const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const response = await model.generateContent(prompt);

      const text = response.response.text();
      if (!text) throw new Error("Empty response from AI");
      
      const questions = text.split('\n').filter(q => q.trim().length > 0);
      return { data: questions, error: null };
    } catch (e: any) {
      console.error('Gemini question generation error:', e);
      return { data: null, error: "Could not generate questions. Try again." };
    }
  },

  // AI solution explanation
  async solveProblem(problem: string, subject: string): Promise<AIResponse<string>> {
    const ai = getAI();
    const prompt = `Solve this ${subject} problem step by step:\n\n${problem}\n\nProvide:\n1. Understanding the Problem\n2. Solution Steps\n3. Final Answer\n4. Key Concept Used`;
    
    try {
      const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const response = await model.generateContent(prompt);

      const text = response.response.text();
      if (!text) throw new Error("Empty response from AI");
      return { data: text, error: null };
    } catch (e: any) {
      console.error('Gemini problem solving error:', e);
      return { data: null, error: "Could not solve problem. Please check the format and try again." };
    }
  }
};
