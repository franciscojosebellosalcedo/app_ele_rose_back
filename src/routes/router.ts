import {Router} from "express";
import UserRouter from "./user";
import CategoryRouter from "./category";

const router=Router();

router.use("/user",UserRouter);
router.use("/category",CategoryRouter);


export default router;