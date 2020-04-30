const user = require("../integration/user");
const formatNumber = require("../functions/formatNumber");

const whatsapp = require("../integration/whatsapp");
const sms = require("../integration/sms");

const help = (phoneNumber, api) => {
    msg = "To get food at home reply foodathome <no of people>"
    if (api == "whatsapp") {
        whatsapp.send(msg, phoneNumber);
    }
    else {
        sms.send(msg, formatNumber(phoneNumber));
    }
}

const handle = input => {
    if (input.help) {
        help(input.from, input.via);
    }
} 

module.exports = {
    handle,
}