import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        // Connect to the MongoDB database
        const CONNECTION = await mongoose.connect(process.env.MONGO_URI);
        // Log the connection host
        console.log(`MongoDB connected: ${CONNECTION.connection.host}`);
    } catch (error) {
        // Log the error message
        console.log("Error: MongoDB not connected", error.message);
        // Exit process with failure
        process.exit(1);
    }
    }