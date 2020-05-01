const env = require("dotenv");

env.config();

const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;

const client = require('twilio')(accountSid, authToken);

const send = (msg, to) => {
    client.messages.create({
        from: 'whatsapp:' + process.env.WHATSAPPNUMBER,
        body : msg,
        to: to
    }).then(data=> {
        console.log(data)
    }).catch(err => {
        console.log(err)
    });
}

module.exports = {
    send,
}
      
