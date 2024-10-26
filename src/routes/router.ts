import { Router } from "express";
import OrderRouter from "./ order";
import CategoryRouter from "./category";
import InfoContactRouter from "./infoContact";
import ProductRouter from "./product";
import QualificationRouter from "./qualification";
import SetRouter from "./set";
import UserRouter from "./user";

const router=Router();

router.use("/user",UserRouter);

router.use("/category",CategoryRouter);

router.use("/product",ProductRouter);

router.use("/set",SetRouter);

router.use("/qualification",QualificationRouter);

router.use("/order",OrderRouter);

router.use("/infoContact",InfoContactRouter);


export default router;