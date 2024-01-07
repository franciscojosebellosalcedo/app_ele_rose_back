import {Router} from "express";
import * as controller from "../controllers/itemSlider";
import { checkAuthorization } from "../middlewares/authorization";

const router=Router();

router.post("/",checkAuthorization,controller.saveItemSlider);
router.get("/",checkAuthorization,controller.getAllItemSlider);
router.delete("/:id",checkAuthorization,controller.deleteItemSlider);

export default router;