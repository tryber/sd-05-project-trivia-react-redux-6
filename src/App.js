import React from 'react';
import logo from './trivia.png';
import './App.css';
import Login from './components/Login';
import Game from './components/Game';
import { BrowserRouter, Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={Login} />
      <Route exact path='/game' component={Game} />
      {/* <Route exact path='/feedback' component={Feedback} />
      <Route exact path='/ranking' component={Ranking} /> */}

    </BrowserRouter>
  );
}
