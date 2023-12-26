import {Router} from "express";
import UserRouter from "./user";
import CategoryRouter from "./category";
import ProductRouter from "./product";
import CollectionRouter from "./collection";

const router=Router();

router.use("/user",UserRouter);
router.use("/category",CategoryRouter);
router.use("/product",ProductRouter);
router.use("/collection",CollectionRouter);


export default router;