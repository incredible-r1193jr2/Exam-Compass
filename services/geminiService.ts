
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface AIResponse<T> {
  data: T | null;
  error: string | null;
}

export const geminiService = {
  async getSmartPlan(targetExam: string, remainingDays: number, weakTopics: string[]): Promise<AIResponse<any>> {
    const ai = getAI();
    const prompt = `Create a daily study plan for ${targetExam} with ${remainingDays} days remaining. Focus on improving these weak topics: ${weakTopics.join(', ')}. Return the response in a structured JSON format.`;
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              plan: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.NUMBER },
                    focus: { type: Type.STRING },
                    tasks: { type: Type.ARRAY, items: { type: Type.STRING } }
                  }
                }
              }
            }
          }
        }
      });

      const text = response.text;
      if (!text) throw new Error("Empty response from AI");
      return { data: JSON.parse(text), error: null };
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
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              status: { type: Type.STRING },
              riskLevel: { type: Type.NUMBER },
              suggestion: { type: Type.STRING }
            }
          }
        }
      });
      const text = response.text;
      if (!text) throw new Error("Empty response from AI");
      return { data: JSON.parse(text), error: null };
    } catch (e: any) {
      console.error('Gemini error:', e);
      return { data: null, error: "Burnout analysis failed. Our AI is resting." };
    }
  },

  async predictCareer(expectedScore: number, examName: string): Promise<AIResponse<any>> {
    const ai = getAI();
    const prompt = `Based on a score of ${expectedScore} in ${examName}, predict 3 potential colleges and career paths. Respond in JSON.`;
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              predictions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    college: { type: Type.STRING },
                    likelihood: { type: Type.STRING },
                    careerPath: { type: Type.STRING }
                  }
                }
              }
            }
          }
        }
      });
      const text = response.text;
      if (!text) throw new Error("Empty response from AI");
      return { data: JSON.parse(text), error: null };
    } catch (e: any) {
      console.error('Gemini error:', e);
      return { data: null, error: "Career prediction unavailable at this moment." };
    }
  }
};
