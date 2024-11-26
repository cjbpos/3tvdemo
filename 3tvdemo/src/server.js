const WebSocket = require('ws');

const server = new WebSocket.Server({port: 8080});

server.on('connection', (socket) => {
    const clientAdress = socket._socket.remoteAddress;
    console.log(`Client connected from ${clientAdress}`);

    socket.on('message', (message) => {
        let parsedmessage;
        try{
            parsedmessage = JSON.parse(message);
        } catch(e) {
            console.log("Error parsing:", e);
            return;
        }
        if(parsedmessage.type === 'unload') {
            console.log("Broadcasting unload to all clients");
            server.clients.forEach((client) => {
                if(client.readyState === WebSocket.OPEN && client !== socket) {
                    client.send(JSON.stringify({type: 'unload'}));
                }
            });
        }else if (parsedmessage.type === 'browserInfo'){
            console.log(`Browser Info: ${parsedmessage.message}`);
        }
    });

    socket.on('close', () => {
        console.log("Client disconnected");
    });
});
console.log('WebSocket server is Running on ws://localhost:8080');

