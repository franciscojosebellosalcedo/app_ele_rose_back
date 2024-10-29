// seeder size products

import Size from "../models/size.model";

export const seederSize = async ()=>{
    try {

        const data : {

            name: string

        }[] = [
            { name: "16"}, { name: "17"}, { name: "18"}, { name: "19"}, { name: "20"}, { name: "21"}, { name: "22"}
        ];

        for (let index = 0; index < data.length; index++) {

            const itemData = data[index];

            const sizeFound = await Size.findOne({name: itemData.name});

            if(!sizeFound){

                const colorNew = await Size.create({...itemData});
                await colorNew.save();
                
            }
            
        }

    } catch (error) {
        throw new Error("Error seeder size");
    }
}