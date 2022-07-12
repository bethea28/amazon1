import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import App from './App';
import Appbar from './Components/Navbar/Appbar';
import Home from './Components/Home/Home';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const isAuth = true;
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
);
