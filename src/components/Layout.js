import React, { Component } from 'react';
import io from 'socket.io-client';
import { Pane, Text, Button } from 'evergreen-ui';

import { USER_CONNECTED, LOGOUT } from '../Constants';

const socketUrl = 'http://localhost:3231/';

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      user: null
    };
  }

  componentDidMount() {
    this.initSocket();
  }

  initSocket = () => {
    const socket = io(socketUrl);
    socket.on('connect', () => {
      console.log('Connected');
    });
    this.setState({
      socket
    });
  }

  setUser = (user) => {
    const { socket } = this.state;
    socket.emit(USER_CONNECTED, user);
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

  render() {
    const { title } = this.props;
    return (
      <div className="container">
        <Pane
          height={120}
          width={240}
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="default"
        >
          <Text>{title}</Text>
          <Button>xxx</Button>
        </Pane>
      </div>
    )
  }
}
