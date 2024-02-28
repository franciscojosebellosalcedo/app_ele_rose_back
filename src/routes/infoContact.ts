import {Router} from 'express';
import { getAllInfoContact, saveInfoContact } from '../controllers/infoContact';

const infoContactRouter=Router();

infoContactRouter.post("/",saveInfoContact);
infoContactRouter.get("/",getAllInfoContact);

export default infoContactRouter;