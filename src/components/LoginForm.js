import React, { Component } from 'react';
import { TextInput, Button } from 'evergreen-ui';
import { USER_VERIFY } from '../Constants';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: 'Baby peach',
      error: ''
    };
  }

  // componentDidMount() {
  //   this.focus();
  // }

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
  };

  // focus = () => {
  //   this.textInput.focus();
  // };

  render() {
    const { error } = this.state;
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit} className="login__form">
          {error}
          <label htmlFor="nickname">
            <h2>Got a nickname?</h2>
          </label>
          <TextInput
            name="text-input-name"
            placeholder="Text input placeholder..."
            id="nickname"
          />
          <Button>Login</Button>
        </form>
      </div>
    );
  }
}
