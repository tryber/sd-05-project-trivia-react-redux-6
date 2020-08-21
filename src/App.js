import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Feedback from './pages/Feedback';
import Login from './components/Login';
import Header from './components/Header';

export default function App() {
  return (
    <BrowserRouter>
      <Route exact path='/feedback' component={Feedback} />
      <Route exact path='/' component={Login} />
      {/* <Route exact path='/game' component={Game} />
      <Route exact path='/ranking' component={Ranking} /> */}
      <Header />
    </BrowserRouter>
  );
}
