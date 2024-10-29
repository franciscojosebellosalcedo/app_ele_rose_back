import { Router } from "express";
import * as controller from "../controllers/category.controller";
import { checkAuthorization } from "../middlewares/authorization";

const router=Router();

router.post("/", checkAuthorization , controller.saveCategory);

router.get("/", checkAuthorization , controller.getAllCategory);

router.get("/paginated", checkAuthorization , controller.paginateCategory);

router.get("/search/:value", checkAuthorization , controller.search);

router.get("/:id" , checkAuthorization ,   controller.findOneCategory);

router.put("/:id",  checkAuthorization  ,  controller.updateCategory);

router.put("/disable/:id",  checkAuthorization,  controller.disableCategory);

router.put("/enable/:id",  checkAuthorization,  controller.enableCategory);

export default router;