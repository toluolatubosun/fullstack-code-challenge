import express, { Router } from "express";

import userRoutes from "@/routes/v1/user.route";
import answerRoutes from "@/routes/v1/answer.route";
import questionRoutes from "@/routes/v1/question.route";

const router: Router = express.Router();

router.use("/users", userRoutes);

router.use("/answers", answerRoutes);

router.use("/questions", questionRoutes);

export default router;
