import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// 1. City Info Service using Search Grounding
export const fetchCityInfo = async (cityName: string): Promise<{ text: string; sources: string[] }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Forneça um resumo de viagem curto e interessante para o município de ${cityName} no Rio Grande do Sul, Brasil. Inclua uma "curiosidade" específica ou um fato histórico. Mantenha menos de 150 palavras. Responda em Português do Brasil.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "Informação não disponível.";
    
    // Extract grounding chunks if available
    const sources: string[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web?.uri) {
          sources.push(chunk.web.uri);
        }
      });
    }

    return { text, sources: [...new Set(sources)] }; // Unique sources
  } catch (error) {
    console.error("Error fetching city info:", error);
    return { text: "Não foi possível buscar informações da cidade neste momento.", sources: [] };
  }
};

// 2. Chatbot Service using Gemini 3 Pro Preview
export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: `Você é um assistente de viagem útil especificamente para o estado do Rio Grande do Sul (RS), Brasil. 
      Você conhece a cultura, chimarrão, churrasco, regiões específicas (Serra, Missões, Pampa, Litoral) e turismo.
      Seja amigável, prestativo e conciso. Responda sempre em Português do Brasil.`,
    },
  });
};

export const sendMessageToChat = async (chat: Chat, message: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "";
  } catch (error) {
    console.error("Error in chat:", error);
    return "Desculpe, estou com problemas para conectar à base de conhecimento de viagens no momento.";
  }
};