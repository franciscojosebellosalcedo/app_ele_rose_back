const {Client,LocalAuth}=require("whatsapp-web.js");
const qrcode=require("qrcode-terminal");

const whatsapp=new Client({
    authStrategy:new LocalAuth()
});

whatsapp.on("qr",(qr:any)=>{
    qrcode.generate(qr,{
        small:true
    })
});

whatsapp.on("ready",()=>{
    console.log("Client is ready")
})

export default whatsapp;

