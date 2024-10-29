import { Router } from "express";
import { checkAuthorization } from "../middlewares/authorization";
import * as controller from "../controllers/size.controller";

const router=Router();

router.get("/", checkAuthorization , controller.getAllSizes);

export default router;