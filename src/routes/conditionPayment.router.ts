import { Router } from "express";
import { checkAuthorization } from "../middlewares/authorization";
import * as controller from "../controllers/conditionPayment.controller";

const router = Router();

router.get("/" , checkAuthorization , controller.getAllConditionsPayment );

export default router;