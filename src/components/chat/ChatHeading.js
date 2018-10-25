import React from 'react';
// import FaVideoCamera from 'react-icons/lib/fa/video-camera';
// import FaUserPlus from 'react-icons/lib/fa/user-plus';
// import MdEllipsisMenu from 'react-icons/lib/md/keyboard-control';

const ChatHeading = ({ name, online, numberOfUsers }) => (
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
      {/*
        <FaVideoCamera />
        <FaUserPlus />
        <MdEllipsisMenu />
        */}
    </div>
  </div>
);

export default ChatHeading;
