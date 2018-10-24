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

  sendMessage = () => {
    const { sendMessage } = this.props;
    const { message } = this.state;
    sendMessage(message);
    this.blur();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.sendMessage();
    this.setState({
      message: ''
    });
  }

  blur = () => this.refs.messageinput.blur();

  startCheckingTyping() {
    this.typingInterval = setInterval(() => {
      if ((Date.now() - this.lastUpdateTime) > 300) {
        this.setState({
          isTyping:false
        });
        this.stopCheckingTyping()
      }
    }, 300);
  }

  stopCheckingTyping() {
    const { sendTyping } = this.props;
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
      sendTyping(false);
    }
  }

  sendTyping() {
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

  render() {
    const { message } = this.state
    return (
      <div className="message-input">
        <form onSubmit={this.handleSubmit} className="message-form">
          <input
            id="message"
            ref={"messageinput"}
            type="text"
            className="form-control"
            value = { message }
            autoComplete={'off'}
            placeholder="Type something to send"
            onKeyUp={(e)=>{ e.keyCode !== 13 && this.sendTyping() }}
            onChange={({ target: { value: v } }) => this.setState({ message: v })}
          />
          <button
            disabled={ message.length < 1}
            type="submit"
            className="send">
            Send
          </button>
        </form>
      </div>
    );
  }
}
