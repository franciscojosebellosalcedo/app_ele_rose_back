import {Router} from "express";
import * as controller from "../controllers/client.controller";
import { checkAuthorization } from "../middlewares/authorization";

const router=Router();

router.post("/",  checkAuthorization,  controller.saveClient);

router.get("/",  checkAuthorization,  controller.getAllClients);

router.get("/:id",  checkAuthorization,  controller.getClientById);

router.get("/search/:value",  checkAuthorization,  controller.search);

router.get("/client/paginated", checkAuthorization , controller.paginateClients);

router.get("/oneClient/:id",  checkAuthorization,  controller.getOneClientById);

router.put("/:id", checkAuthorization , controller.updateClientById);

export default router;