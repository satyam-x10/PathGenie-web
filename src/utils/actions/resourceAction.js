// src/actions/resourceActions.js

import axios from 'axios';

const BASE_URL = '/api/resource';

export const getResourcesByTopic = async (topicId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${topicId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching resources:", error);
        throw error;
    }
};

export const createResource = async (resourceData) => {
    try {
        const response = await axios.post(BASE_URL, resourceData);
        return response.data;
    } catch (error) {
        console.error("Error creating resource:", error);
        throw error;
    }
};

export const updateResource = async (resourceId, updatedData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${resourceId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error updating resource:", error);
        throw error;
    }
};

export const deleteResource = async (resourceId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${resourceId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting resource:", error);
        throw error;
    }
};
