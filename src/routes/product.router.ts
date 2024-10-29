import { Router } from "express";
import * as controller from "../controllers/product.controller";
import { checkAuthorization } from "../middlewares/authorization";

const router=Router();

router.post("/",  checkAuthorization  ,controller.saveProduct);

router.get("/paginated", checkAuthorization, controller.paginateProducts);

router.get("/", checkAuthorization, controller.getAllProduct);

router.get("/search/:value", checkAuthorization, controller.search);

router.put("/disable/:id", checkAuthorization , controller.disableProduct);

router.put("/enable/:id", checkAuthorization , controller.enableProduct);

router.put("/:id" , checkAuthorization , controller.updateProduct);

export default router;