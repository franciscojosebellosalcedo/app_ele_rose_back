// seeder types suppliers

import TypeSupplier from "../models/typeSupplier.model";

export const seederTypeSupplier = async ()=>{
    try {

        const data : {

            name: string

        }[] = [
            { name: "Bisutería"}, { name: "Empaque"} , { name: "Papelería"}
        ];

        for (let index = 0; index < data.length; index++) {

            const itemData = data[index];

            const typeSupplierFound = await TypeSupplier.findOne({name: itemData.name});

            if(!typeSupplierFound){

                const typeSupplierNew = await TypeSupplier.create({...itemData});
                await typeSupplierNew.save();
                
            }
            
        }

    } catch (error) {

        throw new Error("Error seeder types suppliers");
        
    }
}