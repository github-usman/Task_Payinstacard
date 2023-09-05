import mongoose from "mongoose";

async function connectToMongo(){
    try {
        await mongoose.connect(
            "mongodb://127.0.0.1:27017/payinsta"
        )
        console.log("Database connected");
    } catch (error) {
        console.error("Failed to connect to MongoDB :", error);
    }
}

export {connectToMongo};