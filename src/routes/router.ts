import {Router} from "express";
import UserRouter from "./user";
import CategoryRouter from "./category";
import ProductRouter from "./product";
import CollectionRouter from "./collection";
import ItemSliderRouter from "./itemSlider";
import QualificationRouter from "./qualification";
import OrderRouter from "./ order";

const router=Router();

router.use("/user",UserRouter);
router.use("/category",CategoryRouter);
router.use("/product",ProductRouter);
router.use("/collection",CollectionRouter);
router.use("/itemSlider",ItemSliderRouter);
router.use("/qualification",QualificationRouter);
router.use("/order",OrderRouter);


export default router;