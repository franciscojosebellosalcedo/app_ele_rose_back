import { Router } from "express";
import * as controller from "../controllers/grouperClient.controller";
import { checkAuthorization } from "../middlewares/authorization";

const router = Router();

router.post("/", checkAuthorization , controller.saveGrouperClient );

router.get("/groupersByIdClient/:idClient", checkAuthorization , controller.getGrouperClientByIdClient );

export default router;