import {Router} from "express";
import * as controller from "../controllers/user.controller";
import { checkAuthorization } from "../middlewares/authorization";

const router=Router();

router.post("/",controller.saveUser);
router.post("/user-page",controller.saveUserPage);
router.post("/login",controller.userLogin);
router.post("/login-user-page",controller.loginUserPage);

router.delete("/:id",checkAuthorization,controller.deleteUser);
router.put("/:id",checkAuthorization,controller.updateUser);
router.get("/",checkAuthorization,controller.getAllUsers);
router.get("/clients",checkAuthorization,controller.getAllUsersClients);
router.get("/refress-token",controller.getNewAccessToken);
router.post("/reset-password",controller.verifyEmailUser);
router.put("/reset-password/:token",controller.setNewPassword);

export default router;