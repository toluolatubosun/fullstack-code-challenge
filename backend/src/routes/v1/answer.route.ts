import { Router } from "express";
import { CONFIGS } from "@/configs";
import authGuard from "@/middlewares/auth.middleware";
import AnswerCtrl from "@/controllers/v1/answer.controller";

const router: Router = Router();

router.post("/", authGuard(CONFIGS.APP_ROLES.ADMIN), AnswerCtrl.create);

router.get("/:answer_id", authGuard(CONFIGS.APP_ROLES.ADMIN), AnswerCtrl.getAnswer);

router.get("/question/:question_id", authGuard(CONFIGS.APP_ROLES.ADMIN), AnswerCtrl.getAllByQuestion);

router.get("/user/:user_id", authGuard(CONFIGS.APP_ROLES.ADMIN), AnswerCtrl.getAllByUser);

router.patch("/:answer_id", authGuard(CONFIGS.APP_ROLES.ADMIN), AnswerCtrl.update);

router.delete("/:answer_id", authGuard(CONFIGS.APP_ROLES.ADMIN), AnswerCtrl.delete);

export default router;