import { GoogleGenerativeAI } from "@google/generative-ai";
 import dotenv from 'dotenv';

 dotenv.config(); // Load environment variables

 const apiKey = process.env.API_KEY;
 if (!apiKey) {
     console.error("API Key not found in .env file (geminiApi.js)");
     process.exit(1);
 }
 const genAI = new GoogleGenerativeAI(apiKey);

 async function runGemini(prompt) { // Added question as a parameter
     try {
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

         return result.response.text(); // return the result
     } catch (error) {
         console.error("Error in Gemini API call:", error);
         throw error; // Re-throw the error for the caller to handle
     }
 }

 export { runGemini };