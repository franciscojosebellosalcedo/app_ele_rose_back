export const sendMessageWhatsapp = async (data: any) => {
  try {

    let template = "";
    const { listProducts, total, user } = data;
    for (let index = 0; index < listProducts.length; index++) {
      const item = listProducts[index];
      template += `${item.product.name} X${item.amount} $${item.product.pricePromotion >0 ? item.product.pricePromotion:item.product.realPrice} -- `;
    }
    const dataWhatsapp = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: "573053559355",
      type: "template",
      template: {
        name: "order",
        language: { code: "en_US" },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: user.name,
              },
              {
                type: "text",
                text: user.phone,
              },
              {
                type: "text",
                text: user.address,
              },
              {
                type: "text",
                text: template,
              },
              {
                type: "text",
                text: total,
              },
            ],
          },
        ],
      },
    };
    const url = "https://graph.facebook.com/v18.0/210721908798255/messages";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type":"application/json",
        "Authorization":"Bearer EAAEJycnjSSwBOyuL9mquoZAd0p30ethHkrgvWbJjppCD9GXZA7BsAPJxAmypvNhhai5SRZBzQKV8ZA7YvnBTHrR7SQdTYGGBZAjhYzrqEQexQOgMi4GoLho6TgnnmUubPyCs881XzOuBhZAi56GC5s9dOLAZAdkuBFVkXsgBjNZAJRpXUN5nIGVCEX0JApZCMBjgT",
    },
      body: JSON.stringify(dataWhatsapp),
    });
    return response.json();
  } catch (error) {
    return error;
  }
};
