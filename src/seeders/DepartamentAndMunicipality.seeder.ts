// seeder departament and municipality

import Departament from "../models/department.model";
import Municipality from "../models/municipality.model";

export const seederDepartamentAndMunicipality = async ()=>{
    try {

        const url = process.env.URL_API_DATA_DEPARTAMENT_AND_MUNICIPALITY as string;

        const result = (await fetch(url));

        const data : {

            region: string,
            c_digo_dane_del_departamento: string
            departamento: string
            c_digo_dane_del_municipio:string
            municipio: string

        }[] = await  result.json();

        const departamens = await Departament.find();
        const municipalities = await Municipality.find();

        if(departamens.length === 0 && municipalities.length === 0){

            for (let index = 0; index < data.length; index++) {
                const item = data[index];

                const departamentFound = await Departament.findOne({name: item.departamento});

                let departamenCreated = null;

                if(!departamentFound){

                    const departamentNew = new Departament({name: item.departamento , region: item.region});
    
                    departamenCreated = await departamentNew.save();

                }else{

                    departamenCreated = departamentFound;

                }

                const municipalityNew = new Municipality({departament: departamenCreated._id, name: item.municipio});

                await municipalityNew.save();

            }

        }

    } catch (error) {
        throw new Error("Error seeder departament and municipality");
    }
}