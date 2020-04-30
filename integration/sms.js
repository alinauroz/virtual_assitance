const env = require("../env.json");

const accountSid = env.accountSid;
const authToken = env.authToken;
const client = require('twilio')(accountSid, authToken);

const send = (msg, to) => {
    client.messages.create({
        from: env.numbers[0],
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
      
