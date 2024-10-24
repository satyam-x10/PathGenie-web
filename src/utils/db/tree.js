const mongoose = require("mongoose");
const { addRootTopicToUser } = require("./mongo");

const treeSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId
    auto: true, // Auto-generates _id if not provided
  },
  name: {
    type: String,
    required: true, // 'name' is required
  },
  parents: {
    type: [String], // Array of strings (parents' IDs and names)
    default: [], // Default to an empty array
  },
  children: {
    type: [String], // Array of strings (children's IDs and names)
    default: [], // Default to an empty array
  },
});

const Tree = mongoose.models.Tree || mongoose.model("Tree", treeSchema);

const { ObjectId } = require("mongodb"); // Importing to generate MongoDB-like ObjectId

const convertToTasks = async (data, parentIds = []) => {
  let tasks = [];

  // Helper function to generate a unique MongoDB-like ObjectId
  const generateId = () => new ObjectId().toString();

  // Recursive function to process each node
  const processNode = (node, parentIds) => {
    const current = generateId() + " " + Object.keys(node)[0];
    const task = {
      name: current,
      parents: parentIds,
      children: [],
    };

    Object.entries(node).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        // Process each child node
        value.forEach((child) => {
          const childTask = processNode(child, [current]);
          task.children.push(childTask.name); // Collect child ID
          tasks.push(childTask); // Add the child task to the task array
        });
      }
    });

    return task;
  };

  // Start processing the root data
  data.forEach((rootNode) => {
    Object.entries(rootNode).forEach(([key, value]) => {
      const rootTask = processNode({ [key]: value }, parentIds);
      tasks.push(rootTask); // Add the root task to the task array
    });
  });

  return tasks;
};

const makeTreefromData = async (data) => {
  const tasks = await convertToTasks(data);
  return tasks;
};

const saveTreeToMongo = async (data, email) => {
  // Parse the string into JSON
  const parsedData = JSON.parse(data);

  //console.log("type of parsed data:", typeof parsedData);

  // Extract topics
  const topics = await makeTreefromData(parsedData);
  //console.log("topics from the tree:", topics);
  await uploadTree(topics);
  const history_id = topics[0].name.split(" ")[0];
  //console.log("history_id", history_id);

  if (email) {
    // print id of first topic
    addRootTopicToUser(email, history_id);
  }
  return topics; // Return topics
};

const uploadTree = async (treeData) => {
  for (const tree of treeData) {
    await uploadTreeNode(tree);
  }
};

const uploadTreeNode = async (treeNode) => {
  await Tree.create(treeNode);
};

// Export all functions using module.exports
module.exports = {
  Tree,
  saveTreeToMongo,
  uploadTree,
  uploadTreeNode,
};
