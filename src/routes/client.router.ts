import {Router} from "express";
import * as controller from "../controllers/client.controller";
import { checkAuthorization } from "../middlewares/authorization";

const router=Router();

router.post("/",  checkAuthorization,  controller.saveClient);

router.get("/",  checkAuthorization,  controller.getAllClients);

router.get("/oneClient/:id",  checkAuthorization,  controller.getOneClientById);

export default router;