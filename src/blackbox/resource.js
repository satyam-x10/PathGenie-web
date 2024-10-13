import { askFromGemini } from "./gemini.js";

async function gatherLearningPreferences() {
  const experience = await getUserInput(
    "How much experience do you have in this? (none, beginner, intermediate, expert): ",
  );

  return { experience };
}

async function generateHierarchicalTasksPrompt(basePrompt) {
  const masterPrompt = `
  ${basePrompt}.
  Based on the provided prompt, return a detailed hierarchical breakdown of all topics and subtopics in a strictly nested JSON format. Ensure that the structure is clear and follows this format precisely.
  For example, if the prompt was about "Machine Learning," the output should be:

[
  {
    "Machine Learning": [
      {
        "Supervised Learning": [
          {
            "Algorithms": [
              {
                "Regression": [
                  "Linear Regression",
                  "Logistic Regression"
                ]
              },
              {
                "Classification": [
                  "Decision Trees",
                  "Random Forest",
                  "Support Vector Machine"
                ]
              }
            ]
          }
        ]
      },
      {
        "Unsupervised Learning": [
          {
            "Algorithms": [
              {
                "Clustering": [
                  "K-Means",
                  "Hierarchical Clustering"
                ]
              },
              {
                "Dimensionality Reduction": [
                  "PCA (Principal Component Analysis)",
                  "t-SNE"
                ]
              }
            ]
          }
        ]
      },
      {
        "Reinforcement Learning": [
          {
            "Concepts": [
              "Agent",
              "Environment",
              "Rewards",
              "Policy"
            ]
          },
          {
            "Algorithms": [
              "Q-Learning",
              "Deep Q-Network (DQN)"
            ]
          }
        ]
      }
    ]
  }
]

  Please make sure to adhere to this JSON format strictly, with each topic and subtopic clearly nested under the appropriate parent categories. The structure should allow for easy extraction and processing for project use.
`;

  return masterPrompt;
}

export async function getNestedTopics(basePrompt) {
  // Get the topic from user input instead of hardcoding it
  // const basePrompt = await getUserInput("Please enter the topic you want to learn about: ");

  try {
    const masterPrompt = await generateHierarchicalTasksPrompt(basePrompt);
    
    const response = await askFromGemini(masterPrompt);

    // Call the text() method to get the actual response text
    const responseText = response.response.text();
    return responseText;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// make a mock function to generaet the hierarchical tasks

 async function generateHierarchicalTasksMock() {
  const mockData = {
    "Machine Learning": [
      {
        "Supervised Learning": [
          {
            Algorithms: [
              {
                Regression: ["Linear Regression", "Logistic Regression"],
              },
              {
                Classification: [
                  "Decision Trees",
                  "Random Forest",
                  "Support Vector Machine",
                ],
              },
            ],
          },
        ],
      },
      {
        "Unsupervised Learning": [
          {
            Algorithms: [
              {
                Clustering: ["K-Means", "Hierarchical Clustering"],
              },
              {
                "Dimensionality Reduction": [
                  "PCA (Principal Component Analysis)",
                  "t-SNE",
                ],
              },
            ],
          },
        ],
      },
      {
        "Reinforcement Learning": [
          {
            Concepts: ["Agent", "Environment", "Rewards", "Policy"],
          },
          {
            Algorithms: ["Q-Learning", "Deep Q-Network (DQN)"],
          },
        ],
      },
    ],
  };
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockData;
}
