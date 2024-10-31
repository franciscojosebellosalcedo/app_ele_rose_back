import { Router } from "express";
import { checkAuthorization } from "../middlewares/authorization";
import * as controller from "../controllers/address.controller";

const router = Router();

router.post("/", checkAuthorization , controller.saveListAddress );

router.get("/:entity/:entityId", checkAuthorization , controller.getAllAddressByEntityAndEntityId);

export default router;