import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Profile from './Components/Profile/Profile'
import Home from './Components/Home/Home';
import AppbarPrivate from './Components/Navbar/AppbarPrivate';
import AppbarPublic from './Components/Navbar/AppbarPublic';
import App from './App';
import SignIn from './Components/Signup';
import awsconfig from './aws-exports';
import { Amplify, Auth } from 'aws-amplify';
Amplify.configure(awsconfig);

 const root = ReactDOM.createRoot(
   document.getElementById('root') as HTMLElement
 );
 root.render(
   <React.StrictMode>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<App />} />
      <Route path="profile" element={<Profile />} />
      {/* <Route path="signup" element={<SignIn authState={'signIn'} loading={false}/>} /> */}
     </Routes>
   </BrowserRouter>
   </React.StrictMode>
 );

