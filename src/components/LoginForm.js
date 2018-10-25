import React, { Component } from 'react';
import { USER_VERIFY } from '../Constants';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      error: ''
    };
  }

  setUser = ({ user, isUser }) => {
    const { setUser } = this.props;
    if (isUser) {
      this.setError('User name taken');
    } else {
      this.setError('');
      setUser(user);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { socket } = this.props;
    const { nickname } = this.state;
    socket.emit(USER_VERIFY, nickname, this.setUser);
  }

  handleChange = (e) => {
    this.setState({
      nickname: e.target.value
    });
  }

  setError = (error) => {
    this.setState({
      error
    });
  }

  render() {
    const { nickname, error } = this.state;
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit} className="login-form">
          <label htmlFor="nickname">
            <h2>Got a nickname?</h2>
          </label>
          <input
            ref={(input) => { this.textInput = input; }}
            type="text"
            id="nickname"
            value={nickname}
            onChange={this.handleChange}
            placeholder="Enter your username..."
          />
          <div className="error">{error || null}</div>
        </form>
      </div>
    );
  }
}
