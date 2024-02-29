
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

export const  capitalizeNameProduct=(str:string)=> {
  const  nameProduct = str.toLowerCase().split(' ');
  for (var i = 0; i < nameProduct.length; i++) {
    nameProduct[i] = nameProduct[i].charAt(0).toUpperCase() + nameProduct[i].slice(1);
  }
  return nameProduct.join(' ');
}


export const isEmailValid = (email: string) => {
  const regex =
    /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
  return regex.test(email);
};



