const express = require("express");
const Router = express.Router();

let msgs = new Array();

Router.get("/", (req, res) => {
    res.send(msgs);
});

Router.post("/", (req, res) => {
    msgs.push(req.body.Body);
    res.send("ok")
});

module.exports = Router;