import React, { Component } from 'react';
import io from 'socket.io-client';
import { USER_CONNECTED, LOGOUT } from '../Constants';
import LoginForm from './LoginForm';
import ChatContainer from './chat/ChatContainer';

const serverURI = process.env.REACT_APP_SERVER || 'http://localhost:3231';

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      user: null
    };
  }

  componentWillMount() {
    this.initSocket();
  }

  reconnectUserInfo = () => {
    const { socket, user } = this.state;
    if (user != null) {
      socket.emit(USER_CONNECTED, user);
    }
  }

  setUser = (user) => {
    const { socket } = this.state;
    socket.emit(USER_CONNECTED, user);
    console.log('current user connected', user);
    this.setState({
      user
    });
  }

  logout = () => {
    const { socket } = this.state;
    socket.emit(LOGOUT);
    this.setState({
      user: null
    });
  }

  initSocket = () => {
    const socket = io(serverURI);
    socket.on('connect', (value) => {
      console.log('Connected');
    });
    this.setState({
      socket
    });
  }

  render() {
    const { title } = this.props;
    const { socket, user } = this.state;
    return (
      <div className="container">
        <h1>{title}</h1>
        {
          !user ? <LoginForm socket={socket} setUser={this.setUser} />
            : <ChatContainer socket={socket} logout={this.logout} user={user} />
        }
      </div>
    );
  }
}
