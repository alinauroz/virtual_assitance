const user = require("../integration/user");
const number = require("../integration/number");

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

const help = phoneNumber => {
    return `To Transfer Funds type \r\n fundtransfer <Recipients PhoneNumber> <AmountToTransfer> and send it to 001001`;
}

module.exports = {
    fundTransfer,
    help
}