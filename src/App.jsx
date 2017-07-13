import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import logo from './logo.svg';
import Home from './components/Home';
import Details from './components/Details';
import Navbar from './components/Navbar';

import 'semantic-ui-css/semantic.min.css';
import './App.css';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Container text>
            <Route exact path={process.env.PUBLIC_URL + '/'} component={Home} />
            <Route exact path={process.env.PUBLIC_URL +'/details/:id'} component={Details} />
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
