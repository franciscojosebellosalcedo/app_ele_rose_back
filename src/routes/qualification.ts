import {Router} from "express";
import * as controller from "../controllers/qualification";
import { checkAuthorization } from "../middlewares/authorization";

const router=Router();

router.post("/",checkAuthorization,controller.saveQualification);
router.get("/",checkAuthorization,controller.getAllQualification);

export default router;