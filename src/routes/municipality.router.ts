import { Router } from "express";
import { checkAuthorization } from "../middlewares/authorization";
import * as controller from "../controllers/municipality.controller";

const router = Router();

router.get("/", checkAuthorization , controller.getAllMunicipality );

export default router;