import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import Search from './components/search';
import Favs from './components/favs';
import Saved from './components/saved';
import Completed from './components/completed';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import configureStore from './store';


ReactDOM.render(
  <Provider store={configureStore()}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup/>} />
        <Route path="search" element={<Search/>} />
        <Route path="favs" element={<Favs/>} />
        <Route path="saved" element={<Saved/>} />
        <Route path="completed" element={<Completed/>} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
