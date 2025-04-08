// src/actions/topicActions.js

import axios from "axios";

const BASE_URL = "/api/topic";

export const getAllTopics = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching topics:", error);
    throw error;
  }
};

export const getTopicById = async (topicId) => {
  try {
    const response = await axios.get(`${BASE_URL}/?topicID=${topicId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching topic by ID:", error);
    throw error;
  }
};

export const getChainById = async (topicId) => {
  try {
    const response = await axios.get(`${BASE_URL}/?chainID=${topicId}`);
    console.log("Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching topic by ID:", error);
    throw error;
  }
};

export const createTopic = async (topicData) => {
  try {
    const response = await axios.post(BASE_URL, topicData);
    return response.data;
  } catch (error) {
    console.error("Error creating topic:", error);
    throw error;
  }
};

export const updateTopic = async (topicId, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${topicId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating topic:", error);
    throw error;
  }
};

export const deleteTopic = async (topicId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${topicId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting topic:", error);
    throw error;
  }
};

export const saveExtractedTopics = async (hierarchicalTasks, email) => {
  try {
    console.log("Saving hierarchical tasks:", hierarchicalTasks);

    // Create the payload for the request body
    const payload = {
      data: hierarchicalTasks,
    };

    // If email is provided, add it to the payload
    if (email) {
      console.log("Email provided:", email);

      payload.email = email;
    }
    console.log("Payload:", payload);
    
    // Send the payload as the request body
    const response = await axios.post("/api/tree", payload);

    return response.status;
  } catch (error) {
    console.error("Error saving topics:", error);
    throw error;
  }
};
