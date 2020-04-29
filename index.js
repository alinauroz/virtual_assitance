const express = require('express');
const app = express();

app.get ("/", (req, res) => {
    res.send({"msg" : "server working"})
});

let port = process.env.PORT || 3000;

app.listen(port);