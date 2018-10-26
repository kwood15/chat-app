import React, { Component } from 'react';

export default class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      isTyping: false
    };
  }

  componentWillUnmount() {
    this.stopCheckingTyping();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.sendMessage();
    this.setState({
      message: ''
    });
  }

  sendMessage = () => {
    const { sendMessage } = this.props;
    const { message } = this.state;
    sendMessage(message);
  }

  sendTyping = () => {
    const { sendTyping } = this.props;
    const { isTyping } = this.state;
    this.lastUpdateTime = Date.now();
    if (!isTyping) {
      this.setState({
        isTyping: true
      });
      sendTyping(true);
      this.startCheckingTyping();
    }
  }

  startCheckingTyping = () => {
    this.typingInterval = setInterval(() => {
      if ((Date.now() - this.lastUpdateTime) > 300) {
        this.setState({
          isTyping: false
        });
        this.stopCheckingTyping();
      }
    }, 300);
  }

  stopCheckingTyping = () => {
    const { sendTyping } = this.props;
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
      sendTyping(false);
    }
  }

  render() {
    const { message } = this.state;
    return (
      <div className="message-input">
        <form onSubmit={this.handleSubmit} className="message-form">
          <input
            id="message"
            ref="messageinput"
            type="text"
            className="form-control"
            value={message}
            autoComplete="off"
            placeholder="Type something interesting"
            onKeyUp={(e) => { e.keyCode !== 13 && this.sendTyping(); }}
            onChange={({ target }) => { this.setState({ message: target.value }); }}
          />
          <button
            disabled={message.length < 1}
            type="submit"
            className="send"
          >
            Send
          </button>
        </form>
      </div>
    );
  }
}
