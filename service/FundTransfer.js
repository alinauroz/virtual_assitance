const user = require("../integration/user");
const number = require("../integration/number");
const formatNumber = require("../functions/formatNumber");
let io;

const whatsapp = require("../integration/whatsapp");
const sms = require("../integration/sms");

const fundTransfer = data => {
    try {

        if (data.amount <= 0) {
            return {err, msg : "Invalid Transfer Amount"}
        }
        else if (! data.to || ! (number.get(data.to))) {
            return {err, msg : "Invalid Recipient"};
        }
        else if (user.getBalance(number.getCNIC(data.from)) >= data.amount) {
            
            user.updateBalance(number.getCNIC(data.from), -1 * data.amount);
            user.updateBalance(number.getCNIC(data.to), data.amount);
            
            let to = user.get(number.getCNIC(data.to));
            let from = user.get(number.getCNIC(data.from));

            return {
                msg : `Amount ${data.amount} Rs is transferred to ${to.name}'s from your account. Your new balance is ${from.balance} Rs.`,
                msgToRecipient : `Amount ${data.amount} Rs is transferred to your account from ${from.name}'s account. Your new balance is ${to.balance} Rs.`,
            }
        }
        else {
            return  {err, msg : "Insufficient Balance"};
        }
    }
    catch (err) {
        return {
            err, 
            msg : "Error while tranferring fund. This may be due to wrong input format or incomplete input. ",
            
        }
    }
}

//phoneNumber is the number which wants help

const help = (phoneNumber, api) => {
    if (api == "whatsapp")
        whatsapp.send( `To Transfer Funds type \r\n fundtransfer <Recipients PhoneNumber> <AmountToTransfer> and send it to 001001`, phoneNumber);
    else
        sms.send( `To Transfer Funds type \r\n fundtransfer <Recipients PhoneNumber> <AmountToTransfer> and send it to 001001`, formatNumber(phoneNumber));
    }

const handle = (input) => {

    if (input.help) {
        if (input.via == "whatsapp")
            help(input.from, "whatsapp")
            
        io ? io.sockets.emit("update", {"date" : Date.now(), "updateType" : "help", "msg" : `${formatNumber(input.from)} asked for help to transfer funds `}) : "";
    }

    else if (input.amount && input.to){
        let res_ = fundTransfer({from : formatNumber(input.from), to : formatNumber(input.to), amount : input.amount});
        
        input.via == "whatsapp" ? 
            whatsapp.send(res_.msg, input.from) 
            : sms.send(res_.msg, input.from);
        
        if (! res_.err) {

            input.via == "whatsapp" ?
                whatsapp.send(res_.msgToRecipient, "whatsapp:" + formatNumber(input.to))
                : sms.whatsapp.send(res_.msgToRecipient, "whatsapp:" + formatNumber(input.to))

            io ? io.sockets.emit("update", {"date" : Date.now(), "updateType" : "fundtransfer", "msg" : `${formatNumber(input.from)} transferred ${input.amount} Rs to ${input.to}`}) : "";
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