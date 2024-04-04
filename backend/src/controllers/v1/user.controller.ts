import { Request, Response } from "express";

import response from "@/utilities/response";
import UserService from "@/services/v1/user.service";

class UserController {
    async login(req: Request, res: Response) {
        const result = await UserService.login(req);
        res.status(200).send(response("login successful", result));
    }
    
    async getUsers(_req: Request, res: Response) {
        const result = await UserService.getUsers();
        res.status(200).send(response("users retrieved", result));
    }

    async getUser(req: Request, res: Response) {
        const result = await UserService.getUser(req);
        res.status(200).send(response("user retrieved", result));
    }

    async getMe(req: Request, res: Response) {
        const result = await UserService.getMe(req);
        res.status(200).send(response("session retrieved", result));
    }

    async getAdminStats(_req: Request, res: Response) {
        const result = await UserService.getAdminStats();
        res.status(200).send(response("admin stats retrieved", result));
    }
}

export default new UserController();
