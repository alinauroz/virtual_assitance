const express = require("express");
const Router = express.Router();
const parse = require("../functions/parse.js");

let msgs = new Array();

Router.get("/", (req, res) => {
    res.send(msgs);
});

Router.post("/", (req, res) => {
    let msg = req.body.Body;
    msgs.push(req.body);

    let parsedMsg = parse(msg);
    let msgToProcess = Object.assign({}, parsedMsg, {via : "whatsapp"}, {from : req.body.from});

    res.send({"msg" : "ok"});
});

module.exports = Router;