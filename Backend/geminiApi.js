import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

let genAI = null; // Initialize genAI outside the function for lazy initialization

async function runGemini(prompt) {
  try {
    // Lazy initialization of genAI
    if (!genAI) {
      const apiKey = process.env.API_KEY;
        if (!apiKey) {
            console.error("API Key not found in environment variables (geminiApi.js)");
           throw new Error("API Key not found in environment variables (geminiApi.js)")
        }
        genAI = new GoogleGenerativeAI(apiKey);
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });
    const result = await chatSession.sendMessage(prompt); // use the parameter

    // Escape Markdown characters
    const responseText = result.response.text();
    const escapedText = escapeMarkdown(responseText);

    return escapedText; // return the escaped result
  } catch (error) {
    console.error("Error in Gemini API call:", error);
    throw new Error(`Gemini API error: ${error.message}`); // Re-throw the error with a clearer message
  }
}

function escapeMarkdown(text) {
  // Escapes common Markdown characters that might cause formatting issues.
  // Added more robust escaping using regular expressions.
  let escapedText = text.replace(/#/g, '\\#');   // Escape '#'
  escapedText = escapedText.replace(/\*/g, '\\*');   // Escape '*'
  escapedText = escapedText.replace(/>/g, '\\>');   // Escape '>'
  escapedText = escapedText.replace(/_/g, '\\_');   // Escape '_'
  escapedText = escapedText.replace(/`/g, '\\`');   // Escape '`' (backtick)
  escapedText = escapedText.replace(/!/g, '\\!');   // Escape '!'
  escapedText = escapedText.replace(/\[/g, '\\[');   // Escape '['
  escapedText = escapedText.replace(/\]/g, '\\]');   // Escape ']'
  escapedText = escapedText.replace(/\(/g, '\\(');   // Escape '('
  escapedText = escapedText.replace(/\)/g, '\\)');   // Escape ')'
  return escapedText;
}


export { runGemini };
