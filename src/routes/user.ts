import {Router} from "express";
import * as controller from "../controllers/user";
import { checkAuthorization } from "../middlewares/authorization";

const router=Router();

router.post("/",controller.saveUser);
router.post("/login",controller.userLogin);

router.delete("/:id",checkAuthorization,controller.deleteUser);
router.put("/:id",checkAuthorization,controller.updateUser);
router.get("/",checkAuthorization,controller.getAllUsers);
router.get("/refress-token",controller.getNewAccessToken);

export default router;