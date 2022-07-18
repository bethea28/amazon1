import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import InterestSelection from './Routes/Signup/InterestSelection';
import { Box, ThemeProvider } from '@mui/material';
import * as global from "./Resources/GlobalTheme";
import Profile from './Components/Profile/Profile'
import Home from './Components/Home/Home';

function App() {

  const theme = global.theme;

  return (
    <Box className="App" height={"100vh"} display={"flex"} flexDirection={"column"}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Profile />} />
        <Route path="/interests" element={<InterestSelection />} />
      </Routes>
    </Box>
  );
}

export default App;
