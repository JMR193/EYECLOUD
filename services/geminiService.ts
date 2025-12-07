import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateMedicalSummary = async (notes: string): Promise<string> => {
  if (!apiKey) return "API Key not configured.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an expert ophthalmology scribe. Please summarize the following raw clinical notes into a structured medical record format (History, Findings, Assessment, Plan). concise and professional.
      
      Raw Notes:
      ${notes}`,
    });
    return response.text || "No summary generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating summary. Please check your network or API key.";
  }
};

export const generatePatientEducation = async (diagnosis: string): Promise<string> => {
  if (!apiKey) return "API Key not configured.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a simple, comforting, and easy-to-understand explanation for a patient who has just been diagnosed with ${diagnosis}. Include lifestyle tips and what to expect. Keep it under 200 words.`,
    });
    return response.text || "No content generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating education material.";
  }
};

export const analyzeSymptoms = async (symptoms: string): Promise<string> => {
    if (!apiKey) return "API Key not configured.";
  
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are a clinical decision support assistant. Based on these eye-related symptoms: "${symptoms}", suggest potential differential diagnoses and recommended exam tests. 
        Format as: 
        **Possible Conditions:** ...
        **Recommended Tests:** ...
        
        Disclaimer: This is for provider support only.`,
      });
      return response.text || "No analysis generated.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Error analyzing symptoms.";
    }
  };
