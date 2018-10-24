import React, { Component } from 'react';
import { TextInput, Button } from 'evergreen-ui';
import { USER_VERIFY } from '../Constants';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      error: ''
    };
    this.setUser = this.setUser.bind(this);
  }

  componentDidMount() {
    // this.focus();
  }

  setUser(response) {
    const { setUser } = this.props;
    if (!response.isUser) {
      setUser(response.user);
    } else {
      this.setError('Username is already taken');
    }
  }

  setError(error) {
    this.setState({
      error
    });
  }

  handleChange = (event) => {
    this.setState({
      nickname: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { socket } = this.props;
    const { nickname } = this.state;
    socket.emit(USER_VERIFY, nickname, this.setUser);
  }

  // focus = () => {
  //   this.textInput.focus();
  // }

  render() {
    const { nickname, error } = this.state;
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit} className="login__form">
          <label htmlFor="nickname">
            <h2>Got a nickname?</h2>
          </label>
          <TextInput
            ref={(input) => { this.textInput = input; }}
            id="nickname"
            type="text"
            value={nickname}
            onChange={this.handleChange}
            placeholder="Enter your nickname..."
          />
          <div className="error">
            {error}
          </div>
          <Button>Login</Button>
        </form>
      </div>
    );
  }
}
