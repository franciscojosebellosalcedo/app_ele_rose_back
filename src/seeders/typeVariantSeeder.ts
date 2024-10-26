// seeder type variant

import TypeVariant from "../models/typeVariant";

export const seederTypeVariant = async ()=>{
    try {

        const data : {

            name: string

        }[] = [
            { name: "Color" }, { name: "Talla"}
        ];

        for (let index = 0; index < data.length; index++) {

            const itemData = data[index];

            const typeVariantFound = await TypeVariant.findOne({name: itemData.name});

            if(!typeVariantFound){

                const typeVariantNew = await TypeVariant.create({...itemData});
                await typeVariantNew.save();
                
            }
            
        }

    } catch (error) {
        throw new Error("Error seeder type variant");
    }
}