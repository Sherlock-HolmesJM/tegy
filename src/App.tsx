import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Tracker, Home } from './components';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/app' component={Tracker} />
      </Switch>
    </div>
  );
}

export default App;
