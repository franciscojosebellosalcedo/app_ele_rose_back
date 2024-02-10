import { sendMessageWhatsappUtil } from "../config/whatsapp";

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
    return await sendMessageWhatsappUtil(templateMesage)
  } catch (error) {
    return error;
  }
};

export const isEmailValid = (email: string) => {
  const regex =
    /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
  return regex.test(email);
};



