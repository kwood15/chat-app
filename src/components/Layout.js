import React, { Component } from 'react';
import LoginForm from './LoginForm';
import ChatContainer from './chat/ChatContainer';
import { USER_CONNECTED, LOGOUT } from '../Constants';

const serverURI = process.env.REACT_APP_SERVER || 'http://localhost:3231';

const io = require('socket.io-client');

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      user: null
    };
  }

  componentWillMount() {
    const socket = io(serverURI);
    this.setState({
      socket
    });
    this.initSocket(socket);
  }

  reconnectUserInfo = () => {
    const { socket, user } = this.state;
    if (user != null) {
      socket.emit(USER_CONNECTED, user);
    }
  }

  setUser = (user) => {
    const { socket } = this.state;
    this.setState({
      user
    });
    socket.emit(USER_CONNECTED, user);
  }

  logout = () => {
    const { socket } = this.state;
    socket.emit(LOGOUT);
    this.setState({
      user: null
    });
  }

  initSocket(socket) {
    socket.on('connect', (value) => {
      console.log('Connected');
    });
    socket.on('disconnect', this.reconnectUserInfo);
  }

  render() {
    const { title } = this.props;
    const { user, socket } = this.state;
    return (
      <div className="container">
        <h1>{title}</h1>
        {
          !user ? <LoginForm socket={socket} setUser={this.setUser} verified={this.setUser} />
            : <ChatContainer socket={socket} logout={this.logout} user={user} />
        }
      </div>
    );
  }
}
