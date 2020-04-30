const whatsapp = require("../integration/whatsapp");
const user = require("../integration/user");
const number = require("../integration/number");
const inventory = require("../integration/inventory");
const formatNumber = require("../functions/formatNumber");

const help = (phoneNumber, api) => {
    if (api == "whatsapp" ) {
        whatsapp.send(`To get Shopping List reply "shopping list" and to buy something reply "shopping <product id>"`, phoneNumber);
    }
}

const sendShoppingList = (phoneNumber, api) => {
    let msg = "Id \t Name \t Price \r";
    inventory.getAll().forEach(product => {
        msg += product.id + "\t" + product.name + "\t" + product.price + "\r";
    })
    if (api == "whatsapp") {
        whatsapp.send(msg, phoneNumber);
    }
}

const buy = (phoneNumber, api, id) => {
    let cnic = number.getCNIC(formatNumber(phoneNumber));
    try {
        let product = inventory.get(id);
        console.log(product)
        user.updateBalance(cnic, -1 * product.price);
        let msg = `You have purchased ${product.name}. Your new balance is ${user.getBalance(cnic)}`;
        console.log(api)
        if (api == "whatsapp") {
            whatsapp.send(msg, phoneNumber)
        }

        return true;
    }
    catch (err) {
        return false;
    }
}

const handle = input => {
    console.log(input)
    if (input.help) {
        help(input.from, input.via);
    }
    else if (input.list) {
        //users wants shopping list
        sendShoppingList(input.from, input.via);
    }
    else if (input.id) {
        buy(input.from, input.via, input.id);
    }
}

module.exports = {
    handle
}