const accountSid = 'ACf044a6fddf3a750f1096c81cc56da3bb';
const authToken = '67ed13511ddf0d783eb24fd6370e8c0f';
const client = require('twilio')(accountSid, authToken);

const send = (msg, to) => {
    client.messages.create({
        from: 'whatsapp:+14155238886',
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
      
