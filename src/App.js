import React, { Component } from 'react';
import Layout from './components/Layout';
import './styles/app.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Layout title="Welcome" />
      </div>
    );
  }
}

export default App;
