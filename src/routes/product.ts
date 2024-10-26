import { Router } from "express";
import * as controller from "../controllers/product";
import { checkAuthorization } from "../middlewares/authorization";

const router=Router();

router.post("/",checkAuthorization,controller.saveProduct);
router.get("/",checkAuthorization,controller.getAllProduct);
router.put("/:id",checkAuthorization,controller.updateProduct);

export default router;