const express = require('express');
const app = express();

const whatsappRouter = require("./api/whatsapp");

app.use("/whatsapp", whatsappRouter);

app.get ("/", (req, res) => {
    res.send({"msg" : "server working"})
});

let port = process.env.PORT || 3000;

app.listen(port);