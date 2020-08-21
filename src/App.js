import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Game from './components/Game';
import Feedback from './pages/Feedback';
import Login from './components/Login';
<<<<<<< HEAD
import Header from './components/Header';
=======
import Settings from './pages/Settings';
import Ranking from './pages/Ranking';
>>>>>>> d45c9a8171bae231f40bb536f39e254c8ab0c2cb

export default function App() {
  return (
    <BrowserRouter>
      <Route exact path='/feedback' component={Feedback} />
      <Route exact path='/ranking' component={Ranking} />
      <Route exact path='/game' component={Game} />
      <Route exact path='/' component={Login} />
<<<<<<< HEAD
      {/* <Route exact path='/game' component={Game} />
      <Route exact path='/ranking' component={Ranking} /> */}
      <Header />
=======
      <Route exact path='/settings' component={Settings} />
>>>>>>> d45c9a8171bae231f40bb536f39e254c8ab0c2cb
    </BrowserRouter>
  );
}
