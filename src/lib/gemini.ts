import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getPredictedPrice(query: string, prices: number[]) {
  if (!process.env.GEMINI_API_KEY) {
    return {
      predictedPrice: prices[0] || 0,
      verdict: "Unknown",
      reason: "Gemini API key missing",
    };
  }

  try {
    const validPrices = prices.filter(p => !isNaN(p) && p > 0);
    const avg = validPrices.length ? validPrices.reduce((a, b) => a + b, 0) / validPrices.length : 0;
    
    const prompt = `
      You are an AI Price Analyst.
      Product: ${query}
      Current fetched prices: ${JSON.stringify(validPrices)}
      Average price: ${avg}

      Analyze the pricing for this product based on your knowledge of its typical market value, sales history, and the current fetched prices.
      Return ONLY a JSON object with the following structure, nothing else:
      {
        "predictedPrice": number, // What should be the fair/sale value of this product?
        "verdict": string, // "Wait for Discount" or "Buy Now"
        "reason": string // A short 1-sentence reason
      }
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
  } catch (e) {
    console.error("Gemini Prediction Error:", e);
    return {
      predictedPrice: prices[0] || 0,
      verdict: "Buy Now",
      reason: "Could not generate AI prediction.",
    };
  }
}
