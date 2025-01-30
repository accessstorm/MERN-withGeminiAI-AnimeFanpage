import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { runGemini } from './geminiApi.js';
import cors from 'cors';
import path from 'path';

dotenv.config();
import titansRoutes from "./routes/titans.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Allow CORS only for your frontend deployment URL
const frontendURL = process.env.FRONTEND_URL || 'https://aot-fanpage.onrender.com/';
app.use(cors({
  origin: frontendURL,
}));

app.use(express.json());
app.use("/api/aot", titansRoutes); // uses titan.route.js

// Gemini API endpoint
app.post('/gemini', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    if (!prompt) {
      return res.status(400).send("A prompt must be provided");
    }
    const result = await runGemini(prompt);
    res.send({ response: result });
  } catch (error) {
    console.error("Error during Gemini API call", error);
    res.status(500).send("Error during processing");
  }
});

// Serve frontend static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Eren is going titan mode! at http://localhost:${PORT}`);
});
