const env = require("../env.json");

const accountSid = env.accountSid;
const authToken = env.authToken;
const client = require('twilio')(accountSid, authToken);

const send = (msg, to) => {
    client.messages.create({
        from: 'whatsapp:' + env.whatsappNumber,
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
      
