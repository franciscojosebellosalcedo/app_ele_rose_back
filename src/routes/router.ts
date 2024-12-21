import { Router } from "express";
import CategoryRouter from "./category.router";
import ColorRouter from "./color.router";
import InfoContactRouter from "./infoContact.router";
import OrderRouter from "./order.router";
import ProductRouter from "./product.router";
import ProductImagenRouter from "./productImagen.router";
import QualificationRouter from "./qualification";
import SetRouter from "./set.router";
import TypeVariantRouter from "./typeVariant.router";
import UserRouter from "./user.router";
import SizeRouter from "./size.router";
import ClientRouter from "./client.router";
import DepartamentRouter from "./departament.router";
import MunicipalityRouter from "./municipality.router";
import AddressRouter from "./address.router";
import GrouperClientRouter from "./grouperClient.router";

const router=Router();

router.use("/user",UserRouter);

router.use("/category",CategoryRouter);

router.use("/product",ProductRouter);

router.use("/set",SetRouter);

router.use("/qualification",QualificationRouter);

router.use("/order",OrderRouter);

router.use("/infoContact",InfoContactRouter);

router.use("/productImagen",ProductImagenRouter);

router.use("/color", ColorRouter);

router.use("/size", SizeRouter);

router.use("/typeVariant", TypeVariantRouter);

router.use("/client", ClientRouter);

router.use("/departament", DepartamentRouter);

router.use("/municipality", MunicipalityRouter);

router.use("/address", AddressRouter);

router.use("/grouperClient", GrouperClientRouter);

export default router;