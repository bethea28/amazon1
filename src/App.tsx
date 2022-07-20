import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import InterestSelection from './Routes/Signup/InterestSelection';
import { Box, ThemeProvider } from '@mui/material';
import * as global from "./Resources/GlobalTheme";
import UserProfile from './Components/UserProfile/UserProfile'
import Home from './Components/Home/Home';

function App() {

  const theme = global.theme;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/interests" element={<InterestSelection />} />
    </Routes>
  );
}

export default App;
