// gemini.js

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error(
    "Missing NEXT_PUBLIC_GEMINI_API_KEY in .env. Get one from https://aistudio.google.com/app/apikey"
  );
}

// Initialize the Gemini client
const genAI = new GoogleGenerativeAI(API_KEY);

// Use the SAME model as Python
const modelName = "gemini-2.5-flash";

export async function askFromGemini(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: modelName });

    const result = await model.generateContent(prompt.trim());

    // The JS SDK returns a wrapper → you must access response.text()
    return result.response.text() || "No response text received.";
  } catch (err) {
    return `Gemini API Error: ${err}`;
  }
}

// Quick test
// askFromGemini("What is the capital of France?")
//   .then((res) => console.log("Gemini Response:", res))
//   .catch((err) => console.error("Error:", err));
