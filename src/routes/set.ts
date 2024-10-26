import {Router} from "express";
import * as controller from "../controllers/set";
import { checkAuthorization } from "../middlewares/authorization";

const router=Router();

router.post("/",  checkAuthorization,  controller.saveSet);

router.get("/",  checkAuthorization,  controller.getAllSets);

router.get("/:id",  checkAuthorization,  controller.findOneSet);

router.put("/:id",  checkAuthorization,  controller.updateSet);

router.put("/disable/:id",  checkAuthorization,  controller.disableSet);

router.put("/enable/:id",  checkAuthorization,  controller.enableSet);

router.get("/search/:value", checkAuthorization , controller.search);

router.get("/set/paginated", checkAuthorization , controller.paginateSets);

export default router;