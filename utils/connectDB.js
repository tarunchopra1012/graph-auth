import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Database connected successfully.');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

export default connectDB;