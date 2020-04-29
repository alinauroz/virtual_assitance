const requests = require("../db/FoodAtHome.json");
const _ = require("lodash");

const request = data => {
    data.ts = Date.now();
    requests.push(data)
}

const get = cnic => {
    return _.filter(requests, {cnic : cnic})
}

const getAll = () => {
    return requests;
}

const getPending = () => {
    return _.filter(requests, {status : "0"})
}

const getCompleted = () => {
    return _.filter(requests, {status : "1"})
}

const getRejected = () => {
    return _.filter(requests, {status : "2"})
}

const Last24 = () => {
    return _.filter(requests, ({ts, status}) => (Date.now() - ts) < 24 * 60 * 1000)
}

console.log(Last24())

module.exports = {
    request,
    get,
    getAll,
    getPending,
    getCompleted,
    getRejected
}