import mongoose from "mongoose";

import { CONFIGS } from "@/configs";
import UserService from "@/services/v1/user.service";
import questionService from "@/services/v1/question.service";

const connectMongoDB = async () => {
    try {
        await mongoose.connect(CONFIGS.MONGODB_URI);

        console.log(`:::> Connected to mongoDB database. ${CONFIGS.NODE_ENV !== "production" ? CONFIGS.MONGODB_URI : ""}`);

        // Initialize users
        await UserService.initUsers();

        // Initialize questions
        await questionService.initQuestions();
    } catch (error) {
        console.error("<::: Couldn't connect to database", error);
    }
};

const disconnectMongoDB = async () => {
    try {
        await mongoose.disconnect();
        await mongoose.connection.close();
        console.log(":::> Disconnected from mongoDB database.");
    } catch (error) {
        console.error("<::: Couldn't disconnect from database", error);
    }
}

export { connectMongoDB, disconnectMongoDB };
