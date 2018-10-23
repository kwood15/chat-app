const uuidv4 = require('uuid/v4');

const createUser = ({ name }) => {
  return {
    id: uuidv4(),
    name
  }
};

const createMessage = ({ message, sender }) => {
	return {
		id: uuidv4(),
		time: new Date(Date.now()),
		message,
		sender
	}
};

const createChat = ({ messages = [], name ='Community', users = []} = {}) => {
	return {
		id: uuidv4(),
		name,
		messages,
		users,
		typingUsers: [],
		addMessage: (messages, message) => {
			return [...messages, message];
    },
		addTypingUser: (typingUsers, username) => {
			return [...typingUsers, username];
    },
		removeTypingUser: (typingUsers, username) => {
			return typingUsers.filter((u) => u === username);
		}
	}
};

module.exports = {
  createUser,
  createMessage,
  createChat
};