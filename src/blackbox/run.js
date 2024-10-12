import { cleanResponse } from "./cleanResponse.js";
import { generatePrompt } from "./prompt.js";
import { getNestedTopics } from "./resource.js";
import fs from "fs/promises";
import { getSerpResults } from "./serp.js";
export default async function collectResource(learningTopic) {
  // const prompt = await generatePrompt();
  // console.log('prompt generated:', prompt);
  // const response = await getNestedTopics(prompt);
  // const cleanedResponse = await cleanResponse(response);
  // const serpResults = await getSerpResults(prompt);
  return `${learningTopic} collected`;
}
