const users = require("../db/users.json");
const _ = require("lodash");

const get = cnic => {
    return _.find(users, {cnic})
}

const add = data => {
    users.push(data);
}

const updateBalance = (cnic, amount) => {
    try {
        let i = _.findIndex(users, {cnic});
        users[i].balance += amount;
        return users[i];
    }
    catch (err) {
        return {err};
    }
}

const getBalance = cnic => {
    try {
        let {balance} = _.find(users, {cnic});
        return balance;
    }
    catch (err) {
        return -1;
    }
}

const getAddress = cnic => {
    try {
        let {address, city} = _.find(users, {cnic});
        return address + ", " + city;
    }
    catch (err) {
        return -1;
    }
}

module.exports = {
    get,
    add,
    updateBalance,
    getBalance,
    getAddress
}

