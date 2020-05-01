const express = require("express");
const Router = express.Router();
const parse = require("../functions/parse.js");
const env = require("dotenv");
const twilio = require("twilio");
let io;

env.config();

let productionMode = process.env.PORT;

//importing services
const FundTransfer = require("../service/FundTransfer");
const FoodAtHome = require("../service/FoodAtHome");
const Shopping = require("../service/Shopping");

//register functions for these serives
let serviceFunctions = {
    "fundtransfer" : FundTransfer,
    "foodathome" : FoodAtHome,
    "shopping" : Shopping
}

let msgs = new Array();

Router.get("/", (req, res) => {
    res.send(msgs);
});

Router.post("/", (req, res) => {

    //perform signature validations here

    const twilioSignature = req.headers['x-twilio-signature'];
    const params = req.body;
    const url = 'https://frozen-sierra-78630.herokuapp.com/whatsapp';

    const requestIsValid = twilio.validateRequest(
        process.env.AUTHTOKEN,
        twilioSignature,
        url,
        params
    );

    if (!requestIsValid && productionMode) {
        return res.status(401).send('Unauthorized');
    }

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
    Shopping.setSocketIO(io);
}

module.exports = {
    Router,
    setSocketIO
}