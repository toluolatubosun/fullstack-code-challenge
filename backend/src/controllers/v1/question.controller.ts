import { Request, Response } from "express";

import response from "@/utilities/response";
import QuestionService from "@/services/v1/question.service";

class QuestionController {
    async create(req: Request, res: Response) {
        const result = await QuestionService.create(req);
        res.status(201).send(response("question created", result));
    }

    async getQuestions(_req: Request, res: Response) {
        const result = await QuestionService.getQuestions();
        res.status(200).send(response("questions retrieved", result));
    }

    async getQuestion(req: Request, res: Response) {
        const result = await QuestionService.getQuestion(req);
        res.status(200).send(response("question retrieved", result));
    }

    async update(req: Request, res: Response) {
        const result = await QuestionService.update(req);
        res.status(200).send(response("question updated", result));
    }

    async delete(req: Request, res: Response) {
        const result = await QuestionService.delete(req);
        res.status(200).send(response("question deleted", result));
    }
}

export default new QuestionController();