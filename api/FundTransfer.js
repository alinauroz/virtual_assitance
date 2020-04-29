const express = require('express');
const Router = express.Router();

Router.get("/", (req, res) => {
    res.send({msg : "Hello World"});
});

//make an api so websites and apps can access this service

module.exports = Router;