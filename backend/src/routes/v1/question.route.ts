import { Router } from "express";
import { CONFIGS } from "@/configs";
import authGuard from "@/middlewares/auth.middleware";
import QuestionCtrl from "@/controllers/v1/question.controller";

const router: Router = Router();

router.post("/", authGuard(CONFIGS.APP_ROLES.ADMIN), QuestionCtrl.create);

router.get("/", QuestionCtrl.getQuestions);

router.get("/:question_id", QuestionCtrl.getQuestion);

router.patch("/:question_id", authGuard(CONFIGS.APP_ROLES.ADMIN), QuestionCtrl.update);

router.delete("/:question_id", authGuard(CONFIGS.APP_ROLES.ADMIN), QuestionCtrl.delete);

export default router;