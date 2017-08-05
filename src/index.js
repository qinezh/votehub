import React from 'react';
import ReactDOM from 'react-dom';
import * as dotenv from "dotenv";
import * as path from "path";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

dotenv.config();

console.log(process.env.REACT_APP_KEY);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
