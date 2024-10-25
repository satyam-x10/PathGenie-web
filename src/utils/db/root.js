import { log } from "console";

const mongoose = require("mongoose");

const rootSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  tags: {
    type: [String],
    default: [],
    validate: {
      validator: function (v) {
        return Array.isArray(v) && new Set(v).size === v.length;
      },
      message: "Tags array must contain unique elements.",
    },
  },
  possibleNames: {
    type: [String],
    default: [],
    validate: {
      validator: function (v) {
        return Array.isArray(v) && new Set(v).size === v.length;
      },
      message: "Possible names array must contain unique elements.",
    },
  },
  related: {
    type: [String],
    default: [],
  },
});

export const Root = mongoose.models.Root || mongoose.model("Root", rootSchema);

export const createRoot = async (rootName) => {
  //    create if not exists
  console.log("Creating root:", rootName);

  const root = await Root.findOne({ name: rootName });
  if (root) {
    console.log("Root already exists:", root);
    return root;
  } else {
    const newRoot = await Root.create({ name: rootName });
    console.log("Root created:", newRoot);
    return newRoot;
  }
};

export const getRootById = async (id) => {
  console.log("Getting root by id:", id);

  const root = await Root.findById(id);
  console.log("Root found:", root);
  return root;
}

export const addRelationsToRoot = async (name, relatedIds) => {
  console.log("Adding relations to root with name:", name, relatedIds);

  await Root.findOneAndUpdate(
    { name }, // Find by name
    { $push: { related: { $each: relatedIds } } },
    { new: true }, // Return the updated document
  );
};

export const addPossibleNamesToRoot = async (name, possibleNames) => {
  console.log("Adding possible names to root with name:", name, possibleNames);

  await Root.findOneAndUpdate(
    { name }, // Find by name
    { $push: { possibleNames: { $each: possibleNames } } },
    { new: true }, // Return the updated document
  );
};

export const addTagsToRoot = async (name, tags) => {
  console.log("Adding tags to root with name:", name, tags);

  await Root.findOneAndUpdate(
    { name }, // Find by name
    { $push: { tags: { $each: tags } } },
    { new: true }, // Return the updated document
  );
};
