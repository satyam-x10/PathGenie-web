const { ObjectId } = require('mongodb'); // Import ObjectId from mongodb
const fs = require('fs'); // Import fs module to write to a file
// Function to extract topics


function extractTopics(data) {
  let topics = [];

  function traverse(obj, parentId = null) {
    if (Array.isArray(obj)) {
      obj.forEach(item => traverse(item, parentId));
    } else if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        // Create a topic object with a unique MongoDB ObjectId and parent ID
        const topicId = new ObjectId(); // Generate a MongoDB ObjectId for the topic
        const topic = {
          id: topicId.toString(), // Convert ObjectId to string for easier JSON serialization
          topic: key,
          parent: parentId, // Store the parent ID
          children: []
        };

        // Add the current topic to the topics array
        topics.push(topic);

        // Recurse into the value of the current key
        const currentValue = obj[key];
        if (Array.isArray(currentValue)) {
          // If the value is an array, populate children with actual titles
          currentValue.forEach(child => {
            if (typeof child === 'object' && child !== null) {
              // If child is an object, get its keys as children
              const childNames = Object.keys(child);
              childNames.forEach(childName => {
                // Add child name and generate ObjectId for it
                const childId = new ObjectId();
                topic.children.push({ id: childId.toString(), name: childName });
              });
            } else if (typeof child === 'string') {
              // If it's a string (leaf node), add it directly
              const childId = new ObjectId(); // Generate a MongoDB ObjectId for the leaf node
              topic.children.push({ id: childId.toString(), name: child });
            }
          });
        }

        // Recursive call to dive deeper into the structure
        traverse(currentValue, topicId);
      }
    }
  }

  // Start traversal from the data
  traverse(data);
  
  return topics;
}

// const data = [
//   {
//     "Artificial Intelligence (AI) Applications in Healthcare": [
//       {
//         "Fundamentals": [
//           {
//             "Introduction to AI": [
//               { "Concept and Definitions": [] },
//               { "Types of AI": [
//                 { "Machine Learning": [] },
//                 { "Deep Learning": [] },
//                 { "Natural Language Processing (NLP)": [] },
//                 { "Computer Vision": [] }
//               ] }
//             ]
//           },
//           {
//             "Machine Learning for Healthcare": [
//               { "Supervised Learning": [
//                 { "Algorithms": [
//                   { "Regression": [
//                     { "Linear Regression": [] },
//                     { "Logistic Regression": [] }
//                   ] },
//                   { "Classification": [
//                     { "Decision Trees": [] },
//                     { "Random Forest": [] },
//                     { "Support Vector Machine": [] }
//                   ] }
//                 ] }
//               ] },
//               { "Unsupervised Learning": [
//                 { "Algorithms": [
//                   { "Clustering": [
//                     { "K-Means": [] },
//                     { "Hierarchical Clustering": [] }
//                   ] },
//                   { "Dimensionality Reduction": [
//                     { "PCA (Principal Component Analysis)": [] },
//                     { "t-SNE": [] }
//                   ] }
//                 ] }
//               ] },
//               { "Reinforcement Learning": [
//                 { "Concepts": [
//                   { "Agent": [] },
//                   { "Environment": [] },
//                   { "Rewards": [] },
//                   { "Policy": [] }
//                 ] },
//                 { "Algorithms": [
//                   { "Q-Learning": [] },
//                   { "Deep Q-Network (DQN)": [] }
//                 ] }
//               ] }
//             ]
//           },
//           {
//             "Deep Learning for Healthcare": [
//               { "Convolutional Neural Networks (CNNs)": [] },
//               { "Generative Adversarial Networks (GANs)": [] },
//               { "Autoencoders": [] },
//               { "Transfer Learning": [] }
//             ]
//           },
//           {
//             "Natural Language Processing (NLP) for Healthcare": [
//               { "Text Classification": [] },
//               { "Machine Translation": [] },
//               { "Chatbots": [] },
//               { "Information Extraction": [] }
//             ]
//           },
//           {
//             "Computer Vision for Healthcare": [
//               { "Image Classification": [] },
//               { "Object Detection": [] },
//               { "Segmentation": [] },
//               { "Image Registration": [] }
//             ]
//           }
//         ]
//       },
//       {
//         "Applications of AI in Healthcare": [
//           {
//             "Diagnostics": [
//               { "Medical Imaging Analysis": [
//                 { "Computer-Aided Diagnosis (CAD)": [] },
//                 { "Radiomics": [] }
//               ] },
//               { "Bioinformatics Analysis": [
//                 { "Genomic Sequencing": [] },
//                 { "Proteomics": [] }
//               ] },
//               { "Wearable Sensors": [] }
//             ]
//           },
//           {
//             "Treatment": [
//               { "Personalized Medicine": [
//                 { "Precision Medicine": [] },
//                 { "Genetic Counseling": [] }
//               ] },
//               { "Robotic Surgery": [] },
//               { "Drug Discovery": [] }
//             ]
//           },
//           {
//             "Patient Care": [
//               { "Remote Monitoring": [] },
//               { "Virtual Health Assistants": [] },
//               { "Intelligent Chatbots": [] }
//             ]
//           }
//         ]
//       },
//       {
//         "Challenges and Ethical Considerations": [
//           {
//             "Data Privacy and Security": []
//           },
//           {
//             "Algorithm Bias": []
//           },
//           {
//             "Patient Acceptance": []
//           },
//           {
//             "Ethical Implications": [
//               { "Autonomy": [] },
//               { "Justice": [] },
//               { "Non-Maleficence": [] },
//               { "Beneficence": [] }
//             ]
//           }
//         ]
//       }
//     ]
//   }
// ]

function saveTopicsFromLocalStorage(data) {
  console.log('Data:', data);
  
  fs.writeFileSync('dog.json', JSON.stringify(data, null, 2));
  const topics = extractTopics(data);

  // Save topics to a file
    fs.writeFileSync('meow.json', JSON.stringify(topics, null, 2));
  return topics; // Return topics instead of saving to a file
}

module.exports = { saveTopicsFromLocalStorage };

// // Call the function with the sample data
// saveTopicsFromLocalStorage(data);
