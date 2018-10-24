import React from 'react';
import FAVideo from 'react-icons/lib/fa/video-camera';
import FAUserPlus from 'react-icons/lib/fa/user-plus';
import MdEllipsisMenu from 'react-icons/lib/md/keyboard-control';

import React from 'react';

const ChatHeading = ({ name, online, numberOfUsers }) => {
  const onlineText = online ? 'online':'offline';
  return (
    <div className="chat-header">
      <div className="user-info">
        <div className="user-name">{name}</div>
        <div className="status">
          <div className={`indicator ${onlineText}`} />
          <span>
            {numberOfUsers ? numberOfUsers : null}
            online
          </span>
        </div>
      </div>
      <div className="options">
        <FAVideo />
        <FAUserPlus />
        <MdEllipsisMenu />
      </div>
    </div>
  );
};

export default ChatHeading;
