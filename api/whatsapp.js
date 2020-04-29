const express = require("express");
const Router = express.Router();
const parse = require("../functions/parse.js");
let io;

//importing services
const FundTransfer = require("../service/FundTransfer");
const FoodAtHome = require("../service/FoodAtHome");

//register functions for these serives
let serviceFunctions = {
    "fundtransfer" : FundTransfer,
    "foodathome" : FoodAtHome
}

let msgs = new Array();

Router.get("/", (req, res) => {
    res.send(msgs);
});

Router.post("/", (req, res) => {
    let msg = req.body.Body;
    msgs.push(req.body);

    let parsedMsg = parse(msg);
    let msgToProcess = Object.assign({}, parsedMsg, {via : "whatsapp"}, {from : req.body.From});
    
    serviceFunctions[msgToProcess.command].handle(msgToProcess);
    

    res.send({"msg" : msgToProcess});
});

const setSocketIO = io_ => {
    io = io_;
    FundTransfer.setSocketIO(io);
}

module.exports = {
    Router,
    setSocketIO
}