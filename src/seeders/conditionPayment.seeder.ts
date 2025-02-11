// seeder condition payment

import ConditionPayment from "../models/conditionPayment.model";

export const seederConditionPayment = async ()=>{
    try {

        const data : {

            name: string

        }[] = [
            { name: "Crédito" }, { name: "Contado"}
        ];

        for (let index = 0; index < data.length; index++) {

            const itemData = data[index];

            const conditionPaymentFound = await ConditionPayment.findOne({name: itemData.name});

            if(!conditionPaymentFound){

                const conditionPaymentNew = await ConditionPayment.create({...itemData});
                await conditionPaymentNew.save();
                
            }
            
        }

    } catch (error) {

        throw new Error("Error seeder condition payment");

    }
}