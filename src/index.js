import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import AppHome from './components/HomePage.js';
import PurchaseList from './components/PurchaseList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <AppHome />
    <PurchaseList />
  </>
);


