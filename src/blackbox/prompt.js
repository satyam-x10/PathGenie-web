import { askFromGemini } from "./gemini.js";

// Function to generate a learning prompt based on an input string
async function generateLearningPrompt(inputString) {
  let initialInput = inputString;
  let isSpecific = false;

  // Check if the topic is specific enough

  // Log statement for debugging purposes (can be commented out in production)
  //console.log(`Generating a learning prompt for: "${initialInput}"`);

  const evaluationString = `
      Evaluate the following learning interest: "${initialInput}". 
      Determine if it is a valid and suitable niche for learning. 
      Respond with:
      SPECIFIC: true (if the interest is appropriate) or false (if it is not).
    `;
  const specificityCheck = await askFromGemini(evaluationString);

  const checkResult = specificityCheck.response.text();
  isSpecific = checkResult.includes("SPECIFIC: true");

  if (!isSpecific) {
    //console.log("\nPlease be more specific about what you want to learn.");
    // Adjust this to handle cases where you might want to prompt the user again
    // But since we are passing a string, we skip that here
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

  return promptGeneration.response.text();
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

export async function getRootDataFromGemini(inputString) {
  const rootDataString = `Generate a JSON object that includes a name, five tags related to the name, and a few possible names (alternative terms for the name). The JSON should be strictly structured as follows (machine learnign is example name):

{
  "name": "Machine Learning",
  "tags": [
    "Artificial Intelligence",
    "Data Science",
    "Deep Learning",
    "Neural Networks",
    "Predictive Analytics"
  ],
  "possibleNames": [
    "ML",
    "Statistical Learning",
    "Computational Learning",
    "Pattern Recognition",
    "Automated Learning"
  ]
}

Fill in the tags with terms closely associated with the name, and for possibleNames, include alternative terms that are used interchangeably or refer to the same concept. The topic name on which you have to give data is : "${inputString}".

  `;

  const rootData = await askFromGemini(rootDataString);
  return rootData.response.text();
}
