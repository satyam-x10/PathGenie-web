const mongoose = require("mongoose");
require("dotenv").config();

// Connect to your development database
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.NEXT_PUBLIC_MONGO_URI}/new`, {});
    // //console.log('MongoDB connected...');
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

// Export the functions
module.exports = {
  connectDB,
};
