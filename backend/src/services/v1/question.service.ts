import Joi from "joi";
import { Request } from "express";

import QuestionModel from "@/models/question.model";
import CustomError from "@/utilities/custom-error";

class QuestionService {
    async initQuestions() {
        const questions = [
            { text: "How would you react if you were to find out that you are HIV positive?" },
            { text: "What do you think is the biggest challenge facing the youth today?" },
            { text: "Do you like it when people are honest with you?" },
        ]

        const questionsCount = await QuestionModel.countDocuments();
        if (questionsCount === 0) {
            return await QuestionModel.insertMany(questions);
        }

        return await QuestionModel.find()
    }

    async getQuestions() {
       return await QuestionModel.find()
    }

    async getQuestion({ params }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            params: Joi.object({
                question_id: Joi.string().trim().required().label("question_id"),
            }),
        })
            .options({ stripUnknown: true })
            .validate({ params });
        if (error) throw new CustomError(error.message, 400);

        const question = await QuestionModel.findById(data.params.question_id);
        if (!question) throw new CustomError("question not found", 404);

        return question;
    }

    async create({ body }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            body: Joi.object({
                text: Joi.string().trim().required().label("text"),
            }),
        })
            .options({ stripUnknown: true })
            .validate({ body });
        if (error) throw new CustomError(error.message, 400);

        return await new QuestionModel(data.body).save();
    }

    async update({ body, params }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            body: Joi.object({
                text: Joi.string().trim().required().label("text"),
            }),
            params: Joi.object({
                question_id: Joi.string().trim().required().label("question_id"),
            }),
        })
            .options({ stripUnknown: true })
            .validate({ body, params });
        if (error) throw new CustomError(error.message, 400);

        return await QuestionModel.findByIdAndUpdate(data.params.question_id, data.body, { new: true });
    }

    async delete({ params }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            params: Joi.object({
                question_id: Joi.string().trim().required().label("question_id"),
            }),
        })
            .options({ stripUnknown: true })
            .validate({ params });
        if (error) throw new CustomError(error.message, 400);

        // TODO :: Delete Answer

        return await QuestionModel.findByIdAndDelete(data.params.question_id);
    }
    
}

export default new QuestionService();
