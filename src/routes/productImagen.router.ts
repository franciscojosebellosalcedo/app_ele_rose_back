import { Router } from "express";
import * as controller from "../controllers/productImagen.controller";
import { checkAuthorization } from "../middlewares/authorization";

const router=Router();

router.post("/",  checkAuthorization,  controller.saveProductImagen);

export default router;