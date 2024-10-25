import { seederDepartamentAndMunicipality } from "./seeders/DepartamentAndMunicipalitySeeder";

export const initSeeders = async ()=>{
    await seederDepartamentAndMunicipality();
}