import { seederColor } from "./seeders/color.seeder";
import { seederDepartamentAndMunicipality } from "./seeders/DepartamentAndMunicipality.seeder";
import { seederSize } from "./seeders/size.seeder";
import { seederTypeVariant } from "./seeders/typeVariant.seeder";

export const initSeeders = async ()=>{

    await seederDepartamentAndMunicipality();
    
    await seederTypeVariant();

    await seederColor();

    await seederSize();

}