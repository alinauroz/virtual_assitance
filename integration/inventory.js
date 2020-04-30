const inventory = require("../db/inventory.json");
const _ = require("lodash");

const getAll = () => {
    return inventory;
}

const get = id => {
    return _.find(inventory, {id});
}


module.exports = {
    getAll,
    get
}