import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config({path: ".env.example"})

const URI = process.env.MONGO_ATLAS_URI;

export const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        
        console.log('Database connected')
    } catch (err) {
        console.log("Error connecting to database: ", err)
    }
} 