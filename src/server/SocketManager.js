const io = require('./server.js').io;
const {
  COMMUNITY_CHAT,
  MESSAGE_RECEIVED,
  MESSAGE_SENT,
  USER_CONNECTED,
  USER_DISCONNECTED,
  TYPING,
  VERIFY_USER,
  LOGOUT
} = require('../Constants');

const { createUser, createChat, createMessage } = require('../Classes');

const communityChat = createChat();
let connectedUsers = {};
const chats = [communityChat];

module.exports = function(socket) {
  let sendMessageToChatFromUser;
  let sendTypingFromUser;

  socket.on(VERIFY_USER, function(newUser, callback) {
    if (!isUser(connectedUsers, newUser)) {
      callback({isUser:false, user:createUser({name:newUser})});
    } else {
      callback({isUser:true});
    }
  });

  socket.on(USER_CONNECTED, function(user) {
    connectedUsers = addUser(connectedUsers, user);
    socket.user = user.name;
    sendMessageToChatFromUser = sendMessageToChat(user.name);
    sendTypingFromUser = sendTypingToChat(user.name);
    console.log(connectedUsers);
    io.emit(USER_CONNECTED, connectedUsers);
  });

  socket.on('disconnect', function (){
    if(!!socket.user){
      connectedUsers = removeUser(connectedUsers, socket.user);
      io.emit(USER_DISCONNECTED, connectedUsers);
    }
  });

  socket.on(LOGOUT, function(){
    connectedUsers = removeUser(connectedUsers, socket.user)
  });

  socket.on(COMMUNITY_CHAT, function(callback) {
    callback(communityChat);
  })

  socket.on(MESSAGE_SENT, function({chatId, message}) {
    sendMessageToChatFromUser(chatId, message)
  });

  socket.on(TYPING, function({chatId, isTyping}) {
    sendTypingFromUser(chatId, isTyping)
  });
}

function sendMessageToChat(sender) {
  return (chatId, message) => {
    io.emit(`${MESSAGE_RECEIVED}-${chatId}`, createMessage({message, sender}));
  };
}

function sendTypingToChat(user) {
  return (chatId, isTyping) => {
    io.emit(`${TYPING}-${chatId}`, { user, isTyping });
  };
}

function addUser(userList, user) {
  const newList = Object.assign({}, userList);
  newList[user.name] = user;
  return newList;
}

function removeUser(userList, username) {
  const newList = Object.assign({}, userList);
  delete newList[username];
  return newList;
}

function isUser(userList, username) {
  return username in userList;
}

function createError(message) {
  return {
    error: {
      message
    }
  };
}
