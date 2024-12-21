import {
  deleteFile,
  UploadcareSimpleAuthSchema,
} from '@uploadcare/rest-client';

export const ORDER_ADDRESS_ENTITY ={
  client: 1,
  groupClient: 2
}

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

export const splitUrlImagen = (url: any)=>{
  const parts = url.split("/");
  return parts[3]
  
}

export const getListSearch = (fields: string[], value: any)=>{

	const listObject : { $or: any[] } = { $or: [] };

	for (let index = 0; index < fields.length; index++) {

		const field = fields[index];

		const data : any = {};
		data[`${field}`] = { $regex: value, $options: "i" };

		listObject.$or.push(data)

	}

	return listObject;
}

export const deleteFileFromUploadcare = async (fileId: any) => {
  try {

    const uploadcareSimpleAuthSchema = new UploadcareSimpleAuthSchema({
      publicKey: process.env.REACT_APP_PUBLIC_KEY_UPLOADCARE as string,
      secretKey: process.env.REACT_APP_SECRET_KEY_UPLOADCARE as string,
    });
    
    await deleteFile(
      {
        uuid: fileId,
      },
      { authSchema: uploadcareSimpleAuthSchema }
    );
    
  } catch (error) {
    
    throw new Error("Error en eliminar la imagen de uploadcare");

  }
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



