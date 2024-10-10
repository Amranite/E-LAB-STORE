import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const CONNECTION = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${CONNECTION.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
    }