import Joi from "joi";
import JWT from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { Request } from "express";

import { CONFIGS } from "@/configs";
import UserModel from "@/models/user.model";
import AnswerModel from "@/models/answer.model";
import QuestionModel from "@/models/question.model";
import CustomError from "@/utilities/custom-error";

class UserService {
    async login({ body }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            body: Joi.object({
                email: Joi.string().trim().email().required().label("email"),
                password: Joi.string().trim().required().label("password"),
            }),
        })
            .options({ stripUnknown: true })
            .validate({ body });
        if (error) throw new CustomError(error.message, 400);

        const user = await UserModel.findOne({ email: data.body.email }).select("+password");
        if (!user) throw new CustomError("invalid email or password", 401);

        const isPasswordValid = await bcryptjs.compare(data.body.password, user.password || "");
        if (!isPasswordValid) throw new CustomError("invalid email or password", 401);

        return {
            user,
            token: JWT.sign({ _id: user._id }, CONFIGS.JWT_SECRET, { expiresIn: CONFIGS.ACCESS_TOKEN_JWT_EXPIRES_MS }),
        };
    }

    async initUsers() {
        const users = [
            { name: "Admin User", email: "adminuser@mail.com", role: CONFIGS.APP_ROLES.ADMIN[0], password: "password" },
            { name: "John Doe", email: "johndoe@mail.com", role: CONFIGS.APP_ROLES.USER[0], password: "password" },
            { name: "Jane Doe", email: "janedoe@mail.com", role: CONFIGS.APP_ROLES.USER[0], password: "password" },
            { name: "Micheal Dins", email: "michealdins@mail.com", role: CONFIGS.APP_ROLES.USER[0], password: "password" },
        ];
        
        const usersCount = await UserModel.countDocuments();
        if (usersCount === 0) {
            for (const user of users) {
                const hashedPassword = await bcryptjs.hash(user.password, 10);
                user.password = hashedPassword;
            }

            const createdUsers = await UserModel.insertMany(users);
            return createdUsers.map((user) => ({ ...user.toObject(), jwt: JWT.sign({ _id: user._id }, CONFIGS.JWT_SECRET, { expiresIn: CONFIGS.ACCESS_TOKEN_JWT_EXPIRES_MS }) }));
        }

        const existingUsers = await UserModel.find();
        return existingUsers.map((user) => ({ ...user.toObject(), jwt: JWT.sign({ _id: user._id }, CONFIGS.JWT_SECRET, { expiresIn: CONFIGS.ACCESS_TOKEN_JWT_EXPIRES_MS }) }));
    }

    async getUsers() {
        return await UserModel.find();
    }

    async getUser({ params }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            params: Joi.object({
                user_id: Joi.string().trim().required().label("user_id"),
            }),
        })
            .options({ stripUnknown: true })
            .validate({ params });
        if (error) throw new CustomError(error.message, 400);

        const user = await UserModel.findById(data.params.user_id);
        if (!user) throw new CustomError("user not found", 404);

        return user;
    }

    async getMe({ $currentUser }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            $currentUser: Joi.object({
                _id: Joi.required(),
            }),
        })
            .options({ stripUnknown: true })
            .validate({ $currentUser });
        if (error) throw new CustomError(error.message, 400);

        return await UserModel.findOne({ _id: data.$currentUser._id });
    }

    async getAdminStats() {
        return {
            totalUsers: await UserModel.countDocuments(),
            totalAnswers: await AnswerModel.countDocuments(),
            totalQuestions: await QuestionModel.countDocuments(),
        };
    }
}

export default new UserService();
