const app = require('http').createServer();
const io = require('socket.io')(app);
const SocketManager = require('./SocketManager');

const PORT = process.env.PORT || 3231;

io.on('connection', SocketManager);

app.listen(PORT, () => {
  console.log(`Connected to port: ${PORT}`);
});
