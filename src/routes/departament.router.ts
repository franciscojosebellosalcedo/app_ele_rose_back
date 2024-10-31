import { Router } from "express";
import { checkAuthorization } from "../middlewares/authorization";
import * as controller from "../controllers/departament.controller";

const router = Router();

router.get("/", checkAuthorization , controller.getAllDepartament );

export default router;