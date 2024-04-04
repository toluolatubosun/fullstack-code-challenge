import mongoose from "mongoose";
import { IUser } from "@/models/user.model";
import { IQuestion } from "@/models/question.model";

export interface IAnswer extends mongoose.Document {
    text: string;
    user_ref: mongoose.Types.ObjectId | IUser;
    question_ref: mongoose.Types.ObjectId | IQuestion;
    created_at: Date;
    updated_at: Date;
}

const answerSchema: mongoose.Schema<IAnswer> = new mongoose.Schema<IAnswer>(
    {
        text: {
            type: String,
            required: true,
        },
        user_ref: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        question_ref: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "questions",
            required: true,
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

export default mongoose.model<IAnswer>("answers", answerSchema);
