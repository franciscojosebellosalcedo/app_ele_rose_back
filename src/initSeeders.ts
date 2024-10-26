import { seederDepartamentAndMunicipality } from "./seeders/DepartamentAndMunicipalitySeeder";
import { seederTypeVariant } from "./seeders/typeVariantSeeder";

export const initSeeders = async ()=>{

    await seederDepartamentAndMunicipality();
    
    await seederTypeVariant();

}