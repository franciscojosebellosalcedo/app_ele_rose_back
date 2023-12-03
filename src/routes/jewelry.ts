import {Router} from "express";
import * as controller from "../controllers/jewelry";
import { checkAuthorization } from "../middlewares/authorization";

const router=Router();

router.post("/",checkAuthorization,controller.saveJewelry);
router.get("/",checkAuthorization,controller.getAllJewelry);
router.delete("/:id",checkAuthorization,controller.deleteJewelry);
router.put("/:id",checkAuthorization,controller.updateJewelry);

export default router;