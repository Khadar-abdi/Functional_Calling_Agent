 
 import { GoogleGenerativeAI } from "@google/generative-ai";
import { getOrderStatus } from "./agent-tools";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
 
 
// export const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const prompt = `
You are an AI assistant for order tracking. 
When a user asks a question, respond ONLY in this JSON format:

 {
  "function": "getOrderStatus",
  "arguments": {
    "orderId": "12345"
  }
}

Only use function name: getOrderStatus. Do not explain anything.
`;



export async function runGeminiAgent(userMessage: string) {
  const result  = await model.generateContent([
    { text: `${prompt}\nUser: ${userMessage}` }
  ]);

    let text = result.response.text();

    text = text.trim().replace(/^```json/, '').replace(/^```/, '').replace(/```$/, '').trim();

  try {
    const parsed = JSON.parse(text);
   

    if (parsed.function === "getOrderStatus") {

   
      const res = await getOrderStatus({ orderId: parsed.arguments.orderId });

 
      if (typeof res === 'undefined' || res === null) {
        return "Sorry, I couldn't find the order status for that order ID.";
      }
      return String(res).trim();
    }

    return "Sorry, I couldn’t match your request to any function.";
  } catch (err) {
    console.error("Failed to parse Gemini JSON:", text);
    return "Sorry, I had trouble understanding your request.";
  }
 
}