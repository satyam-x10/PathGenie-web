const { ObjectId } = require('mongodb'); // Import ObjectId from mongodb
const fs = require('fs'); // Import fs module to write to a file
// Function to extract topics
const {  uploadChainData, uploadArrayOfChainData, addRootTopicToUser, Chain } = require('./mongo');

function extractTopics(data) {
  let topics = [];

  // Map to store topics by name for reuse, ensuring correct parent-child relationship
  let topicMap = new Map();

  function traverse(obj, parentId = null) {
    if (Array.isArray(obj)) {
      obj.forEach(item => traverse(item, parentId));
    } else if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        let topicId;

        // Check if the topic already exists in the map to reuse its ID
        if (topicMap.has(key)) {
          topicId = topicMap.get(key)._id;  // Use the existing topic's ID
        } else {
          // If the topic doesn't exist, create a new ObjectId and topic entry
          topicId = new ObjectId().toString();
          const topic = {
            _id: topicId,         // Assign the generated or reused ObjectId
            topic: key,
            parent: parentId,      // Reference to parent ID
            children: []           // Children will be populated later
          };
          
          topics.push(topic);
          topicMap.set(key, topic);  // Store the topic in the map for future use
        }

        // Get the current value (array of children or subtopics)
        const currentValue = obj[key];
        
        // If current value is an array, process it as children
        if (Array.isArray(currentValue)) {
          currentValue.forEach(child => {
            if (typeof child === 'object' && child !== null) {
              // Recursively traverse child objects
              const childName = Object.keys(child)[0];  // Get the first key as the child topic name
              
              let childTopicId;

              // Ensure that child topics also reuse IDs if already seen
              if (topicMap.has(childName)) {
                childTopicId = topicMap.get(childName)._id;  // Reuse the existing ID
              } else {
                // Create a new ID if this is the first time the child is encountered
                childTopicId = new ObjectId().toString();
                const childTopic = {
                  _id: childTopicId,
                  topic: childName,
                  parent: topicId,  // This child's parent is the current topic
                  children: []
                };
                
                topics.push(childTopic);
                topicMap.set(childName, childTopic);  // Add to the map
              }

              // Add this child to the parent's children array
              topicMap.get(key).children.push({ _id: childTopicId, name: childName });

              // Recurse into this child
              traverse(child, childTopicId);
            }
          });
        }

        // Recursively process deeper objects
        traverse(currentValue, topicId);
      }
    }
  }

  // Start traversing from the root of the data
  traverse(data);

  return topics;
}

async function saveChainTopicToMongo(data,email) {
  // Parse the string into JSON
  const parsedData = JSON.parse(data);

  console.log('Data:', parsedData);
  console.log('type of parsed data:', typeof parsedData);

  // Write parsed data to file
  fs.writeFileSync('dog.json', JSON.stringify(parsedData, null, 2));
  
  // Extract topics
  const topics = extractTopics(parsedData);
  fs.writeFileSync('topics.json', JSON.stringify(topics, null, 2));
  const history_id= await uploadChainData(parsedData);
  if(email){
    console.log('first topic id:', topics[0]._id);

    // print id of first topic
    console.log('email gg :', email);
    addRootTopicToUser(email, history_id);
  }
  console.log('uploaed to mongo');
  

  return topics; // Return topics
}

async function getTreeById(minimapId) {
  try {
    const result = [];
    const visited = new Set();

    async function fetchChildren(id) {
      if (visited.has(id.toString())) return;
      visited.add(id.toString());

      const node = await Chain.findById(id).lean();
      if (!node) return;

      result.push(node);

      if (node.children && node.children.length > 0) {
        for (const childId of node.children) {
          await fetchChildren(childId);
        }
      }
    }

    // Start with the root node
    const rootNode = await Chain.findById( minimapId ).lean();
    if (!rootNode) {
      throw new Error('No chain found with the given minimapId');
    }

    await fetchChildren(rootNode._id);

    return result;
  } catch (error) {
    console.error('Error in getTreeById:', error);
    throw error;
  }
}

module.exports = { saveChainTopicToMongo, getTreeById,extractTopics };
