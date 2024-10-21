// src/actions/userActions.js

import axios from "axios";

const BASE_URL = "/api/user";

export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/?email=${userId}`);
    return response.data.user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(BASE_URL, userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (userId, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${userId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
