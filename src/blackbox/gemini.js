// gemini.js

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const dotenv = require("dotenv");

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function askFromGemini(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const res = await model.generateContent(prompt);

  // const response = await res.response;
  // let text = response.text();
  // text = text.replace(/\*\*|\*|\d+\./g, '');
  // //console.log("Gemini API Response:", res); // Log the full response

  // // Extract the text from the response object
  // const aiText = res?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
  return res; // Return the text part
}


//test the function
// askFromGemini("What is the capital of France?").then((response) => {
//   console.log("Gemini API Response:", response);
// });