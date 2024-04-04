import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password?: string;
    role: "user" | "admin";
    last_active: Date;
    created_at: Date;
    updated_at: Date;
}

const userSchema: mongoose.Schema<IUser> = new mongoose.Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            collation: {
                locale: "en",
                strength: 2,
            },
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        role: {
            type: String,
            required: true,
            enum: ["user", "admin"],
            default: "user",
        },
        last_active: {
            type: Date,
            required: true,
            default: Date.now,
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

export default mongoose.model<IUser>("users", userSchema);
