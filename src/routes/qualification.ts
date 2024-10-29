import {Router} from "express";
import * as controller from "../controllers/qualification.controller";
import { checkAuthorization } from "../middlewares/authorization";

const router=Router();

router.post("/create",checkAuthorization,controller.saveQualification);
router.get("/",checkAuthorization,controller.getAllQualification);
router.get("/:idProduct",checkAuthorization,controller.getAllQualificationByIdProduct);

export default router;