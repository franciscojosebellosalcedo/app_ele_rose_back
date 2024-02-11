const accountSid = 'AC54b329a507fee0c3032ff269dbb16182';
const authToken = '27c48fe732fddd1385798ae691855057';
const client = require('twilio')(accountSid, authToken);

export const sendMessageWhatsappUtil=async (templateMesage:string)=>{
    return await client.messages.create({
        body: templateMesage,
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+573113261681'
    })
}