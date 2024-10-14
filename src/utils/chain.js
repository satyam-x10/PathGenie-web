const { ObjectId } = require('mongodb'); // Import ObjectId from mongodb
const fs = require('fs'); // Import fs module to write to a file
// Function to extract topics
const {  uploadChainData, uploadArrayOfChainData, addRootTopicToUser } = require('./mongo');

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
          _id: topicId.toString(), // Convert ObjectId to string for easier JSON serialization
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
                topic.children.push({ _id: childId.toString(), name: childName });
              });
            } else if (typeof child === 'string') {
              // If it's a string (leaf node), add it directly
              const childId = new ObjectId(); // Generate a MongoDB ObjectId for the leaf node
              topic.children.push({ _id: childId.toString(), name: child });
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

function saveTopicsFromLocalStorage(data,email) {
  // Parse the string into JSON
  const parsedData = JSON.parse(data);

  console.log('Data:', parsedData);
  console.log('type of parsed data:', typeof parsedData);

  // Write parsed data to file
  fs.writeFileSync('dog.json', JSON.stringify(parsedData, null, 2));
  
  // Extract topics
  const topics = extractTopics(parsedData);
  fs.writeFileSync('topics.json', JSON.stringify(topics, null, 2));
  uploadArrayOfChainData(topics);
  if(email){
    console.log('first topic id:', topics[0]._id);

    // print id of first topic
    console.log('email gg :', email);
    addRootTopicToUser(email, topics[0]._id);
  }
  console.log('uploaed to mongo');
  

  return topics; // Return topics
}


module.exports = { saveTopicsFromLocalStorage };
