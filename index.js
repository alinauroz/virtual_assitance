const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const whatsappRouter = require("./api/whatsapp");

app.use("/whatsapp", whatsappRouter);

app.get ("/", (req, res) => {
    res.send({"msg" : "server working"})
});

let port = process.env.PORT || 3000;

app.listen(port);