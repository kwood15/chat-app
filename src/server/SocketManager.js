const io = require('./index.js').io;

const {
  USER_VERIFY,
  USER_CONNECTED,
  USER_DISCONNECTED,
  LOGOUT,
  COMMUNITY_CHAT,
  MESSAGE_RECEIVED,
  MESSAGE_SENT,
  TYPING,
  PRIVATE_MESSAGE
} = require('../Constants');

const { createUser, createMessage, createChat } = require('../Factories');

let connectedUsers = {};
const communityChat = createChat({ isCommunity: true });

module.exports = function (socket) {
  console.log(`Socket Id: ${socket.id}`);
  let sendMessageToChatFromUser;
  let sendTypingFromUser;

  socket.on(USER_VERIFY, (nickname, callback) => {
    if (isUser(connectedUsers, nickname)) {
      callback({ isUser: true, user: null });
    } else {
      callback({ isUser: false, user: createUser({ name: nickname, socketId: socket.id }) });
    }
  });

  socket.on(USER_CONNECTED, (user) => {
    user.socketId = socket.id;
    connectedUsers = addUser(connectedUsers, user);
    socket.user = user;

    sendMessageToChatFromUser = sendMessageToChat(user.name);
    sendTypingFromUser = sendTypingToChat(user.name);

    io.emit(USER_CONNECTED, connectedUsers);
  });

  socket.on('disconnect', () => {
    if ('user' in socket) {
      connectedUsers = removeUser(connectedUsers, socket.user.name);

      io.emit(USER_DISCONNECTED, connectedUsers);
      console.log('Disconnect', connectedUsers);
    }
  });

  socket.on(LOGOUT, () => {
    connectedUsers = removeUser(connectedUsers, socket.user.name);
    io.emit(USER_DISCONNECTED, connectedUsers);
    console.log('Disconnected', connectedUsers);
  });

  socket.on(COMMUNITY_CHAT, (callback) => {
    callback(communityChat);
  });

  socket.on(MESSAGE_SENT, ({ chatId, message }) => {
    sendMessageToChatFromUser(chatId, message);
  });

  socket.on(TYPING, ({ chatId, isTyping }) => {
    sendTypingFromUser(chatId, isTyping);
  });

  socket.on(PRIVATE_MESSAGE, ({ receiver, sender, activeChat }) => {
    if (receiver in connectedUsers) {
      const receiverSocket = connectedUsers[receiver].socketId;
      if (activeChat === null || activeChat.id === communityChat.id) {
        const newChat = createChat({ name: `${receiver}&${sender}`, users: [receiver, sender] });
        socket.to(receiverSocket).emit(PRIVATE_MESSAGE, newChat);
        socket.emit(PRIVATE_MESSAGE, newChat);
      } else {
        socket.to(receiverSocket).emit(PRIVATE_MESSAGE, activeChat);
      }
    }
  });
};

function sendTypingToChat(user) {
  return (chatId, isTyping) => {
    io.emit(`${TYPING}-${chatId}`, { user, isTyping });
  };
}

function sendMessageToChat(sender) {
  return (chatId, message) => {
    io.emit(`${MESSAGE_RECEIVED}-${chatId}`, createMessage({ message, sender }));
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
