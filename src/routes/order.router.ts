import {Router} from "express";
import * as controller from "../controllers/order.controller";
import { checkAuthorization } from "../middlewares/authorization";

const router=Router();

router.post("/",checkAuthorization,controller.saveOrder);
router.get("/",checkAuthorization,controller.getAllOrder);
router.get("/:idOrder",checkAuthorization,controller.getOrderById);
router.get("/allOrders/:idUser",checkAuthorization,controller.getAllOrderByUser);
router.put("/:idOrder",checkAuthorization,controller.changeStatusOrderById);

export default router;