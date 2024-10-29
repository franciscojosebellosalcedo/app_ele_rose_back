// seeder colors

import Color from "../models/color.model";

export const seederColor = async ()=>{
    try {

        const data : {

            name: string

        }[] = [
            { name: "Rojo"}, { name: "Morado"} , { name: "Verde"}, { name: "Azul"}, { name: "Blanco"}, { name: "Rosado"},
            { name: "Transparente"}, { name: "Dorado"}, { name: "Plateado"}, { name: "Amarrillo"}
        ];

        for (let index = 0; index < data.length; index++) {

            const itemData = data[index];

            const colorFound = await Color.findOne({name: itemData.name});

            if(!colorFound){

                const colorNew = await Color.create({...itemData});
                await colorNew.save();
                
            }
            
        }

    } catch (error) {
        throw new Error("Error seeder colors");
    }
}