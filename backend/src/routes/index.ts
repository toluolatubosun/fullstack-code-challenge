import express, { Router, Request, Response } from "express";

import v1Routes from "@/routes/v1";
import trimIncomingRequests from "@/middlewares/trim-incoming.middleware";

import { CONFIGS } from "@/configs";

const router: Router = express.Router();

// Trim edge whitespace from incoming requests
router.use(trimIncomingRequests);

router.use("/v1", v1Routes);

router.get("/", (_req: Request, res: Response) => {
    return res.status(200).json({
        version: CONFIGS.APP_VERSION,
        environment: CONFIGS.NODE_ENV,
        server_timezone: process.env.TZ,
        server_time: new Date().toISOString(),
        message: "Hello world from node-starter !!",
    });
});

export default router;
