import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import { config } from './firebase';
import './index.css';
import '@animxyz/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import Provider from './context';
// import reportWebVitals from './reportWebVitals';

firebase.initializeApp(config);

// firebase.auth().signOut();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
