import { Request, Response } from "express";

import response from "@/utilities/response";
import AnswerService from "@/services/v1/answer.service";

class AnswerController {
    async create(req: Request, res: Response) {
        const result = await AnswerService.create(req);
        res.status(201).send(response("answer created", result));
    }

    async getAllByQuestion(req: Request, res: Response) {
        const result = await AnswerService.getAllByQuestion(req);
        res.status(200).send(response("answers retrieved", result));
    }

    async getAllByUser(req: Request, res: Response) {
        const result = await AnswerService.getAllByUser(req);
        res.status(200).send(response("answers retrieved", result));
    }

    async getAnswer(req: Request, res: Response) {
        const result = await AnswerService.getAnswer(req);
        res.status(200).send(response("answer retrieved", result));
    }

    async update(req: Request, res: Response) {
        const result = await AnswerService.update(req);
        res.status(200).send(response("answer updated", result));
    }

    async delete(req: Request, res: Response) {
        const result = await AnswerService.delete(req);
        res.status(200).send(response("answer deleted", result));
    }
}


export default new AnswerController();