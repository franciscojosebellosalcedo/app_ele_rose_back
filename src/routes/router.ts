import {Router} from "express";
import UserRouter from "./user";
import CategoryRouter from "./category";
import ProductRouter from "./product";
import CollectionRouter from "./collection";
import ItemSliderRouter from "./itemSlider";

const router=Router();

router.use("/user",UserRouter);
router.use("/category",CategoryRouter);
router.use("/product",ProductRouter);
router.use("/collection",CollectionRouter);
router.use("/itemSlider",ItemSliderRouter);


export default router;