import mongoose from "mongoose";

export interface IQuestion extends mongoose.Document {
    text: string;
    created_at: Date;
    updated_at: Date;
}

const questionSchema: mongoose.Schema<IQuestion> = new mongoose.Schema<IQuestion>(
    {
        text: {
            type: String,
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

export default mongoose.model<IQuestion>("questions", questionSchema);
