const io = require('./index').io;

module.exports = function(socket) {
  console.log('Socket ID' + socket.id)
}
