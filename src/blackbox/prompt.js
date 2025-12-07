import { askFromGemini } from "./gemini.js";

// Function to generate a learning prompt based on an input string
async function generateLearningPrompt(inputString) {
  let initialInput = inputString;
  let isSpecific = false;

  console.log(`Generating a learning prompt for: "${initialInput}"`);

  const evaluationString = `
    Evaluate the following learning interest: "${initialInput}". 
    Determine if it is a valid and suitable niche for learning. 
    Respond with:
    SPECIFIC: true (if the interest is appropriate) or false (if it is not).
  `;

  const specificityCheck = await askFromGemini(evaluationString);
  console.log("SPECIFICITY RESULT:", specificityCheck);

  // ✅ FIX: since askFromGemini already returns TEXT
  isSpecific = specificityCheck.includes("SPECIFIC: true");

  if (!isSpecific) {
    console.log("\nPlease be more specific about what you want to learn.");
  }

  // Generate the learning prompt
  const promptGenerationString = `
    Generate a clear and concise prompt for learning: "${initialInput}"
    The prompt should be 2-3 sentences maximum focusing on:
    - What exactly needs to be learned
    - The specific goal or outcome
    Do not include any resource suggestions or learning path details.
    Keep it focused and direct.
  `;

  const promptGeneration = await askFromGemini(promptGenerationString);

  // ✅ FIX: already text
  return promptGeneration;
}

// Export the function to be used in other files
export async function generatePrompt(inputString) {
  try {
    const prompt = await generateLearningPrompt(inputString);
    if (prompt) {
      return prompt;
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
