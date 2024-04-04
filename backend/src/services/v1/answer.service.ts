import Joi from "joi";
import { Request } from "express";

import AnswerModel from "@/models/answer.model";
import CustomError from "@/utilities/custom-error";

class AnswerService {
    async getAnswers() {
        return await AnswerModel.find();
    }

    async getAnswer({ params }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            params: Joi.object({
                answer_id: Joi.string().trim().required().label("answer_id"),
            }),
        })
            .options({ stripUnknown: true })
            .validate({ params });
        if (error) throw new CustomError(error.message, 400);

        const answer = await AnswerModel.findById(data.params.answer_id);
        if (!answer) throw new CustomError("answer not found", 404);

        return answer;
    }

    async create({ body }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            body: Joi.object({
                text: Joi.string().trim().required().label("text"),
                user_ref: Joi.string().trim().required().label("user_ref"),
                question_ref: Joi.string().trim().required().label("question_ref"),
            }),
        })
            .options({ stripUnknown: true })
            .validate({ body });
        if (error) throw new CustomError(error.message, 400);

        return await new AnswerModel(data.body).save();
    }

    async update({ body, params }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            body: Joi.object({
                text: Joi.string().trim().required().label("text"),
            }),
            params: Joi.object({
                answer_id: Joi.string().trim().required().label("answer_id"),
            }),
        })
            .options({ stripUnknown: true })
            .validate({ body, params });
        if (error) throw new CustomError(error.message, 400);

        return await AnswerModel.findByIdAndUpdate(data.params.answer_id, data.body, { new: true });
    }

    async delete({ params }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            params: Joi.object({
                answer_id: Joi.string().trim().required().label("answer_id"),
            }),
        })
            .options({ stripUnknown: true })
            .validate({ params });
        if (error) throw new CustomError(error.message, 400);

        return await AnswerModel.findByIdAndDelete(data.params.answer_id);
    }

    async getAllByQuestion({ params }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            params: Joi.object({
                question_id: Joi.string().trim().required().label("question_id"),
            }),
        })
            .options({ stripUnknown: true })
            .validate({ params });
        if (error) throw new CustomError(error.message, 400);

        const answers = await AnswerModel.find({ question_ref: data.params.question_id });
        return answers;
    }

    async getAllByUser({ params }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            params: Joi.object({
                user_id: Joi.string().trim().required().label("user_id"),
            }),
        })
            .options({ stripUnknown: true })
            .validate({ params });
        if (error) throw new CustomError(error.message, 400);

        const answers = await AnswerModel.find({ user_ref: data.params.user_id }).populate("question_ref");
        return answers;
    }
}

export default new AnswerService();