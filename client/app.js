// Import dependencies
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const fs = require('fs');

// Configure express
app.use(express.json());
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// Routers
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views', 'index.html');
})

app.get('/message', (req, res) => {
    const fileDB = fs.readFileSync('./db/message.json', 'utf-8');
    const data = JSON.parse(fileDB);
    res.json(data);
})

// Socket.io
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        fs.readFile('./db/message.json', 'utf-8', (err, data) => {
            if (err) throw err;
            let message = JSON.parse(data);
            message.push(msg);
            fs.writeFile('./db/message.json', JSON.stringify(message), (err) => {
                if (err) throw err;
            });
        });
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Start server
server.listen(3000, () => {
    console.log('listening on *:3000');
});
