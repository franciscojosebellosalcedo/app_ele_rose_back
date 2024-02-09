// import whatsapp  from "../config/whatsapp";

export const responseHttp = (
  status: number,
  response: boolean,
  message: string,
  data?: any
) => {
  return {
    status,
    response,
    message,
    data,
  };
};

// const accountSid = "ACb8d1dc56194790a60cf744588560f4b7";
// const authToken = "b72f18461ff40e91a753a12d20a57419";
// const client = require("twilio")(accountSid, authToken);
export const sendMessageWhatsapp = async (data: any) => {
  try {
    const {listProducts}=data;
    const {total}=data;
    let templateMesage=`NUEVO PEDIDO ELEROSE 😃\n\nNombre: ${data.user.name}\nTeléfono: +57 ${data.user.phone}\nDirección: ${data.user.address}\n\nPRODUCTOS:\n\n`;
    for (let index = 0; index < listProducts.length; index++) {
        const item = listProducts[index];
        let smallTemplate=`${index+1}) ${item.product.name} X${item.amount} $${item.product.pricePromotion > 0? item.product.pricePromotion:item.product.realPrice} \n\n`;
        templateMesage+=smallTemplate;
    }
    templateMesage+=`PRECIO TOTAL: $${total}`;


    // const tel="+573113261681";
    // const chatId=tel.substring(1) + "@c.us";
    // const number_details=await whatsapp.getNumberId(chatId);
    // if(number_details){
    //   await whatsapp.sendMessage(chatId,templateMesage);
    // }


    // client.messages.create({
    //     body: templateMesage,
    //     from: 'whatsapp:+14155238886',
    //     to: 'whatsapp:+573113261681'
    // }).then((message: any) => console.log(message.sid));
    
  } catch (error) {
    return error;
  }
};

export const isEmailValid = (email: string) => {
  const regex =
    /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
  return regex.test(email);
};


//WTHASAPP

