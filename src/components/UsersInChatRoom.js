import React, { Component } from 'react';
import C from '../Constants';

export default class UsersIndChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onlineUsers:[],
      typingUsers:[]
    };
    this.initSocket();
  }

  updateOnlineUsers = (onlineUsers) => {
    this.setState({
      onlineUsers
    });
  }

  initSocket() {
    const { socket } = this.props;
    socket.on(C.USER_CONNECTED, this.updateOnlineUsers);
  }

  render() {
    const { onlineUsers, typingUsers } = this.state;
    return (
      <div className="online-users">
        <label htmlFor="toggle-online-users">
          <i className="material-icons">contacts</i>
          {onlineUsers.length}
        </label>
        <div className="open collection">
          <div className="header">
            <h3>Users Online</h3>
          </div>
          {
            Object.keys(onlineUsers).map(key => (
              <div key={key} className="collection-item">
                {onlineUsers[key].username}
              </div>
            ))
          }
          {
            typingUsers.map((user, i)=> (
              <div key={i} className="collection-item">
                {user}
                {' is typing. . .'}
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}
