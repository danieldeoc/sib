import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './index.scss';
import AppHome from './components/HomePage.js';
import DecisionsList from './components/DecisionsList';
import SplashScreen from './components/splashScreen';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
          <Route exact path='/' element={<SplashScreen />} />
          <Route exact path='/decision' element={<AppHome />} />
          <Route exact path='/decisionsList' element={<DecisionsList />} />
    </Routes>
  </BrowserRouter>  
);


