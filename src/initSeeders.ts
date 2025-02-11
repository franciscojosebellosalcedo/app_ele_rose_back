import { seederColor } from "./seeders/color.seeder";
import { seederConditionPayment } from "./seeders/conditionPayment.seeder";
import { seederDepartamentAndMunicipality } from "./seeders/DepartamentAndMunicipality.seeder";
import { seederPaymentShape } from "./seeders/paymentShape.seeder";
import { seederSize } from "./seeders/size.seeder";
import { seederTypeSupplier } from "./seeders/typeSupplier.seeder";
import { seederTypeVariant } from "./seeders/typeVariant.seeder";

export const initSeeders = async ()=>{

    await seederTypeSupplier();

    await seederDepartamentAndMunicipality();
    
    await seederTypeVariant();

    await seederColor();

    await seederSize();

    await seederConditionPayment();

    await seederPaymentShape();

}