
import { GoogleGenAI } from "@google/genai";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIOrientation = async (userQuery: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userQuery,
      config: {
        systemInstruction: `Você é um assistente virtual da Consulfeca, um consultório de psicologia clínica. 
        Seu objetivo é orientar os usuários sobre os serviços disponíveis: 
        1. Psicoterapia (Individual, Infantil, Família, Casal).
        2. Aplicação de testes psicológicos online (avaliação de personalidade, cognitiva, etc).
        3. Treinamento para psicólogos e empresas.
        Responda de forma empática, profissional e acolhedora. Nunca substitua um diagnóstico médico ou terapêutico real. 
        Sempre sugira marcar uma consulta para uma avaliação detalhada.`,
        temperature: 0.7,
      },
    });

    // The GenerateContentResponse object features a text property that directly returns the string output.
    return response.text || "Desculpe, não consegui processar sua solicitação no momento. Por favor, tente novamente.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Ocorreu um erro ao conectar com nossa assistente inteligente. Por favor, entre em contato via WhatsApp.";
  }
};
