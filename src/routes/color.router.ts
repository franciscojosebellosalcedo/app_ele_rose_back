import { Router } from "express";
import { checkAuthorization } from "../middlewares/authorization";
import * as controller from "../controllers/color.controller";

const router=Router();

router.get("/", checkAuthorization , controller.getAllColor);

export default router;