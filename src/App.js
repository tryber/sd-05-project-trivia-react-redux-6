import React from 'react';
import logo from './trivia.png';
import './App.css';
import Login from './components/Login';
import { BrowserRouter, Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={Login} />
      {/* <Route exact path='/game' component={Game} />
      <Route exact path='/feedback' component={Feedback} />
      <Route exact path='/ranking' component={Ranking} /> */}
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
          <Login />
        </header>
      </div>
    </BrowserRouter>
  );
}
