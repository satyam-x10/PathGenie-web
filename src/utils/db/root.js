import { log } from 'console';

const mongoose = require('mongoose');

const rootSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId, // Auto-generated ObjectId
        auto: true, // Automatically generate an _id if not provided
    },
    name: {
        type: String,
        required: true, // 'name' is required
        unique: true, // 'name' must be unique
    },
    tags: {
        type: [String], // Array of strings for tags
        default: [], // Default is an empty array
    },
    possibleNames: {
        type: [String], // Array of possible names
        default: [], // Default is an empty array
    },
    related: {
        type: [String], // Array of related field IDs or names
        default: [], // Default is an empty array
    },
});

const Root = mongoose.models.Root || mongoose.model('Root', rootSchema);

export const createRoot = async (rootName) => {
//    create if not exists
    console.log('Creating root:', rootName);
    
    const root = await Root.findOne({ name: rootName });
    if (root) {
        console.log('Root already exists:', root);
        return root;
    }else{
        const newRoot = await Root.create({ name: rootName });
        console.log('Root created:', newRoot);
        return newRoot;
    }

};

export const addRelationsToRoot = async (name, relatedIds) => {
    console.log('Adding relations to root with name:', name, relatedIds);
    
    await Root.findOneAndUpdate(
        { name }, // Find by name
        { $push: { related: { $each: relatedIds } } },
        { new: true } // Return the updated document
    );
}

export const addPossibleNamesToRoot = async (name, possibleNames) => {
    console.log('Adding possible names to root with name:', name, possibleNames);
    
    await Root.findOneAndUpdate(
        { name }, // Find by name
        { $push: { possibleNames: { $each: possibleNames } } },
        { new: true } // Return the updated document
    );
}
