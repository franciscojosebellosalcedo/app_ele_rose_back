import {Router} from "express";
import UserRouter from "./user";
import CategoryRouter from "./category";
import ProductRouter from "./product";
import SetRouter from "./set";
import ItemSliderRouter from "./itemSlider";
import QualificationRouter from "./qualification";
import OrderRouter from "./ order";
import InfoContactRouter from "./infoContact";

const router=Router();

router.use("/user",UserRouter);

router.use("/category",CategoryRouter);

router.use("/product",ProductRouter);

router.use("/set",SetRouter);

router.use("/itemSlider",ItemSliderRouter);

router.use("/qualification",QualificationRouter);

router.use("/order",OrderRouter);

router.use("/infoContact",InfoContactRouter);


export default router;