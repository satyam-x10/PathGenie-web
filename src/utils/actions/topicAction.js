// src/actions/topicActions.js

import axios from 'axios';

const BASE_URL = '/api/topic';

export const getAllTopics = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching topics:", error);
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