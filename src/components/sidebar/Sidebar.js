import React, { Component } from 'react';
import { last, get, differenceBy } from 'lodash';
import { createChatNameFromUsers } from '../../Factories';
import SidebarOption from './SidebarOption';
// import { FaChevronDown } from 'react-icons/lib/md/keyboard-arrow-down';
// import FaMenu from 'react-icons/lib/fa/list-ul';
// import FaSearch from 'react-icons/lib/fa/search';
// import MdEject from 'react-icons/lib/md/eject';

export default class Sidebar extends Component {
  static type = {
    USERS: 'users',
    CHATS: 'chats'
  }

  constructor(props) {
    super(props);
    this.state = {
      receiver: '',
      activeSidebar: Sidebar.type.CHATS
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { receiver } = this.state;
    const { onSendPrivateMessage } = this.props;

    onSendPrivateMessage(receiver);
    this.setState({
      receiver: ''
    });
  }

  addChatForUser = (receiver) => {
    const { onSendPrivateMessage } = this.props;
    onSendPrivateMessage(receiver);
    this.setActiveSidebar(Sidebar.type.CHATS);
  }

  setActiveSidebar = (type) => {
    this.setState({
      activeSidebar: type
    });
  }

  render() {
    const {
      chats,
      activeChat,
      user,
      setActiveChat,
      logout,
      users
    } = this.props;
    const { receiver, activeSidebar } = this.state;
    return (
      <div id="side-bar">
        <div className="heading">
          <div className="app-name">
            KAY : CO
            {/* <FaChevronDown /> */}
          </div>
          <div className="menu">
            {/* <FaMenu /> */}
          </div>
        </div>
        <form onSubmit={this.handleSubmit} className="search">
          <i className="search-icon">
            {/* <FaSearch /> */}
          </i>
          <input
            placeholder="Search"
            type="text"
            value={receiver}
            onChange={(event) => { this.setState({ receiver: event.target.value }); }}
          />
          <div className="plus"></div>
        </form>
        <div className="side-bar-select">
          <div
            role="button"
            onClick={() => { this.setActiveSidebar(Sidebar.type.CHATS); }}
            className={`side-bar-select__option ${activeSidebar === Sidebar.type.CHATS ? 'active' : ''}`}
          >
            <span>Chats</span>
          </div>
          <div
            role="button"
            onClick={() => { this.setActiveSidebar(Sidebar.type.USERS); }}
            className={`side-bar-select__option ${activeSidebar === Sidebar.type.USERS ? 'active' : ''}`}
          >
            <span>Users</span>
          </div>
        </div>
        <div
          role="button"
          className="users"
          ref="users"
          onClick={(event) => { (event.target === this.refs.user) && setActiveChat(null); }}
        >
          {activeSidebar === Sidebar.type.CHATS ? chats.map(chat => (
            <SidebarOption
              key={chat.id}
              lastMessage={get(last(chat.messages), 'message', '')}
              name={chat.isCommunity ? chat.name : createChatNameFromUsers(chat.users, user.name)}
              active={activeChat.id === chat.id}
              onClick={() => { setActiveChat(chat); }}
            />
          )) : differenceBy(users, [user], 'name').map(user => (
            <SidebarOption
              key={user.id}
              name={user.name}
              onClick={() => { this.addChatForUser(user.name); }}
            />
          ))}
        </div>
        <div className="current-user">
          <span>{user.name}</span>
          <div role="button" onClick={() => { logout(); }} title="Logout" className="logout">
            {/* <MdEject/> */}
          </div>
        </div>
      </div>
    );
  }
}
