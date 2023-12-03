import {Router} from "express";
import UserRouter from "./user";
import CategoryRouter from "./category";
import JewelryRouter from "./jewelry";

const router=Router();

router.use("/user",UserRouter);
router.use("/category",CategoryRouter);
router.use("/jewelry",JewelryRouter);


export default router;