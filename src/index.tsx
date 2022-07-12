import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import App from './App';
import Appbar from './Components/Navbar/Appbar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Appbar/>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
);
