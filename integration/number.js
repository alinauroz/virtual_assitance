const numbers = require("../db/numbers.json");
const _ = require("lodash");

//no is phone number

const get = no => {
    return _.find(numbers, {no});
}

const getCNIC = no => {
    let {cnic} = _.find(numbers, {no});
    return cnic;
}

module.exports = {
    get,
    getCNIC
}