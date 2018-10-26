import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faUserPlus, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const ChatHeading = ({ name, numberOfUsers }) => (
  <div className="chat-header">
    <div className="user-info">
      <div className="user-name">{name}</div>
      <div className="status">
        <div className="indicator" />
        <span>
          {numberOfUsers || null}
            online
        </span>
      </div>
    </div>
    <div className="options">
      <FontAwesomeIcon icon={faVideo} />
      <FontAwesomeIcon icon={faUserPlus} />
      <FontAwesomeIcon icon={faEllipsisH} />
    </div>
  </div>
);

export default ChatHeading;
