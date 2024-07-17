const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.ATLAS_URI;

const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB with URI:", uri);
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connection established");
    } catch (error) {
        console.log("MongoDB connection failed:", error.message);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;