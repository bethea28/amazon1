import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import App from './App';
import Profile from './Components/Profile/Profile'
import Navbar from './Components/Navbar/Navbar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="profile" element={<Profile />} />
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
);
