// seeder payment shape

import PaymentShape from "../models/paymentShape.model";

export const seederPaymentShape = async ()=>{
    try {

        const data : {

            name: string

        }[] = [
            { name: "Efectivo" }, { name: "Transferencia"}
        ];

        for (let index = 0; index < data.length; index++) {

            const itemData = data[index];

            const paymentShapeFound = await PaymentShape.findOne({name: itemData.name});

            if(!paymentShapeFound){

                const paymentShapeNew = await PaymentShape.create({...itemData});
                await paymentShapeNew.save();
                
            }
            
        }

    } catch (error) {

        throw new Error("Error seeder payment shape");

    }
}