
const mongoose = require("mongoose");
require("dotenv").config();


// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  rootTopics: [{ type: String }],
});



// Models
const User = mongoose.models.User || mongoose.model("User", userSchema);

// CRUD Operations for Users
const createUser = async (email, rootTopics) => {
  console.log("Creating user with email:", email);
  
  const user = new User({ email, rootTopics });
  return await user.save();
};

const getUserByEmail = async (email) => {
  console.log('retunrin g user by email:', email);
  
  return await User.findOne({ email });
};

const updateUser = async (email, updatedData) => {
  return await User.findOneAndUpdate({ email }, updatedData, { new: true });
};

const addRootTopicToUser = async (email, topicId) => {
  return await User.findOneAndUpdate(
    { email },
    { $push: { rootTopics: topicId } },
    { new: true },
  );
};

const deleteUser = async (email) => {
  return await User.findOneAndDelete({ email });
};

module.exports = {
  createUser,
  getUserByEmail,
  updateUser,
  deleteUser,
  addRootTopicToUser,
}