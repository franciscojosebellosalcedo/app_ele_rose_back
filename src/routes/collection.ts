import {Router} from "express";
import * as controller from "../controllers/collection";
import { checkAuthorization } from "../middlewares/authorization";

const router=Router();

router.post("/",checkAuthorization,controller.saveCollection);
router.get("/",checkAuthorization,controller.getAllCollection);
router.get("/:id",checkAuthorization,controller.findOneCollection);
router.delete("/:id",checkAuthorization,controller.deleteCollection);
router.put("/:id",checkAuthorization,controller.updateCollection);

export default router;