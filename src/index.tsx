import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Profile from './Components/Profile/Profile'
import Home from './Components/Home/Home';
import AppbarPrivate from './Components/Navbar/AppbarPrivate';
import AppbarPublic from './Components/Navbar/AppbarPublic';
import App from './App';

 const root = ReactDOM.createRoot(
   document.getElementById('root') as HTMLElement
 );
 root.render(
   <React.StrictMode>
     <BrowserRouter>
     <Routes>
       <Route path="/" element={<App />} />
      <Route path="profile" element={<Profile />} />
     </Routes>
   </BrowserRouter>
   </React.StrictMode>
 );

