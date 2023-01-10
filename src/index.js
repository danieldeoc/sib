import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './index.scss';
import AppHome from './components/HomePage.js';
import PurchaseList from './components/PurchaseList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
          <Route exact path='/' element={<AppHome />} />
          <Route exact path='/purchaseList' element={<PurchaseList />} />
    </Routes>
  </BrowserRouter>  
);


