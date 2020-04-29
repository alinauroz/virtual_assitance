const users = require("../db/users.json");
const _ = require("lodash");

const get = cnic => {
    return _.find(users, {cnic : cnic})
}

const add = data => {
    users.push(data);
}

module.exports = {
    get,
    add
}

