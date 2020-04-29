const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let port = process.env.PORT || 3000;
let server = app.listen(port);
const io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const whatsappRouter = require("./api/whatsapp");

whatsappRouter.setSocketIO(io);

app.get("/dashboard", (req, res) => {
    res.sendFile(__dirname + "/client/dashboard.htm");
});

app.use("/whatsapp", whatsappRouter.Router);

app.get ("/", (req, res) => {
    res.send({"msg" : "server working"})
});