const { ObjectId } = require("mongodb"); 
const mongoose = require("mongoose");

const treeSchema = new mongoose.Schema({
  _id: {
    type: String, // Use String for _id to match the generated ID in `name`
  },
  name: {
    type: String,
    required: true,
    unique: true, // Ensure unique names
  },
  parents: {
    type: [String],
    default: [],
  },
  children: {
    type: [String],
    default: [],
  },
});

const Tree = mongoose.models.Tree || mongoose.model("Tree", treeSchema);

const { addRootTopicToUser } = require("./user");

const convertToNodes = async (data, parentIds = []) => {
  let tasks = [];

  // Helper function to generate a unique MongoDB-like ObjectId
  const generateId = () => new ObjectId().toString();

  // Recursive function to process each node
  const processNode = (node, parentIds) => {
    const id = generateId();
    const current = `${id} ${Object.keys(node)[0]}`;
    const task = {
      _id: id, // Use the generated ID as _id
      name: current,
      parents: parentIds,
      children: [],
    };

    Object.entries(node).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        // Process each child node
        value.forEach((child) => {
          const childTask = processNode(child, [current]);
          task.children.push(childTask.name); // Collect child name
          tasks.push(childTask); // Add the child task to tasks
        });
      }
    });

    return task;
  };

  // Process the root data
  data.forEach((rootNode) => {
    Object.entries(rootNode).forEach(([key, value]) => {
      const rootTask = processNode({ [key]: value }, parentIds);
      tasks.push(rootTask); // Add the root task to tasks
    });
  });

  return tasks;
};

const makeTreefromData = async (data) => {
  const tasks = await convertToNodes(data);
  return tasks;
};

const saveTreeToMongo = async (data, email) => {
  const parsedData = JSON.parse(data);
  const topics = await makeTreefromData(parsedData);
  await uploadTree(topics);
  const history_id = topics[topics.length-1]._id; // Use _id for history_id
  if (email) {
    addRootTopicToUser(email, history_id);
  }
  return history_id;
};

const uploadTree = async (treeData) => {
  console.log("Uploading trees");
  for (const tree of treeData) {
    await uploadTreeNode(tree);
  }
};

const uploadTreeNode = async (treeNode) => {
  console.log("Uploading tree node:", treeNode, typeof treeNode);
  return await Tree.create(treeNode);
};

const getTree = async (id) => {
  return await Tree.findById(id);
};

module.exports = {
  saveTreeToMongo,
  uploadTree,
  uploadTreeNode,
  getTree,
};
