import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import logo from './logo.svg';
import Home from './components/Home';
import Callback from "./components/Callback";
import Details from './components/Details';
import CreateTopic from './components/CreateTopic';

import 'semantic-ui-css/semantic.min.css';
import './App.css';
import "./toastr.css"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: undefined,
      isLogin: false,
    }
  }


  render() {
    return (
      <Router>
        <div>
            <Route exact path={process.env.PUBLIC_URL + '/'} component={Home} />
            <Route exact path={process.env.PUBLIC_URL + '/create'} component={CreateTopic} />
            <Route exact path={process.env.PUBLIC_URL + '/callback/:id'} component={Callback} />
            <Route exact path={process.env.PUBLIC_URL + '/details/:id'} component={Details} />
        </div>
      </Router>
    );
  }
}

export default App;
