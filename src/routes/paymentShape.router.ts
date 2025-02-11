import { Router } from "express";
import { checkAuthorization } from "../middlewares/authorization";
import * as controller from "../controllers/paymentShape.controller";

const router = Router();

router.get("/" , checkAuthorization , controller.getAllPaymentShape );

export default router;