import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Game from './components/Game';
import Feedback from './pages/Feedback';
import Login from './components/Login';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <BrowserRouter>
      <Route exact path='/feedback' component={Feedback} />
      <Route exact path='/ranking' component={Ranking} />
      <Route exact path='/game' component={Game} />
      <Route exact path='/' component={Login} />
    </BrowserRouter>
  );
}
