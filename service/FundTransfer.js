const user = require("../integration/user");
const number = require("../integration/number");

const whatsapp = require("../integration/whatsapp");

const fundTransfer = data => {
    try {

        if (data.amount <= 0) {
            return "Invalid Transfer Amount"
        }
        else if (! data.to || ! (number.get(data.to))) {
            return "Invalid Recipient";
        }
        else if (user.getBalance(number.getCNIC(data.from)) >= data.amount) {
            
            user.updateBalance(number.getCNIC(data.from), -1 * data.amount);
            user.updateBalance(number.getCNIC(data.to), data.amount);
            
            let to = user.get(number.getCNIC(data.to));
            let from = user.get(number.getCNIC(data.from));

            return `Amount ${data.amount} Rs is transferred to ${to.name} from your account. Your new balance is ${from.balance} Rs.`
        }
        else {
            return "Insufficient Balance";
        }
    }
    catch (err) {
        return "Error while tranferring fund. This may be due to wrong input format or incomplete input. "
    }
}

//phoneNumber is the number which wants help

const help = (phoneNumber, api) => {
    if (api == "whatsapp")
        whatsapp.send( `To Transfer Funds type \r\n fundtransfer <Recipients PhoneNumber> <AmountToTransfer> and send it to 001001`, phoneNumber);
}

const handle = (input) => {
    console.log(input)
    if (input.help) {
        if (input.via == "whatsapp")
            help(input.from, "whatsapp")
    }
    else if (input.amount && input.to){
        
    }
}


module.exports = {
    handle,
}