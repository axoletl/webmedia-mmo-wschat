const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = process.env.PORT || 3000;
const server = http.createServer(express);
const app = express();
const wss = new WebSocket.Server({ server })

server.listen(port, function () {
    console.log('server awake at ' + port);
});

var options = {
    index: "index.html"
};

//serve http test page
app.use('/', express.static('app', options));

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {

        console.log(new Buffer.from(data).toString());

        //for each connected client
        wss.clients.forEach(function each(client) {
            if (client != ws && client.readyState == WebSocket.OPEN) {
                //sends data as unspecified blob
                client.send(data);
            }
        });
    });
});