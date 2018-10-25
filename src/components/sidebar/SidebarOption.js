import React, { PureComponent } from 'react';

export default class SideBarOption extends PureComponent {
  render() {
    const {
      active,
      lastMessage,
      name,
      onClick
    } = this.props;
    return (
      <div role="button" className={`user ${active ? 'active' : ''}`} onClick={onClick}>
        <div className="user-photo">{name[0].toUpperCase()}</div>
        <div className="user-info">
          <div className="name">{name}</div>
          <div className="last-message">{lastMessage}</div>
        </div>
      </div>
    );
  }
}
