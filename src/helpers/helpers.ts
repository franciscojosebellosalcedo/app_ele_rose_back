
export const responseHttp=(status:number,response:boolean,message:string,data?:any)=>{
    return {
        status,
        response,
        message,
        data
    };
}

export const isEmailValid=(email:string)=>{
    const regex =/[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
    return regex.test(email);
}