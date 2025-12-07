import { GoogleGenAI } from "@google/genai";
import { Patient } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to check key
const checkKey = () => {
    if (!apiKey) console.warn("Gemini API Key missing. Using simulated fallback responses.");
    return !!apiKey;
};

export const generateMedicalSummary = async (notes: string): Promise<string> => {
  if (!checkKey()) return "Simulated: Patient has mild nuclear sclerosis OU. IOP is within normal limits. Plan for follow-up in 6 months.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an expert ophthalmology scribe. Summarize the following raw clinical notes into a structured format (History, Findings, Assessment, Plan). Keep it concise.
      
      Raw Notes:
      ${notes}`,
    });
    return response.text || "No summary generated.";
  } catch (error) {
    return "Error generating summary.";
  }
};

export const generatePatientEducation = async (diagnosis: string): Promise<string> => {
  if (!checkKey()) return `Simulated education for ${diagnosis}: This condition involves... (AI Key Missing)`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a comforting, easy-to-understand explanation for a patient diagnosed with ${diagnosis}. Include lifestyle tips. Max 150 words.`,
    });
    return response.text || "No content generated.";
  } catch (error) {
    return "Error generating education material.";
  }
};

export const analyzeSymptoms = async (symptoms: string): Promise<string> => {
    if (!checkKey()) return "**Possible Conditions:**\n1. Dry Eye Syndrome\n2. Blepharitis\n\n**Recommended Tests:**\n- TBUT\n- Schirmer Test";
  
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are a clinical decision support system. Analyze these eye symptoms: "${symptoms}".
        Provide Differential Diagnosis and Recommended Tests.
        Format with Markdown headers.`,
      });
      return response.text || "No analysis generated.";
    } catch (error) {
      return "Error analyzing symptoms.";
    }
};

// --- New Advanced AI Features ---

// 1. AI Scribe: Converts raw voice transcript to structured clinical notes
export const generateScribeNotes = async (transcript: string): Promise<string> => {
    if (!checkKey()) {
        return `HISTORY: Patient reports ${transcript}. 
FINDINGS: Unremarkable unless specified.
PLAN: Follow up as needed.`;
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Act as a medical scribe. Convert this raw dictation into professional Ophthalmology EMR notes (SOAP format). Correct medical terminology.
            
            Dictation: "${transcript}"`
        });
        return response.text || "Could not format notes.";
    } catch (e) {
        return "Error processing dictation.";
    }
};

// 2. Natural Language Query for Patient Data
export const queryPatientData = async (query: string, patientContext: Patient): Promise<string> => {
    if (!checkKey()) return "I can show you the IOP trend. It has been stable around 14mmHg for the last 3 visits.";

    try {
        // We pass the patient JSON to the context so the AI can "query" it
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Context: You are an intelligent medical assistant. 
            Patient Data: ${JSON.stringify(patientContext)}
            
            User Query: "${query}"
            
            Answer the query based strictly on the patient data provided. If asking for trends (like IOP), summarize the clinicalSnapshot history.`
        });
        return response.text || "I couldn't find that information.";
    } catch (e) {
        return "Error processing query.";
    }
};

// 3. Clinical Decision Support (Simulating Multi-Model Ensemble)
export const getDecisionSupport = async (diagnosis: string, notes: string): Promise<{
    confidence: number;
    recommendations: string[];
    models: string[];
}> => {
    if (!checkKey()) {
        return {
            confidence: 92,
            recommendations: ["Perform OCT Macula", "Start Anti-VEGF therapy if edema present", "Monitor blood sugar levels"],
            models: ["Gemini-Med", "GPT-4-Vision", "LLaMA-Health"]
        };
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Analyze this case: Diagnosis: ${diagnosis}, Notes: ${notes}.
            Provide 3 evidence-based recommendations.
            Estimate a confidence score (0-100) based on clinical guidelines.
            Return ONLY JSON: { "confidence": number, "recommendations": string[] }`,
             config: { responseMimeType: "application/json" }
        });
        
        const text = response.text || "{}";
        const result = JSON.parse(text);
        
        return {
            confidence: result.confidence || 85,
            recommendations: result.recommendations || ["Review guidelines"],
            models: ["Gemini-Med", "GPT-4-Vision", "LLaMA-Health"] // Simulated ensemble names
        };
    } catch (e) {
        return {
            confidence: 0,
            recommendations: ["Error generating support"],
            models: []
        };
    }
};