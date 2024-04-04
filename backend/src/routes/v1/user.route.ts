import { Router } from "express";
import { CONFIGS } from "@/configs";
import authGuard from "@/middlewares/auth.middleware";
import UserCtrl from "@/controllers/v1/user.controller";

const router: Router = Router();

router.post("/login", UserCtrl.login);

router.get("/", UserCtrl.getUsers);

router.get("/me", authGuard(CONFIGS.APP_ROLES.USER), UserCtrl.getMe);

router.get("/admin-stats", authGuard(CONFIGS.APP_ROLES.ADMIN), UserCtrl.getAdminStats);

router.get("/:user_id", UserCtrl.getUser);


export default router;