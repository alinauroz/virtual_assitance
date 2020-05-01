const env = require("dotenv");

env.config();

const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;

const client = require('twilio')(accountSid, authToken);

const send = (msg, to) => {
    client.messages.create({
        from: process.env.NUMBER,
        body : msg,
        to: to
    }).then(data=> {
        
    }).catch(err => {
        console.log(err)
    });
}

module.exports = {
    send,
}
      
