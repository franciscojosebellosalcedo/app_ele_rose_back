import {Router} from "express";
import * as controller from "../controllers/category";
import { checkAuthorization } from "../middlewares/authorization";

const router=Router();

router.post("/",checkAuthorization,controller.saveCategory);
router.get("/",checkAuthorization,controller.getAllCategory);
router.delete("/:id",checkAuthorization,controller.deleteCategory);
router.put("/:id",checkAuthorization,controller.updateCategory);

export default router;