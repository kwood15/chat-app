const uuidv4 = require('uuid/v4');

const createUser = ({ name }) => ({
  id: uuidv4(),
  name
});

const createMessage = ({ message, sender }) => ({
  id: uuidv4(),
  time: new Date(Date.now()),
  message,
  sender
});

const createChat = ({ messages = [], name = 'Community', users = [] } = {}) => ({
  id: uuidv4(),
  name,
  messages,
  users,
  typingUsers: [],
  addMessage: message => [...messages, message],
  addTypingUser: (typingUsers, username) => [...typingUsers, username],
  removeTypingUser: (typingUsers, username) => typingUsers.filter(u => u === username)
});

module.exports = {
  createUser,
  createMessage,
  createChat
};
