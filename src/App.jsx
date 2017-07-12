import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import logo from './logo.svg';
import Home from './components/Home';
import Navbar from './components/Navbar';

import 'semantic-ui-css/semantic.min.css';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <Container text>
          <Home/>
        </Container>
      </div>
    );
  }
}

export default App;
