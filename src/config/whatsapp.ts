const accountSid = 'ACba16fa83e6e036a2f512a1bced42b729';
const authToken = '58d901e9dc37f5fb7ec3339783a967f0';
const client = require('twilio')(accountSid, authToken);

export const sendMessageWhatsappUtil=async (templateMesage:string)=>{
    return await client.messages.create({
        body: templateMesage,
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+573207566039'
    })
}