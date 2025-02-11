import {Router} from "express";
import * as controller from "../controllers/supplier.controller";
import { checkAuthorization } from "../middlewares/authorization";

const router=Router();

router.post("/",  checkAuthorization,  controller.saveSupplier);

router.get("/",  checkAuthorization,  controller.getAllSuppliers);

router.get("/:id",  checkAuthorization,  controller.getSupplierById);

router.get("/search/:value",  checkAuthorization,  controller.search);

router.get("/supplier/paginated", checkAuthorization , controller.paginateSupplier);

router.put("/:id", checkAuthorization , controller.updateSupplierById);

router.put("/disable/:id", checkAuthorization , controller.disableSupplier);

router.put("/enable/:id", checkAuthorization , controller.enableSupplier);

export default router;