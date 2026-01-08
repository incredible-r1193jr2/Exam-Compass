
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  // Creating a personalized study plan is a complex reasoning task
  async getSmartPlan(targetExam: string, remainingDays: number, weakTopics: string[]) {
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
      return JSON.parse(response.text || '{}');
    } catch (e) {
      console.error('Gemini error:', e);
      return null;
    }
  },

  // Burnout analysis requires reasoning over student behavior data
  async getBurnoutAnalysis(studyHours: number[], sleepHours: number[], accuracyTrend: number[]) {
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
      return JSON.parse(response.text || '{}');
    } catch (e) {
      console.error('Gemini error:', e);
      return null;
    }
  },

  // Career prediction involves analysis of exam scores and academic outcomes
  async predictCareer(expectedScore: number, examName: string) {
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
      return JSON.parse(response.text || '{}');
    } catch (e) {
      console.error('Gemini error:', e);
      return null;
    }
  }
};
