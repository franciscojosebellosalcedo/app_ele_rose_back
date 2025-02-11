import { Router } from "express";
import * as controller from "../controllers/typeSupplier.controller";
import { checkAuthorization } from "../middlewares/authorization";

const router=Router();

router.get("/", checkAuthorization , controller.getAllTypesSupplier);

router.post("/", checkAuthorization , controller.createTypeSupplier);

export default router;