import { useState, useEffect } from 'react';
import axios from "axios"
import React from 'react';
import './App.css';
import { CognitoUser } from '@aws-amplify/auth';
import { BrowserRouter } from 'react-router-dom';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import SignIn from './Components/Signup';
import { Routes, Route } from 'react-router-dom';
import InterestSelection from './Routes/Signup/InterestSelection';
import { Box, ThemeProvider } from '@mui/material';
import * as global from "./Resources/GlobalTheme";
import Home from './Components/Home/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Dashboard from './Routes/Home/Dashboard';
import UserProfile from './Components/UserProfile/UserProfile'
Amplify.configure(awsconfig);

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<UserProfile />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/interests" element={<InterestSelection />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
export default App;