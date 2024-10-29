import { Router } from "express";
import { checkAuthorization } from "../middlewares/authorization";
import * as controller from "../controllers/typeVariant.controller";

const router=Router();

router.get("/", checkAuthorization , controller.getAllTypesVariants);

export default router;