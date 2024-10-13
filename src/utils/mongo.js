const mongoose = require('mongoose');

const dotenv = require('dotenv');
require('dotenv').config();

// Connect to your development database
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.NEXT_PUBLIC_MONGO_URI}/dev`, {
    });
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};


// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  rootTopics: [{ type: String }]
});

// Topic Schema
const topicSchema = new mongoose.Schema({
  taskID: { type: String, required: true },
  title: { type: String, required: true },
  resourceId: { type: String, required: true },
  description: { type: String },
  subtopics: [{ type: String }],
  parentTopic: [{ type: String }]
});

// Resource Schema
const resourceSchema = new mongoose.Schema({
  title: { type: String },
  // Add more fields as necessary
});

// Models
const User = mongoose.models.User || mongoose.model('User', userSchema);
const Topic = mongoose.models.Topic || mongoose.model('Topic', topicSchema);
const Resource = mongoose.models.Resource || mongoose.model('Resource', resourceSchema);

// CRUD Operations for Users
const createUser = async (email, rootTopics) => {
  const user = new User({ email, rootTopics });
  return await user.save();
};

const getAllUsers = async () => {
  return await User.find();
};

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const updateUser = async (email, updatedData) => {
  return await User.findOneAndUpdate({ email }, updatedData, { new: true });
};

const deleteUser = async (email) => {
  return await User.findOneAndDelete({ email });
};

// CRUD Operations for Topics
const createTopic = async (taskID, title, resourceId, description, subtopics, parentTopic) => {
  const topic = new Topic({ taskID, title, resourceId, description, subtopics, parentTopic });
  return await topic.save();
};

const getAllTopics = async () => {
  return await Topic.find();
};

const getTopicById = async (id) => {
  return await Topic.findById(id);
};

const updateTopic = async (id, updatedData) => {
  return await Topic.findByIdAndUpdate(id, updatedData, { new: true });
};

const deleteTopic = async (id) => {
  return await Topic.findByIdAndDelete(id);
};

// CRUD Operations for Resources
const createResource = async (title, additionalFields) => {
  const resource = new Resource({ title, ...additionalFields });
  return await resource.save();
};

const getAllResources = async () => {
  return await Resource.find();
};

const getResourceById = async (id) => {
  return await Resource.findById(id);
};

const updateResource = async (id, updatedData) => {
  return await Resource.findByIdAndUpdate(id, updatedData, { new: true });
};

const deleteResource = async (id) => {
  return await Resource.findByIdAndDelete(id);
};

// Export the functions
module.exports = {
  connectDB,
  createUser,
  getAllUsers,
  getUserByEmail,
  updateUser,
  deleteUser,
  createTopic,
  getAllTopics,
  getTopicById,
  updateTopic,
  deleteTopic,
  createResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource,
};
