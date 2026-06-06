import mongoose from "mongoose";
import { env } from "./env.js";

const connectDB = async () => {
    try {
        const mongoURL = env.MONGODB_URL;
        
        await mongoose.connect(mongoURL);
        console.log('MongoDB connected successfully');

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });
    } catch (err) {
        console.error('MongoDD connection failed:', err);
        throw err;
    }
}

export default connectDB;