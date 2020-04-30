const whatsapp = require("../integration/whatsapp");
const sms = require("../integration/sms");
const user = require("../integration/user");
const number = require("../integration/number");
const inventory = require("../integration/inventory");
const formatNumber = require("../functions/formatNumber");
let io;

const help = (phoneNumber, api) => {
    let msg = `To get Shopping List reply "shopping list" and to buy something reply "shopping <product id>"`;
    if (api == "whatsapp" ) 
        whatsapp.send(msg, phoneNumber);
    else
        sms.send(msg, phoneNumber);
    
}

const sendShoppingList = (phoneNumber, api) => {
    let msg = "Id \t Name \t Price \r";
    inventory.getAll().forEach(product => {
        msg += product.id + "\t" + product.name + "\t" + product.price + "\r";
    })
    if (api == "whatsapp") 
        whatsapp.send(msg, phoneNumber);
    else
        sms.send(msg, phoneNumber);
    
}

const buy = (phoneNumber, api, id) => {
    let cnic = number.getCNIC(formatNumber(phoneNumber));
    try {
        let product = inventory.get(id);
        console.log(product)
        user.updateBalance(cnic, -1 * product.price);
        let msg = `You have purchased ${product.name}. Your new balance is ${user.getBalance(cnic)} Rs. This product will be delivered to your address ${user.getAddress(cnic)}.`;
        
        if (api == "whatsapp") 
            whatsapp.send(msg, phoneNumber)
        
        else
            sms.send(msg, phoneNumber)
        return true;
    }
    catch (err) {
        return false;
    }
}

const handle = input => {
    if (input.help) {
        help(input.from, input.via);
    }
    else if (input.list) {
        //users wants shopping list
        sendShoppingList(input.from, input.via);
    }
    else if (input.id) {
        if(buy(input.from, input.via, input.id)) {
            io.sockets.emit("update", {msg : `${formatNumber(input.from)} wants bought ${inventory.get(input.id).name}`, date : Date.now()});
        }
    }
}

const setSocketIO = io_ => {
    io = io_;
}

module.exports = {
    handle,
    setSocketIO
}