/*const WebSocket = require('ws');

const http = require('http');
const fs = require('fs');
const path = require('path');

const vid1path = path.join(__dirname, './images/c1.mp4');

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
console.log('WebSocket server is Running on ws://localhost:8080');*/

const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

// Path to your video file
const videoPath = path.join(__dirname, 'images/c1.mp4');
const htmlPath = path.join(__dirname, 'singleVid.html');
const cssPath = path.join(__dirname, 'App.css');

// HTTP server to serve the video
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile(htmlPath, (err, data) =>{
            if(err){
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('Not found')
            } else {
                res.writeHead(200, {"Content-Type": 'text/html'});
                res.end(data);
            }
        });
    }
    else if (req.url === '/video') {
        fs.stat(videoPath, (err, stats) => {
            if (err) {
                console.error('File not found');
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
                return;
            }

            const { range } = req.headers;
            if (!range) {
                res.writeHead(200, { 'Content-Type': 'video/mp4' });
                fs.createReadStream(videoPath).pipe(res);
                //res.end('Range Not Satisfiable');
                return;
            }

            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
            const chunksize = (end - start) + 1;

            res.writeHead(206, {
                'Content-Range': `bytes ${start}-${end}/${stats.size}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            });

            const stream = fs.createReadStream(videoPath, { start, end })
                .on('open', () => stream.pipe(res))
                .on('error', err => res.end(err));
        });
    }else if (req.url === '/App.css') {
        fs.readFile(cssPath, (err,data) => {
            if(err){
                res.writeHead(404, {"Content-Type": "text/plain"});
                res.end(data);
            } else {
                res.writeHead(200, {"Content-Type": 'text/css'});
                res.end(data);
            }
        })

    }
     else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// WebSocket server on the same port
const wss = new WebSocket.Server({ server });

wss.on('connection', (socket) => {
    const clientAddress = socket._socket.remoteAddress;
    console.log(`Client connected from ${clientAddress}`);

    socket.on('message', (message) => {
        let parsedMessage;
        try {
            parsedMessage = JSON.parse(message);
        } catch (e) {
            console.log("Error parsing:", e);
            return;
        }
        if (parsedMessage.type === 'unload') {
            console.log("Broadcasting unload to all clients");
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN && client !== socket) {
                    client.send(JSON.stringify({ type: 'unload' }));
                }
            });
        } else if (parsedMessage.type === 'browserInfo') {
            console.log(`Browser Info: ${parsedMessage.message}`);
        }
    });

    socket.on('close', () => {
        console.log("Client disconnected");
    });
});

server.listen(8080, () => {
    console.log('Server running at http://localhost:8080/');
});


